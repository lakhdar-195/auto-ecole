<?php

namespace App\Controller;

use App\Entity\Question;
use App\Entity\Responses;
use App\Form\QuestionType;
use App\Services\SortArray;
use App\Services\SortQuestion;
use App\Repository\QuestionRepository;
use Doctrine\ORM\EntityManagerInterface;
use Knp\Component\Pager\PaginatorInterface;
use Symfony\Component\Filesystem\Filesystem;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
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

            $qs = $qsr->findOneById($id);

            $sort = new SortArray($qs);
            $question = $sort->pushArray();

        return $this->render('question/editQuestion.html.twig', [

           'question' => $question
        ]);
    }

    #[Route('/update/question', name: 'app_update_question')]
    public function updateQuestion (Request $request, EntityManagerInterface $entityManager, $questionPath, QuestionRepository $qsr): JsonResponse
    {

    
        $filesystem = new Filesystem();
        //data of question
        $id = $request->request->get('id');
        $file = $request->files->get('img');
        $type = $request->request->get('type');
        $question = $request->request->get('question');

        //find image

        $repo = $qsr->findById($id);
        $result = $repo[0];
        $_img = $result['img'];


        // data of first response
        $idResp_1 = $request->request->get('idResp_1');
        $response_1 = $request->request->get('response_1');
        $dataFirst = $request->request->get('dataFirst');

        // data of second response
        $idResp_2 = $request->request->get('idResp_2');
        $response_2 = $request->request->get('response_2');
        $dataSecond = $request->request->get('dataSecond');

        // data of third response
        $idResp_3 = $request->request->get('idResp_3');
        $response_3 = $request->request->get('response_3');
        $dataThird = $request->request->get('dataThird');

        // set data for question
        $questionEntity = $entityManager->getRepository(Question::class)->find($id);
        
        if ($file) {
            // give to file new name
            $fileName = uniqid() . '.' . $file->guessExtension();

            try {

                $filesystem->remove($questionPath.'/'.$_img);
                 $file->move($questionPath, $fileName);
                 $questionEntity->setImg($fileName);
                 $this->_em->persist($questionEntity);
                 $this->_em->flush();

            } catch (\Exception $e) {
                return new JsonResponse(['error' => 'Erreur lors de l\'upload du fichier'], Response::HTTP_INTERNAL_SERVER_ERROR);
            }
        }


        $questionEntity->setType($type);
        $questionEntity->setQuestion($question);
        $this->_em->persist($questionEntity);
        $this->_em->flush();

        //set data for first response
        $respEn_1 = $entityManager->getRepository(Responses::class)->find($idResp_1);
        $respEn_1->setResponse($response_1);
        if($dataFirst == 'true'){
            $respEn_1->setValid(true);
        }elseif($dataFirst == 'false'){
            $respEn_1->setValid(false);
        }
        $this->_em->persist($respEn_1);
        $this->_em->flush();

        //set data for second response
        $respEn_2 = $entityManager->getRepository(Responses::class)->find($idResp_2);
        $respEn_2->setResponse($response_2);
        if($dataSecond == 'true'){
            $respEn_2->setValid(true);
        }elseif($dataSecond == 'false'){
            $respEn_2->setValid(false);
        }
        $this->_em->persist($respEn_2);
        $this->_em->flush();

        //set data for third response
        $respEn_3 = $entityManager->getRepository(Responses::class)->find($idResp_3);
        $respEn_3->setResponse($response_3);
        if($dataThird == 'true'){
            $respEn_3->setValid(true);
        }elseif($dataThird == 'false'){
            $respEn_3->setValid(false);
        }
        $this->_em->persist($respEn_3);
        $this->_em->flush();
 

        return new JsonResponse(['response' => true], Response::HTTP_OK);
    }

    #[Route('/show/question', name: 'app_show_question')]
    public function showQuestion (QuestionRepository $qsr, Request $request, PaginatorInterface $paginator): Response 
    {

        $qs = $qsr->findByResponse();
        $sort = new SortQuestion($qs);
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
