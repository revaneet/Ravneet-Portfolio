window.onload = function () {

    var messagesEle = document.querySelector('.messages');
    var loadingText = '<b>•</b><b>•</b><b>•</b>';
    var msgInd = 0;
    var typingSpeed = 20;

    function getCurrentTime() {
        var d = new Date();
        var hours = d.getHours();
        console.log(hours);
        if (hours >= 5 && hours < 19) return 'Have a nice day';
        else if (hours >= 19 && hours < 22) return 'Have a nice evening';
        else if (hours >= 22 || hours < 5) return 'Have a good night';
        else return 'Oops';
    }

    var messages = [
        'Hi there',
        'I\'m Ravneet',
        'I recently completed my Btech degree in Computer Science',
        'I\'m currently accepting full time jobs.<br> You can contact me at <a href="mailto:ravneetkaur91997@gmail.com">ravneetkaur91997@gmail.com</a> ',
        '<a href="https://github.com/revaneet">github.com/revaneet</a><br><a href="https://www.linkedin.com/in/revaneetkaur/">linkedin.com/in/revaneetkaur</a><br><a href="https://twitter.com/reva_neet">twitter.com/reva_neet</a>',
        getCurrentTime(),
        'Bye :)'
    ]

    function createBubbleElements(message, position) {
        var bubbleEle = document.createElement('div');
        var messageEle = document.createElement('span');
        var loadingEle = document.createElement('span');

        bubbleEle.classList.add('bubble');
        bubbleEle.classList.add('is-loading');
        bubbleEle.classList.add('cornered');

        bubbleEle.classList.add(position === 'right' ? 'right' : 'left');

        messageEle.classList.add('message');
        loadingEle.classList.add('loading');

        messageEle.innerHTML = message;
        loadingEle.innerHTML = loadingText;

        bubbleEle.appendChild(loadingEle);
        bubbleEle.appendChild(messageEle);

        bubbleEle.style.opacity = 0;

        return {
            loading: loadingEle,
            bubble: bubbleEle,
            message: messageEle
        }

    }
    function getFontSize() {
        return parseInt(getComputedStyle(document.body).getPropertyValue('font-size'));
    }
    function pxToRem(elePx) {
        var eleRem = elePx / getFontSize() + 'rem';

        return eleRem;
    }
    function getDimensions(elements) {
        var dimensions = {
            loading: {
                w: '4rem',
                h: '2.25rem'
            },
            bubble: {
                w: pxToRem(elements.bubble.offsetWidth + 4),
                h: pxToRem(elements.bubble.offsetHeight)
            },
            message: {
                w: pxToRem(elements.message.offsetWidth + 4),
                h: pxToRem(elements.message.offsetHeight)
            }
        }
        return dimensions;
    }
    function sendMessage(message, position) {
        var loadingDuration = (message.replace(/<(?:.|\n)*?>/gm, '').length * typingSpeed) + 500;
        var elements = createBubbleElements(message, position);
        messagesEle.appendChild(elements.bubble);
        messagesEle.appendChild(document.createElement('br'));
        var dimensions = getDimensions(elements);

        // elements.bubble.style.width = dimensions.bubble.w;
        elements.bubble.style.width = '0rem';
        elements.bubble.style.height = dimensions.loading.h;
        elements.message.style.width = dimensions.message.w;
        elements.message.style.height = dimensions.message.h;
        elements.bubble.style.opacity = 1;

        var bubbleOffset = elements.bubble.offsetTop + elements.bubble.offsetHeight;
        if (bubbleOffset > messagesEle.offsetHeight) {
            console.log(bubbleOffset)
            console.log(messagesEle.offsetHeight)
            var scrollMsgs = anime({
                targets: messagesEle,
                scrollTop: bubbleOffset,
                duration: 750
            });
        }
        var bubbleSize = anime({
            targets: elements.bubble,
            width: ['0rem', dimensions.loading.w],
            duration: 200,
            easing: 'easeOutElastic',
            // loop:true,
            complete: function () {
                bubbleSize.pause();
                anime({
                    targets: elements.bubble,
                    scale: 1 ,
                    loop: false,
                    width: [dimensions.loading.w, dimensions.bubble.w],
                    height: [dimensions.loading.h , dimensions.bubble.h],
                    // minHeight: [dimensions.loading.h, dimensions.bubble.h],
                    delay: loadingDuration - 400,
                    update: function (a) {
                        if(a.progress > 50)
                        {
                            console.log("begin");
                        if (msgInd <= messages.length) elements.bubble.classList.remove('cornered');
                        }
                        
                    }

                })
            }
        });
        
        var loadingBubblePulse = anime({
            targets: elements.bubble,
            scale: [1, .95],
            duration: 1100,
            loop: true,
            direction: 'alternate',
            easing: 'easeInOutQuad'
        });

        var startOfDots = anime({
            targets: elements.loading,
            translateX: ['-2rem', '0rem'],
            scale: [0.5, 1],
            duration: 400,
            delay: 25,
            easing: 'easeOutElastic',
        });

        var dotsPulse = anime({
            targets: elements.loading.querySelectorAll("b"),
            scale: [1, 1.25],
            opacity: [0.5, 1],
            duration: 300,
            loop: true,
            direction: 'alternate',
            delay: function (el, i) { return (i * 100) + 50 },
            complete: function () {
                dotsPulse.pause();
                anime({
                    targets: elements.loading.querySelectorAll("b"),
                    opacity: 0,
                    scale: 0,
                    loop:false,
                    update: function(a) {
                        if (a.progress>40 && elements.bubble.classList.contains('is-loading')) {
                            elements.bubble.classList.remove('is-loading');
                            
                            anime({
                                targets: elements.message,
                                opacity: [0,1],
                                duration: 200,
                                easing: 'easeOutElastic'
                            });
                        }

                    }
                })

            }

        });

        setTimeout(function () {
            loadingBubblePulse.pause();
            dotsPulse.complete();
        }, loadingDuration - 50);

    }

    function sendMessages() {
        var message = messages[msgInd];
        if (!message) return;
        sendMessage(message);
        msgInd++;
        setTimeout(sendMessages, (message.replace(/<(?:.|\n)*?>/gm, '').length * typingSpeed) + anime.random(900, 1200));
    }

    sendMessages();
}