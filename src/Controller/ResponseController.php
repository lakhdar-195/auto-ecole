<?php

namespace App\Controller;

use App\Entity\Question;
use App\Entity\Responses;
use App\Form\QuestionType;
use App\Repository\QuestionRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\File\Exception\FileException;

class ResponseController extends AbstractController
{


    private $_em; 

    public function __construct( EntityManagerInterface $em)
    {

        $this->_em = $em;
    }

    #[Route('/add/response', name: 'app_add_response')]
    public function index(QuestionRepository $qsr): Response
    {

        $questions = $qsr->findByresponse();


        return $this->render('response/addResponse.html.twig', [
            'questions' => $questions,
        ]);
    }


    #[Route('/put/question', name: 'app_put_question', methods: ["POST", "GET"])]
    public function putQuestion(Request $request, $questionPath, QuestionRepository $qsr): JsonResponse
    {

                $qs = new Question ();
                
               // Récupérer les données envoyées
               $type = $request->request->get('type');
               $question = $request->request->get('question');

               $response_1 = $request->request->get('response_1');
               $dataFirst = $request->request->get('dataFirst');

               $response_2 = $request->request->get('response_2');
               $dataSecond = $request->request->get('dataSecond');

               $response_3 = $request->request->get('response_3');
               $dataThird = $request->request->get('dataThird');

               $_resp = [$response_1, $response_2, $response_3];
               $_data = [$dataFirst, $dataSecond, $dataThird];

            //    return new JsonResponse(['error' => $_data[2]], Response::HTTP_OK);
          
            //    dd($dataSecond);
       
               // Récupérer le fichier
               $file = $request->files->get('img');
               $i = 0;
       
               if ($file) {
                   // Déplacer le fichier vers un répertoire sécurisé
                   $fileName = uniqid() . '.' . $file->guessExtension();
       
                   try {
                        $file->move($questionPath, $fileName);

                        $qs->setType($type);
                        $qs->setImg($fileName);
                        $qs->setQuestion($question);
                        $this->_em->persist($qs);
                        $this->_em->flush();

                        for($i = 0; $i < count($_resp); $i++){
                        
                            $response = new Responses();
                            $response->setQuestion($qs);
                            $response->setResponse($_resp[$i]);
                            if($_data[$i] == 'true'){

                                $response->setValid(true);
                                
                            }else if($_data[$i] == 'false'){

                                $response->setValid(false);
                            }
                            
                            $this->_em->persist($response);
                            $this->_em->flush();
                        }

       
                       return new JsonResponse([
                            'response' => true,
                           'message' => 'Fichier uploadé avec succès',
                           'filePath' => $questionPath . $fileName,
                           'type' => $type,
                           'question' => $question,
                       ], Response::HTTP_OK);
                   } catch (\Exception $e) {
                       return new JsonResponse(['error' => 'Erreur lors de l\'upload du fichier'], Response::HTTP_INTERNAL_SERVER_ERROR);
                   }
               }
       
               return new JsonResponse(['error' => 'Aucun fichier envoyé'], Response::HTTP_BAD_REQUEST);
          

        
    }


}
