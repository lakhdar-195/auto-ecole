<?php

namespace App\Controller;

use App\Entity\Question;
use App\Form\QuestionType;
use App\Services\SortArray;
use App\Repository\QuestionRepository;
use Doctrine\ORM\EntityManagerInterface;
use Knp\Component\Pager\PaginatorInterface;
use Symfony\Component\Filesystem\Filesystem;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Nzo\UrlEncryptorBundle\Annotations\ParamDecryptor;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\File\Exception\FileException;

class QuestionController extends AbstractController
{

    private $_em; 

    public function __construct( EntityManagerInterface $em)
    {

        $this->_em = $em;
    }


    


    #[Route('/edit/question/{id}', name: 'app_edit_question')]
    #[ParamDecryptor(['id'])]
    public function editQuestion ($id, Question $question, Request $req, QuestionRepository $qsr, $questionPath): Response 
    {

        $filesystem = new Filesystem();
        $_res = $qsr->findById($id);
       
        $res = $_res[0];
        $__img = $res['img'];


        $form = $this->createForm(QuestionType::class, $question);
        $form->handleRequest($req);

        if($form->isSubmitted() and $form->isValid())
       {

            $img = $form->get('img')->getData();

            if ($img) {

                
                $newFilename = uniqid().'.'.$img->guessExtension();
                

                
                try {

                    $filesystem->remove($questionPath.'/'.$__img);
                    $img->move($questionPath, $newFilename);
                } catch (FileException $e) {
                    
                }

                
                $question->setImg($newFilename);
            
            }else{

                $question->setImg($__img);
            }


            $this->_em->persist($question);
            $this->_em->flush();

            $this->addFlash('info', 'Question editer avec success');

            return $this->redirectToRoute('app_show_question');

       } 


        return $this->render('question/editQuestion.html.twig', [

            'form' => $form,
            'img' => $__img,
        ]);
    }

    #[Route('/show/question', name: 'app_show_question')]
    public function showQuestion (QuestionRepository $qsr, Request $request, PaginatorInterface $paginator): Response 
    {

        $qs = $qsr->findByResponse();
        $sort = new SortArray($qs);
        $questions= $sort->pushArray();

        // dd($questions);
        
        $pagination = $paginator->paginate(
            $questions, /* query NOT result */
            $request->query->getInt('page', 1), /*page number*/
            10 /*limit per page*/
        );

        return $this->render('question/showQuestion.html.twig',[

            'questions' => $pagination,
        ]);
    }
}
