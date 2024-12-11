<?php

namespace App\Form;

use App\Entity\Question;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Validator\Constraints\File;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\FileType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;

class QuestionType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('img', FileType::class, [


                'attr' =>[

                    'onChange'=> 'loadFile(event)',
                ],


                'required' =>false,
                'data_class' => null,
                'constraints' => [
                    new File([
                        'maxSize' => '4m',
                        'mimeTypes' => [
                            'image/jpeg',
                            'image/png',
                        ],
                        'mimeTypesMessage' => "Merci d'ajouter une image format JPG, JPEG, PNG",
                    ])
                ],
            ])
            ->add('question', TextType::class, [

                'label' => false
            ])

            ->add('type', ChoiceType::class, [

                'label' => false,
                'choices' => [
                    
                        'Les règles de circulation' => 'Les règles de circulation',
                        'La sécurité routière' => 'La sécurité routière',
                        'La mécanique et l’entretien' => 'La mécanique et l’entretien',
                        'Les situations pratiques' => 'Les situations pratiques',
                        'Les règles spécifiques' => 'Les règles spécifiques',
                        'Le comportement du conducteur' => 'Le comportement du conducteur',
                     ],
                ],

                
            )
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Question::class,
        ]);
    }
}
