window.onload = function(){

    var messagesEle = document.querySelector('.messages');
    var loadingText = '<b>.</b><b>.</b><b>.</b>';
    var msgInd = 0;

    function getCurrentTime()
    {
        var d = new Date();
        var hours = d.getHours();
        if(hours >=5 && hours<19) return 'Have a nice day';
        else if(hours>=19 && hours<22) return 'Have a nice evening';
        else if(hours>=22 && hours<5) return 'Have a good night';
    }

    var messages =[
        'Hi there',
        'I\'m Ravneet',
        'I recently completed my Btech in Computer Science',
        'I\'m currently accepting full time jobs.<br> You can contact me at <a href="mailto:ravneetkaur91997@gmail.com">ravneetkaur91997@gmail.com</a> ',
        '<a href="https://github.com/revaneet">github.com/revaneet</a><br><a href="https://www.linkedin.com/in/revaneetkaur/">linkedin.com/in/revaneetkaur</a><br><a href="https://twitter.com/reva_neet">twitter.com/reva_neet</a>',
        getCurrentTime(),
        'Bye :)'
    ]

    function createBubbleElements(message , position)
    {
        var bubbleEle = document.createElement('div');
        var messageEle = document.createElement('span');
        

        bubbleEle.classList.add('bubble');
        bubbleEle.classList.add('cornered');
        bubbleEle.classList.add(position === 'right' ? 'right' : 'left');

        messageEle.classList.add('message');

        messageEle.innerHTML = message;
        
        bubbleEle.appendChild(messageEle);
        
        return{
            bubble: bubbleEle,
            message: messageEle,
        }

    }
    function getFontSize()
    {
        return parseInt(getComputedStyle(document.body).getPropertyValue('font-size'));
    }
    function pxToRem(elePx)
    {
        var eleRem = elePx/getFontSize() + 'rem';

        return eleRem;
    }
    function getDimensions(elements)
    {
        var dimensions={
            loading:{
                w: '4rem',
                h: '2.25rem'
            },
            bubble:{
                w: pxToRem(elements.bubble.offsetWidth+4),
                h: pxToRem(elements.bubble.offsetHeight)
            },
            message:{
                w: pxToRem(elements.message.offsetWidth+4),
                h: pxToRem(elements.message.offsetHeight)
            }
        }
        return dimensions;
    }
    function sendMessage(message,position)
    {
        var elements = createBubbleElements(message,position);
        messagesEle.appendChild(elements.bubble);
        messagesEle.appendChild(document.createElement('br'));
        var dimensions = getDimensions(elements);
        elements.bubble.style.width = dimensions.bubble.w;
        elements.bubble.style.height = dimensions.bubble.h;
        elements.message.style.width = dimensions.message.w;
        elements.message.style.height = dimensions.message.h;
        elements.bubble.style.opacity = 1;

    }
    function sendMessages()
    {
        var message = messages[msgInd];
        if(!message) return;
        sendMessage(message);
        msgInd++;
        sendMessages();
    }

    sendMessages();
}