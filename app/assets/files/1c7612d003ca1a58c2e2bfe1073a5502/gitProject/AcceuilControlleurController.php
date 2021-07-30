<?php

namespace App\Controller\Admin;

use DateTime;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\Mailer\Exception\TransportExceptionInterface;
use Symfony\Component\Mailer\MailerInterface;

use Symfony\Component\Mime\Address;
use Symfony\Component\Mime\Email;
use Symfony\Component\Routing\Annotation\Route;

class AcceuilControlleurController extends AbstractController
{
    /**
     * @Route("/", name="acceuil_controlleur")
     * @Route("/acceuil",name ="acceuil_controlleur2")
     */
    public function index(){
        return $this->render('admin/Acceuil.html.twig');
    }

    /**
     * @Route("/FirstGame", name="FirstGame_controlleur")
     */
    public function goToGame(){
        return $this->render('admin/FirstGame.html.twig');
    }

}
