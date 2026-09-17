(function ($, undefined) {

	/**
	 * Build the markup for an icon: the glyph followed by its name.
	 *
	 * Used for both the dropdown list and the selected value.
	 *
	 * @param css
	 */
	function format_icon(css) {
		return $("<span class='acf-icomoon-dropdown-icon icon-" + css.id + "' style='display: inline-block; font-size:18px; margin-right: 5px; position: relative; top: 2px;'></span><span class='acf-icomoon-dropdown-text'>" + css.text + "</span>");
	}

	/**
	 * Initialize ACF field.
	 *
	 * @param $field
	 */
	function initialize_field($field) {

		var input = $field.find('input.acf-icomoon');

		// Bail if there is no input, or select2 is already attached. Both the
		// 'append' and 'new_field' actions below can fire for the same field, and
		// re-running select2 on an initialized input duplicates the control.
		if (!input.length || input.next('.select2-container').length) {
			return;
		}

		var allowClear = $(input).attr('data-allow-clear') || 0;
		var opts = {
			data: acf_icomoon,
			templateResult: format_icon,
			templateSelection: format_icon,
			dropdownCssClass: 'acf-icomoon-dropdown',
			dropdownAutoWidth: false,
			width: '100%',
			allowClear: 1 == allowClear
		};

		input.select2(opts);
	}

	/*
	 *  ready append
	 *
	 *  These are 2 events which are fired during the page load
	 *  ready = on page load similar to jQuery(document).ready()
	 *  append = on new DOM elements appended via repeater field
	 *
	 *  @type	event
	 *  @date	20/07/13
	 *
	 *  @param	$el (jQuery selection) the jQuery element which contains the ACF fields
	 *  @return	n/a
	 */

	acf.add_action('ready append', function ($el) {
		// search $el for fields of type 'FIELD_NAME'
		acf.get_fields({type: 'icomoon'}, $el).each(function () {
			initialize_field($(this));
		});
	});

	/*
	 *  new_field/type=icomoon
	 *
	 *  ACF Blocks V3 mounts block forms through React instead of appending DOM,
	 *  so the 'append' action above never fires for fields inside them and the
	 *  field is left as a plain text input. ACF still builds a field model for
	 *  each one, so initialize from the per-field action as well.
	 *
	 *  ACF 6.8.10 and later default blocks to V3 on WordPress 7.1 and later, so
	 *  this affects any site on those versions.
	 *
	 *  acf.addAction arrived in ACF 5.7; guarded so older ACF keeps working via
	 *  the legacy action above.
	 *
	 *  @type	event
	 *
	 *  @param	field (object) the ACF field model
	 *  @return	n/a
	 */

	if (typeof acf.addAction === 'function') {
		acf.addAction('new_field/type=icomoon', function (field) {
			initialize_field(field.$el);
		});
	}

})(jQuery);
