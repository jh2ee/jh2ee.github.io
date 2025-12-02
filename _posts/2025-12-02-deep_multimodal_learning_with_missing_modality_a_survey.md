---
layout: post
date: 2025-12-02
title: "[논문 리뷰] Deep Multimodal Learning with Missing Modality: A Survey"
tags: [MLMM, Review, Arxiv]
categories: [Paper Review]
---
- Multimodal train/test 에서 modality missing은 성능에 부정적
- missing modality를 처리하도록 설계된 multimodal learning은 model이 robust하게 작동할 수 있게 함

---


---



## Introduction


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/b5bb2d97-9e26-4130-a67d-0876cf0f895d/ee07ef86-39e0-4728-b9b3-b93b966d855d.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667ISKCI4U%2F20251202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251202T210108Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFUaCXVzLXdlc3QtMiJGMEQCIBQhPYWcBs5d6%2Bh4PM3GPuehPFKhxS5zRabkCcyUOx7zAiANxWsOXd%2FoVvRboe0L2PFPw8SY2poKyRKYp9aQBHZPuyr%2FAwgeEAAaDDYzNzQyMzE4MzgwNSIMPVarGR9p8UFGJzm6KtwDOPv83AVqocI1ZQLzZCrm8nFSBTloV0N6ktCfK1SVwRqfUbhaul7vbxBppwi4YygYuXxIKHox9bmUbblfRzX2HZ7GBgGsig4nMQ8GcwA3feF%2FDk3m2EPyJLFQKovBmhPzM4HT%2BQ%2BlxQ%2FafDq2uFd6kC6slPoGhB0ped44jLlgk7t1oeXX8nnxB1JxA2DTafohOvMDRz8c8bBirfKWZwSR1KXJ76MZpGfjV59vyJddT2pVXNYdcHLsia6wcDkzcaSuvspsbOIOIotcb%2BHZ%2FbZ1acEMxBZkl7CAjV6VoxXmBcbWde%2BxXGy0lEr4Q3s2zBf3DXTSI87OgsA2FBxJ8wRLjvLk%2Bbe7i9zqpvzlHZfr4arzL5DfbXwuT7J1bRIIDuBwBu0voQ%2FhpN5r3KMPN7Tsp6Ebj2dyZRTmUikiALprZUblSvFlSV%2BW%2BwUdKTn4BvDDBfFHpG%2FPR62FDX%2BZo3g7iRupPvzxXYgfAeB9Hg2WR3Zbkt1Ivq2EKtHzaPUfCDME%2F689H%2FFMZdQHIO0imG5uP5WMuENdeAQgha%2BnP8Paeq%2BekwjpSqDDsVe%2FD48p4IZQLSAYFDkiaSiCALosxo%2B%2Bqro4fMXRqNwF2NImovzKcyJ%2FuAwlfZpeubEDQ3Mwk5q9yQY6pgFGmys012j2BA8OUTpiEAOfgGyulQEhWC7ucCgeRf8m1fBK3w7%2FTEL2Da7dDSbxvGYioUNEMRkau%2B%2F%2Bv8usk6Wz49Ou7JwUFSOX8yrgAnkbgGtV1W9zLpv%2Ft02dkPSzh9jAOMvpXmWSRkMmEQbOyvCbB2sLf6zugsseyO9QVMeH4OCNBphcle84oKJLOBVdnnqY%2BLUwWSeE7etVu2AnGYTYMgWw0e3e&X-Amz-Signature=ce96735a9a47eb48536aa4e376e116d165defae6a4afc0e31e807b7b1710548c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/b5bb2d97-9e26-4130-a67d-0876cf0f895d/ee07ef86-39e0-4728-b9b3-b93b966d855d.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667ISKCI4U%2F20251202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251202T210108Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFUaCXVzLXdlc3QtMiJGMEQCIBQhPYWcBs5d6%2Bh4PM3GPuehPFKhxS5zRabkCcyUOx7zAiANxWsOXd%2FoVvRboe0L2PFPw8SY2poKyRKYp9aQBHZPuyr%2FAwgeEAAaDDYzNzQyMzE4MzgwNSIMPVarGR9p8UFGJzm6KtwDOPv83AVqocI1ZQLzZCrm8nFSBTloV0N6ktCfK1SVwRqfUbhaul7vbxBppwi4YygYuXxIKHox9bmUbblfRzX2HZ7GBgGsig4nMQ8GcwA3feF%2FDk3m2EPyJLFQKovBmhPzM4HT%2BQ%2BlxQ%2FafDq2uFd6kC6slPoGhB0ped44jLlgk7t1oeXX8nnxB1JxA2DTafohOvMDRz8c8bBirfKWZwSR1KXJ76MZpGfjV59vyJddT2pVXNYdcHLsia6wcDkzcaSuvspsbOIOIotcb%2BHZ%2FbZ1acEMxBZkl7CAjV6VoxXmBcbWde%2BxXGy0lEr4Q3s2zBf3DXTSI87OgsA2FBxJ8wRLjvLk%2Bbe7i9zqpvzlHZfr4arzL5DfbXwuT7J1bRIIDuBwBu0voQ%2FhpN5r3KMPN7Tsp6Ebj2dyZRTmUikiALprZUblSvFlSV%2BW%2BwUdKTn4BvDDBfFHpG%2FPR62FDX%2BZo3g7iRupPvzxXYgfAeB9Hg2WR3Zbkt1Ivq2EKtHzaPUfCDME%2F689H%2FFMZdQHIO0imG5uP5WMuENdeAQgha%2BnP8Paeq%2BekwjpSqDDsVe%2FD48p4IZQLSAYFDkiaSiCALosxo%2B%2Bqro4fMXRqNwF2NImovzKcyJ%2FuAwlfZpeubEDQ3Mwk5q9yQY6pgFGmys012j2BA8OUTpiEAOfgGyulQEhWC7ucCgeRf8m1fBK3w7%2FTEL2Da7dDSbxvGYioUNEMRkau%2B%2F%2Bv8usk6Wz49Ou7JwUFSOX8yrgAnkbgGtV1W9zLpv%2Ft02dkPSzh9jAOMvpXmWSRkMmEQbOyvCbB2sLf6zugsseyO9QVMeH4OCNBphcle84oKJLOBVdnnqY%2BLUwWSeE7etVu2AnGYTYMgWw0e3e&X-Amz-Signature=ce96735a9a47eb48536aa4e376e116d165defae6a4afc0e31e807b7b1710548c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- Multimodal은 단일 modality가 감지하지 못하는 복잡한 패턴과 관계 밝힘
- 그러나 Multimodal system은 modality missing 문제에 직면하는 경우 많음 → 관심 커짐
- Missing modality가 발생하는 sample 제거는 단순하나 정보가 낭비되는 문제가 있음

_→ Missing modality에도 robust하게 작동하는 system 개발이 중요_



### Definition


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/3cf0d1ef-3cd1-433d-ace9-502a2061d49b/8bd66c4f-be6a-4ce6-963e-a632a4f5176a.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667OF2SL2E%2F20251202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251202T210108Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFUaCXVzLXdlc3QtMiJIMEYCIQDW1OJjBhT9a76NNGIn52qAn0Inq4BViUF0qmvKFeLtFAIhAPQTapYTdjjO2TL3GHD4B%2FP0ybt%2FpXN624Q3CHmGrUh8Kv8DCB4QABoMNjM3NDIzMTgzODA1Igzvs9%2BFeV%2BFM8kDOkwq3AOqZi5haNyJRubwfcUuSAbFEJyKybw4frT8jY%2FF7s11um9JT6%2BoIPROxi6N3XzRPuN7XJrc0I5enSsR3DuItyMhVuBOEWAxsPrQfQUCc4koZFG5%2BmMooj3gVrRIiBkmybiYqQNUgDIU3SbGHvLrua6caN5pXpRLl%2Fw78j67vVbNLB7eCC16qLCTgnkyPwfdf25m7xJj3cM85jBFkrZJq1%2BNh%2BFz8MfwDPJ0YznQcc4xvVdKPE4UEJEV35pLjyGS%2BCvXuZagTognRzJIJPTxdFJ5VNow7CUFWOSilqBnqifBW1MZkx3d0x%2BzZU6mfjcIg7ljJCURKDwSccg0UbOxEKkdMdxr8jb09YhfqG6UloRzsOQG3kWprJ%2BMPhPQs4Lb5tQHuXiQxAmlYUuUZzjk3tihBI9iYUiiApbh1RPrIF62JMhYzFcc7wSM1YJpi6xPJI4JZiH2Uq2QpIKSnhhUinv7RPlgp8TepxMF6gidcs1yzfmVuP%2F4DXcbch%2FQU9bajSKpPaM0gibWBGTEAp9n4kbdyTTAy6ny8hbmohxbRA0ZuV4EDMGyqd%2Fny6YNfg9i9A4oWdA9ocIuwlRRwGpv5Hc8hVI9aWMv84v6lI2Bb3JY1469oEeymY96xTfycDD%2Fmb3JBjqkAahklHMjrxGRKXi%2B4NUdLaYcvnfYIH7fiuZMdrlQqwFEn%2Banu6AtG3soEijqJGj916BF6bqt0Bw5knwHV46hRLNwgxTjyrqy%2BGDbFEk7ZQqrIFI82liWymWu6zb2LDPGDMIjXmKXJJxonGoSx0wQh%2FV1PfvMDf0FI0AFnEuCsOMKxKMC2aGsQcfg2h4RkUAvJHNdsB8dLYBcKL6hZoLE7oxXOkzJ&X-Amz-Signature=dfd00bec1e99ef7a93eea20d2ee7e54f69a99ff7b0f2e5b0c94060c6c565734b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/3cf0d1ef-3cd1-433d-ace9-502a2061d49b/8bd66c4f-be6a-4ce6-963e-a632a4f5176a.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667OF2SL2E%2F20251202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251202T210108Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFUaCXVzLXdlc3QtMiJIMEYCIQDW1OJjBhT9a76NNGIn52qAn0Inq4BViUF0qmvKFeLtFAIhAPQTapYTdjjO2TL3GHD4B%2FP0ybt%2FpXN624Q3CHmGrUh8Kv8DCB4QABoMNjM3NDIzMTgzODA1Igzvs9%2BFeV%2BFM8kDOkwq3AOqZi5haNyJRubwfcUuSAbFEJyKybw4frT8jY%2FF7s11um9JT6%2BoIPROxi6N3XzRPuN7XJrc0I5enSsR3DuItyMhVuBOEWAxsPrQfQUCc4koZFG5%2BmMooj3gVrRIiBkmybiYqQNUgDIU3SbGHvLrua6caN5pXpRLl%2Fw78j67vVbNLB7eCC16qLCTgnkyPwfdf25m7xJj3cM85jBFkrZJq1%2BNh%2BFz8MfwDPJ0YznQcc4xvVdKPE4UEJEV35pLjyGS%2BCvXuZagTognRzJIJPTxdFJ5VNow7CUFWOSilqBnqifBW1MZkx3d0x%2BzZU6mfjcIg7ljJCURKDwSccg0UbOxEKkdMdxr8jb09YhfqG6UloRzsOQG3kWprJ%2BMPhPQs4Lb5tQHuXiQxAmlYUuUZzjk3tihBI9iYUiiApbh1RPrIF62JMhYzFcc7wSM1YJpi6xPJI4JZiH2Uq2QpIKSnhhUinv7RPlgp8TepxMF6gidcs1yzfmVuP%2F4DXcbch%2FQU9bajSKpPaM0gibWBGTEAp9n4kbdyTTAy6ny8hbmohxbRA0ZuV4EDMGyqd%2Fny6YNfg9i9A4oWdA9ocIuwlRRwGpv5Hc8hVI9aWMv84v6lI2Bb3JY1469oEeymY96xTfycDD%2Fmb3JBjqkAahklHMjrxGRKXi%2B4NUdLaYcvnfYIH7fiuZMdrlQqwFEn%2Banu6AtG3soEijqJGj916BF6bqt0Bw5knwHV46hRLNwgxTjyrqy%2BGDbFEk7ZQqrIFI82liWymWu6zb2LDPGDMIjXmKXJJxonGoSx0wQh%2FV1PfvMDf0FI0AFnEuCsOMKxKMC2aGsQcfg2h4RkUAvJHNdsB8dLYBcKL6hZoLE7oxXOkzJ&X-Amz-Signature=dfd00bec1e99ef7a93eea20d2ee7e54f69a99ff7b0f2e5b0c94060c6c565734b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- **MLMM (Multimodal Learning with Missing Modality) **: Modality missing 문제 해결책
- **MLFM (Multimodal Learning with Full Modality)** : MLMM과 대조되는 모든 modality set 사용하는 방법


### Challenge

- train/test 중에 사용 가능한 modality 수에 관계없이 정보를 dynamic하게 handle/fusion
- Full modality sample 성능과 유사 성능 유지


### Domains

- information retrieval
- remote sensing
- robotic vision
- medical diagnosis
- sentiment analysis
- multi-view clustering

---


---



## Method


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/66502228-d1b0-4790-b025-23bcc5f96d18/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TDKB5UHQ%2F20251202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251202T210107Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFUaCXVzLXdlc3QtMiJHMEUCIAsECnNbgo%2FkJ%2FcDrr8phKFlSne6JzmQJELh3MXLouK%2BAiEAzl8Ovtra0oDarI16ivnrqYUFJz55caBHaYqGvybm9Jcq%2FwMIHhAAGgw2Mzc0MjMxODM4MDUiDPP%2FtWBjAQldGSmi9ircA8Cg0P92dpOBTpTfCRGeYr1Bg4OPaQdgplFoDAzkkKIf4jnsSGKlh8O5bPuDCmqFmLpiCmeHHV%2Bffd5wvMyFSLGlPNSuL7ebvpJeM4oOKEjQe3MhrCNOSBWF4MCC%2FOFJLelBEYR3QGJEnuW8T6JfgJeo3TGvejSCZ2fauAs81V1jBJrhGXLky5hJhK62oeNtcyUAFmeKJ7sn8WoSWqhGYiB7J4uM138J5bB%2Bz0WlQYojXhO3EaejgLfe0YEZSYcHCOoFaAjamHAqSJZowBBgaTwdepTGqj9jWUO350jrBgsV%2B8d0akJ26EmLWrHqc6%2F5vgjm0uNqnQECs3LDDlIejC7q7OQ57aMXDi8C%2BcZEw%2BkLwjMrUEit2qccy3h7bwSSlL0KjCHQlRN4eGSrbJNrBul5r15i5xB%2B%2FfkuD%2FMENwuBHyv7O6Wxm3gofN47zabY1AxHsyzTvdAZa79woPC%2BF0lYq%2B4COV5DnC1KDhuXKPuckWITbDZp61WwdfdLikykw%2Ba3hJZeWN%2FQ1PKrM%2B8CtlgRxMr3bGdjVWCs8pEXHmrg7hfeTaDKmrjxYCVv6AMvSYwAQ0i32g34A4DQgdmXVYCmbG%2F8pWEicbtgwGsJ3TWIvACXrOGeJLyEane2MMOavckGOqUBZ%2BJ112680%2FAlCgdQ6DjYvDce0CW250Yq8s0iVdY2rNwO0aTGnm%2FaO98VyOuSKFZDFHO%2BqEik1WrqnjWlKddImWJHQUX0wq1BYuei08m1bR0o2HQYR9UT6gB2jr4wpuqwbszkr8LbwZhVPMKGjQZfEXsrxLYn%2BW2Qotd8FjyXCubWdv3I8VahZfOXYgUgwCgc2ifdvg%2BXsgjS6MEq4B3SQ6oq6uJQ&X-Amz-Signature=437317f9dca35596295325721890b35f2cc3f5893ebeff2cf04ce092134d7411&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Data Processing Aspect


Model의 data processing 방법(시점)에 중점



#### **Modality Imputation**


modality data level에서 missing 처리, missing data 자체를 imputation


_→ modality missing을 정확히 imputation한다면 full modality로 간주_


	**Missing compositing** : 합성

	- `Zero/Random value composition`

		<span class="notion-red">_→ dataset의 다양성 줄임_</span>

	- `Retrieval-based composition` : 유사 분류의 sample에서 데이터 copy / average (KNN)

		<span class="notion-red">_→ pixel-level task에 부적합, KNN의 경우 cost가 높고 불균형 data에 민감_</span>


	**Missing generating** : GAN, Diffusion 통해 missing modality 생성

	- `Individual modality generation` : modality 별 생성 model 학습
	- `Unified modality generation` : 전체 modality 생성 가능한 model 학습

		<span class="notion-red">_→ 고품질 생성 한계, cost 높음_</span>



#### **Representation-Focused Models**


representation level에서 missing 처리


	**Coordinate representation **: 다른 modality의 representation를 semantic space에 align

	- `Regularization`
	- `Correlation`

		→ 두 개 또는 세 개 modality 사용시 성능 높음


	**Missing compositing**

	- `Retrieval-based composition` : 유사 sample의 feature 이용
	- `Arithmetic operation-based representation composition` : 비학습 방식, 단순 pooling 등

	**Missing generating**


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/5116ca66-ded0-4dc2-a7ae-a5bcb44bb6c3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662IMWECWL%2F20251202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251202T210110Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFUaCXVzLXdlc3QtMiJHMEUCIQCHRYgoYQCiNS6bX8psalAjLc7%2BTAkjgIGO7fEtsamLZAIgKv%2Br8gri3FbCK7yTsn%2FFhB6%2B2%2FKV73ta4VyCATABt3Uq%2FwMIHhAAGgw2Mzc0MjMxODM4MDUiDFwmYBQP91AVWJzR8yrcAwFywfU1cifBMwCH01elETQhxCELFayU31JeYOFHYwn1RfbVinkx5Tb4OchBeVjwQ01dmdmxN%2FY1VKUM%2FYqN6OPY%2FfVi000Cggm4ElzI93ITczzi44e9Q7KUf0JhBRMPTONWMRNbo53tcThbEQaUuTjIdwE24IzhR%2BaRdHEcIUkuo6fGvOiM9oJde1w%2BS6JTJfCxeixuxxWJgh%2FesDS3tYcC8dajn8yRx%2BL6lkXm1nkef1Obk6gJQWnlFgDQN0P0j0z7ni7fJZpdKmhGvSnBHcZB%2B0mKLTo3yE9vQcv4gC7%2FYUJwhjulU9JmmhXVFZRdOcKWn3YXxsPd%2BHEQJlX92v1yJg%2FSag%2BbSaQVIKXAC4fxxRw3nGatTQle76knLLRvt31Apr4vhuJsUrpBk36wUHWMCCCcQMwnydYaZBekF5L4TOvenuPmBZiMxkw6njVEs%2FtlDwvITmiCHhwNgjcl1sNojeU9lgYY8mL3kF9Ye96nGzStGcAtum3OJgJc8De1aTRO0liUORkJgJpebn1ZtpvprPQ%2FfHH2Sms8SHLMons7F9UkH8svBaErXt6mvKPl%2FBYN4r50O%2FJh9qHn2qCmIErknNKFBGFdF8%2F8QUlXmQDwrg5Pk8s%2F1YyHZhjIMMCZvckGOqUBct3VOuyw037wQQUW%2Bngym6wcbwEK6Fb9GFr6hcaZCQ1JP4CfXdnvOmk5fDmopAsGJI76VQaWRVC741knqcQimjhK%2FfBK0XL%2B0JrUzIjcARo%2FQgGR%2FIOvcSw11inkPWsgC4cyvVLW%2FzvMOgGJBGd8fVx5JuIIWE2VVb6qh%2FW5ZWQvwZ4zBGHFNf7xRg%2FA1aVU862iGlwRftZCdiM1nOg0%2F46a5HgD&X-Amz-Signature=9e7243ef8f90e2f41db9629e3fc9ae1b4c42507895e505eaa4d0db4a05a3044f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/5116ca66-ded0-4dc2-a7ae-a5bcb44bb6c3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662IMWECWL%2F20251202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251202T210110Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFUaCXVzLXdlc3QtMiJHMEUCIQCHRYgoYQCiNS6bX8psalAjLc7%2BTAkjgIGO7fEtsamLZAIgKv%2Br8gri3FbCK7yTsn%2FFhB6%2B2%2FKV73ta4VyCATABt3Uq%2FwMIHhAAGgw2Mzc0MjMxODM4MDUiDFwmYBQP91AVWJzR8yrcAwFywfU1cifBMwCH01elETQhxCELFayU31JeYOFHYwn1RfbVinkx5Tb4OchBeVjwQ01dmdmxN%2FY1VKUM%2FYqN6OPY%2FfVi000Cggm4ElzI93ITczzi44e9Q7KUf0JhBRMPTONWMRNbo53tcThbEQaUuTjIdwE24IzhR%2BaRdHEcIUkuo6fGvOiM9oJde1w%2BS6JTJfCxeixuxxWJgh%2FesDS3tYcC8dajn8yRx%2BL6lkXm1nkef1Obk6gJQWnlFgDQN0P0j0z7ni7fJZpdKmhGvSnBHcZB%2B0mKLTo3yE9vQcv4gC7%2FYUJwhjulU9JmmhXVFZRdOcKWn3YXxsPd%2BHEQJlX92v1yJg%2FSag%2BbSaQVIKXAC4fxxRw3nGatTQle76knLLRvt31Apr4vhuJsUrpBk36wUHWMCCCcQMwnydYaZBekF5L4TOvenuPmBZiMxkw6njVEs%2FtlDwvITmiCHhwNgjcl1sNojeU9lgYY8mL3kF9Ye96nGzStGcAtum3OJgJc8De1aTRO0liUORkJgJpebn1ZtpvprPQ%2FfHH2Sms8SHLMons7F9UkH8svBaErXt6mvKPl%2FBYN4r50O%2FJh9qHn2qCmIErknNKFBGFdF8%2F8QUlXmQDwrg5Pk8s%2F1YyHZhjIMMCZvckGOqUBct3VOuyw037wQQUW%2Bngym6wcbwEK6Fb9GFr6hcaZCQ1JP4CfXdnvOmk5fDmopAsGJI76VQaWRVC741knqcQimjhK%2FfBK0XL%2B0JrUzIjcARo%2FQgGR%2FIOvcSw11inkPWsgC4cyvVLW%2FzvMOgGJBGd8fVx5JuIIWE2VVb6qh%2FW5ZWQvwZ4zBGHFNf7xRg%2FA1aVU862iGlwRftZCdiM1nOg0%2F46a5HgD&X-Amz-Signature=9e7243ef8f90e2f41db9629e3fc9ae1b4c42507895e505eaa4d0db4a05a3044f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- `Indirect-to-task representation generation` : 
modality 학습 시 decoder도 함께 학습, missing에 대해 decoder로 representation 생성
- `Direct-to-task representation generation` : 
가용 modality의 representation으로 missing modality의 representation 생성하는 model 학습


### Strategy Design Aspect



#### **Architecture-Focused Models**


train/inference 단계에서 사용 가능한 modality에 adaptive하도록 설계


	**Attention-based**

	- `Attention fusion` : modality 내 또는 intra modality 에서의 attention fusion

		<span class="notion-red">_→ missing modality 의 정보는 실제 fusion 과정에서 무시, 존재하는 modality로 representation을 잘 만들기 위한 목적_</span>


	**Transformer-based**

	- `Joint representation learning` : modality encoder 의 출력을 transformer 기반의 fusion model에 전달
		- missing modality를  masking처리
	- `Parameter efficient learning` : Full modality sample들로 학습 후 누락 modality sample들로 LoRA 등 추가해 학습

	**Distillation-based** : full modality sample로부터의 distillation / model 내의 branch 통한 distillation

	- `Representation-based` : full modality로 학습된 teacher model로 missing modality로 학습되는 student model 지도
	- `Process-based`
	- `Hybrid` 

	<span class="notion-red">_→ teacher model의 학습 시 결국 full modality 요구_</span>


	**Graph Learning-based**

	- 각 modality `공통 space에 mapping`
	- 가용 modality를 dynamic하게 연결하는 `hyper edge` 도입
	- `graph attention` 

**MLLM **: LLM이 feature processor 역할, encoder feature 통합.



#### **Model Combinations**


architecture 또는 학습 방법을 통해 해결


	**Ensemble** : encoder 결합


	**Dedicated training** : train method 중심


	**Discrete scheduler** : LLM이 controller 역할을 해 task에 따라 적절한 module 선택


---


---


> 💡 <span class="notion-red">최근 MLMM task에 대한 연구가 늘어나고 있고 특히 의료나 비디오 등의 분야에서 주목받고 있는 듯 하다. GAN과 같은 generative model을 이용한 modality imputation 시도와 Auto encoder를 이용한 representation 단에서의 imputation이 주를 이루는 것 같다. Fusion이나 train method를 이용한 시도도 등장하고 있으나 조금 더 연구가 필요해 보인다.</span>

