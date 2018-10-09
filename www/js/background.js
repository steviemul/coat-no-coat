let lastResult;

const notify = () => {
  navigator.geolocation.getCurrentPosition((position) => {
    CNC.tellMe(
      position.coords.latitude, 
      position.coords.longitude,
      ((result) => {

        const imageSrc = (result > 0.5) ? '../images/cartman42x42.png' : '../images/kenny42x42.png';
        const notificationImageSrc = (result > 0.5) ? '../images/cartman192x192.png' : '../images/kenny192x192.png';
        const title = (result > 0.5) ? 'No Coat' : 'Coat';

        if (!lastResult) {
          lastResult = title;
        }

        const options = {
          type: 'basic',
          title: `${title} time`,
          iconUrl: notificationImageSrc,
          message: title
        };

        chrome.browserAction.setTitle({
          title:title
        });

        chrome.browserAction.setIcon({
          path: {
            '42':imageSrc
          }
        });

        if (lastResult != title) {
          chrome.notifications.create(options);
        }
        
        lastResult = title;
      })
    )
  });
};

setInterval(notify, 60000);

chrome.browserAction.onClicked.addListener(() => {
  var newURL = "https://coat-no-coat.appspot.com";
  chrome.tabs.create({url: newURL});
});