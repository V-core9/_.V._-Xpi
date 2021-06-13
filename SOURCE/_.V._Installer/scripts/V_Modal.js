
const Vodal = {

}

NoSelectedInstallModeModal=()=>{
	// Create an instance of Notyf
	var notyf = new Notyf();

	// Display an error notification
	notyf.error({
		message: '<VnotifTitle>No Install Mode Selected. Using LIVE as default solution.</VnotifTitle><p>Vinstaller has detected that no Install Mode was selected, proceeded with "LIVE" Mode as a Default Solution.</p>',
		duration: 99000,
		icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="100%" height="100%" viewBox="0 0 24 24"><g data-name="Layer 2"><g data-name="flash"><rect width="24" height="24" opacity="0"></rect><path d="M11.11 23a1 1 0 0 1-.34-.06 1 1 0 0 1-.65-1.05l.77-7.09H5a1 1 0 0 1-.83-1.56l7.89-11.8a1 1 0 0 1 1.17-.38 1 1 0 0 1 .65 1l-.77 7.14H19a1 1 0 0 1 .83 1.56l-7.89 11.8a1 1 0 0 1-.83.44zM6.87 12.8H12a1 1 0 0 1 .74.33 1 1 0 0 1 .25.78l-.45 4.15 4.59-6.86H12a1 1 0 0 1-1-1.11l.45-4.15z"></path></g></g></svg>`
	})
}


showModal=(modalName = null )=> {
	switch (modalName) {
		case "NoSelectedInstallModeModal":
			NoSelectedInstallModeModal();
			break;
	
		default:
			console.warn('Called ShowModal() but NO modal FOUND.')
			break;
	}
}
