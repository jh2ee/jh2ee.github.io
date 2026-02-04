---
layout: post
date: 2025-12-04
title: "[논문 리뷰] Deep multimodality-disentangled association analysis network for imaging genetics in neurodegenerative diseases"
tags: [MLMM, Alzheimer's Disease, MedIA]
categories: [Paper Review]
---

Adversarial Autoencoder를 이용한 representation imputation 논문이다. AD와 PD 두 종류의 신경퇴행성 질환을 대상으로 연구했으며 metadata와 SNP 데이터를 이용해 imputation을 진행한다.


임상에서는 SNP데이터가 없는 sample이 대부분이라 실적용에는 한계가 있어보인다.


---


---



## Introduction

- 신경퇴행성 질환, Neurodegenerative diseases (NDs) 는 비가역적 신경계 질환으로 명확한 원인과 치료 방법이 부재
- Multimodal image data는 상호 보완적으로 진단 향상에 도움줄 수 있음

> **Image data**

- sMRI는 뇌의 구조적 변화를 파악하는데 효과적
- PET은 amyloid beta, tau 파악에 효과적 (AD)
- DTI는 white matter 변화 파악에 효과적이며 PD에서의 인지, 보행 및 자세 등에 관련
- 이전 연구들은 IDPs, ROI 기반 feature extract 방법 사용
	- IDPs 추출의 경우 전처리 비용 높음
	- ROI 기반 연구들이 주를 이룸

> **Genetic data**

- NDs 는 유전적 요인과 관련이 있음

_**→ Multimodality로 image, genetic 사용**_


> **Challenges**

- MLMM (Multimodal Learning with Modality Missing)
- Common and complementary information in multimodal data → 데이터에서의 공통, 상호보완적 정보

	_**→ modality-shared, modality-specific biomarker 탐색이 multimodal imaging genetics의 핵심 과제**_

- image와 genetic data간 관계의 복잡성
	- multi-genetic, multi-imaging
	- correlation among genetic data, correlation among imaging data

> **Proposal of DMAAN**

- Deep Multimodality-disentangled Association Analysis Network
- End-to-end framework
- 3개 module로 구성
	- `Multimodality-disentangled module`
		- multimodal image data가 encoding되어 서로 다른 modality의 latent representation 얻음
		- latent representation은 common과 specific으로 분리
		- self, cross attention 통해 유용한 정보 추출
	- `Association analysis module`
		- potential genetic representation 탐색
		- imaging data 와의 연관성 분석
	- `Disease diagnosis module`

> **Contribution**

- multimodal imaging, genetic data의 비선형 관계 모델링 framework
- MLMM 문제 처리 위한 learning strategy 적용 → disentangled representation learning
- 외부 dataset 이용한 결과 제시 → 일반화 능력 향상

---


---



## Method


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SSSY36IP%2F20260204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260204T192957Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFMaCXVzLXdlc3QtMiJHMEUCIQCA%2BJ%2FYEKN5jTQuI8WchxNt1ciFm%2Fzvk9eFhuc4RAzIbgIgPMci76W2XHl814adE3JzPD8mulyv%2FtwogUwBZUNp5nQq%2FwMIHBAAGgw2Mzc0MjMxODM4MDUiDL7mQFz6%2BQcyHatOMSrcAwM5K9QlMODpLKX%2BC3jPt5wyDhWZr3xC1ClHugCGI1N8mka0T5DXZqiGry2tsZxt77ibbQSC%2B5S%2F%2BJTSha6nQGfXdVU3bnHfNF1NKFktC7dX1rOpgVSqs52WkM5UaukZc7QKnIcvsViPdubqaM3P%2BfF9hAhPBK1lmgCC7tTA5RpBaHjYFkvFuXa3kbs%2BDRAOqsz%2FWeUBSt2UEApHNgIbCQUUdD1zow2Gj5XBF8kMnSCeeTCyqSIY2qJtfAfT0vY39wm9wdEIFbTruLudyfYRWOE66TUsAOJPUc7UTj7FhaBtDPxvBlcWL3ZGhHcDFirqmbv2xXdPG2WUnxbRywxdgtSqNZq466djSe2VTNSjt3iL5pcTs2iH2eq85ylcnDhg%2BbuR0NfINA9hetSDhLKPm9w7SSjtqENjsAcrUt%2Bsxt5taeD71pCBUsL%2BQ1HuVZrWvOrykuw9zHQvrU%2Ba96HRLDtskDpuZ%2B1MRWhkBooWpZUlq3Os6%2Be3hMqjzhbmiZ9iOoEMSzHwvCR0mepYCAX3036GDWLJezFTFfwGnFS0erI8Y9oEsTsCCbPf6PiHyOuhqyx3aCYZ8peXcjQqxQixVMdTgMkR8PNCxZ7ykkS21lBnfuFSDoEU3frgjftAMMqpjswGOqUBKgOReu4%2FZgzHjBG9BWDsZ3TgK4CZYzHLF8NViPuLINRhJHbqT%2FilqoCqQ3ploOc1xZiDJRLcK6O8a4A2k4%2F2DRTyYO%2Brf%2Fp6MPp48J127TrUW9RquSAh4LzxkV1dqPTdN9E8opxVZ9Gu51I%2F5bCxMVc6wy6FiAGHRPCDZVlk%2BBDpwQyciBS6u61mJ026q1LiuQbDAv00JxyrttWKJ2x%2BUOx49PWX&X-Amz-Signature=fe4fee0c841208d26a31be935839c53663332b3a05db5b466f5977a2af45dc70&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SSSY36IP%2F20260204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260204T192957Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFMaCXVzLXdlc3QtMiJHMEUCIQCA%2BJ%2FYEKN5jTQuI8WchxNt1ciFm%2Fzvk9eFhuc4RAzIbgIgPMci76W2XHl814adE3JzPD8mulyv%2FtwogUwBZUNp5nQq%2FwMIHBAAGgw2Mzc0MjMxODM4MDUiDL7mQFz6%2BQcyHatOMSrcAwM5K9QlMODpLKX%2BC3jPt5wyDhWZr3xC1ClHugCGI1N8mka0T5DXZqiGry2tsZxt77ibbQSC%2B5S%2F%2BJTSha6nQGfXdVU3bnHfNF1NKFktC7dX1rOpgVSqs52WkM5UaukZc7QKnIcvsViPdubqaM3P%2BfF9hAhPBK1lmgCC7tTA5RpBaHjYFkvFuXa3kbs%2BDRAOqsz%2FWeUBSt2UEApHNgIbCQUUdD1zow2Gj5XBF8kMnSCeeTCyqSIY2qJtfAfT0vY39wm9wdEIFbTruLudyfYRWOE66TUsAOJPUc7UTj7FhaBtDPxvBlcWL3ZGhHcDFirqmbv2xXdPG2WUnxbRywxdgtSqNZq466djSe2VTNSjt3iL5pcTs2iH2eq85ylcnDhg%2BbuR0NfINA9hetSDhLKPm9w7SSjtqENjsAcrUt%2Bsxt5taeD71pCBUsL%2BQ1HuVZrWvOrykuw9zHQvrU%2Ba96HRLDtskDpuZ%2B1MRWhkBooWpZUlq3Os6%2Be3hMqjzhbmiZ9iOoEMSzHwvCR0mepYCAX3036GDWLJezFTFfwGnFS0erI8Y9oEsTsCCbPf6PiHyOuhqyx3aCYZ8peXcjQqxQixVMdTgMkR8PNCxZ7ykkS21lBnfuFSDoEU3frgjftAMMqpjswGOqUBKgOReu4%2FZgzHjBG9BWDsZ3TgK4CZYzHLF8NViPuLINRhJHbqT%2FilqoCqQ3ploOc1xZiDJRLcK6O8a4A2k4%2F2DRTyYO%2Brf%2Fp6MPp48J127TrUW9RquSAh4LzxkV1dqPTdN9E8opxVZ9Gu51I%2F5bCxMVc6wy6FiAGHRPCDZVlk%2BBDpwQyciBS6u61mJ026q1LiuQbDAv00JxyrttWKJ2x%2BUOx49PWX&X-Amz-Signature=fe4fee0c841208d26a31be935839c53663332b3a05db5b466f5977a2af45dc70&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666GNHVRVO%2F20260204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260204T192957Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFMaCXVzLXdlc3QtMiJHMEUCIQDfLJ6tFJX%2FTJ0uTil%2BZnk4mG5Ix%2FioXtyQBsavn1vSUQIgJBlz55ddTOwL2iSmugbjYeGXUDVZh8NRL3Ex81obLBMq%2FwMIHBAAGgw2Mzc0MjMxODM4MDUiDCFi4PAUhaASFMsxHyrcA4RrPGW6LuYiitEZ2iZkE36qhtQP2c1pmdaN745%2B6L5Ie2NxPtDL3bk3IPhunozoODeDI0Wo3j5DfPQ7y%2Bxs9364%2FwF%2FFxlH09I7kyJFpWPREJhIYnI3CpHvORvuiD%2F4NsPRGydQDhwtMQTBBMPWqQtDLXmHtK9AwE1JnLe1KnlJC9SNv%2Fvy%2BxUvKKWqUnPBrxUNNSdIsT1t1nh8x91e8HlfcdewQx3s2iKpdlyJ1Rnp4%2FZXja%2BWIkHcC2J4qvWHlhBOMC2J3QEESC2MxPQ9LAQPULIn7kIprJzBpwuqZwrKOFQ74MxbuDY50XgZuOf4Qg0T81pDlGycvvg6xgP8qqs%2BMbFbyBE3dRJEoCybAzFscype5lyGByStWvm2iBlhC0azXpbAFoNmSDCuTpfxDkHQOc2fDY1EKHd4eDU1CQH4OZv%2B1J%2B%2FE3WVesEZkv2q0kq8UMwda7woznBjblxVfYWA8MJzrE1mUlNlprgm2dXpIQBwNfVI8GBDMBp%2FtOOzTMYRzAZFGzS5U%2B2Z1iwuN2hGav6PVgeRCwYyqe1LSEBRjwVbhA3gS%2B5gYmpBIASV2dcAKR%2BrgKREnwd57q6%2FIOW00lzOCqGndEtebxHIi5mdTj2J%2BIZMAFONf66FMMGpjswGOqUBVlwGvch0YBgbcZX%2FFIToGAobOMpNgVX9XyDxlDvJBw%2FEswYzTjO6J%2F64RP2a%2B36Pff2XLaWWfPk7CHzEg4MeCyj83OyoMSakjGcXmR7mIaKJAim%2FDTKAzpqYS2fA7oIIHpIdhxsqya34%2FObSbRGJSN09jyzJdrYIMIv8k76d0SxnRhkhMTJ6%2FeaiQV9K%2BpdFQiFkYtmvTMjZ5xMZNb5KIPjHpP8k&X-Amz-Signature=b57c03607d48c092343f0422bfdb553ddb0c8ef4c574cc483aad9cf7f015a386&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Multimodality-disentangled module

- `Adversarial autoencoder, AAE`
	- data의 posterior distribution을 pre-defined된 prior distribution에 가깝도록 강제 

		→ prior distribution의 data는 쉽게 disentangle 될 수 있기 때문

	- VAE, AAE 모두 distribution 일치하도록 허용 

		→ AAE는 prior distribution의 정확한 형태 얻을 필요 없어 채택 (data manifold 포착 능력 높음)

	- Encoder, Decoder, Discriminator(shared MLP) 로 구성
undefined
> **Flow**

1. `Encoder`
	- Modality data \{x\_i\}\_{i=1,...,M}, encoder E^{Img}\_i 로 입력, latent imaging representation \{v\_i\}\_{i=1,...,M} 생성
	- v\_i = E^{Img}\_i(x\_i)
1. `Discriminator`
	- _**Adversarial learning & Discriminator learning**_
	- representation은 Discriminator에 의해 prior distribution(Gaussian)에 근사하도록 강제
	- Discriminator는 MLP로 구성
	- multimodality에 대해 shared parameter 가짐
	- v\_i가 prior distribution 따르는지 판별

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QD254CWG%2F20260204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260204T193013Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFMaCXVzLXdlc3QtMiJHMEUCIAhp828fG7gLp23LBnNVUWn%2B7dMqepkaaF8BzYPDiUe5AiEA8PSLDATPkuuILKSGfIy8EHGR2bBNaX%2BHg%2Fgn6JfEsiUq%2FwMIHBAAGgw2Mzc0MjMxODM4MDUiDMpDAXB4rxG3PvR5AircA01pCB8nzyfQUFWShI68gYMeqrDIJEqPeiXvgzpPmZgc8fTGWV1YbhYZ1M5cqDUL%2FOuRf0az8csKZzyYQbs1NM%2FVYBMOwKGAuW%2FLo1O9NTLA%2FxklAGZIBk9or8pltqYkVQ7zuNHrdKFXM05MCu6XuiCvYKSgi4ZQc1wDjUxxyVleGEE18dbYLzoDIaEpkXx51SHcA8MT1mduP2MEr9xtVH0PmbbGt4Hh1zKenYIZZC3GzIN1VnIfICFGNsSswVdwlOY2Jw6HQpAFH0Az6v1WBI4uAGLIbkQluU7swe24GDAbQZNK46NAeg79UFeX9e%2BoF6F8ual8mtQCZdqlJA097asdEC0%2FALZAIu%2FXCqH9AFeTMzm1dGjl1yZYIIYKsWMSeZVkFhGST5bIW%2FPk%2BNRKoyottxJ5L288aWKoLLJ%2BFA%2BvnN9iUUDVqOWFCblLPzG%2B6fjR8ryTDrH392r8bN4WU4NitYfsBnCWWYazriALoUhukfFwt6n28akadX2GQh4b4EhhXiQr3vMmyf9Naz28J5T%2B5XtRspeL0PjciiT3pHzPbMxWwdTLUj8LFm9ijKig589qqn6jednapfsShbr3EuJ5hQni0xXSS%2B9uBfz1e8aetgCqTLLOs%2BI5GZqWMOupjswGOqUBcT%2FXwNXl5gZwxDIKVjuwjeYmsbM3Z%2BWvBCE5roK6QVzvlYYeCGJOpYgY3xG6oyc6d%2ByrlqPivF53jC0qwEqPB%2BpvfpMJcfWRsJcIy5vrCI7J7sfaWkFOnd0vX6BJNbsoQhBBj%2F9DF7Z%2BBYIgGHaYkv8j2eaToiK2jcAiO1%2FUZNGC0Kp2A%2FtqAfEntjtwxJ7mCaBGPx0cvj7zvaejqa9GuhDgXNsN&X-Amz-Signature=05dfbb96c3e5d3aded3fd88b95f68ee8bc0263f960b7346a92f104d256421798&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QD254CWG%2F20260204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260204T193013Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFMaCXVzLXdlc3QtMiJHMEUCIAhp828fG7gLp23LBnNVUWn%2B7dMqepkaaF8BzYPDiUe5AiEA8PSLDATPkuuILKSGfIy8EHGR2bBNaX%2BHg%2Fgn6JfEsiUq%2FwMIHBAAGgw2Mzc0MjMxODM4MDUiDMpDAXB4rxG3PvR5AircA01pCB8nzyfQUFWShI68gYMeqrDIJEqPeiXvgzpPmZgc8fTGWV1YbhYZ1M5cqDUL%2FOuRf0az8csKZzyYQbs1NM%2FVYBMOwKGAuW%2FLo1O9NTLA%2FxklAGZIBk9or8pltqYkVQ7zuNHrdKFXM05MCu6XuiCvYKSgi4ZQc1wDjUxxyVleGEE18dbYLzoDIaEpkXx51SHcA8MT1mduP2MEr9xtVH0PmbbGt4Hh1zKenYIZZC3GzIN1VnIfICFGNsSswVdwlOY2Jw6HQpAFH0Az6v1WBI4uAGLIbkQluU7swe24GDAbQZNK46NAeg79UFeX9e%2BoF6F8ual8mtQCZdqlJA097asdEC0%2FALZAIu%2FXCqH9AFeTMzm1dGjl1yZYIIYKsWMSeZVkFhGST5bIW%2FPk%2BNRKoyottxJ5L288aWKoLLJ%2BFA%2BvnN9iUUDVqOWFCblLPzG%2B6fjR8ryTDrH392r8bN4WU4NitYfsBnCWWYazriALoUhukfFwt6n28akadX2GQh4b4EhhXiQr3vMmyf9Naz28J5T%2B5XtRspeL0PjciiT3pHzPbMxWwdTLUj8LFm9ijKig589qqn6jednapfsShbr3EuJ5hQni0xXSS%2B9uBfz1e8aetgCqTLLOs%2BI5GZqWMOupjswGOqUBcT%2FXwNXl5gZwxDIKVjuwjeYmsbM3Z%2BWvBCE5roK6QVzvlYYeCGJOpYgY3xG6oyc6d%2ByrlqPivF53jC0qwEqPB%2BpvfpMJcfWRsJcIy5vrCI7J7sfaWkFOnd0vX6BJNbsoQhBBj%2F9DF7Z%2BBYIgGHaYkv8j2eaToiK2jcAiO1%2FUZNGC0Kp2A%2FtqAfEntjtwxJ7mCaBGPx0cvj7zvaejqa9GuhDgXNsN&X-Amz-Signature=b9535ffbed96fd12e21a3d177ced571b2130a106c74d973f6efcf281710a09b0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TRXPQIPP%2F20260204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260204T193013Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFMaCXVzLXdlc3QtMiJGMEQCIEW4rNB%2FefmIdrj6BX0fEFkArvZ77R0M4NLnntP%2BUr78AiBRoq0QWSx4mpyml9Te3mVwV1JjfK1gITbiuj%2BazPztrSr%2FAwgcEAAaDDYzNzQyMzE4MzgwNSIMdfMgXQJxLivfCwlCKtwDL2l7arFLJUJfc%2FTOH6C1KWMK9FQk%2BfrtaGWweWrPq7iXCGfTKaUZSGOwe9IyphU2U5zuQ0oO%2BfY4O35xeUzjkWXSm4wAB308d%2BscsypKmxbSIiR9Sv23KtE0n%2FoYc%2FkZCLOZ6bZumXF7NcVZn4RC4rwsjPNgWrQfpgabXwSta6mLePzv4tUy3r3DS46yMWoGCB9IVgT7onR568R9glbPf%2BmmO%2Be0LcIJvYDnpjvAI1TXQk9zgq1LoC%2F48gALuG99tWONY4SbvIkRCl8l%2BowikfobR0VldsZ94B%2BM6TGRUCH%2FD3xAzbeM1GAXtG%2BcgR5f3YfP9pz7I%2BOtOgTLYwkTkVSNMGztcTp6oGJHb5cYGlsUW1R8qDH8z%2BarobV3Jzco7JoIhMJeBF8m%2B0pZRqWK7WaL84g4e%2BlJ7U4aszxA7Y%2ByFWE5qz2XqBHGm7dXd8iChh4bz3STwhNe6Yx3hMFjyF%2BC4uZ%2FZ%2Fhr%2BTCzkuF1MYEaLlEJBdkfaccvOeRS3y1%2F5gf00S9oe5sC14qjXFDrYZhvhowf1%2BfWRA3r%2Boq0he296LsPMevw066XVfqT%2FNvhRCDowH2VQSKQ5JSDZFDP63CdgV2XOmIYfA7HcUvBZRSIQVNzq1eArjx%2F7a0ws6mOzAY6pgG1iaBIFhCPQlFzZGvzhYWDWJgrW%2FJG9%2FewvLLqVMmXrmOUqmfJm30vszMomWiE3L6VC1ZfrGwidX%2BafIgxOFNkbNZPRof%2BBTHFpgPv%2BNrn%2B6Bqb9lxICgKOfBES0YBe2o5JTFds%2FSE4%2BMQGVG3KpsZSZRa1yqd6iBTRVaprpPV2nNoLkzw0GqZMD0QeXTYvdVVQVtTx4pTPdB%2B2NOnTHNTrSHCGu1L&X-Amz-Signature=99d7b11a1a6a0e295c6b247519c44d688d289f9d6286e2e920094452637b22a2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663SDZJEYG%2F20260204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260204T193013Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFMaCXVzLXdlc3QtMiJHMEUCIAqHTcic97AZJOvXdVPkAG8XgUZV0e%2FRTCF%2BJIkNuIbzAiEA9%2BXNMXgkpG39Pit6O1VEDg51CPZFUsKaXv0XKUgttEkq%2FwMIHBAAGgw2Mzc0MjMxODM4MDUiDM4zve0PII2zTXXekCrcAyB1NGXh3pvz2d%2BzkzhN0Pn2lMIWEGxnz6losXHsA61XGm6CwS2%2B8vM7nCEEmgePJggcoIJF5COFte16pw34fKa4K6QeEACOaXLamVfzQQUWx0kl4G0h6FjMTUtaslI%2F2XtiEOIMJvrlsC8bFFYumKjpb2ejwGJPlSyDj6l5QV6CRW8RGdOtQBPnCasfiSXCsS%2BJTvVAnECd02qnyOi3wxCCf0FmJMopGaHV6ihcd9j4FlenEqg1NEcfat8RGOi484vlipnWd8D%2FprzvaXdwR%2BugQWVdRYRTZ1kO8RbPdFJ1qN%2BASxovVFYoEEpwdlUyAzo3slvRWCg6I5z0ZnUgE1mzsqD%2FX311b1hON%2F%2FRdUlVv%2BKmGXBWBlUc05rGbmzamXDC9PN0SOlu07YEmLSzp1xbVOhWVlFoi6AvsY3fe8Pa0f%2FAn9e15ys3asHVJhAsuc7OL0c9C87XblehN1hbIaQ3x3y8uUZ0yfLyIa4Mjg0keahEwNwxP6kN66GSXdabNhMunxBAdQBVqFX87%2BtPTEqbiXf6gR%2F%2FPssZxjUqrAqarrSJt2Dz7DBT56wmtHoueMp3W42m8qy83SMRzBFxm6FH0wqAP2iCbHGLcnJXLoS332E0bwClt2eiyYlcMOKpjswGOqUBF80%2BeVC3b4R120TT6gFds505An92df3A2WM%2B18yt%2F%2BOgJAT0gCuo5TZqg94EmPf%2B7lj6R0dcldfJAVvp6k5unn%2FoZlVu4LlSJipuCvGEsVquqUGoY8728FMyhWfBD2KK1Mtz%2FF2oDJqGVrH0L%2B9YBLTwZRYnqI1BmYcS1vVpz8dqY7hnK0Gj%2BRV2iO8w%2FmXDYp96Nlj837aD2XTZXecPXskJuLct&X-Amz-Signature=0405b620330baf056835f925377afa95bf580fe4bbcdc78985b1bdb577da4c63&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

	- modality 별로 존재하는 common representation과 현재 specific representation을 입력으로 reconstruction

		→ modality 수가 2개라면 2회 reconstruct 진행됨



### Association analysis module


AAE와 2개의 association network로 구성 (network는 imaging modality 수 만큼 존재)

- `Adversarial autoencoder, AAE` 
	- prior distribution 내 제약된 genetic latent representation 생성
	- adversarial learning, gene representation reconstruction
- `Association network` 
	- genetic representation을 imaging representation에 mapping
		- 각 network는 imaging data의 common, specific representation과 각각 mapping

		> ⚠️ **Mapping?**


			imaging data의 latent representation과 유사한 representation 출력하도록 학습하겠다는 의미 (objective)


			_**→  image representation과 어떠한 연산을 하는 개념이 아님**_

		- imaging data와 genetic data의 association 분석

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SND4UBSJ%2F20260204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260204T193016Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFMaCXVzLXdlc3QtMiJHMEUCIQDwdVRxuUQ7R2JN%2BloEQUtemNDPTaDant2mZoqKeyFK9wIgRr5zSGyWqT%2FsTAE1wXppy9Mme5GsDvOCp18fbDxZWTIq%2FwMIHBAAGgw2Mzc0MjMxODM4MDUiDJXl1ZR%2FnQxbElBknSrcA34KymaAWabBCNbgpJvXBK65GNIKmwHe76D3hXMxoZOXSWbSe0xwJmYCQPRG6uuS7hT%2BV41ZaJ6FDY9HGSJH%2FD61810K0zx2i4%2B%2FJxBIpi67STGuhiyTq2aMeSwBomYzXNcfYW2DwjXgyQoCRfA0UOArIDDk9GGBQnaD9T93yIGxyiMUoYT1fMDVtjQnNFwLUxH5Sgn9xpZfQ2JtQ34vYfGvpxm4oMmsI%2BirfZc1dguGMgfVzH04nwR8j6xdIK9eEBVLmlhFzG%2BMCaFWk3RL0X68UyPzIVbhvi74p2OwxIt1jcDT%2Bndfa2T7OULm3aEhQsPv9%2B2tdQckuLZ4Kai3IP2rny0r0nVxju734B0el2B6l42oVdcqQcXZU3lLEe9SEDhyPcrs4NRIfMNPATPF%2BkKzy2%2FhDlES%2Fv6GzNo0PWUM431jC9R3nFVjxiWiDXK8y95UX1c3awHxVnOsrbuMZfB%2Bji5hFt6OI2xdaVtcqeeevUK1hZVLedJWx9YSQ%2FMU%2FDdzoUnAJo0azixEg7ygQkXMkrXTW3BiZJEf9vOvVV5onxfbsNKmkg0RLkohaWcXf%2Bf9xLizImzfGCs3Y2iEuofyz1zwcRltDVbKbEXoWY8tn1%2B4owHctwolt0b0MJ6qjswGOqUBlAVtbjtAVqNcRnfCT7aS9EMQw32YkoNRMbFSa0ruZN5puWwHdOWhWjTP2uR8w0EP081tX6OlAOp9ABoLupN2RbSlJEycPOCRLfBUsPUD7f6Weeq%2B6HeKW9Sbe6oLpRfsYDygdDQYxM2M5rLEJcwiRkynIedqaEnhE6eoISYNzOUZ864l%2Ff4gMZlExg6Lg2wmkJAPunwEehJVzgkgDHoF49z2uny0&X-Amz-Signature=bc889e1b449501cff39bef08c9038d699779dd101a64ffc297685e66668ff0fb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

	- mapping 시킨 representation은 missing modality의 representation imputation으로 사용됨
	- mask의 경우 diagnosis module에서 representation에 가중치 부여하는 역할

> **Flow**

1. `Feature embedding`
	- SNP의 0/1/2의 categorical 표기 → population에서의 발생 빈도에 따라 0~1 사이 값으로 embedding

	> 💡 **e.g. **


		trainset에서 한 SNP locus에 대해 dosage가 0/1/2 나올 확률이 각각 0.1/0.7/0.2 라고 할 때


		→ sample의 dosage 값이 1인 경우 0.7로 embedding

1. `Adversarial learning`
	- Multimodality-disentangled module과 같은 방법으로 adversarial learning
	- genetic AAE의 경우 disentangle layer 없이 전형적인 AAE 형태

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XPY3RPKT%2F20260204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260204T193019Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFMaCXVzLXdlc3QtMiJGMEQCIA8w6eDk2KFiPSDgtIdQACHfkJOyp2Z6qbbrdrWdMinwAiBsoWiVEn0YszlUJRg7Hfm14PpjJocfF6T4m7uYSawr7Sr%2FAwgcEAAaDDYzNzQyMzE4MzgwNSIMAwYW6Hy2wpZIISDjKtwDI0%2B2EMS0BwsitBRLMeiEpYE6UPG3GYf1lCfVMVu6fZvC7YqEWj51XbJ9FW5oVMs873wcxb6%2ForQrk6wtzroloZFmvDwzGmll789HBZMW73x8%2Bw5HG3Kxh80bg%2BDvY2o2%2ByEPIuCUwQv7ThRGqK1cFc9U35p1J%2FaLxSkxYGITSUEWA%2BF0M7Rhcgq3Trzt35ENVtp%2BUDqUEGujB0q6nurxnOC1%2FmS5fsP3ndnmiXqAV7t1H6D5ExAFHG4d47UM1511dt%2B%2F9CwcNYooZZQ%2FYP%2Bfg%2FQh%2BStiecQKbwftugxhcIFehqytl5bzqNR70j1L3p01%2FxmrYSDUmcf%2FiJdWfMXo2oL%2FamI5EWsMgKSFSHSRXFVIl4ApfRfw2%2FfvMqQQ3oX6s7viCmJ9HA3ru1cuE4q35vB9rVWnNfnIlapR%2Fe47HqUluFdFhoB8rl1kBymv7gLbVREAfhZydimxQHJ3YTtawuEVQ6BnBRxsxtYPIwmcgwhjITw7iwaKDGNAf3ZvEldtPWDsP1rj%2Fjs1i9mo8lXpfQG%2FwvkBnl2Hc8pw2JVNYu7SouAyz8scOuh73hI%2B2khCR64LTLSfQ7zbzVSfSq0PwP1lj0vrX121EiZ%2BiZxRQqraPiWvxL9uDUK%2FDxowmqmOzAY6pgGtabqJYqbqsXiYYCeKY%2BLFNvxdQk2mE6qGYFcneJvwUXXb62GZ1kj8ST5V9Drtxdp%2FwpPToptNXIoYwQIyseJM1D8CuUufMwTqMSLHz1x47usPqhTxgsUgqAhmg%2B5jtOXjVVCFKDYfSHyeyt3tvoIcdOd84kTedv%2BEWI9VG%2FKo41I4WtxmykXL2ICg0%2BKZ556bVciDhJEkwkAB8I1RawY41IJO1PiB&X-Amz-Signature=d7d9c235369e6caacd855a84740a1b6c797fc2e2b7be7481e630ae62c055aa00&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XPY3RPKT%2F20260204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260204T193019Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFMaCXVzLXdlc3QtMiJGMEQCIA8w6eDk2KFiPSDgtIdQACHfkJOyp2Z6qbbrdrWdMinwAiBsoWiVEn0YszlUJRg7Hfm14PpjJocfF6T4m7uYSawr7Sr%2FAwgcEAAaDDYzNzQyMzE4MzgwNSIMAwYW6Hy2wpZIISDjKtwDI0%2B2EMS0BwsitBRLMeiEpYE6UPG3GYf1lCfVMVu6fZvC7YqEWj51XbJ9FW5oVMs873wcxb6%2ForQrk6wtzroloZFmvDwzGmll789HBZMW73x8%2Bw5HG3Kxh80bg%2BDvY2o2%2ByEPIuCUwQv7ThRGqK1cFc9U35p1J%2FaLxSkxYGITSUEWA%2BF0M7Rhcgq3Trzt35ENVtp%2BUDqUEGujB0q6nurxnOC1%2FmS5fsP3ndnmiXqAV7t1H6D5ExAFHG4d47UM1511dt%2B%2F9CwcNYooZZQ%2FYP%2Bfg%2FQh%2BStiecQKbwftugxhcIFehqytl5bzqNR70j1L3p01%2FxmrYSDUmcf%2FiJdWfMXo2oL%2FamI5EWsMgKSFSHSRXFVIl4ApfRfw2%2FfvMqQQ3oX6s7viCmJ9HA3ru1cuE4q35vB9rVWnNfnIlapR%2Fe47HqUluFdFhoB8rl1kBymv7gLbVREAfhZydimxQHJ3YTtawuEVQ6BnBRxsxtYPIwmcgwhjITw7iwaKDGNAf3ZvEldtPWDsP1rj%2Fjs1i9mo8lXpfQG%2FwvkBnl2Hc8pw2JVNYu7SouAyz8scOuh73hI%2B2khCR64LTLSfQ7zbzVSfSq0PwP1lj0vrX121EiZ%2BiZxRQqraPiWvxL9uDUK%2FDxowmqmOzAY6pgGtabqJYqbqsXiYYCeKY%2BLFNvxdQk2mE6qGYFcneJvwUXXb62GZ1kj8ST5V9Drtxdp%2FwpPToptNXIoYwQIyseJM1D8CuUufMwTqMSLHz1x47usPqhTxgsUgqAhmg%2B5jtOXjVVCFKDYfSHyeyt3tvoIcdOd84kTedv%2BEWI9VG%2FKo41I4WtxmykXL2ICg0%2BKZ556bVciDhJEkwkAB8I1RawY41IJO1PiB&X-Amz-Signature=9902bf212dba8286f7234568e43a8f2599ea4f7c4bd0e2b3c5c5bd52e7b4b46f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664YEM6LLZ%2F20260204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260204T192953Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFMaCXVzLXdlc3QtMiJIMEYCIQCnwzcGTfPQS0XUw81ergbtaPvi10tmfz7IVMCLgPm4JwIhALHGlKvyNCocuizbJ9QsMh4tz7PbWXG%2BW3ZUi8Zy0cBeKv8DCBwQABoMNjM3NDIzMTgzODA1IgzAaBTD6mIIYmfLM%2FUq3AMev5jECF51p28OLBuZF2iIgdia8R9uVoGtYgMAa%2F0QLfCOUGak9DQ%2BH0iZo3lSQpuF5TS5rm%2B6PFWpwy7z80Nv7U7ZhgFnFn%2FAb2daAmzfDdkpbmrCDo%2BjS8FDt3H0%2B5tTeRMfueiKM65yt5OaeFkKwk6fEYwKTymCiq7tauCZgYTDGqSGvI8Ui1ZWkvOGNBcuSeOe2pPz3W1joD7dgkbwCaijDuHytS7WFg0R68%2B8b3CmzQwLspJ%2FL1AvOdI8%2FE%2BOJUQdy%2FRisJrbL8SX57I3seVuwI96xCB4IZ1D1RxqE3SkaWuIAkzeo3%2FyweaUWe15qXgnI5XLoTeJ1QMCDNjUFDbcsyELyejziWOl2N3XgqPFByDDSqS7giZiAWZsUQPA%2Fi0u5BXVhrhWdb%2FkezosdsOhbYG0oyo2nxdLjs2CXDIVFHMQLqy7kkNcrmjnZ%2FeiAaMSeOV3W8gN5aRX73FG4gfafutpfsmKnYEDsettkH35fqODB%2FU9Ui2JXalNYgptbsDgTDcq7uM3n03Z7kAFnVdzPpcwdm0HomaWAvdVjFjVQaExcYDBCI7GxQ4iYMfHvjpkYLIxvVJsww%2FXiP7%2FfMZCgNmJ8Mz2tbzmQBs8BU%2BwjgQ3rojviYdhxDCSqo7MBjqkAe7GffwjXoyVNAkmANYz8DXMPGjhb%2Bj8iVS3Gl72Tuxx0F9LDz4ldsqB0Ptom%2FwL1FwYAGh%2F6yW2Ukj%2B%2FkkIyapLJ1%2BFryxUjsqXZe3Gt1P2HUbUkqtFD495pw9B9aUg%2FIvSjMwa%2BDIvlopr1UYPQKOfp%2B7U2dDn%2BZPTHyAEqOhOX7hP8jR08LJZTFo%2BvAMI5q8WxnzVRM19%2Bw5EDSIaeZUpCMik&X-Amz-Signature=651bcab796082f3a8717836dabddff9727dbf17469fa4ae3c6618bd691dcfd84&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Y6KSYHG4%2F20260204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260204T193024Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFMaCXVzLXdlc3QtMiJIMEYCIQCMC8Nu4dn8XkJfuVP%2FhyNWMg8HZQEznsGXWUfN3G7z7wIhAP9nNrqGJ4Mqd4hfx7VIvhfJKoD6Y6r5s68uwxX5THSuKv8DCBwQABoMNjM3NDIzMTgzODA1IgzPV3KlnzToHL2V44gq3AMQKhYQwuUiBKkcCZuIq%2F%2BAuHeeAGXJomLSpd57bCV0gzhsSUeF5htnA9kjT%2FLLZ2B2l37z4rJaQkkIudy4eL%2FVg5FC62id2coTicYApJmYxWgYwsAqBR5A8Nc44X72bzy3kEDtyyAJF0awkGM6n3RdwvmQ6eZw8MSdPB%2Bh%2Fv8iNE4od2r36ekftAuEIYnxkPjmgsMfHblREXmO4k48D33shwD%2Bt3l3n90woqVem%2BJyaroZk2NXxOfjvwJ%2Bce8kn5EYKDihcKldLckfHfaTwc73jiv9bLjw%2FAgbCWj8WC7WviUMA6oIb30IfELhmqxFgAvZJoR7LRUMTu%2BaVZz17eRzM0SOtfGKZH600XdUC7BUN0QE5oaufZST5rw3Ur51KMAOdnmJWvkOcD9KYXieQS6q5xD4cqjlG9adyOGjxmdgxiX9RSzKQwTU8cM%2BWWNWoKnmQZBdBDS7kGhZvEHYnHRj0ctD4sCjomUxdE%2FMFTI2Az4sk4%2FLrszDWDPa6CuzAjXJeVbec1uHFDS%2FbEvPwzJmVmDUDwLUQX2g9A6LlOKkSMsgRstIfaCJfJgiEb%2BS562htgeVcHUXGfh1XC6fjmCrVHrstnwdiUF1q%2FCjVnhi47C%2F%2Bn0h0nk02dy9xzCEqo7MBjqkAUwQdm%2BwaEMW0cgwuitfVsFXpI%2FO%2BcHvpLy1DFdEoIQQDsjsG07Uw88UStqncjBL7dCpMcMRa39tuo2LgVfsrrDVtbZoC%2FE2VbeAq4xRZ6UZPHqwaNWQACrGJqMZWzpuy8vHnEL8XbmyzYnwrggHgyPkNikidGc3h3%2FP8IR49FuiW6UuZhv9j0OXrdiI4IYHDBkqZn9bPwxBmhJMQSVtLl9QJ2w%2B&X-Amz-Signature=a619d9c7e75d61ed8cfde28504fd0a3090475230a1ccc043ac94e4b4f16f2a90&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Y6KSYHG4%2F20260204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260204T193024Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFMaCXVzLXdlc3QtMiJIMEYCIQCMC8Nu4dn8XkJfuVP%2FhyNWMg8HZQEznsGXWUfN3G7z7wIhAP9nNrqGJ4Mqd4hfx7VIvhfJKoD6Y6r5s68uwxX5THSuKv8DCBwQABoMNjM3NDIzMTgzODA1IgzPV3KlnzToHL2V44gq3AMQKhYQwuUiBKkcCZuIq%2F%2BAuHeeAGXJomLSpd57bCV0gzhsSUeF5htnA9kjT%2FLLZ2B2l37z4rJaQkkIudy4eL%2FVg5FC62id2coTicYApJmYxWgYwsAqBR5A8Nc44X72bzy3kEDtyyAJF0awkGM6n3RdwvmQ6eZw8MSdPB%2Bh%2Fv8iNE4od2r36ekftAuEIYnxkPjmgsMfHblREXmO4k48D33shwD%2Bt3l3n90woqVem%2BJyaroZk2NXxOfjvwJ%2Bce8kn5EYKDihcKldLckfHfaTwc73jiv9bLjw%2FAgbCWj8WC7WviUMA6oIb30IfELhmqxFgAvZJoR7LRUMTu%2BaVZz17eRzM0SOtfGKZH600XdUC7BUN0QE5oaufZST5rw3Ur51KMAOdnmJWvkOcD9KYXieQS6q5xD4cqjlG9adyOGjxmdgxiX9RSzKQwTU8cM%2BWWNWoKnmQZBdBDS7kGhZvEHYnHRj0ctD4sCjomUxdE%2FMFTI2Az4sk4%2FLrszDWDPa6CuzAjXJeVbec1uHFDS%2FbEvPwzJmVmDUDwLUQX2g9A6LlOKkSMsgRstIfaCJfJgiEb%2BS562htgeVcHUXGfh1XC6fjmCrVHrstnwdiUF1q%2FCjVnhi47C%2F%2Bn0h0nk02dy9xzCEqo7MBjqkAUwQdm%2BwaEMW0cgwuitfVsFXpI%2FO%2BcHvpLy1DFdEoIQQDsjsG07Uw88UStqncjBL7dCpMcMRa39tuo2LgVfsrrDVtbZoC%2FE2VbeAq4xRZ6UZPHqwaNWQACrGJqMZWzpuy8vHnEL8XbmyzYnwrggHgyPkNikidGc3h3%2FP8IR49FuiW6UuZhv9j0OXrdiI4IYHDBkqZn9bPwxBmhJMQSVtLl9QJ2w%2B&X-Amz-Signature=a619d9c7e75d61ed8cfde28504fd0a3090475230a1ccc043ac94e4b4f16f2a90&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466R4JJ6JMD%2F20260204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260204T193024Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFMaCXVzLXdlc3QtMiJIMEYCIQDHea6Qn%2B1I1x7c0HRNgNJtnVwOJyOiaWgY%2BoE0jD3kRAIhANZdnMOn0DX%2BHEOlyfHggjLk%2Fn4P27It423BTzZqS8u4Kv8DCBwQABoMNjM3NDIzMTgzODA1Igy%2F7UIF46z8ipMlk9oq3ANXP%2F9bnHRaGVWp%2F38LfxGZnj%2BIReaxMleOgIITQE%2BJubplxOlgD6whvnqfbyn4x9wpDXkUxdlhOMb7BZXdzbVeGueMlGs%2B2dFAneyHwhwE4cWOZiH2Jh0EuidjFVwW5WTJulT39SKbLoZVmBp7w1g0yp79uwIH1f9Q2UsrnJFyDstsIwd5Npwy5iF1iU5R5JXqN0k1E7HiRZUkThmUG3MrsfXJvuB%2FzNFU5Reqa68zjd1I%2BDCrVvsJaIeM7EU%2FfvG5Ir5fABO2OvFT%2Fnl8wHzfkg0s5qxQ6QHFiom0dtEHC46ai08NY%2BtZ8%2BOU8k%2FeXFw4hHhX0wLrrJTQDVZJAyr171flRhKrVwPDCUwhJwniEtPJ2Ovdpuo%2BJrclnpfg9O1nJmUoEqs4C1lZctuEZo5EV%2BIPNio0EsOooCrmlSqdXXYKyp7NfZXtLZ7MXBZ1hXPszZ9GuI1fY%2BWB%2BivKq1gHNwMdz7u%2F5cX%2FmIw%2BMMsFcc6ekKCXawQLpnwY6m%2BgAmqgTZKBM4lXA%2FAOXBncXJ%2BXYOy2r3AkOLGdSTL9FPjUwM2eiTJC4rnZ%2ByckMohOg2yibLari4fNaoQqA%2BvAp7YUrYXZPnQ1nWiR%2BXeXTjk5QYpIW4jWeOhE4IfVWTCdqY7MBjqkAR6GvtOSsEqnLHeyU5NFKGb%2BhhcdTMteMlgB2jtJTSuZIP85CBHjJWPV3Nc5T020Zyrieezwo9pUJVbMqPWjC6OeJ1qGb7jm7ntm2seamAwwlSbhEe1OeBFMdgWeDqvmmZW8aYgHdKjmaWmEtX3P9rhMgketbCpn6fEUtLQiCvhBptf3yNq%2Fw%2FqJ6d0igto0OvomQk9O2iEx81%2BygPq4TiVd7xNT&X-Amz-Signature=c192db1e79421840afe5f4004b6bcedcd8087645cc78bb43f25017cedf1214df&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

