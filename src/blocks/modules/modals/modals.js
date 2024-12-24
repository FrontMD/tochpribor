
let modals = false

function modalsInit() {
    modals = new HystModal({
        linkAttributeName: "data-modal",
        beforeOpen: function(){
            lockBody()
        },
        afterClose: function(){
            unlockBody()
        },
    });
}
