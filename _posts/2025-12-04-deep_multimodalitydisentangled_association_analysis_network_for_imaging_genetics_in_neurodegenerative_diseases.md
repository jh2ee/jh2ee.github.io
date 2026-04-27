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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466W5Z3UNLG%2F20260427%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260427T072737Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQD6obBnhoCLBVawFY3fYe%2FF1aks7DihOV5687LPW6X6VwIhALfYDkPFieipZFG7R1HA8GzpO76WA3sVLFZB8ualsUsAKogECMD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzuhAoIhuvBXQbiQZwq3ANg1W8xkSRpY3cMEbDZHo1qDKJIx5zpM05r7C%2F%2B78ujPo4eT5SHZCmPrMaMNL9NsnGnuSDGFNcDY%2BehT1Y4FtCwccfCJrys3%2FGu%2BIfrcvMJtBQdOymBtvUQiV1FNWOvGmi%2FLNlb%2F6t8BywFwQSAWLDTFyBkTfM1w80UR5W9yPaBdB16AQM3ZVcLpxbIWb3gmcnpv57YSXpK4%2BfK5QYkwlvMyHHDjqv%2FuD4vbbMSN207vEqjQjbWoKNAVDjK%2FoKhTvq99x73VDvmrX%2FAhFoJm5zoXsqRfrHG%2B67WelFL4FK72RXpKlqVBwWyyo%2BVxlZ2%2FHhi3q%2FrNHm2Njzu%2FOO%2FGO8kqH6TwB0pqAvHmxJYhq7WTGy9zcFYwl1P7H33OIaTdXhfqJrzYTytBqHz7%2BbQNBHLrnvzosDSl1fDCTDQ%2Bnj0%2BwsJ22aCExExuxRU0nenk6yrqMFEw8MkOkKjpifCj5MglrRLEPCxrcr9m0uD7rXsCmD7g4dNp0iTuJ2gkfGiJzHpKbuNQm69RBA1xAEfwvDGBZTu5MWduAsObmJbNKSQGF7qhY6SQlVcpQ9L3M45jm0nx6UyKW77Bjt2MM7iNOKlD9eYMhAR1YKDXkpsX3ZRk5qz731BZci2xCXpCTCkgrzPBjqkAW1HD1816uHn%2BKn%2Fe%2B2q07CI%2Bm4R9Hm65MnA%2Fsy0c%2FupgXv38lTIVvdx%2Fnds9bjhLUaRghrkGwV0gzeG1l1oSs9GrCbhyEJLFgc3CnFF59NPhy5XfBRbBc0jna6YCmr1xGaU%2BR1ak5BcVMk8102%2Fs4QQ0oG%2BMw3wpkdVhj3N1drXjQ6yxircLdwtX2B0%2BuwRw7XY0LF6u%2Bi5xUsqBn3cg%2BzSf0kM&X-Amz-Signature=ca49e2f9547769f47e23752c17f8e488f10fc4fe01dddb68fcb63bc6f2090e4d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466W5Z3UNLG%2F20260427%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260427T072737Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQD6obBnhoCLBVawFY3fYe%2FF1aks7DihOV5687LPW6X6VwIhALfYDkPFieipZFG7R1HA8GzpO76WA3sVLFZB8ualsUsAKogECMD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzuhAoIhuvBXQbiQZwq3ANg1W8xkSRpY3cMEbDZHo1qDKJIx5zpM05r7C%2F%2B78ujPo4eT5SHZCmPrMaMNL9NsnGnuSDGFNcDY%2BehT1Y4FtCwccfCJrys3%2FGu%2BIfrcvMJtBQdOymBtvUQiV1FNWOvGmi%2FLNlb%2F6t8BywFwQSAWLDTFyBkTfM1w80UR5W9yPaBdB16AQM3ZVcLpxbIWb3gmcnpv57YSXpK4%2BfK5QYkwlvMyHHDjqv%2FuD4vbbMSN207vEqjQjbWoKNAVDjK%2FoKhTvq99x73VDvmrX%2FAhFoJm5zoXsqRfrHG%2B67WelFL4FK72RXpKlqVBwWyyo%2BVxlZ2%2FHhi3q%2FrNHm2Njzu%2FOO%2FGO8kqH6TwB0pqAvHmxJYhq7WTGy9zcFYwl1P7H33OIaTdXhfqJrzYTytBqHz7%2BbQNBHLrnvzosDSl1fDCTDQ%2Bnj0%2BwsJ22aCExExuxRU0nenk6yrqMFEw8MkOkKjpifCj5MglrRLEPCxrcr9m0uD7rXsCmD7g4dNp0iTuJ2gkfGiJzHpKbuNQm69RBA1xAEfwvDGBZTu5MWduAsObmJbNKSQGF7qhY6SQlVcpQ9L3M45jm0nx6UyKW77Bjt2MM7iNOKlD9eYMhAR1YKDXkpsX3ZRk5qz731BZci2xCXpCTCkgrzPBjqkAW1HD1816uHn%2BKn%2Fe%2B2q07CI%2Bm4R9Hm65MnA%2Fsy0c%2FupgXv38lTIVvdx%2Fnds9bjhLUaRghrkGwV0gzeG1l1oSs9GrCbhyEJLFgc3CnFF59NPhy5XfBRbBc0jna6YCmr1xGaU%2BR1ak5BcVMk8102%2Fs4QQ0oG%2BMw3wpkdVhj3N1drXjQ6yxircLdwtX2B0%2BuwRw7XY0LF6u%2Bi5xUsqBn3cg%2BzSf0kM&X-Amz-Signature=ca49e2f9547769f47e23752c17f8e488f10fc4fe01dddb68fcb63bc6f2090e4d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QF753AGG%2F20260427%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260427T072737Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCxy9MG1ePS2p0QFJvEifkQUedoeUUjFVTH7pLAuIlM%2FwIgFtXEWU649XxD%2FtwwZZ1pqcCubg%2FDx%2BHZH%2FNrlgkv%2Fx4qiAQIwP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDIzNcw1SnAmP22sECSrcA2L070TszD%2FW%2BjLBgAYDcEGNajDK1ZQah0Niu9V1J0tCauD86JoxN4kujBdA%2FAqELaM6Q5ZNfS%2F%2BB9vH8vei9C2KV7IgGwc2NgXNPBT0uJCrUOfy7qggNxHZMZmGUke1mmbTg6On4gQzJCyG8BrhqDpdPONmPrPuuJHBfBuMz1f9NmTwVE%2Fy%2Br4xHqxP1ccN%2BogQx1D1urqBLhS94xi%2BlmvlHkRbv34vQ2T8cMty63we6pmccis8OXuNoXlME5uwPyEvYtqmR1I1g40e7XiWQgb7PKxz0HjJLz5apn97FZzH32KSfHN0I3yH%2BHZZ6coFVXcHtFBRPDpILibhpO0SzPytXAnNxA%2BZ%2BkQSf712bDrxnxuATsdR07%2BoJxWVuMzpV1%2B6E5E1NfLdnyaMhhN8clxZshRzKydkfEOUDq5E%2F3DsVfLjCE7s6dtDJNon91og8THq%2BTENVETVpdSbSy43RMsySyM%2F1fmMnAk%2BYHRziQcfmGQo3NEQUZPn%2B3BUjlZwFXKw8ubNkUKBlcuCQ20vG%2F48cM9fdqCcxtXNmargOpUz37lvqRv1Pa6nLWfivtSvZS4WM%2BP6PXbNdASKvYmsnvuJeLYkdKixQyZaY%2Fy9w1ZR0KL8QXVbes8HT%2BK7MLyCvM8GOqUByDZkI07EP%2BlC63rSHTaFwI9sRFATI%2B1Nv5xvzLeTLin%2FDqwDxKHX06uWFqvsSIl%2FHrddcp6iOicPJVdh%2FEoQ7OdcRUY2Ht%2BjwAqalNFavulGkx5MxKX%2BqD%2B8RExaHJN9aEB32M2Mr%2Bk5IJRXdG%2FjkI3cN%2FEQOGcOxsGu8sW8Fu%2BMyftrEc0LDF380ofUIiiGM67s%2FEW7En7myR5aFjQ6fPLTpdmJ&X-Amz-Signature=7ecdd5e7eabfcd56ca257268ffbcb660db31f2aa3fd7d8d9413c3b76bf887b3b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46675NGDZDS%2F20260427%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260427T072739Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDnFzybUXzHammJpoYwsD6lC9ALjAH70jyZN8uaazeX4gIga9N0sEvQhe9LpmQ2LNJ%2B4RCTI%2FTicn4i%2FKysKRnPLoYqiAQIwP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDPqm%2B3t%2FpAuMmzyDOSrcA5Itj4Hnm33uW%2FZ%2FkyzQVfD46ExkJ2GZ0%2FV1FMS7dHgjq6hVSDsH5UjxivxcAaDaWcELYakAzxJgqs5g5ep1peXydV9BuGpOgSiNnzeq6ugsdHgWHOCB6yPPbLF5gVIOoVSa3%2B6VaPfufOtUJvW4avyc%2FO556oIAH2jcqwnpE%2B4UmSpx6KaU0XhRGQxfEAYYAoFECg1Iw6ZijgVCrlIKCK%2BmBdlH3DliIH3xvaR%2BkGF7iL72u%2F6tgMffgcFwgzJFOQ70t%2FL4x9STBr%2FWhSNBoxTQAE6gnE0AlV5MNCxwKtssSGNSqLTczlduVC44Luayb5XiRH1umlmcgYjPkOKjjzip3659cj02X0xTrwcIuD%2BMplY16UjXoGHDtSWBwDf0JssyKdrlVSzmPR0xgnCFyBk4DydVAhmRE5DTZ13GjThcge9KM5b%2FHevrFM7vaGi7h0tquq29m2ceotKM7vFP2RymEO0Pxm2D1nn9uDK%2Fiu06453Mnbyvd9xfx20gZ5qquMgyGEdXWnLCj83q8FOfSnzi2oGbRNyXW2VHgIMJFbV73m%2B70AdHiuCRV5vy0BRzasMslOSYUpTQnfsLDa7ENnzeu3IVUHGvf5ixmvwoTEeEUV0N%2BtcMv95kf2D%2BMLeDvM8GOqUB1JXD6Z90cfVvHrjDs2AEaO%2Bl8jRSmxuxtOFHw4sA80uDdqABPOE4YyePVllb1ozzmeNr0BhBfZsR%2B7r9XXeH3gP5ij7%2FsE0RNatwxggmP0LvUvwf%2FUP22iE87LWlByX6qgas7YKxXn2BCvP2YInXvBniuevfEBfwkOF2an3UzqMQl77Hk7U4ckRsVHuNL2N1sX1wZP5Ms5IymWL1jNGboovnTFCS&X-Amz-Signature=a5f500473d826c473374c473de45c10d903286898edd4500f1765dc6b38342de&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46675NGDZDS%2F20260427%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260427T072739Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDnFzybUXzHammJpoYwsD6lC9ALjAH70jyZN8uaazeX4gIga9N0sEvQhe9LpmQ2LNJ%2B4RCTI%2FTicn4i%2FKysKRnPLoYqiAQIwP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDPqm%2B3t%2FpAuMmzyDOSrcA5Itj4Hnm33uW%2FZ%2FkyzQVfD46ExkJ2GZ0%2FV1FMS7dHgjq6hVSDsH5UjxivxcAaDaWcELYakAzxJgqs5g5ep1peXydV9BuGpOgSiNnzeq6ugsdHgWHOCB6yPPbLF5gVIOoVSa3%2B6VaPfufOtUJvW4avyc%2FO556oIAH2jcqwnpE%2B4UmSpx6KaU0XhRGQxfEAYYAoFECg1Iw6ZijgVCrlIKCK%2BmBdlH3DliIH3xvaR%2BkGF7iL72u%2F6tgMffgcFwgzJFOQ70t%2FL4x9STBr%2FWhSNBoxTQAE6gnE0AlV5MNCxwKtssSGNSqLTczlduVC44Luayb5XiRH1umlmcgYjPkOKjjzip3659cj02X0xTrwcIuD%2BMplY16UjXoGHDtSWBwDf0JssyKdrlVSzmPR0xgnCFyBk4DydVAhmRE5DTZ13GjThcge9KM5b%2FHevrFM7vaGi7h0tquq29m2ceotKM7vFP2RymEO0Pxm2D1nn9uDK%2Fiu06453Mnbyvd9xfx20gZ5qquMgyGEdXWnLCj83q8FOfSnzi2oGbRNyXW2VHgIMJFbV73m%2B70AdHiuCRV5vy0BRzasMslOSYUpTQnfsLDa7ENnzeu3IVUHGvf5ixmvwoTEeEUV0N%2BtcMv95kf2D%2BMLeDvM8GOqUB1JXD6Z90cfVvHrjDs2AEaO%2Bl8jRSmxuxtOFHw4sA80uDdqABPOE4YyePVllb1ozzmeNr0BhBfZsR%2B7r9XXeH3gP5ij7%2FsE0RNatwxggmP0LvUvwf%2FUP22iE87LWlByX6qgas7YKxXn2BCvP2YInXvBniuevfEBfwkOF2an3UzqMQl77Hk7U4ckRsVHuNL2N1sX1wZP5Ms5IymWL1jNGboovnTFCS&X-Amz-Signature=e877d06e0d48dfe40d58d8db06b0cd2a213b93f8ca5a8a0eea447740b847a1f5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663NKHPL7R%2F20260427%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260427T072740Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIBPjepd%2F9ZytHVia0%2ByjyBciFSS3RPoUnyfzsm%2FmTgnBAiEAtj8ugiZVH3SVnePAN49IG4iJf5oDl2iJ07JkJaO8RH4qiAQIv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDLDuBJ2wCHwvFQANECrcA1HrYrwqJzpWzxgHhWzmbqeY5EzQRNuaO%2BqTztf7y%2BlbHJL%2FRWJ46OsoaraXt2YY6o4V%2Be2ibJygGQIOYboC8XtQYV1FjA0kA5uh7EaFgAAmP%2FTo%2B%2BUWVCKKJ1Q4gnwT9ZkOOV4G%2FUXP7I27YnLIbkWpfNRWx8LjPXCMlAPTJqR%2FpBT4vaT%2B0R%2FWkWq2s8P28cBZXNBqagcMPnC8omKzAsll8fu0Dp793%2Fwvy%2FCg5rbPDEXOrceIDJ%2FTGzVgJr7eD77sh7T0Ex9P1uF9Ye1I1qDzEF9uEh2VweCuRPFujoMhtepUiGKv0mtBCuDfcofCY2j8DLhbK0%2BfqnRzgANaxwmZw5RoCh3kOrKOEs0RE6o%2Fzlh8yE9tP15NIOBhzWdJEcCM%2FFZ%2FEQP5ZsFTChBj16uCJNM0Ba8PiqjPKzQBuMCNJWeaxyfyKeLKKgJ2NlOaZatsSrZ7ktAQ7x7IdO1BEfrwyOhbd9bppbRfdhp0%2BtgHiBztOoEe73ExahdZ41OgSSqr6GHSWPaxVqVXX%2B%2FDHyjBoufh9NgEPBPsmSiiDL%2B7fDGq4f8Gw8rSZbKow%2FXel%2FdsP5pUX2ulUpMdhmpDvmzDz8XNtQ5kLIy5K4ZMSG6PLmwQqY4KnIwm7bFWMJSDvM8GOqUBdy5%2FcUw%2FFgcowzXZpo6voQ0iYqEGJ9byTMLUAkcR%2FWSypknRXCEtVfc37V21QhIBU%2BJsGd4ImO09xqc6dAvHuZMvosQJPaHX7Hr6aOkDxLt92%2FRooVYxHlAHRPYznnfZpzhWCjY8dXLL28uoxD5ub%2BW4XP9tEe%2FHUZriK%2FxxWmdj%2F9kHeSRHYqg2XKKibjd0XK%2F71UNuc8P9yHGH137mHtskGMGS&X-Amz-Signature=83564526e31e5f7412b2b1833ab2876d71e7fed793d5b5876eb55b5125fa3992&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WPHIW72L%2F20260427%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260427T072740Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIGXwvFzoJagaw%2FZKULf2uWjvjySe3B46oJRov7iJDYJfAiARFfqb18pRKqZUxtEghW2ZRnLKPr4JR6EFq9pw63SZcCqIBAi%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM84bT8wAY1jrFlHaeKtwDDq023sG5wMWvIcoFvVyCOJE52OUxxeQo%2FB9RMa7eb15glKHPR6uGUEyr1WFLmGJX1ff1qKVflpgth2KZwvjn0WpVTW5%2F%2B0goCQFVfwL4DhG6PJZ1Ll5QMlTdawNy%2B1yP9YI7uVAbGBjLvL7EfWHlWUibKTd25RgIUpzmO9jCOf8OJVjJuDaKZ1YcQsLxypcg5cj2jn77w1a%2FX1SGCeo7KJO0KeObj74pLbmEtsZIIMNq13NSIhMoB0%2FLbkhPmrKR5KvdSZ%2FMMLAu9FOO8mQ1wjM0o%2B0JudDFBhxjqHpu6fBcJRGMdVt6vTDHnojHM7m3cbzlziN4AOarmyzos0rEZhyLPvCDaAgj8TR0XbomENMZdRROUz0R%2Brw8gXjo2RCKTWfPbkDjVb2g74csksyYaQuKGxRtvpPPaP4ykclkBPq6FF8sKeFVRBDUjvk%2FHMNFn1IeAr7qJy7%2BwBzLwdncQNlADjcBghi6nxQ%2F0bA0yV3Cet%2By342y0FnrLM%2FjISGDqg8nJJmz7L%2BS242LxpRcSyiQTNO0K%2FXGgTnMUdTsxrbfFTRrtbRSnoI7A9X3LIwQHVBNgsDnQdJcfX7veeolPc%2FeRR2i5sKbr0RuQ1XY%2Bes6am3bOo9h2n7kxNQwuYK8zwY6pgFAPzD%2FYEcjVb4oVnbJh%2BnbikTZ4NHws2i9OgubpGrlSO8zERSnL4NN9ob%2BbLWmzYuB4mROGxYsD3anN%2B%2FJX0QiiKvN5uEIWyHMcxvvT%2FQVUhDwksxnVCD1fwIBfRyt%2BhTFRk%2FLRuM2uZ%2FcfeRQsNEvOFf2V3Us4HMQq8U8y0B19ggOsimgTUfp%2BDm1wTjulMueP4Hm1Rc13jyuuHQZJwLiff0UDRHj&X-Amz-Signature=5aadcd3d2804f724e7f7f51a99623b8de48260bba760d9a37e782e79dab5824f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RBKE44BK%2F20260427%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260427T072741Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDBfCBeMWyikyOPF8Y%2BwKb3biwp68%2FeSvqKaNWd9S3gBAIgPlLoTZPy7nx48ETpJh02twmfavgKj6yz9pRF%2BGGu48kqiAQIwP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDIvu45IRwa7vR4lUAircA0rQI%2BWcTiARUBLRt%2BUFyc1zHASwR30wY3as3wRBuUFP5vEqovvHe8VSOyK8nuCHPTha3nC10QBx3R6%2B6g4SJ%2B6d3Td1BqS1jmf%2BbDx3puTHnbCpRh6QBkbpRR3syyXP%2BtaJk7pKNudMMhJl%2FvbwkpN4BaTdohipA7qVOdijPzwVhrbZfuZEnfXDcok9S0WZ%2B9ZfyrqpwktPuGE1BdL3uc6aA0rBQzJP2P2sLBOYEU65irUBHIcwMa9r8yCBb%2FxBzOe3DUGiGNhP8xvg0H7EsUFAMrLaBd5Q3RupiZf8MMl2ADRCD5jq8t4yvvr3LIHPQyeAJVoL122QgbIvIPIbhf504%2FzuiX%2F1%2F%2FknhB%2FRyssQeA3%2FjJK5Wpt0P4OcWyuQMcASbIn5%2B72Z7c6IkHkEW5DBWozEi2GDLaRlrQZCzvA8kPzNFXI45bS%2F29F99lRQdm9Ot1SSTTOnkMTKNcQahHpFqG%2BMRPaUtFuHoGDZ%2BnX0jTHEes3A1nwVDQyJoBsULeA1Cy3JITnpvJ4ffbgGYeWS%2FfWABUKe7J3tCcFIxu%2FBImNJGZcGq0iaMWD%2BqJCsSZ4mGeqZTqqLJ1KKC2vBebT4yFcNbVclXDfq10us80DcriTh8M0JWnOz8vW2MMCEvM8GOqUBIgoKM%2BfAmF7bKw2kvTRKNBYUPVEoQmQ6JrOluLWOmvyewOIfa%2BNcsv9nLn8VK0%2FEGUUPlB51qpo15KJ2uAzFOak%2FHOkotCNU8v7YD%2B%2FTupLpFsk5QiWhzjDxOva5JXnnzB%2BTxqR05ii%2FBt4WDwtZ%2B1v4YI4rfq9ZC0td3l5Rn7pLdbS71htGJ%2F5LGVlR4v%2FrmnRnianLH1snAD5nHzP4mGCRDU59&X-Amz-Signature=16c451856ef72b26e404bc469e3edd34bf4b27c03208c9507237f5a70ee8bd11&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662AMNNFF3%2F20260427%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260427T072742Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDja%2FTLiXeiPatDwq16Xjhc4zNy89RFH6xbFAbjThewhQIhAJO0NEUUsUwDtJfLhEyeBGDXefxFsbmweJY8gEdJkyfJKogECMD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igz3k11IKUMQfwj1sVAq3AMfrhEj2aOIIL9vQqYtYN2MUesfF9YQNtJpE11abA%2F5jaMvhQEDFy3s7F8wC6Mqk0LFbJeuIfuV86Ay%2FiCQl2149rsiq4LUc5q7WbEC8RpjwiCQ%2BJDKM3P9KgGgkwfJ1gm6afte4UGt%2F62tRmez0UZuckYamwkVx7Sl%2BRuq4njqE2GoIkkQ69vrFG6AtjDa%2B24jyw68f54WWt4H19fVZXZeVrE8tPaLDX367KXFFSkWjSQHYGZJFs9iQfyCZMMAp4RDSqWBeAESv%2F4D%2B7S4%2FUXd9F3yGz5X2XNCrxpih1YiO2ZR8gdBdEQCr4GoG%2BAPFMWVXjxCaoD%2BDVfKyg80a8YFwbzChrtwiArvO%2F0EJ%2BnsHdGI3%2Fox58SzBdLmhA1DOptLNDIj37a66x2AAZsR5eU7sqMsf%2B%2Bgd%2BuC%2BCP9jWRie4upp1ZqRRXTDHU8vEcOAbANnPiFcS%2BbphQ0oIB05eskFinhA0WQum1DDXHTq7dqg0IsvYwEFSR1xK5nMxlQv9sVso0nZ60j0Vy4g4NQXH5avFovY25RdVpggOiQ0gKpbKUA%2BD%2BAY4vqDD3wNCuG3cA64N1OzgOmxkjvmMg7aqpiEXxp6wMpOH%2BMfVXbKWmYUa5ogZf52%2B17vQ6tgDDihLzPBjqkAal3A3yI33wV4lQg6M1EPySuhnDSb7aOSxglODkZseFyvvb4zj5QrX02L6%2BPsfhUrrd3lAoLEdrZS0ZIWJZYI3%2FuF%2F3VsH9BP7ew79U0J8rP6m%2B0ztHX8tcvMqfCxi0E7YCJPMKKKAjQ4tli2UxwEtVS8C6FHKvNj%2FmZim3s9KpurMHChdi80i6i8eOsf7vZqA%2FabPAG%2B4Sml%2BJ%2BE9WedQE%2BYmUL&X-Amz-Signature=1683fe116c50d6b408b301a3f60a8aa6d2e528a83b6b7688101fd2e74508a47d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662AMNNFF3%2F20260427%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260427T072742Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDja%2FTLiXeiPatDwq16Xjhc4zNy89RFH6xbFAbjThewhQIhAJO0NEUUsUwDtJfLhEyeBGDXefxFsbmweJY8gEdJkyfJKogECMD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igz3k11IKUMQfwj1sVAq3AMfrhEj2aOIIL9vQqYtYN2MUesfF9YQNtJpE11abA%2F5jaMvhQEDFy3s7F8wC6Mqk0LFbJeuIfuV86Ay%2FiCQl2149rsiq4LUc5q7WbEC8RpjwiCQ%2BJDKM3P9KgGgkwfJ1gm6afte4UGt%2F62tRmez0UZuckYamwkVx7Sl%2BRuq4njqE2GoIkkQ69vrFG6AtjDa%2B24jyw68f54WWt4H19fVZXZeVrE8tPaLDX367KXFFSkWjSQHYGZJFs9iQfyCZMMAp4RDSqWBeAESv%2F4D%2B7S4%2FUXd9F3yGz5X2XNCrxpih1YiO2ZR8gdBdEQCr4GoG%2BAPFMWVXjxCaoD%2BDVfKyg80a8YFwbzChrtwiArvO%2F0EJ%2BnsHdGI3%2Fox58SzBdLmhA1DOptLNDIj37a66x2AAZsR5eU7sqMsf%2B%2Bgd%2BuC%2BCP9jWRie4upp1ZqRRXTDHU8vEcOAbANnPiFcS%2BbphQ0oIB05eskFinhA0WQum1DDXHTq7dqg0IsvYwEFSR1xK5nMxlQv9sVso0nZ60j0Vy4g4NQXH5avFovY25RdVpggOiQ0gKpbKUA%2BD%2BAY4vqDD3wNCuG3cA64N1OzgOmxkjvmMg7aqpiEXxp6wMpOH%2BMfVXbKWmYUa5ogZf52%2B17vQ6tgDDihLzPBjqkAal3A3yI33wV4lQg6M1EPySuhnDSb7aOSxglODkZseFyvvb4zj5QrX02L6%2BPsfhUrrd3lAoLEdrZS0ZIWJZYI3%2FuF%2F3VsH9BP7ew79U0J8rP6m%2B0ztHX8tcvMqfCxi0E7YCJPMKKKAjQ4tli2UxwEtVS8C6FHKvNj%2FmZim3s9KpurMHChdi80i6i8eOsf7vZqA%2FabPAG%2B4Sml%2BJ%2BE9WedQE%2BYmUL&X-Amz-Signature=eacf98070835544b2d9d7e613feebefbc1290920dcbeada7e375a3e5f8e76242&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664RYTGKMF%2F20260427%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260427T072736Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDaTnPW2fOd2BHWflrL9%2BMYypragHcUDVI9wNn69zd7OwIhAKZI3m1VlmIEUXzCC%2FPn1HD05WmCMO2MN3VS7z3oFzopKogECMD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwrK9vMRwLakGUQ%2B3Iq3AN%2BuLTxi7D2dwvSebGcwUvfyQoB%2F%2FgJOFoc2dZlRJFr8kSQQmX9AD3GqbYrYcnMofTlt5%2BZ%2FHUZs73G1yzQkbqy%2B460NigumwHhetU7UTvReASTRPhV5uqR30wG%2Fs3Cq9kl2eVzg21Z4ZiNVwWZtXbPqgQDRY02fpARspbKQOuI7DzaUXsFD8VV%2F8GBz11NAHlOup2ayRRkRDB4HrTxc8zcziaSeaUhjbctzlgsEAfBhCzn%2By5nbdAokXluIbz8WA04A4QIk%2BmBTLL2NiyOAKEoNTCRJL5ozJhnn5mBJxqhI%2FGKQtamdQWc4JnkVuYgghNcdzgD6F7YCJ%2F7elufj1Lj6QrSZlexCZqZ%2Bkqe0DJqcRLnuLx8soG%2BjpVf9Zw%2BjdS0WxxvGhOhZrpXhIXtdMbKFMo8gojyQuW%2FSwXFrUcOrFp4QbTL5XRt9yb1mCPMvzqeBHvoMb1iwYczWlWJeI2v34hhmTxxEdaY7DdyiC8IHwWwRbD8euaFod7vJVC8uWLe5qI5h775RfIdq10S%2BwU8yoaLG%2FyKiCQ82rs6vbFDlNQs8gCeXOm%2FAkOiqPrM3JTNpcwEFpXWUf7QYxkEBa%2B5wsBVkqzsRG0vLkElsknWg0xdcY9rThESfUNhgDC%2BhLzPBjqkAc4lFV9LV%2Ffrl69YHaUeXCD5Vz8XOWZTwZqwas5LPTxRbOS1k%2FjqFhvZu%2FfTlJMhWzIQYB7MOGeX6ZIXzPrvvYrU5KmvxDEK6oRYrp%2F2yuf5nd5vyN5KRkX4HkL91kaEWBH0DoeryhTplK%2F91iZho5Xp0yZZJHNQBxzvepq8hezsA%2FiOBzAN3EFnX%2BLNvbbKgEd5JoRYnGohkkoR%2Bx18v4wrYKNW&X-Amz-Signature=775f8725431c5dbd3fe96d372d74dfbad53fab6bfb3c6563e5e1a41a3254607e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665OP6J6OT%2F20260427%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260427T072748Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQD2tpdCnA9XNiV5KcM4hu8tCZYsj63EapfW%2FYhZ7rac4AIhAKjpklubG1PEZTqUibigUch6teaQBLUj2jQTUdf46UO6KogECMD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igx14%2BQSipgkfmR1qoAq3ANrTPPx7ELn0VHVNQIVZSpBVpWkvmwhv2stWqgKZqUAYYlIATExKKYGt75ZcKjekVJHYfbx41W%2FWgZ02JQhLTv1oM3mvTDIPSWb3KuA8qFmpcL2swZkxBm0dxlPXQKjHidS0hxp7gZPqu88FGAwuGRMyXuj5tDsmCU6nf6oSX%2F7K%2F8Gw%2BWNWlARFBmdevrDPhXGO%2F0jBYRtdhJXaNq4%2F9SYXFa25Ae0o24if8UzGKwQOyksLgltH7hVZkxjkinK20bMA67L8OdmNgal8jJ41u37h3x%2FSPUSzs3Bn7oQbH5z%2BgOPdxu8PodL85ONw5UwLJba%2BbFcKdYurnNXxkSOpw72fD9WLnawlQMt7lika2mN85UVey2FCHutTtJMjYRtoKO4swg6BYC5pS8r9q0o0VC4xMdHBu7sUyFNWIFlFglQI5KMQD%2FWNdbvNIAEu4%2FFMxTXfVv5DVs33C3t%2BEGT%2FIMuHoMeFjVqqzH64LygkUg9m8WLG%2B4ghbovz6b8J1JCFdC8n%2Bdc9S1aMBAFm1zp4b0fkm7MqxO339h9u%2FSF%2BWvMHifLT6e%2BLM83xD9kmdJcANZMKmDhAeT8lHEGamn0%2BKZLmdxoA0u4uSJifVM%2BGuVCeDUePKmROMHcxpUDPzDmhLzPBjqkARc6Cn0M7oieezRriF6nrzq0r5tRKIsAQu6Fa0blzYuTTn4HPzneez2JyEKBokngXto5IEprDTuNPEDRKjPOVFuv0bztCcNn8cAQS3D2JtSCL3MLbDzndplyAmmPGZA%2FD75xPf57v9kkksMnkKL9a2qIEhS4IsMXaOaHQVj5iU5uElpS9nkj5BUVijw9iP%2FaS2gMHYfiBA2TXIYQSqt3ULscagng&X-Amz-Signature=59e08ed205a7841071a9e38dcbf191400ca0bc7554eb8122b412f8775ee95ba3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665OP6J6OT%2F20260427%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260427T072748Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQD2tpdCnA9XNiV5KcM4hu8tCZYsj63EapfW%2FYhZ7rac4AIhAKjpklubG1PEZTqUibigUch6teaQBLUj2jQTUdf46UO6KogECMD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igx14%2BQSipgkfmR1qoAq3ANrTPPx7ELn0VHVNQIVZSpBVpWkvmwhv2stWqgKZqUAYYlIATExKKYGt75ZcKjekVJHYfbx41W%2FWgZ02JQhLTv1oM3mvTDIPSWb3KuA8qFmpcL2swZkxBm0dxlPXQKjHidS0hxp7gZPqu88FGAwuGRMyXuj5tDsmCU6nf6oSX%2F7K%2F8Gw%2BWNWlARFBmdevrDPhXGO%2F0jBYRtdhJXaNq4%2F9SYXFa25Ae0o24if8UzGKwQOyksLgltH7hVZkxjkinK20bMA67L8OdmNgal8jJ41u37h3x%2FSPUSzs3Bn7oQbH5z%2BgOPdxu8PodL85ONw5UwLJba%2BbFcKdYurnNXxkSOpw72fD9WLnawlQMt7lika2mN85UVey2FCHutTtJMjYRtoKO4swg6BYC5pS8r9q0o0VC4xMdHBu7sUyFNWIFlFglQI5KMQD%2FWNdbvNIAEu4%2FFMxTXfVv5DVs33C3t%2BEGT%2FIMuHoMeFjVqqzH64LygkUg9m8WLG%2B4ghbovz6b8J1JCFdC8n%2Bdc9S1aMBAFm1zp4b0fkm7MqxO339h9u%2FSF%2BWvMHifLT6e%2BLM83xD9kmdJcANZMKmDhAeT8lHEGamn0%2BKZLmdxoA0u4uSJifVM%2BGuVCeDUePKmROMHcxpUDPzDmhLzPBjqkARc6Cn0M7oieezRriF6nrzq0r5tRKIsAQu6Fa0blzYuTTn4HPzneez2JyEKBokngXto5IEprDTuNPEDRKjPOVFuv0bztCcNn8cAQS3D2JtSCL3MLbDzndplyAmmPGZA%2FD75xPf57v9kkksMnkKL9a2qIEhS4IsMXaOaHQVj5iU5uElpS9nkj5BUVijw9iP%2FaS2gMHYfiBA2TXIYQSqt3ULscagng&X-Amz-Signature=59e08ed205a7841071a9e38dcbf191400ca0bc7554eb8122b412f8775ee95ba3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662H7TEYZR%2F20260427%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260427T072748Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIFNNq6%2BiFw9sik3bw1rIX8EXCH%2B0v6Kb1JCdx%2BAxNDwXAiEA3RN%2FP4DUblvmVOrjUx8VuW8toMkwX0FG5ohs4l7OWsMqiAQIwP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDDsxrhQX8xrBzrCeWCrcA8HoxEr7ZNbgXJf4OYolGJj8b710Dj7618198%2BpxEdttI4wSYq%2FYbM33r4kC01x6aGLvDXQHlR0M0gqV2BeI4ERjpANtey4qFgVteh2hWpK2VdTGu43ZV4f7Ts1Uu0AWwXW9r4e4QrOG9kbLo%2FfDEXyi801JvmHOGxetluMkl96W1rwgj4vSk4ZRsojw3KS88ht8li3M0Z5nhsaY9W5coYtneF0IAeL%2FeroUugufNZOa3YBaD61zFtn7QSjvZnBxwCUbTV6U%2B10XjtdysNSdqgqShVgeLRRcHWSGFUNVzFcCl7C%2FYT1lJPUoP1Eg9N76FQZIx%2F1Xtm4aYijYwQf1LuRbYOpTAPsxrRB7aQx4Y0RIYQHrfN%2ByRE4RyX87%2FAPB3rbBou8PdHtzkydJrDuLyZlL6UN3z2TW6fhPixqHPygyKskTbf641zLRIpvtm3FqWh6uBogdOODMg%2FxYZGxWXb8MSwsbSLrIDhy40ekKz%2BDS8o5rdMHEol0uLQCOQlC%2B4URe2CBVtdyTa0qH%2BAK%2BEm1sKj5H6amR7FVu53WivkjKz%2BCmF2IILLkgNZTASh5DUI1x%2FcADAU3pQKQA8D2ll4L8PhQI%2B%2FZJpZNzxRy%2B1v8uo5%2FtGj1c34afuceCMIeEvM8GOqUBWe31zY4iEqwgvqcDtXLq7829V2lOjeoIC3LQTPnvS2l%2BKDa%2FJEQ8ymIzU5Ts%2BfMYiqmEF8EJAzoxvyRJpOYSlw4qDxX17Oab3KTWbMd%2Fj6DrW7dhNJVBy5slfdTIbMAcOidvJoEuzzJVe%2BLZQ6O2Ioc0CWCLS1jZlTCxr8%2BfNbmJ8f%2Fr1GZRohThVYOg5x25qOjL3qDOqZeyyv%2F7g9yxUXi7juwJ&X-Amz-Signature=2fcd123e4100712b8ce0cfa31237b98d220f4e149e73c7550015211741005ba7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

