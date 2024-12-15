<?php

namespace App\Controller;

use App\Services\Randq;
use App\Services\SortArray;
use App\Repository\QuestionRepository;
use PhpParser\NodeVisitor\NameResolver;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class TestController extends AbstractController
{
    #[Route('/test', name: 'app_test')]
    public function index(QuestionRepository $qsr): Response
    {
        $theme_1 = "Les règles de circulation";
        $theme_2 = "La sécurité routière";
        $theme_3 = "La mécanique et l’entretien";
        $theme_4 = "Les situations pratiques";
        $theme_5 = "Les règles spécifiques";
        $theme_6 = "Le comportement du conducteur";

        $res_1 = $qsr->findByType($theme_1);
        $res_2 = $qsr->findByType($theme_2);
        $res_3 = $qsr->findByType($theme_3);
        $res_4 = $qsr->findByType($theme_4);
        $res_5 = $qsr->findByType($theme_5);
        $res_6 = $qsr->findByType($theme_6);

        $sort_1 = new SortArray($res_1);
        $_res_1 = $sort_1->pushArray();
        
        $sort_2 = new SortArray($res_2);
        $_res_2 = $sort_2->pushArray();

        $sort_3 = new SortArray($res_3);
        $_res_3 = $sort_3->pushArray();

        $sort_4 = new SortArray($res_4);
        $_res_4 = $sort_4->pushArray();

        $sort_5 = new SortArray($res_5);
        $_res_5 = $sort_5->pushArray();

        $sort_6 = new SortArray($res_6);
        $_res_6 = $sort_6->pushArray();


        $tab = [$_res_1, $_res_2, $_res_3, $_res_4, $_res_5, $_res_6];

        $rd = new Randq();
        $res = $rd->index($tab);



        return $this->render('test/index.html.twig', [
            'res'=> $res,
        ]);
    }

    #[Route('/result', name:'app_result')]
    public function result():Response
    {


        return $this->render('test/result.html.twig');
    }
}
