<?php

namespace App\Repository;

use App\Entity\Question;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Question>
 */
class QuestionRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Question::class);
    }

    //    /**
    //     * @return Question[] Returns an array of Question objects
    //     */
    //    public function findByExampleField($value): array
    //    {
    //        return $this->createQueryBuilder('q')
    //            ->andWhere('q.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->orderBy('q.id', 'ASC')
    //            ->setMaxResults(10)
    //            ->getQuery()
    //            ->getResult()
    //        ;
    //    }

    public function findById($value): ?Array
    {
        return $this->createQueryBuilder('q')
            ->andWhere('q.id = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getArrayResult()
        ;
    }


    public function findByResponse(): ?Array
    {
        return $this->createQueryBuilder('q')
            ->addSelect('q.id')
            ->addSelect('q.img')
            ->addSelect('q.type')
            ->addSelect('q.question')
            ->innerJoin('q.responses', 'r')
            ->addSelect('r.response')
            ->addSelect('r.isValid')
            ->getQuery()
            ->getArrayResult()
        ;
    }

    public function findOneById($value): ?Array
   {
       return $this->createQueryBuilder('q')
           ->andWhere('q.id = :val')
           ->setParameter('val', $value)
           ->addSelect('q.id')
           ->addSelect('q.img')
           ->addSelect('q.type')
           ->addSelect('q.question')
           ->innerJoin('q.responses', 'r')
           ->addSelect('r.response')
           ->addSelect('r.id AS idResp')
           ->addSelect('r.isValid')
           ->getQuery()
           ->getArrayResult()
       ;
   }


   public function findByType($value): ?Array
  {
      return $this->createQueryBuilder('q')
          ->andWhere('q.type = :val')
          ->setParameter('val', $value)
          ->addSelect('q.id')
          ->addSelect('q.img')
          ->addSelect('q.type')
          ->addSelect('q.question')
          ->innerJoin('q.responses', 'r')
          ->addSelect('r.response')
          ->addSelect('r.id AS idResp')
          ->addSelect('r.isValid')
          ->getQuery()
          ->getArrayResult()
      ;
  }
}
