let {helpToStringForNotification} = require("../helpers/helper");
module.exports.notificationMessages = (data) => {
    console.log("data------>", data)
    let sendRequestTitle = (data.language === "es") ? `Hola! ${data.firstName + " " + data.lastName} necesita ayuda` : `Hi! ${data.firstName + " " + data.lastName} needs help`
    let sendRequestTitleEn = `Hi! ${data.firstName + " " + data.lastName} needs help`;
    let sendRequestTitleSp = `Hola! ${data.firstName + " " + data.lastName} necesita ayuda`;

    let sendRequestBody = (data.language === "es") ? `Tu amigo ${data.firstName + " " + data.lastName}  te necesita para ${helpToStringForNotification(data.help, data.language)} con ${data.notificationMsg}` : `Your friend ${data.firstName + " " + data.lastName} needs you ${helpToStringForNotification(data.help, data.language)} with ${data.notificationMsg}`
    let sendRequestBodyEn = `Your friend ${data.firstName + " " + data.lastName} needs you for ${helpToStringForNotification(data.help, "en")} with ${data.notificationMsg}`;
    let sendRequestBodySp = `Tu amigo ${data.firstName + " " + data.lastName}  te necesita para ${helpToStringForNotification(data.help, "es")} con ${data.notificationMsg}`;

    let acceptOfferTitle = (data.language === "es") ? `Ya puedes ayudar a ${data.firstName + " " + data.lastName}` : `Ready to help ${data.firstName + " " + data.lastName}`
    let acceptOfferTitleEn = `Ready to help ${data.firstName + " " + data.lastName}`;
    let acceptOfferTitleSp = `Ya puedes ayudar a ${data.firstName + " " + data.lastName}`;

    let acceptOfferBody = (data.language === "es") ? `Sí! ${data.firstName + " " + data.lastName} te eligió para ayudar con ${helpToStringForNotification(data.help, data.language)} with ${data.notificationMsg}` : `Yeah, ${data.firstName + " " + data.lastName} chose you to help with ${helpToStringForNotification(data.help, data.language)} with ${data.notificationMsg}`
    let acceptOfferBodyEn = `Yeah, ${data.firstName + " " + data.lastName} chose you to help with ${helpToStringForNotification(data.help, "en")} ${data.notificationMsg}`;
    let acceptOfferBodySp = `Sí! ${data.firstName + " " + data.lastName} te eligió para ayudar con ${helpToStringForNotification(data.help, "es")} ${data.notificationMsg}`;

    let declineOfferTitle = (data.language === "es") ? `¡Gracias por ofrecer ayuda!` : `Thanks for offering help`
    let declineOfferTitleEn = `Thanks for offering help`;
    let declineOfferTitleSp = `¡Gracias por ofrecer ayuda!`;

    let declineOfferBody = (data.language === "es") ? `Hoy ${data.firstName + " " + data.lastName} recibe ayuda de otro amigo` : `Today ${data.firstName + " " + data.lastName} gets help from another friend`
    let declineOfferBodyEn = `Today ${data.firstName + " " + data.lastName} gets help from another friend`;
    let declineOfferBodySp = `Hoy ${data.firstName + " " + data.lastName} recibe ayuda de otro amigo`;

    let acceptRequestTitle = (data.language === "es") ? `¡Vamos! ${data.firstName + " " + data.lastName} quiere ayudar` : `Woho! ${data.firstName + " " + data.lastName} wants to help`
    let acceptRequestTitleEn = `Woho! ${data.firstName + " " + data.lastName} wants to help`;
    let acceptRequestTitleSp = `¡Vamos! ${data.firstName + " " + data.lastName} quiere ayudar`;

    let acceptRequestBody = (data.language === "es") ? `Tu amigo ${data.firstName + " " + data.lastName} quiere ayudarte para ${helpToStringForNotification(data.help, data.language)} con ${data.notificationMsg}` : `Your friend ${data.firstName + " " + data.lastName} wants to help you for ${helpToStringForNotification(data.help, data.language)} with ${data.notificationMsg}`
    let acceptRequestBodyEn = `Your friend ${data.firstName + " " + data.lastName} wants to help you for ${helpToStringForNotification(data.help, "en")} with ${data.notificationMsg}`;
    let acceptRequestBodySp = `Tu amigo ${data.firstName + " " + data.lastName} quiere ayudarte para ${helpToStringForNotification(data.help, "es")} con ${data.notificationMsg}`;

    let declineRequestTitle = (data.language === "es") ? `¡Ups! ${data.firstName + " " + data.lastName} no puede ayudarte` : `Oops, ${data.firstName + " " + data.lastName} can't help you`
    let declineRequestTitleEn = `Oops,  ${data.firstName + " " + data.lastName} can't help you`;
    let declineRequestTitleSp = `¡Ups! ${data.firstName + " " + data.lastName} no puede ayudarte`;

    let declineRequestBody = (data.language === "es") ? `Tu amigo ${data.firstName + " " + data.lastName} dice que no puede ayudarte para ${helpToStringForNotification(data.help, data.language)} con ${data.notificationMsg}` : `Your friend ${data.firstName + " " + data.lastName} says can't help with ${helpToStringForNotification(data.help, data.language)} for ${data.notificationMsg}`
    let declineRequestBodyEn = `Your friend ${data.firstName + " " + data.lastName} says can't help with ${helpToStringForNotification(data.help, "en")} for ${data.notificationMsg}`;
    let declineRequestBodySp = `Tu amigo ${data.firstName + " " + data.lastName} dice que no puede ayudarte para ${helpToStringForNotification(data.help, "es")} con ${data.notificationMsg}`;

    // --------  Pet request response messages --------------------
    let pickUpTheirPet = (data.language === "es") ? `recoger su mascota` : `Pick up their pet`;
    let pickUpTheirPetEn = `Pick up their pet`;
    let pickUpTheirPetSp = `recoger su mascota`;

    let yourFriendBringsThePet = (data.language === "es") ? `Tu amigo trae la mascota` : `Your friend brings the pet`;
    let yourFriendBringsThePetEn = `Your friend brings the pet`;
    let yourFriendBringsThePetSp = `Tu amigo trae la mascota`;

    let yourFriendWillPickUpYourPet = (data.language === "es") ? `Tu amigo recogerá a tu mascota` : `Your friend will pick up your pet`;
    let yourFriendWillPickUpYourPetEn = `Your friend will pick up your pet`;
    let yourFriendWillPickUpYourPetSp = `Tu amigo recogerá a tu mascota`;

    let iWillBringMyPet = (data.language === "es") ? `traeré a mi mascota` : `I will bring my pet`;
    let iWillBringMyPetEn = `I will bring my pet`;
    let iWillBringMyPetSp = `traeré a mi mascota`;

    let requestStartTitle = (data.language === "es") ? `${data.firstName + " " + data.lastName} ha empezado a ayudarte` : `${data.firstName + " " + data.lastName} has started helping you`
    let requestStartTitleEn = `${data.firstName + " " + data.lastName} has started helping you`;
    let requestStartTitleSp = `${data.firstName + " " + data.lastName} ha empezado a ayudarte`;

    let requestStartBody = (data.language === "es") ? `Ahora ${data.notificationMsg} está siendo cuidado por ${data.firstName + " " + data.lastName}` : `Now ${data.notificationMsg} is being cared for by ${data.firstName + " " + data.lastName}`;
    let requestStartBodyEn = `Now ${data.notificationMsg} is being cared for by ${data.firstName + " " + data.lastName}`;
    let requestStartBodySp = `Ahora ${data.notificationMsg} está siendo cuidado por ${data.firstName + " " + data.lastName}`;

    let requestEndTitle = (data.language === "es") ? `${data.firstName + " " + data.lastName} ha terminado la sesión` : `${data.firstName + " " + data.lastName} has ended the session now`
    let requestEndTitleEn = `${data.firstName + " " + data.lastName} has ended the session now`;
    let requestEndTitleSp = `${data.firstName + " " + data.lastName} ha terminado la sesión`;

    let requestEndBody = (data.language === "es") ? `${data.notificationMsg} ha terminado la sesión` : `Is ${data.notificationMsg} with you?`;
    let requestEndBodyEn = `Is ${data.notificationMsg} with you?`;
    let requestEndBodySp = `¿Está ${data.notificationMsg} contigo?`;


    let requestCancelledTitle = (data.language === "es") ? `${data.firstName + " " + data.lastName} ha cancelado la sesión` : `${data.firstName + " " + data.lastName} has canceled the session now`
    let requestCancelledTitleEn = `${data.firstName + " " + data.lastName} has canceled the session now`;
    let requestCancelledTitleSp = `${data.firstName + " " + data.lastName} ha cancelado la sesión`;

    let requestCancelledBody = (data.language === "es") ? `¿Quieres buscar ayuda de nuevo?` : `Do you want to find help again?`;
    let requestCancelledBodyEn = `Do you want to find help again?`;
    let requestCancelledBodySp = `¿Quieres buscar ayuda de nuevo?`;

    let actionTitleSeeDetails = (data.language === "es") ? `Ver detalles` : `See details`;
    let actionTitleSeeDetailsEn = `See details`;
    let actionTitleSeeDetailsSp = `Ver detalles`;

    let actionTitleLetsDoIt = (data.language === "es") ? `¡Hagámoslo!` : `Let's do it`;
    let actionTitleLetsDoItEn = `Let's do it`;
    let actionTitleLetsDoItSp = `¡Hagámoslo!`;


    let actionTitleSeeMessage = (data.language === "es") ? `Ver mensaje` : `See message`;
    let actionTitleSeeMessageEn = `See message`;
    let actionTitleSeeMessageSp = `Ver mensaje`;

    let actionTitleSeeMore = (data.language === "es") ? `Ver más` : `See more`;
    let actionTitleSeeMoreEn = `See more`;
    let actionTitleSeeMoreSp = `Ver más`;

    // Friend request list messages

    let youOfferedHelp = (data.language === "es") ? `Ofreciste ayuda` : `You offered help`;
    let selectedForHelp = (data.language === "es") ? `Seleccionado para recibir ayuda` : `Selected for help`;
    let youHelped = (data.language === "es") ? `ayudaste a` : `You helped`;
    let youSkipped = (data.language === "es") ? `te saltaste` : `You skipped`;
    let sessionExpired = (data.language === "es") ? `solicitud caducada` : `Request expired`;

    return {
        sendRequestTitle,
        sendRequestTitleEn,
        sendRequestTitleSp,
        sendRequestBody,
        sendRequestBodyEn,
        sendRequestBodySp,
        acceptOfferTitle,
        acceptOfferTitleEn,
        acceptOfferTitleSp,
        acceptOfferBody,
        acceptOfferBodyEn,
        acceptOfferBodySp,
        declineOfferTitle,
        declineOfferTitleEn,
        declineOfferTitleSp,
        declineOfferBody,
        declineOfferBodyEn,
        declineOfferBodySp,
        acceptRequestTitle,
        acceptRequestTitleEn,
        acceptRequestTitleSp,
        acceptRequestBody,
        acceptRequestBodyEn,
        acceptRequestBodySp,
        declineRequestTitle,
        declineRequestTitleEn,
        declineRequestTitleSp,
        declineRequestBody,
        declineRequestBodyEn,
        declineRequestBodySp,
        pickUpTheirPet,
        pickUpTheirPetEn,
        pickUpTheirPetSp,
        yourFriendBringsThePet,
        yourFriendBringsThePetEn,
        yourFriendBringsThePetSp,
        yourFriendWillPickUpYourPet,
        yourFriendWillPickUpYourPetEn,
        yourFriendWillPickUpYourPetSp,
        iWillBringMyPet,
        iWillBringMyPetEn,
        iWillBringMyPetSp,
        requestEndTitle,
        requestEndTitleEn,
        requestEndTitleSp,
        requestEndBody,
        requestEndBodyEn,
        requestEndBodySp,
        requestCancelledTitle,
        requestCancelledTitleEn,
        requestCancelledTitleSp,
        requestCancelledBody,
        requestCancelledBodyEn,
        requestCancelledBodySp,
        actionTitleSeeDetails,
        actionTitleSeeDetailsEn,
        actionTitleSeeDetailsSp,
        actionTitleLetsDoIt,
        actionTitleLetsDoItEn,
        actionTitleLetsDoItSp,
        actionTitleSeeMessage,
        actionTitleSeeMessageEn,
        actionTitleSeeMessageSp,
        actionTitleSeeMore,
        actionTitleSeeMoreEn,
        actionTitleSeeMoreSp,
        requestStartTitle,
        requestStartTitleEn,
        requestStartTitleSp,
        requestStartBody,
        requestStartBodyEn,
        requestStartBodySp,
        youOfferedHelp,
        selectedForHelp,
        youHelped,
        youSkipped,
        sessionExpired
    }
}
