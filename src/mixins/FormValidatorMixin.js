export const FormValidatorMixin = {
  methods: {
    /**
     * Validate if the key pressed is a number or not.
     * @return {Boolean} isNumber
     */
    checkIfNumber (evt) {
      evt = evt || window.event
      const charCode = (evt.which) ? evt.which : evt.keyCode
      let isNumber = false

      if ((charCode > 31 && (charCode < 48 || charCode > 57))) {
        evt.preventDefault()
      } else {
        isNumber = true
      }

      return isNumber
    }
  }
}
