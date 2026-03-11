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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ULYW67AT%2F20260311%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260311T135538Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCXh8yAVDpdJ1ynhoPEwwFegDSfSYw6%2Bx%2B8gfs2gH8GxQIhAJKsekrDlITQYYrQKrXqOwGpv2Mq85rBYzH%2B8%2BIv2u%2BZKv8DCF4QABoMNjM3NDIzMTgzODA1Igy2vdkHK3oBujL2t6Uq3APb003gLCCZk4NXq3eD819cDP0%2BCzS3Q88j7G5Ehl93xDKKNFl4EneffVj7xpXtz8rUlkdCoOtl58moeh7nrHE6m6oRT7McowyGJiqa%2BWXI8qKLWXKlGXcm9Jv0fgUgpicGb2Z0RqNxbSk0fORkl9egd%2Bn4PdJR1EQksfe3ONZdwYerlmevP%2FJzSCypqELOgnX6qnF31XWApEoU7lZMHm7PVCSGlUyGsngf0o7gC4wNNpqLP8UtqaXkq6dcA55AnqxRYqBVR9COXWlHuj1YUXUXjc4J1%2F5E1ToRCh%2FoJUgeCCTJTVQ%2BVF9tNSYtwM9IxecZhsbNk0RkCWVEiGCUMrtb8B2zpegs96SKZOagcu46mvwkqC7bLEfe2dhiuXnt34xkqoIAuhb4BCaVC8UZNTzj3qNRPUmuvISA%2Fo%2BDlBYV9Fl7gqCld9%2BF18dvJiQnLrh51ODqDNcJn5dV2O2AR%2BfIHasw6qDwb9fM7EEILw4e6f46UREvUcz9lDTd%2Ft5LF9m08FpZ6K2TDmgue48Ql5liUTMLq6Oes1isQeLnVzsqEfw9IcYyrNTmftdup9m5UW98yA9O4JllvjkoNTtIt3XDki5qEB55H%2FppI5dzzvY8kDNtmpUsKo6CjEZWQTDO0cXNBjqkATHdDBvanTyEFqbNbbb%2F7VdqHZRzecSEOhR3T7sIMootcdvE94Ec2NdJc78isAZjElRMXswuwj7a5HOnL2HA%2BGU9EM4p4yJ3MHJxJ5taunJQOJhjJ%2FgyZbijZOIemEUaieXgq86W37p3%2FJBHfWyGhrqneguacv9d51mDlYa2cLKTunQ%2BsrgDNRFJZRWJy6voWvVfUTwU2x9e8l4XFHxbBF53pTOS&X-Amz-Signature=d53abc764b60b4b9aa95229d3c03a9f1acf353db4ae647eac5779c8833161102&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ULYW67AT%2F20260311%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260311T135538Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCXh8yAVDpdJ1ynhoPEwwFegDSfSYw6%2Bx%2B8gfs2gH8GxQIhAJKsekrDlITQYYrQKrXqOwGpv2Mq85rBYzH%2B8%2BIv2u%2BZKv8DCF4QABoMNjM3NDIzMTgzODA1Igy2vdkHK3oBujL2t6Uq3APb003gLCCZk4NXq3eD819cDP0%2BCzS3Q88j7G5Ehl93xDKKNFl4EneffVj7xpXtz8rUlkdCoOtl58moeh7nrHE6m6oRT7McowyGJiqa%2BWXI8qKLWXKlGXcm9Jv0fgUgpicGb2Z0RqNxbSk0fORkl9egd%2Bn4PdJR1EQksfe3ONZdwYerlmevP%2FJzSCypqELOgnX6qnF31XWApEoU7lZMHm7PVCSGlUyGsngf0o7gC4wNNpqLP8UtqaXkq6dcA55AnqxRYqBVR9COXWlHuj1YUXUXjc4J1%2F5E1ToRCh%2FoJUgeCCTJTVQ%2BVF9tNSYtwM9IxecZhsbNk0RkCWVEiGCUMrtb8B2zpegs96SKZOagcu46mvwkqC7bLEfe2dhiuXnt34xkqoIAuhb4BCaVC8UZNTzj3qNRPUmuvISA%2Fo%2BDlBYV9Fl7gqCld9%2BF18dvJiQnLrh51ODqDNcJn5dV2O2AR%2BfIHasw6qDwb9fM7EEILw4e6f46UREvUcz9lDTd%2Ft5LF9m08FpZ6K2TDmgue48Ql5liUTMLq6Oes1isQeLnVzsqEfw9IcYyrNTmftdup9m5UW98yA9O4JllvjkoNTtIt3XDki5qEB55H%2FppI5dzzvY8kDNtmpUsKo6CjEZWQTDO0cXNBjqkATHdDBvanTyEFqbNbbb%2F7VdqHZRzecSEOhR3T7sIMootcdvE94Ec2NdJc78isAZjElRMXswuwj7a5HOnL2HA%2BGU9EM4p4yJ3MHJxJ5taunJQOJhjJ%2FgyZbijZOIemEUaieXgq86W37p3%2FJBHfWyGhrqneguacv9d51mDlYa2cLKTunQ%2BsrgDNRFJZRWJy6voWvVfUTwU2x9e8l4XFHxbBF53pTOS&X-Amz-Signature=d53abc764b60b4b9aa95229d3c03a9f1acf353db4ae647eac5779c8833161102&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666FHRLCCH%2F20260311%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260311T135538Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIGio%2Bk1m%2F4%2F3DWoB2Fsy2w4AuHyRCJxlYI0nx%2Fol3GmSAiA6qXgjSlI1mU64VsxYuhxaMK%2FTGbGRjMT45Y4ktdjIKCr%2FAwheEAAaDDYzNzQyMzE4MzgwNSIMMGUsMjC91oF1ddU8KtwD11g%2Bmj0u6K671gEtIlWA8Ipb7iUlmqC6R6L2HsvBBxtRaTLJKe%2Brbu97q%2Fkrw8%2FU6I8ksA3vFJcKLLAcmQFmYSQPz81%2FwLIiRBd2ZGptRUBz8m%2FNGRoYhy26B%2BEu2Z%2B602sDwTv1uQWjHty6b35pgTElNBdBlNJqcMSUYIFMEU07y4oYv99pw5z3d7iI5KEJ2HcgI6vdMtAachY9xOuni81xHu9Ll5OmcLJxJtOJ%2FiwtDxbMS9rQh1e8OLPH072DQflDrViq2FOW1KX6FbTECAD%2BOReQ%2BpWc%2B4aowsx9apeRHAcD5KkU1wV8Lf9%2BdK9ge5QD8Ig6qH32qCQVeYS9Pib7MyexdcwaGudxy50WavGMBRxt8ByKDnXENUGuXTOvFE14jGecXK3FDbbYVnsRdihhkSyqgmQr7aFeOSFZ%2FVq3k0vzYZaK2WWGIBhLnDOWHnyqKJS2czekHcy2YEB%2FfECmPUirob7KOrc2lVnBS9sf3gdoHmGrLV7KL4xeMUxlkDBKcL58Y6n7o06z62KcWxNeLPxkp%2BAMCF8nHndU8j2gmBlzqn54DcADhZC8HBymc%2Bx3rtp5vgsN295vcdTFcwfDsgcQt8UkvjcZFmCONTVpfuoLcXxFCKgbdCIw79HFzQY6pgFr%2FJwCWMuXlR6k%2BHWWSPibClu0wiUVLquOb5k6T6vtz2waRNMLr%2FjVVbRO1macsBoITbQo947aV6rBTDqlOqLCN5pS4T9dH9pZzKTxHPcuIMdLCxL8Fuiea3VIx65h6sof18leN2a%2F85QKFaSL1qUyNYuS8%2FBcu4ipXG%2FD3ufmKW26bMfp7u8xFzeqK8jGdRJntBRv5sIB0ls5GP8L6hsFTjKBEoFx&X-Amz-Signature=3ab4cddeed4d7fef7c95f3ad27b581b4d771ff8ae73e5cca9e688ed7fd839b82&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RVHD2JSX%2F20260311%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260311T135540Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDz1aySpRnN18NsvWq7vS8CPtdKXYri%2Bq7tMo5kxcw%2FOwIhAPWG0vyxmryFZBJvTY578AMDhbWyox3rddwtFp6pQSddKv8DCF4QABoMNjM3NDIzMTgzODA1Igz6cO7GC6%2FK1AYk054q3APacljCo7S3TkEs88WoVlap6wmCr%2F9Ni04gZxF9qKJ2BRHCEHW%2FRoMA1OceZ8ATiuNk352hcdBxRl9f3HjdGDy8h9Z9Biqfo5%2FPZ3o6oifBeA2wRl3r%2FX%2BTUct57T0G%2B%2FDUzXfg3A5NK4W97VSIsl59%2FW6ys%2ForTrZBImDCpuzl9SeCcjaK8%2BkKrAz4NsHhdEfO66tFsqWocpgHnUAzgu%2BOjJd0g5ORdlBUPRqVHgjoHh%2BkyBktRQOmIGditF1rLcQ7tmmPKSt5rauutagSazlr08LHiKXdfqNXxrE0WLCbH0FNJfWXvlPw3%2FZW3o3NXDTF0eYF1TIPoL%2BSL9bF%2Fe5qVrF5sJ9Qfih7oDKG0EjIGgDWLzi3dAj%2B9jFCmEfuq6QpsAOVI7L6z4%2BZfENde3FE2NVlQuxJtH1vU2%2BF7JxR5CXPlWQ4%2Bchso8CR28Nyup7BvKBaxNjvLvLeW0F98X7X5Do5qnJDZAEnwIaA0dJi%2B40c6QLv83sXMCpdUZEnKMW2Tqa3LLsDVxr%2B3BeWNFestsJTGe0umA6IlRrwzCgf1cWgpvOxcwAIWVqGYzkCSfjW1UFTyybelhGQf3UpDr4BD%2FXSbKePx4LPVfiY%2FK4RoWv14%2BYAdUSYzMe8BzDm0MXNBjqkAY3oSsLjoz0SU6V1AlI904TlSGRam59GjHJnDD73nENkrWB7xFJNzcMGbmE5qZYgj0Q27qUAaArMko5kO%2F2OOW3voEweK9v0krSG3%2B4YYBu2pIc0m27bXa1S8hq0HA3z%2Fn9tluEzhFLEgdQfRnzldLR%2Bkj997bVY%2BRXPWF4%2FzSfOmh9kNE%2F84wfnvjLPw501marUQJNW6nMu0aVe5Uc8AAd1Yf%2F8&X-Amz-Signature=e1cdea589e8abd8d752f571ed33415f13a6d4e7c57abfc07698190c30a5508ab&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RVHD2JSX%2F20260311%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260311T135540Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDz1aySpRnN18NsvWq7vS8CPtdKXYri%2Bq7tMo5kxcw%2FOwIhAPWG0vyxmryFZBJvTY578AMDhbWyox3rddwtFp6pQSddKv8DCF4QABoMNjM3NDIzMTgzODA1Igz6cO7GC6%2FK1AYk054q3APacljCo7S3TkEs88WoVlap6wmCr%2F9Ni04gZxF9qKJ2BRHCEHW%2FRoMA1OceZ8ATiuNk352hcdBxRl9f3HjdGDy8h9Z9Biqfo5%2FPZ3o6oifBeA2wRl3r%2FX%2BTUct57T0G%2B%2FDUzXfg3A5NK4W97VSIsl59%2FW6ys%2ForTrZBImDCpuzl9SeCcjaK8%2BkKrAz4NsHhdEfO66tFsqWocpgHnUAzgu%2BOjJd0g5ORdlBUPRqVHgjoHh%2BkyBktRQOmIGditF1rLcQ7tmmPKSt5rauutagSazlr08LHiKXdfqNXxrE0WLCbH0FNJfWXvlPw3%2FZW3o3NXDTF0eYF1TIPoL%2BSL9bF%2Fe5qVrF5sJ9Qfih7oDKG0EjIGgDWLzi3dAj%2B9jFCmEfuq6QpsAOVI7L6z4%2BZfENde3FE2NVlQuxJtH1vU2%2BF7JxR5CXPlWQ4%2Bchso8CR28Nyup7BvKBaxNjvLvLeW0F98X7X5Do5qnJDZAEnwIaA0dJi%2B40c6QLv83sXMCpdUZEnKMW2Tqa3LLsDVxr%2B3BeWNFestsJTGe0umA6IlRrwzCgf1cWgpvOxcwAIWVqGYzkCSfjW1UFTyybelhGQf3UpDr4BD%2FXSbKePx4LPVfiY%2FK4RoWv14%2BYAdUSYzMe8BzDm0MXNBjqkAY3oSsLjoz0SU6V1AlI904TlSGRam59GjHJnDD73nENkrWB7xFJNzcMGbmE5qZYgj0Q27qUAaArMko5kO%2F2OOW3voEweK9v0krSG3%2B4YYBu2pIc0m27bXa1S8hq0HA3z%2Fn9tluEzhFLEgdQfRnzldLR%2Bkj997bVY%2BRXPWF4%2FzSfOmh9kNE%2F84wfnvjLPw501marUQJNW6nMu0aVe5Uc8AAd1Yf%2F8&X-Amz-Signature=abcccff1176ce62343545fc268244356a2cbe7bb7c323f03a65fb04afff2bccc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TOI5Q45S%2F20260311%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260311T135540Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIHn7GOwqVUT2jIqSB6z8dg9%2FOgtHbabN0ZDh5tMDVSznAiEAi%2F9OCD%2B3BnJnTQZV1sdSJ%2BL8sgheE3UAQFe0iZ%2B9ty8q%2FwMIXhAAGgw2Mzc0MjMxODM4MDUiDGl5Wg%2F6Sfa4r98DWCrcA2RSspCz7Qb%2BRpzUf5iGILw73c6S1zik6HTcl1jDlNiqNdy3O8RTGUXL80aszpmQgSwcqJBmsVlPhOCMX20ivXW96WRpFrIBYnuX3PMrGpZQo5LVfyUuuQNPPw4buiH2k0k7xpjdPWTib03VIImtk4V9h4NJl8u8scHZJDjEW7WnsTohWz2DMxMioj0zOEToLYHRnyZYLfwahvvuibnLNJ1DqcitbL9Xw6HnizxFs2Rp76FagTy2nVLrPbhtxIM1%2BR3ptgOTpvR8wNT8Ndr0JDJSSsA0R6YCzByG2M2qYd53BQj4bZjoJdoRCUjYmYWd2IjCdyGwgaep8g%2Fd0cepsyEK9PkSJ5AmQHwtkYv2KDTpueaah0jMzK8B8jui9B293O7xXgaO%2Bcxu0nTfC6ml1VJY321a8fm8YpzjqVdNBEdDtmTJUAdOdLQFgv9J7%2B7C7L8VrsZJJJqnd1XEsIBOAKlnsO8Su8uke%2B4dBt2zw0dW05QNxAECFn3YOuFN97uHTmL6s7SO1I5FRWHBsI%2FOaSig1v9Vnj1GeAZYZHJ226pcQVa7MpJ0altwCUfhin5O9Ah%2FdepLsYf%2F0pJnsFLAwj6f4b75X%2F76%2B4PIoX3W09iRl6E2BZ6mnVoWVvnOMPbPxc0GOqUBvVx%2BqwIALUssI8rbzfIT3uieCVLWh5ZGieZwhxAQvnTuS7uHALLemnftTy2j5wlPEL22AM7ILjh0QGhqRf6WoII6p8hwLphK5TYezM0vc6PeOq0ZUJ3ELaBnaHM9bksTge%2Fg6rndmoKa%2BZZl8If7g8amV%2BVmmInBCEiH7v6rDNRvIFecowZq%2FTBd8NsRU5XnAOjMBxmunptM8s5v4y18uKqFyb88&X-Amz-Signature=f5395b22e9f9feb01841f1c556f66b5f40458e6ab752c8892f2b34a0b0d6a28b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Z6JQ7Y5T%2F20260311%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260311T135540Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDsCHJpmUEXPSH2fuMBKJZcDJwLVOBB5iQ%2B01omZt6kdAIgKVHQAQnaqWJNYHHpMXizek0e4d2w2XPvpK5%2FOfuJ%2FQwq%2FwMIXhAAGgw2Mzc0MjMxODM4MDUiDNeXSefTbdqN%2B9XVdyrcA7xKoN%2FSsf7iRPi29sC9lar9SGTRygh6bhqDCjyy4QPsSfazw0CmoWAOeBlnavPzXgT4d%2BmA6qri0Jt3Qky1MuJ2B%2BR%2BJjAL7UcY4Zzo5RRj6wocshi9D2TwJwDawTaO9t7p%2FVoBeF6fY6%2BVwLe9EhK0SkLfQpns3r7y5DyqxAHJw7QM0nbmWmanx%2FaCg8bNMloXsbileBIpuWHmT4hGkauOaVyJznPtL%2BddmjTmyl6Q6Yeu3f7wP9LyttLFPzPMTtFqbxK6STAKrtOFsqXbB%2BXJbx%2Ba6CZyqXygISvx7ljCChlTG7w%2BvcidMlAb74dpcMXoIPVO1hKwpjNJEq4s5IWEfKtr4%2B1aMQg07ZHr9L95VpfYFXpPZAGLlgvyUHmyNFXg3PWrfvwPEvBBvRDr8Ykq%2BSmZIANRbuhp1KIqzOBzOaxtLPHbBs%2BsdDu1o8lZ%2BI2DghQ5F04cZOylZ4vKqhNDGZIgxD4uaYxs3r2k8mxRsDXVgATzj3ZOTAk12as1ziKHf3jFHvlgUcuDF4ITxq3DiMDoE8aNVVzaAsN4JrF3LpIbs13RJVWmfDLZlg%2BAo7IHq%2FUxbxzFC68EfTdYQhcZA5VWYPGFQR%2BQMkckh9XxHEYhT%2BsSJuQhVdREMM3Rxc0GOqUBb1sWehqJFTgWf%2FMY3OKbMSPyqOoFgRKFLiHPtzOTdmOdDYY0dZEWaeKG%2B2yqnWz9LCVe5Y%2F6r5Wvfn1NoeYdfTKBmYxNMagGjBvHNjaLd9CeZaKw2wMvkveKpGK6HQeSfumaONnZLaCqd1zx24tTZL7LMqkl1PNQcru3rzhxWf2lemBrEgh0L8hFGBzVbhNADZyzQOxHnAw2nwVcasf0pWjteaJL&X-Amz-Signature=126d323058507f877df2801c61cbfaa95daf96efc0fd6683757253a8fc370e9e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662USSKQ43%2F20260311%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260311T135542Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCgl0FHsZe4Yj6CpMaNLkAr2ycvdeGmNL5it%2F6AO2ZCSAIgPjzmLdTPWKzHneRQsI9YMXurFO47Hc%2Ffqns08iOu4tAq%2FwMIXhAAGgw2Mzc0MjMxODM4MDUiDEDL3lQ%2F7LLi44stICrcA%2BpA3oKILUK4ALmqH31S9TbUmWSfUXEbqM%2BGvJJFxBer%2BUHiXQAXbneHYmV8lVfSFvT24uqG9KlicPvHPhx3hKHKlLNbg8shfU3o7VSo4Hdufyq4lmEkMlYHpfzZfBta7%2BcCDN07XbwhjQKjX5CUWmpqX8lzYtrCpRpXSIxIwY7q7zR2%2Bhhg%2Fq6MxbEcXnxqHtgbA8SVZVFPJO6PEKX4XK5Q6ywvnuAnY71jDBZcbmlotfpDHmJMpmizmkvM2%2B36BF4KwAumQu6Tute%2FhBfQQ%2Bo9v4XtcAY6BFyFdUoW8skS%2B9yOUenuLdY3L6KJ%2FVaW6uKAg7zzuQBg5KU8vEKMkbkNUgUMOwNCX%2F%2B1BSG33yUufdIa5YoFWxG2aMxL%2BkH80ywKszrTmbTov2h6ma3l%2BK%2B393x3rK6GeooeXhQ3slTtFfrrPjerhSqFlGOBiV4G7r3tF2Y7RW8NH0qc4Kk2tUoeM%2BDoTGUu%2FUc0sTn%2BE%2BL7simtZ%2BDvuLx6gNakIzYUtE%2B9wVJZBhdEWkwx%2FPbe%2B9V%2F2M5Sujz%2B7tGTAzFOwPyRHcY2KWurP93VImT36I5nlzRV7ARc1F6ys4%2BjiDNRViVxgn9j72ClfYs5%2F4iyj2K42%2FuCjceDmnN169y%2FMKzRxc0GOqUBHqssF8coWPXb%2BGO2Gn09CysY9H1R2N88XpsqdeQO3xfvHo8gmzXjdexnVrIrhm0JYrKQBdf%2Fv0CWpo%2BisSVNNwCDbPp%2B8QOC%2BkQhEzqDbgve1GOrd88VkgrTaB5mzZGZFqtO39z5wpa72eZtHnjLEE9Wm0FOS0ZJLFnb3obF3uQKPpZ6bu9gI6YUorzjiH7Cyv8c36si6YrnN5g6%2FqXRPz3KL47Q&X-Amz-Signature=acabf71e01cb2195e1ed570915632799bb55b9ea1fca00d7b0f4d4d4d968e52f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664VN4RKE4%2F20260311%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260311T135545Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDN%2BZBwaOZgPBeaanTQjiFJxStWTM8TDuWDSFoju9o4BAIhAOLcuUWf16psgEJeI0fyp5rzkIRVK3z7fgRne%2FkE5citKv8DCF4QABoMNjM3NDIzMTgzODA1Igyxv9xhiAeWBaEOjjMq3AN1OavIg5yjw9b7R1fGojL7ubt9Cxbb8pPyNkVtBPdf07%2BHRFQkwCysS4F1BoakNYJsEOItifkW4eQ7dU5W9mJ7yDpTH4KInTtADlqzhfKUznxjtJDk3qvhLaZHkqLVpuzEUCjufdIJbOKuXxISzHkb9Olr6IX2ur04xullMx1muUsKIXXhLFFXVwuo1eDMWlCOuXoiVENng5ybyd9KWpRViTivRJl2Lkfp5mK15yQQpOtYre%2BdzEJSA9PhENiWMqHbaDiu4b6Zdi0df9WAJ2bA2dGV%2FUh9%2B14R11%2FLdFqS78TQ49wfN2i%2FUr%2BSMB7D82c2EUIV%2FetCmBRahwI0%2BjhQZARff3fEuSqZT%2F7AeFF21CsvvG10k16xMMqtRakzJLG45A8RsqsiiAdrGzTB5FRtjtaQ6XKS9KGeQ%2FrOamFoSePYLuHNfeLmqzK9sbo5LP3eH1kCu38D9bVQMBxRMsbcX0JJqWbXd6lH18IiTWD2GyIcuRSclBqgg322pCIKt4z4AtYcMZgbsFxo4tNcJx1zcWqTg3guMHHVdUU7Q0Wt1huGKVJSGUI3mXpAADteejRZULXE4G8iyw4Fl44gqXuQtr2mdbZAggKsqSc8kFGQBWPNa52ucx59M4UiJDCw0MXNBjqkAWHvB%2B19uqCXsHKaa2xZRegavtopLSujptcx0UUhQQCpOgrEAfut26DAFD3xQD%2FFzy1x3W8xrh0FCPEFZaQAHqMdEOW6T51xW%2FansGa2o3%2BPMA53JchNERto8C8LOs7Y0amSiSmUZIN84s0XErEJ09A%2BRT66CRAnsJl7hBpUUTbqMzJlXEesb9lPxs77OWcpJXZjhBvpLBCsHCUrahWsP9GJSSB%2B&X-Amz-Signature=b4d2ae4a24025aaceba53ae5cff1334d7218def0527bc4e7216383134d93dc46&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664VN4RKE4%2F20260311%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260311T135545Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDN%2BZBwaOZgPBeaanTQjiFJxStWTM8TDuWDSFoju9o4BAIhAOLcuUWf16psgEJeI0fyp5rzkIRVK3z7fgRne%2FkE5citKv8DCF4QABoMNjM3NDIzMTgzODA1Igyxv9xhiAeWBaEOjjMq3AN1OavIg5yjw9b7R1fGojL7ubt9Cxbb8pPyNkVtBPdf07%2BHRFQkwCysS4F1BoakNYJsEOItifkW4eQ7dU5W9mJ7yDpTH4KInTtADlqzhfKUznxjtJDk3qvhLaZHkqLVpuzEUCjufdIJbOKuXxISzHkb9Olr6IX2ur04xullMx1muUsKIXXhLFFXVwuo1eDMWlCOuXoiVENng5ybyd9KWpRViTivRJl2Lkfp5mK15yQQpOtYre%2BdzEJSA9PhENiWMqHbaDiu4b6Zdi0df9WAJ2bA2dGV%2FUh9%2B14R11%2FLdFqS78TQ49wfN2i%2FUr%2BSMB7D82c2EUIV%2FetCmBRahwI0%2BjhQZARff3fEuSqZT%2F7AeFF21CsvvG10k16xMMqtRakzJLG45A8RsqsiiAdrGzTB5FRtjtaQ6XKS9KGeQ%2FrOamFoSePYLuHNfeLmqzK9sbo5LP3eH1kCu38D9bVQMBxRMsbcX0JJqWbXd6lH18IiTWD2GyIcuRSclBqgg322pCIKt4z4AtYcMZgbsFxo4tNcJx1zcWqTg3guMHHVdUU7Q0Wt1huGKVJSGUI3mXpAADteejRZULXE4G8iyw4Fl44gqXuQtr2mdbZAggKsqSc8kFGQBWPNa52ucx59M4UiJDCw0MXNBjqkAWHvB%2B19uqCXsHKaa2xZRegavtopLSujptcx0UUhQQCpOgrEAfut26DAFD3xQD%2FFzy1x3W8xrh0FCPEFZaQAHqMdEOW6T51xW%2FansGa2o3%2BPMA53JchNERto8C8LOs7Y0amSiSmUZIN84s0XErEJ09A%2BRT66CRAnsJl7hBpUUTbqMzJlXEesb9lPxs77OWcpJXZjhBvpLBCsHCUrahWsP9GJSSB%2B&X-Amz-Signature=f5fd8d9b80fe5813caa1b8814b3b5dfd427368d960be5fc9df46b34e3bd1ae9c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664OSR7D45%2F20260311%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260311T135536Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIFIpNnaDMPqPvJmVb2og5UHVkwSMfikraAif308jyGvuAiEAia2exK19oXTzuQC%2BtMJuT6y3fDEq%2FyqsP0WcLtbuLXQq%2FwMIXhAAGgw2Mzc0MjMxODM4MDUiDAzVmiOyp5RGh5ij4CrcA0azJ%2B23CNfdZZJdkuYOuMtsALYL%2Ftp3P8all2rY7dcHk%2Bb3Kx%2ByBAn5BvR1WDV%2FrvPZFyb7XJ0Tmo28WO6TRodmR4WvVUNL%2FiKtuqe1cZWswM4mLEpIKsjlVkSByLx03a3RdVLZlvEViFP8%2FqeuGJHnaoRRU3YGglpLobCy9np6yT2C8h9aIelN0pwcQIJxmFrRb647fscJwyJBbrlNWgTS7j9elVCcaLdD6B0GtMqbzf65xXE0JQFFG9ef2gMO%2FO29x%2FNWDnLTgpyiWpFhBSWFOpAkMLtftS312AX0nGK2%2FW%2FlANhh7oIQssgZKgWVY5cf9xVyL3zJzIvt2zgVBVwCu0A8FdOCAIvacDbiE%2FbkWF034RNLR36jR7qpUzEN2uz8QBrU%2B3pXBSvZqbQZ9FcKXW17xrijlaU8aoUKd%2FZtT8FqAfYkEtOf53A6Wv7Gm2TGqsZn8cO%2BOE3AInQFXaVwbm%2BNWBFxYY29nUNAMI5h0SwaJgLyYVeMoV2CIN0lXFoyvhBtMBwzSxarUDY3iveexiuPWWTBQog0yWD7LSfI8R1cZcIRU7ZCXSc%2BCZY04EOfdd%2B5QBgdgayT%2FrBbddAbuDjEg6UftkwJfNmCxLAGIXbFJ6%2Fii91lOODoMPfPxc0GOqUBdAMw9fAvdvto3P2pICcGb9PaDS5mR69vtekgNowZ6WmP%2B%2B94wi8b3n3CbRl1ZcJudEbviQmxcYN024FHjMK5V0L%2BHkTMj2pFzunY3H57FCOMjFay4w4q4idMnOoRW8R%2BW2prXGGrgJuaYVr3VKPrwlNBS2UprvpgdDWMncL6HZaipbw75ezif5jepPYcTigMMjeH6txp3ToJD%2BgxsuAYczSJHn6Y&X-Amz-Signature=bec9d767e66a5b0768019e518a6c4c5750f64d927ef3043289cb9ebaa6f36543&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TYN7XHPI%2F20260311%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260311T135550Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCNArIS2GWfxyMZybAZVEUALPgtYLhQqgE%2BiasbsN1krwIgOizYlvAOKDQQujXwRDPds4bt%2BqQwpRQUstEu0qDmT2wq%2FwMIXhAAGgw2Mzc0MjMxODM4MDUiDPHCYgdrFGNaFco0tyrcA%2BOFR9V1l8QIRFLgShLNsSF9Y3jRmAxw0340oU8K%2FNYbQe%2BEwWj%2FwnyaM02ohv2nxVtnRpAVc3ye%2BryjPGvAxfBqDeCu7ICKxgVU%2BXVJSW%2FzYILxpnCgAjeYUYxG9hNkFmz7OCz7hgrw7Abs%2F73jfePOh%2BFcNQK2R6W4yYIEkzIBe5OTvTBYP5Y%2FuEt6FwnDh%2FFPheUFqWdX8KYiqw%2BSbVQIT9r4TNzxN%2BSqVAq5I6gUhA4CR41R17g6Qd5m1mvV6IVMGANk80LfTkP%2B4pbTth2dYyHIBGvOCui7h%2FrqepwzNX0mQ1A%2BDea2bdE9qciKTpS7goGRsfqYEKWZ4pdPmmutooZVgGtESalZdN4dmA7HJE2kjoHi1d5Z4GBIVNsVFm7%2FP8ipC5ETJJotKWjskE%2FCIFh3ruY55tHMRrzqW6vzrlqZtIr8OIYEhfu2zJ1WzO0JFQ9CRDOXHs%2FGbvzXz7zqNKO4BMa1INpQIWT3UQM%2BrSufe5Vvo4z1CQaZ54evSs0XHHyD45vY9mfNkD%2BVQOaYurt30x%2FeJg4CG%2B7VZu6FMp6C8hH8sy6OC%2FfcxWBSuBthMkFtM2jxjqLka2iNecVVhqJezcUY78VRXY5%2FRVt5kqiNt94yNON9JeWhMP7Pxc0GOqUB4gjrpX154mi0IBfR%2FvnJkFX3r8VQJzZ%2FLNFIEv132PWTiFHBYi3ngfUPAEhXtQIskT83K1CoD7HfwEeEEylHGUe4CBfDNm8WvHvEpI4XEKCXIYwuG28nunSo8QCuOPI2s3wVVhwjhFFghGMH9fWVil645p4Ax2fLmctxs6LCCo36edL1%2B75GuHlepFC3CWjcrHW89eL6qwfn5HXULNOBtv3WE37b&X-Amz-Signature=91456f27c239cb19a185a0c7a2a23648b9c533c3ec4cc1f392ccb4a537bbe83c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TYN7XHPI%2F20260311%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260311T135550Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCNArIS2GWfxyMZybAZVEUALPgtYLhQqgE%2BiasbsN1krwIgOizYlvAOKDQQujXwRDPds4bt%2BqQwpRQUstEu0qDmT2wq%2FwMIXhAAGgw2Mzc0MjMxODM4MDUiDPHCYgdrFGNaFco0tyrcA%2BOFR9V1l8QIRFLgShLNsSF9Y3jRmAxw0340oU8K%2FNYbQe%2BEwWj%2FwnyaM02ohv2nxVtnRpAVc3ye%2BryjPGvAxfBqDeCu7ICKxgVU%2BXVJSW%2FzYILxpnCgAjeYUYxG9hNkFmz7OCz7hgrw7Abs%2F73jfePOh%2BFcNQK2R6W4yYIEkzIBe5OTvTBYP5Y%2FuEt6FwnDh%2FFPheUFqWdX8KYiqw%2BSbVQIT9r4TNzxN%2BSqVAq5I6gUhA4CR41R17g6Qd5m1mvV6IVMGANk80LfTkP%2B4pbTth2dYyHIBGvOCui7h%2FrqepwzNX0mQ1A%2BDea2bdE9qciKTpS7goGRsfqYEKWZ4pdPmmutooZVgGtESalZdN4dmA7HJE2kjoHi1d5Z4GBIVNsVFm7%2FP8ipC5ETJJotKWjskE%2FCIFh3ruY55tHMRrzqW6vzrlqZtIr8OIYEhfu2zJ1WzO0JFQ9CRDOXHs%2FGbvzXz7zqNKO4BMa1INpQIWT3UQM%2BrSufe5Vvo4z1CQaZ54evSs0XHHyD45vY9mfNkD%2BVQOaYurt30x%2FeJg4CG%2B7VZu6FMp6C8hH8sy6OC%2FfcxWBSuBthMkFtM2jxjqLka2iNecVVhqJezcUY78VRXY5%2FRVt5kqiNt94yNON9JeWhMP7Pxc0GOqUB4gjrpX154mi0IBfR%2FvnJkFX3r8VQJzZ%2FLNFIEv132PWTiFHBYi3ngfUPAEhXtQIskT83K1CoD7HfwEeEEylHGUe4CBfDNm8WvHvEpI4XEKCXIYwuG28nunSo8QCuOPI2s3wVVhwjhFFghGMH9fWVil645p4Ax2fLmctxs6LCCo36edL1%2B75GuHlepFC3CWjcrHW89eL6qwfn5HXULNOBtv3WE37b&X-Amz-Signature=91456f27c239cb19a185a0c7a2a23648b9c533c3ec4cc1f392ccb4a537bbe83c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XMUG7MAT%2F20260311%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260311T135550Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQC85TN3CE%2Bn%2FIKXv3ugoQhgHGX4Lbi9rcP7E%2BSt3tt4tQIhALdosVf1fg1TvPJcQcd7%2BlSkMit7EQwNReUQeq9Jh4YaKv8DCF4QABoMNjM3NDIzMTgzODA1IgyvD8EXpqk4lP5gfPAq3AOXZAwvwa9DLXa%2BLytlxwqyX494daSGWBIU43ys14HtoIjXVUr5ec260rsmJvS4yQaih2hWGcZIZu0W3T6rqDH5hrJdRZGWT%2FlwVfdICbJeqak78rkuMpq%2B81Tds2FsBu%2BjYqOOL%2Fnfx4na7%2B%2B27ugNSspVItFLoj1FnNG86yoqxmckV6Ed1uKIpXclGMbGFPERJShySmIwKyo8LVtqdT97853ftcJiH%2Bcur4d%2FmrGYWZMe02CeiTmTw8fwOablWdLVO8TPCNwSAWkRA5VU0dk8eGDDfMsyvuZfrpiesbboI8Bmw6Q0ITiCqq0Z3%2FRdt2KZMfPUc0s%2B2KVtkPYRM7mwM%2FufTn2sIezHS3JE2lyaOir8H1s6c29flXvIso3dgpX%2FrwWB34M6xu6Mijj6uof2%2BwRZkv9na0PKdxCtAyT0v2hA%2Bmrzs91fyIZDetCXrINas9gPlzGdKRIunjddv7NfOXekbXVtjkaZ1EF1XpK%2F4jM0wFp%2BZ4wrcncl3maz9aBXWfCjtdjA75JcXFNgM7EIjxD8B1wyRiiGH2MGeRntvdDesabJvTCi%2FQdbDMYuAUeq5H1Ot%2B%2FdkdVbiMe8YX%2Bdo86W33pIpXsHLIV15tCgxPBC%2FPN4KQ7YrSSmtDCp0MXNBjqkAQjClDmj%2B4dwmMMCV75I5eMbomyOk1zw29loIsNWNaLTR0g%2FjnCyG9KobGUxyvvDWPJBH8TryCyy3hBXZ6N0LNu2hRllOjBOzg%2BftSpHnoeovcqLmJXCUe0f5yasJbbwEXSu0GLcRxIIdnulrga7ybiGYmwEfsxwXOgFkJL36p87BKCLnm74zsazTpQl522V0dlIhImId8PeifP4eCNH7MIKVKg1&X-Amz-Signature=4f0673672128357ec7a3e5ce23d23d1827fc69cc80f077a1aead54a90faf8aac&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

