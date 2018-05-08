if (module.hot) {
    module.hot.accept(/\.(js?$|scss)/, () => {
        console.log('all the dependencies have been accepted');
    });
}
