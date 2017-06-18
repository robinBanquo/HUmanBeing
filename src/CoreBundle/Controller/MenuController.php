<?php

namespace CoreBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class MenuController extends Controller
{
    public function generalMenuAction()
    {
        $currentUser=$this->getUser();
        $basicSubMenu = array(
            ['path'=>'work_in_progress','title'=>'lien vers telle fonctionnalité'],
            ['path'=>'work_in_progress','title'=>'lien vers telle fonctionnalité'],
            ['path'=>'work_in_progress','title'=>'lien vers telle fonctionnalité']
        );
        $userSubMenu = $basicSubMenu;
        $userSubMenu[] = ['path'=>'logout','title'=>'déconnexion'];
        $projectSubmenu = array();
        foreach ($currentUser->getUserProjects() as $userProjects){
            $project =$userProjects->getProject();
            $projectSubmenu[] = [
                'path'=>'project_mainpage',
                'id'=>$project->getId(),
                'title'=>$project->getName()
            ];
        }
        $generalMenu = array(
            'agenda' => array(
                'title'=> 'Agenda',
                'iconUrl'=> 'img/icon/agenda_icon.png',
                'subMenu' => $basicSubMenu
            ),
            'user' => array(
                'title'=> $currentUser->getUsername(),
                'iconUrl'=> 'img/icon/user_icon.png',
                'subMenu' => $userSubMenu
            ),
            'messenger' => array(
                'title'=> 'messagerie',
                'iconUrl'=> 'img/icon/message_icon.png',
                'subMenu' => $basicSubMenu
            ),
            'project' => array(
                'title'=> 'Mes projets',
                'iconUrl'=> 'img/icon/project_icon.png',
                'subMenu' => $projectSubmenu
            ),
            'sharing' => array(
                'title'=> 'Partage',
                'iconUrl'=> 'img/icon/sharing_icon.png',
                'subMenu' => $basicSubMenu
            ),
            'moderation' => array(
                'title'=> 'Modération',
                'iconUrl'=> 'img/icon/message_icon.png',
                'subMenu' => $basicSubMenu
            )
        );
        dump($generalMenu);
        return $this->render('CoreBundle:Menu:generalMenu.html.twig', array(
            'generalMenu' => $generalMenu
        ));
    }
}