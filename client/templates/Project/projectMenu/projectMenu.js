//import User from '/imports/classes/Project';

/********************************
 * ensemble des helpers permettant de renvoyer des
 * valeurs particulières au menu contextuel
 */
Template.projectMenu.helpers({
    //titre affiché
    title: function () {
        return Template.instance().data.project.name
    },
    //nom de la page pour pouvoir utiliser le "is active path"
    contextualHomepage : function () {
        return 'projectMainPage'
    },
    //couleur du sous menu
    color: function () {
        return 'orange'
    },
    //image a faire afficher
    imgUrl: function () {
        let url = Template.instance().data.project.publicInfo.imgUrl;
        //si c'est pas l'image par défault, on fais une requete de miniature vers l'api d'imgur
        if (url !== "/images/icon/project_icon.png") {
            return Imgur.toThumbnail(url, Imgur.SMALL_THUMBNAIL)
        } else {
            return url
        }
    },
    //icone a afficher apres le nom de projet, indiquant le role de l'utilisateur
    icon: function () {
        let project= Template.instance().data;
        let icon = "";
        let tooltip = "";
        //on boucle sur les projets de l'utilisateur courant
        Meteor.user().profile.projects.forEach(function (userProject) {
            //si il est dedans

            if (userProject.project_id === project.project._id ) {

                //et que le tableau des roles coontiens admin
                if (_.contains(userProject.roles, "admin")) {
                    //on choisi l'icone correspondante et on passe l'info a une réactive var
                    icon = 'verified_user';
                    Template.instance().tooltip.set("vous etes administrateur de ce projet");
                //si il est membre
                } else if (_.contains(userProject.roles, "member")) {
                    //on choisi l'icone correspondante et on passe l'info a une réactive var
                    icon = 'perm_identity';
                    Template.instance().tooltip.set("vous etes membre de ce projet");
                }
            }
        });
        return icon
    },
    //on viens renvoyer a la réactive var définie au dessus
    tooltip: function () {
        return Template.instance().tooltip.get()
    },
    //on transmet le path  vers lequel ça doir renvoyer
    path: function () {
        return Router.path("projectMainPage", {_id: Template.instance().data.project._id})
    },
    //tableau des elements a renvoyer a la barre de navigation
    navBarItems: function () {
        let projectId = Template.instance().data.project._id;
        let navBarItems = [
            {
                title: "Gestion",
                color : "orange",
                routeName : "adminProject",
                path: function () {
                    return Router.path("adminProject", {_id: projectId})
                }
            },
            {
                title: "Organisation",
                color: "orange",
                routeName : 'orgProject',
                path: function () {
                    return Router.path('orgProject', {_id: projectId})
                }
            }

        ];
        return navBarItems
    }


});

Template.projectMenu.events({
    //add your events here

});

Template.projectMenu.onCreated(function () {
    this.tooltip = new ReactiveVar();

});

Template.projectMenu.onRendered(function () {
    //add your statement here
});

Template.projectMenu.onDestroyed(function () {
    //add your statement here
});



