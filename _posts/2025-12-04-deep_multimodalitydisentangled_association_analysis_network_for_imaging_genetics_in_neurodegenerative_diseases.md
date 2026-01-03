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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YTYKNJXR%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T120103Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEoaCXVzLXdlc3QtMiJGMEQCIBFzrEVpRVeUgv8igE8V%2B8X0tqoYXyEpfA5btayk8FikAiAn1juTpmxpsUqPXd%2FgUdKLCdNKSoyguAKhSJ9wYt4ouCr%2FAwgTEAAaDDYzNzQyMzE4MzgwNSIMPved7hj6LsXY6cXRKtwDJ%2Beqd%2Ffy08rWwiY4FZgY1rp2rsFbf4FxlVSVrXp8SbNC1fIY%2FymPmyQ7QHpziTQuvSn9spi8dZf13UHO4kVVehPFk3AE%2BoRwUk3w%2BsCNNk%2FZSjVmH5d%2FaHE10CKHjcVQsyudxJ5w4FhAfEqHrITw0Woh9PwYFBbFeg9LOqEYM%2BozFtqjqopB2wqDoBni9vXgoMbi8aSlo6PHI7LuH4qYfq%2F%2BS4zdEfDWfgdbzBDBb8S7zc9KBKmmrw2xjaj0aJuZTe%2BntL0lfvXr43cxm6p6emiUDhPt2vKESL2RCUJUwHax5ySx9wcGQDkYEQh5pux1VY9Iwh1VVNsxjRPCXXHOoKu4aB0TCBNRZI%2BxG5BHWZUtKergFZKkMnVvf5Jhdpd2GJ2jSYQOvxhsu7gy%2FRnURsgTcNA%2BLt95iIGmm9I37R3P4Q8iCKIxavpQ%2BhxMFylZCGxUkqtVlDDIiiq4zOmtvQB3mEjx8pDTS0192O%2BaqxP0RTCozosbD%2BbK8s4iKVXQnsf6nqdnqldHFX%2BGhaDko3cp5BlWkf0WkbEXG4w8slJgdJngd6nqL%2BFeWgYjCE%2BUs3TmuTRRYFRfh5uRkOn743Dwl6FPdsB6n2ZVoTGyIdsA%2FN3OiLbzsaObNO4ws8zjygY6pgEQgmiOoDXpxTQtwZvgYXAXVt3Azu8kOl%2B9hwFEZQ59GREsa%2Bt1S9oziekwTP5engRuAhPF2PxeN%2BsabcS5Op55CLTtP%2F1V%2F04aCnpEqWPX6V6XzGLkJtEk47U98KWtU5LB24KID%2FUkJm1q%2BkQJN85knLs3Fz8Ina0RSfkzjzEYIviYS6ZM49Hki75hLmvJnWd2KAidk9FvboY2ie%2BZVA5y94rw830W&X-Amz-Signature=f8805ce6f5efccd00a047cba98932516003ea26272e09ed3d0c35b36e0f7d5a6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YTYKNJXR%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T120103Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEoaCXVzLXdlc3QtMiJGMEQCIBFzrEVpRVeUgv8igE8V%2B8X0tqoYXyEpfA5btayk8FikAiAn1juTpmxpsUqPXd%2FgUdKLCdNKSoyguAKhSJ9wYt4ouCr%2FAwgTEAAaDDYzNzQyMzE4MzgwNSIMPved7hj6LsXY6cXRKtwDJ%2Beqd%2Ffy08rWwiY4FZgY1rp2rsFbf4FxlVSVrXp8SbNC1fIY%2FymPmyQ7QHpziTQuvSn9spi8dZf13UHO4kVVehPFk3AE%2BoRwUk3w%2BsCNNk%2FZSjVmH5d%2FaHE10CKHjcVQsyudxJ5w4FhAfEqHrITw0Woh9PwYFBbFeg9LOqEYM%2BozFtqjqopB2wqDoBni9vXgoMbi8aSlo6PHI7LuH4qYfq%2F%2BS4zdEfDWfgdbzBDBb8S7zc9KBKmmrw2xjaj0aJuZTe%2BntL0lfvXr43cxm6p6emiUDhPt2vKESL2RCUJUwHax5ySx9wcGQDkYEQh5pux1VY9Iwh1VVNsxjRPCXXHOoKu4aB0TCBNRZI%2BxG5BHWZUtKergFZKkMnVvf5Jhdpd2GJ2jSYQOvxhsu7gy%2FRnURsgTcNA%2BLt95iIGmm9I37R3P4Q8iCKIxavpQ%2BhxMFylZCGxUkqtVlDDIiiq4zOmtvQB3mEjx8pDTS0192O%2BaqxP0RTCozosbD%2BbK8s4iKVXQnsf6nqdnqldHFX%2BGhaDko3cp5BlWkf0WkbEXG4w8slJgdJngd6nqL%2BFeWgYjCE%2BUs3TmuTRRYFRfh5uRkOn743Dwl6FPdsB6n2ZVoTGyIdsA%2FN3OiLbzsaObNO4ws8zjygY6pgEQgmiOoDXpxTQtwZvgYXAXVt3Azu8kOl%2B9hwFEZQ59GREsa%2Bt1S9oziekwTP5engRuAhPF2PxeN%2BsabcS5Op55CLTtP%2F1V%2F04aCnpEqWPX6V6XzGLkJtEk47U98KWtU5LB24KID%2FUkJm1q%2BkQJN85knLs3Fz8Ina0RSfkzjzEYIviYS6ZM49Hki75hLmvJnWd2KAidk9FvboY2ie%2BZVA5y94rw830W&X-Amz-Signature=f8805ce6f5efccd00a047cba98932516003ea26272e09ed3d0c35b36e0f7d5a6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VKXEO2DU%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T120103Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEoaCXVzLXdlc3QtMiJHMEUCIGDNKstd6SAwuBgBDWz2JvoX7snAVK3Lv988KMofJ12SAiEAspvbcnBM0Hp4FrIixXF4i98kqh6%2FU1DgJiXZ6sZCMBgq%2FwMIExAAGgw2Mzc0MjMxODM4MDUiDOH%2FgQs%2B8ds4mkZpcSrcAyb%2BLFAM%2Fb5PQI6ZnPM7lyCW2u%2BY0fKJrEt2NMo1nO2CsKgFX3RPQwkSL2NRejUCkzfxY93nkio9FbHz%2BA05jFygVQwtlaD4hS7Vn5bxESM9BpIEZSSzDtr5Q0EKilB322bVcMlXFgzDQ65krTQvN8yLW4hs7oHChe7wayAQm%2BkJ%2BktsSftJBgnZUNoGs4ISirb1cgwtaj8pN%2B0pZGxGYiUR2CbyLS45V412LbDf7rPZvrebyHH1qljBOPFgwerVCjfyegZXFrDvJMpGmZG8PACveaGiOGDvvEGtipqLUAd%2BKIeOw0xumwKipGaHkh0vD%2FvGxylWeKSY19%2FRMw7%2BUjr1eHD5DMOkddnivvRve5EuMI7HKLuqXNDN8LkizTWhmMhpJ8S38xUSJ0uo5Pjjb%2BN%2BvACNRCMiE9kw620lVm%2FmIGJ9i8qGXW5DK2mNee0EZqXxRll7xYIgcyQb9rUrP%2B6mcHeTW%2B%2BbgrMJGtsG%2Ff%2BslYv04jbIkAG2KwYko4s%2FhdoLe5kK7CG076yFhdFqeDqsfgs1IZouKfh1WA1xFCZy3WlqefvSDNXq6XUkRevNzbfVQJa8g4qxvfQW3tbgb9eHq5aD1iFcUYFqf2c89c5z9xDnaL%2F4xi4e%2Fu0uMOnH48oGOqUBHGgwpvqSR00HLG3xMRraQ6q5s54dU%2FowbF0%2B3oTCY46rmqv3Psn17cxrpShK%2Bi58qlJJdLK6xnTlt4NgodmM3lq7sDblEP1V2Zlqmcsm6aFBOJT9laldJ6msjo2Xk8pVKibQG5brU4a5mp%2FKFK%2FZG%2F26ISCcf9c2uvJ%2BokI87BkcKJVcUwzF02ZK%2BJ2K5pHQAJljSgGTVTRB3Cnf9e1577vfKWtF&X-Amz-Signature=5f2dc4652c64dc2581716c3464a3c86584b5a8214e9b8df9c6fdb4dfcb6d52c4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466W4UREOBQ%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T120109Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEoaCXVzLXdlc3QtMiJIMEYCIQCD65JNs6PmOegn61kTCoGUhXIDXJpyuZ0EeigGOVuupwIhAJN%2BOVfl9TWH2sKbUoYHGCNmrm8mk%2FviI7TnclgZ%2FKngKv8DCBMQABoMNjM3NDIzMTgzODA1Igy2Sp%2BiLiVilPprudcq3APljbqKcKSlheIf7t7CmMlfx4QGAjCpIdTMCH26gv6%2BwBpgpDi3geMqoF3foSJC7Wmd7ZLTvIWqhrxwovqTJikg0BRpgUOQ1xdkJ00g8AyLeVklHeu9i0xV9TvOMoQOutKKJzpPS4W41dcXGAn2ok3E4ZdF5u177yINkCg3vTm%2FaagGjPKrdok%2BhQIMae8g7kaLhGiBlP0ggN6Z%2F%2FaWr%2F0RfYuS7lEbkCNEwpclSrTKa0dYxic7mPiwjcxYHsdu92h7Tn7%2FCkXVN2Y86wvRIX6ik%2F59bhfahaOO1j%2B0Isz8yrESi5VCrpGpNbiMKwTUl%2FEXgmg1EzQYPdeENt0P6tELhwayKdMjtAIp0tWVV8sLfe5MaHdwMFuvrh1CrQetGTzdeGwulQ1Qp2rLaaJNUgFxbiA2LQEPyhtW18%2BzJ%2FrvtJ8aYbO4f6rpWnoak4p2B3goAPoiFLk5l%2Bupk1S%2FEvvPSHK%2FQ0DACE%2B2F019ddybhQV6NuSxkghpFAhSOTHICjkff03pbLyqmFKixXfBgwA%2BzFsGJ%2F%2FEgiicim9ldcRul%2F1secL8LsrWD8UcvkzxUaILZWezHSyBaF%2B5ph1tzqaykuzEG6LhP4RpGQP%2FmngaBI04%2BSIOVF4RKD57NjDny%2BPKBjqkAaZs8FcZ5%2FntvUzngmlSgpPWk1Z9t%2Bfd2V5xXDBZ%2BM28ulYXX8yoR5253j7w7okgtuqBzuHbaXFZgGu5GfMudBMdwmMURRdC4KnFuITdhIkIf0h89mtoCB71gOWRqyApAYeYsKtDGezhi0Ul0Wb8CCwxZR56R6bPG1wT1fs8XYYvb0xD4DyRlsZG0dFvOvnMjOJPfO6%2BdAn2jzFvji%2BbFFDv8Aq0&X-Amz-Signature=7ad625c129c5f042ddc890d4f65cfec3515889aedc32f26c63e3a5687e5acb72&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466W4UREOBQ%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T120109Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEoaCXVzLXdlc3QtMiJIMEYCIQCD65JNs6PmOegn61kTCoGUhXIDXJpyuZ0EeigGOVuupwIhAJN%2BOVfl9TWH2sKbUoYHGCNmrm8mk%2FviI7TnclgZ%2FKngKv8DCBMQABoMNjM3NDIzMTgzODA1Igy2Sp%2BiLiVilPprudcq3APljbqKcKSlheIf7t7CmMlfx4QGAjCpIdTMCH26gv6%2BwBpgpDi3geMqoF3foSJC7Wmd7ZLTvIWqhrxwovqTJikg0BRpgUOQ1xdkJ00g8AyLeVklHeu9i0xV9TvOMoQOutKKJzpPS4W41dcXGAn2ok3E4ZdF5u177yINkCg3vTm%2FaagGjPKrdok%2BhQIMae8g7kaLhGiBlP0ggN6Z%2F%2FaWr%2F0RfYuS7lEbkCNEwpclSrTKa0dYxic7mPiwjcxYHsdu92h7Tn7%2FCkXVN2Y86wvRIX6ik%2F59bhfahaOO1j%2B0Isz8yrESi5VCrpGpNbiMKwTUl%2FEXgmg1EzQYPdeENt0P6tELhwayKdMjtAIp0tWVV8sLfe5MaHdwMFuvrh1CrQetGTzdeGwulQ1Qp2rLaaJNUgFxbiA2LQEPyhtW18%2BzJ%2FrvtJ8aYbO4f6rpWnoak4p2B3goAPoiFLk5l%2Bupk1S%2FEvvPSHK%2FQ0DACE%2B2F019ddybhQV6NuSxkghpFAhSOTHICjkff03pbLyqmFKixXfBgwA%2BzFsGJ%2F%2FEgiicim9ldcRul%2F1secL8LsrWD8UcvkzxUaILZWezHSyBaF%2B5ph1tzqaykuzEG6LhP4RpGQP%2FmngaBI04%2BSIOVF4RKD57NjDny%2BPKBjqkAaZs8FcZ5%2FntvUzngmlSgpPWk1Z9t%2Bfd2V5xXDBZ%2BM28ulYXX8yoR5253j7w7okgtuqBzuHbaXFZgGu5GfMudBMdwmMURRdC4KnFuITdhIkIf0h89mtoCB71gOWRqyApAYeYsKtDGezhi0Ul0Wb8CCwxZR56R6bPG1wT1fs8XYYvb0xD4DyRlsZG0dFvOvnMjOJPfO6%2BdAn2jzFvji%2BbFFDv8Aq0&X-Amz-Signature=ac04dd7f80dd98a0f8b51916878805163f9b67ca9bef20f99daa80f5a4590b64&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RDLQK5KY%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T120110Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEoaCXVzLXdlc3QtMiJHMEUCIFHLBcizU9ttUdoqbQOSMD0mmn5tKy9DMPLozxHqOqLnAiEA2ozJVoLdez9FY%2FnoXiAxn8aewbUSrEsB9P6cX619S6wq%2FwMIExAAGgw2Mzc0MjMxODM4MDUiDAQJ%2F1tl7MU3dgQEgSrcA04IZ%2FNjwk0tXlL8wGOGZXuixWx54G3clkfBOIKHlCT9syjwEHy5OIotu76kfKorAhTJgTsymwxbroX4DCm8hQ6w8igVCjKEoSDLFH067%2Fd%2F7%2BHMUfi%2BeRYwFZCd4zUqALYeG1Q6dGFihZiInGMb6abtVv25MIZg6voucQVySpY4LU0owvpLUb5stKb8053960PeC%2B4ps1Sq%2FYDCGNJJBhtsGUp1aI51es9HSSYa%2BoTlrLoE1jnEnWMMjgw9XkKtwqeiIfhyEgPwb3g%2FIGjgmR5sWzJPwDO0TKn0oKZwW4VxWVwjluPrnj2mJN3EgyevOSxYUe7IyT1pvfExVmhMXl7utbwsE4vWA7ZCTNSCOMBTdrG8yQZxa08K8Sc0HdMUbCEYG1w8%2FiAV1%2FxStRDdd4isCOnUPSdlkfiSqS8YNeI%2BLRLS%2BAVkGs5eAV0gjviqWhfYKZopU8RXT%2FhWFGXkxVtbMAy0KPDpn9tmQrPGAk3In9dnANoPlMxAtY5iVw1BMavBOdiGl%2BqzuZUSZwcyVDECpo1UzagE%2Fl%2BSmcveJnYxp4VdPpvj96mU6qFP2ecB14Kn6nmVSAE3QwLbNLWYI0wXXaT0m81%2FAlqKgPNljjoX13mXZaBhrjI38Y1ZMIXN48oGOqUBNrtX8cSw%2FgWAENpKbkGawMKpUXVZ%2Fa%2FMS%2F%2FhbnKivBVb9URCG5%2Fml4SW1rL1LAY7VDf%2B5%2FyQJNoS8cvfIy99kZHCvVihZfGdRRqf1QNhZP6EGL5FIAIjIoPpE5WGqLa8OAjKcxEITs0EKA3thQB3CgAXz4WuZce59r98Pk3Y6aoNGEcFk3Rw8gk8qPx2UmKgEPubAitKsVx3w4pk9EJqFjzbMOjM&X-Amz-Signature=47006f5b81d624c92eaf380d590a8b545a25ee83ef4e06d1a611063e969e6854&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TLSFINME%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T120110Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEoaCXVzLXdlc3QtMiJIMEYCIQDVGsuHMBSKmkB%2FUBYfUWcn8iSdY1HvuOeP341P1CkBLgIhAMQgRz64O88Arp6niMNsGj5ng%2F2bpHMXgXV4FbBC6TG7Kv8DCBMQABoMNjM3NDIzMTgzODA1IgzvAyz2nEJPiTwMf8Iq3AO9W8Sp3x4j6%2Fy9iCgYrVLFimzNlMTFhzfin5KcaL84WPIl53zRwsP3KOAeTjmEzW6N6x1G%2FXDnuvJtuLr9uT%2FmoYcUcpGcuyDdPxbLI6e0SlfOMDOQRB%2FGJIgmEuIiRLU9oVmgKKP75grrMYpMOWqnj%2FyZhLSn3pW6vBrCnWhFQON84HAzoswn%2FvE%2FNKdYLOoRioNWTwQTZOiHpC5v0fq%2BUws5nKvA8q3tzKWmXyu4aaHJRnkiFK4X1pt2A9M7HBiMSv%2BuRHuf%2Bad%2BlePNrEp3dco8QlOkhY%2FNpO6JZey2GjWM7nx0qbP3RaNgLc4hfc0ZoIhs3H2NTesLkoVXyZ593ViV4XceLjDSchRnliAh93830jj%2FxTCXlZeQYz1%2FTWaA9DQZ0r47YAblWGmUsjgSs9TBnXFmX8P5s96KPik%2BlJxy4zccAua9SqsgzBVIid4Tyr8x2GM3MRIoTWshgZ5cIL1fPxqv9ZpEfzOGLHvjov2AuDUol9RE31A9uHnioBBYU6XerfIm72KKR31EmGoiAgP7Y3g0RxaxiIatzHNeka5CoHGArlp4QX79wJ%2FaFZ%2B5QKt%2BqDQRFvxoH%2BRp6S5JEZ7Gl%2BwhCLLzlPMJn03Q9NlYsSyegMGlVlbWRDCGx%2BPKBjqkAdLjc5pFZ4NYJwMXyRsiLA6anbrUg5CDhQIHkjSyjyB86BtiX4wNf32U5j41pnpvdSnGskPpOpGvwbhPGlEm%2F22l3NHUDYupZ1qz0RjDsf6ePvQPkiFsooMjeMdWA6E%2BfBOcPH8D%2BK2I1qJ3OSzBMOEjl2yLH%2F7pB%2BKhW5s3X%2BdJK%2FFNvBTjMJ5RLA9CbLSvLduLWcSzD%2BNtfQggAoxzwx6ICXf5&X-Amz-Signature=0947945b96f3e2b5cc11f21e4dea777ba912c702e59a805811dd0a9b5001dfed&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TND34QJR%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T120111Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEoaCXVzLXdlc3QtMiJHMEUCIFMYewjhcLIpU8WN3yXjHfvT3p9jnptBVgI%2BBgWfF%2FpiAiEA%2BHyYVzcdwSMdHux8bdtVZnFdgC6GpFi1NcAulmDiUY0q%2FwMIExAAGgw2Mzc0MjMxODM4MDUiDL6N0BCib7R0plupTCrcA8TdUzfQo4Pnb%2FeF2tpjkeSjXBILE%2BKenIku%2BYIE9q6x5o1iep8aFkKBIRTyqaTFlIWofdQWWXTMagt3zwEP862y4ZwBEJsLpqlaVrpGiCB616a1IjzOpZf09xtS1p9MbpVsOb5RRix%2FjlmWR9yKsR3MWdlcFTf2278BqVXmdP8ZhRgM9yvsXDMRzxoB9n%2FKJAhvxqlSSImbXB9V8yG4Cv5zd86jJN%2Fs81I%2BXYA7oxrhNjASSkXMuSvXuugEtDj5%2BXH5Zn7AWlE2lPdUnsAwK9shMYW89MoplYdy7l8U2TQI6sp2gLVgm50X%2B3PLEIHlX02trZ2IDhVlNq9k3HjC9E2UEGxasOscSwsSwH9HX27wRbf3rbErxhthxb9J0wJpSbEUJ74AEilKpIKlgswLeH8dY1zuhUAMYX4oQ%2BhnIyDOS9rp46jnocYCqb9jtySGomFFpVYB224gPt%2B%2FIVK7N%2FVukK43gfCNl5%2FLowPNdRylH6IscY%2F8qBS4heNt1uuFjKA4Nj%2FmCWM4R2H7zQxuXY6YYRtHNvuCT3hNmmIoBJH0VkkFa3XrIO7weISnwXEgcZ934mdXp6aWTmHR0TgMplPUj5uxNFvmO5i9r6as1MS0Jy8sT93Z1OuBtqS6MN%2FC48oGOqUBGaXHe%2Fe1j1xXpDPCQr5G%2BFlrnkx6KzOudx2rItCLyHaX3pBGfT2BVidrYU07UTugJPKevucrkFV%2BDRWmUhR6GT1xwzRGHM32w4yHzkpk5FuHtiaiv%2Fp0aedpBEmSlYn%2FqkseoHR%2B3whH%2FE2Gu804gxikjG%2FKD70kvfzEpgMKoivrIzdZtm6z1sv%2FkNfJnqa%2FAIcpA0zdtWCnB2o7SvjvUn%2FexdyC&X-Amz-Signature=76067655910886a316690acb01162331aa313f15827582b5dd9baeefbaea0ba0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TTZIDO2M%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T120113Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEoaCXVzLXdlc3QtMiJIMEYCIQD3ZmV5PPZkXc7ajYlh6YLNraUtfYw238GIAvmyWbm8LgIhAMIA7OE%2Bgrxbqo1lawVztREvQgSY5dW%2BgpQmR6HCANfOKv8DCBMQABoMNjM3NDIzMTgzODA1IgxUtpbJoo3mSi0TqXUq3AP9CzXAPkhrEAMHlj8We7hlJzngQFwdZ48ZXtq0KZ7Z2BLdNIH2HYpFcUUcy3EHrOuKjsbbDfm22SFo3Kg4oJ5mJ7mNAbjS1nViuUKRvVrvqecjIFZEoyepqhw06bT3CfqQikXAclKdFHCA%2BmUot4AEQ1ZPmfeA0pGE3exIdEJTsB15eHgrAqTBSTqHUtB1cVt6bNo4nThJnAt3rYsurAF4pVQFwPjWCHb2Ymhp%2FUc3NcVwoGAqEVyhxtjHz3FQifjLMuttLnimnxutSud9CKy3VzzbIbBVx4fS8YcuakrJR0ZV2InIYeJf37uOZodlxk5t4CVx4jodaMsautxZyWBx6CtWepS64lvs6TricvVuN4cYQXVO7Jk9Cuj3zDuno8KwQLziSOSKmMSXv7yTToX%2F9VFrsfYzVJvwqDM6vMTRyXArMNYfaa%2BW1rvviB8GTDNKWcXJ%2BcXmlNFUe90GOKAJ11FQLlgEi5DQ9R%2F29HfsRBUdF2Uxqgi86HO0pi1J7k5dj84hg1UiQF5OIvIt8t3A%2FlBQYM0cujeN%2B294XBXqxfSVpX7uoshdVKw759zYfBK0weuUOFfRYJnXrb65CFo9ZhiCb7Rjd5EOzI%2FAhy1CbItULwGV%2Bz7Sg4GyKDDqyOPKBjqkAZO5bEerpKka72Uq3AxXw3GtDI4eoSqDmWYxyAJZkxIKxRdB6raslJAWyh9wTbFoGmrgSIFwWOY2olg0mwkvFIYL4VoxMxFjCXKmfOWHy8%2F%2FBFlO5UtJTfIdIUh0XkDPPJmajYgL1%2FjumJ06I9a9HoR9k%2BIQJH2CAxIE4VHlTa3M7N7FMI0ReZc9VY9whl12SbQqshlaOXq8RprPxRTlwVX7LOmu&X-Amz-Signature=478e961c23aa2ffea9645d11e1f7f6bdfc477689ae62f41aec44ba283dc0e4ae&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TTZIDO2M%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T120113Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEoaCXVzLXdlc3QtMiJIMEYCIQD3ZmV5PPZkXc7ajYlh6YLNraUtfYw238GIAvmyWbm8LgIhAMIA7OE%2Bgrxbqo1lawVztREvQgSY5dW%2BgpQmR6HCANfOKv8DCBMQABoMNjM3NDIzMTgzODA1IgxUtpbJoo3mSi0TqXUq3AP9CzXAPkhrEAMHlj8We7hlJzngQFwdZ48ZXtq0KZ7Z2BLdNIH2HYpFcUUcy3EHrOuKjsbbDfm22SFo3Kg4oJ5mJ7mNAbjS1nViuUKRvVrvqecjIFZEoyepqhw06bT3CfqQikXAclKdFHCA%2BmUot4AEQ1ZPmfeA0pGE3exIdEJTsB15eHgrAqTBSTqHUtB1cVt6bNo4nThJnAt3rYsurAF4pVQFwPjWCHb2Ymhp%2FUc3NcVwoGAqEVyhxtjHz3FQifjLMuttLnimnxutSud9CKy3VzzbIbBVx4fS8YcuakrJR0ZV2InIYeJf37uOZodlxk5t4CVx4jodaMsautxZyWBx6CtWepS64lvs6TricvVuN4cYQXVO7Jk9Cuj3zDuno8KwQLziSOSKmMSXv7yTToX%2F9VFrsfYzVJvwqDM6vMTRyXArMNYfaa%2BW1rvviB8GTDNKWcXJ%2BcXmlNFUe90GOKAJ11FQLlgEi5DQ9R%2F29HfsRBUdF2Uxqgi86HO0pi1J7k5dj84hg1UiQF5OIvIt8t3A%2FlBQYM0cujeN%2B294XBXqxfSVpX7uoshdVKw759zYfBK0weuUOFfRYJnXrb65CFo9ZhiCb7Rjd5EOzI%2FAhy1CbItULwGV%2Bz7Sg4GyKDDqyOPKBjqkAZO5bEerpKka72Uq3AxXw3GtDI4eoSqDmWYxyAJZkxIKxRdB6raslJAWyh9wTbFoGmrgSIFwWOY2olg0mwkvFIYL4VoxMxFjCXKmfOWHy8%2F%2FBFlO5UtJTfIdIUh0XkDPPJmajYgL1%2FjumJ06I9a9HoR9k%2BIQJH2CAxIE4VHlTa3M7N7FMI0ReZc9VY9whl12SbQqshlaOXq8RprPxRTlwVX7LOmu&X-Amz-Signature=02b64af47f9d4387c08fc7008ae7fbc88c2b36d74dc60139b0d6d99b8de88649&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666LAMCWAV%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T120101Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEoaCXVzLXdlc3QtMiJGMEQCIGF2F4dDFMHCUWfWeov6ehUhZMd%2Fls31QsRFIzPF%2BVGuAiAl34ngmRE0784IG5F8fqSIi3GP2Q2PJ8i67KxL9H4AUSr%2FAwgTEAAaDDYzNzQyMzE4MzgwNSIMDCVcSuckXByUB72HKtwD%2BnIUuCVAGVuDLlfc7OEBWzej25H1YgvdEuzVQXKA4iPNty4QVhI%2BGAQZ22itXfiYZUo0qrQWYnMRGTg4Nw9F3FeUWM5a0JljWW1Tfj%2FgnF8USu1ihwMNUxP7jMegn%2B1yDvNm4lawSW98hSjREyVvNgvYPDSf4tRi3j0ec1WC1H6BKKqeLxYV861RwM2qtcyXj8%2Ba3xyGawG5xI9wMipSklkLaddjeJMisRwOQPHKKJMM%2FAXhqF0N6mtUJZ2t1MrVQhUV8xxD3wd4WZ3MhOsbBTDWWsp%2FsQpXIA02HKAhg4om5%2FV9XsXOwda%2BBZHeOLqtSaQXg8faSHcujIkflRLQ0wONy9QaBsGkeXsjRzhaZ82m%2B%2Bq%2BKy62VXpmu1FyjdaLGpFACuKTWjJldxNnVleh74Cb9Di10bCvk%2BNSzDHTe0YXFYt9bApxACh8fGgYPY%2FMZu9S%2BUAFlHnN2lV1m2hbDaWvJuYcz8%2FP207U8GvOcrT1rhqLjw4PXeza1hFWQ0qGgT5IvQxYJGLDz7Th432Ug%2BhL9VA%2Fh%2B3yyyAhAv0SGpQt2nWEyCkGo41Kupys054p%2BKjnfsu2%2FZpyAxZgljI6Vfpt6izAnO3zuAa6XzhVWlJqBAZhFyU5%2BJlYnHswjsXjygY6pgGymKEiyC20bxRC25%2FRFeibiWT8mCtoGr%2FUTN%2FqZjK7nkmgu62IQ7whJ5BuVQRpJM9p0hxxReSucFo5VcAd%2FWSvDuvNAuaksErGcPLL3qzCpiwQhqg6I8hDL6me4Pkwia3FfFH5tFeSybnVtRw1vmdVnqjzea2QBwJkCE%2BgyH60pDOmnvK8oswMLYlFOE8NF1wNGZNoIEdI8Js4HLewzZTFEcD7o1vi&X-Amz-Signature=e54c527d90c970f338bd33375b528fe80d16f452612c3cbf2319ecab418a7cba&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RJZEUSXG%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T120118Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEoaCXVzLXdlc3QtMiJGMEQCIGK9C3dcy2VnbNOIWsdBPhspM211xSS1McXD54Rc%2FNe6AiAmvxkvPyv5QTfdilrlDKJIBxXBYKNZSTLbnkCy10nG0ir%2FAwgTEAAaDDYzNzQyMzE4MzgwNSIMH3GT%2BZufTLfxnsMnKtwD2cqZVQ0ZxrU1qrso94%2By3KLBe%2FGwx1C0EkCrfsRNHnd0qaGas98b6g9RV5biDi%2FuJ7zTVtU%2F%2Fk%2BlNu%2BotpsXpsiXE4R8sF06CpRy8cdIkM3YpSdrSRCX8XUAjDD84UpgDGinzftkc0KFUcIT%2Fa5HNR4MmouYBIv%2BRpbavl1w%2FqJMiq3N1gPEps7pNtPf51Qfk0f54q0%2F06W6UMfqxK%2BLV4Ebr8aMt6fxqoEPfqWbQceqcnCwv8r8pJPJ1%2FcR3cL7EEnwAwxRXLa10hVs6DEZkhX8CLE1HqYqLnX%2BuF6RqPHjW2JQUyDKuRExv5LDtHKc4KMeowxBY8Y6xaOsZY%2FU6jaHLiRFH2gQgQCNckC5ag07qyAr%2F5OaE%2FgNVvO0UlgHLUNJAFSlNz6KSRi32URq4s5gr9m%2FWVa4EPcthkKtj06tNFYoZkltG6elTacAyLphv7J7QNfg0wXNsQyGteT2djGiDpupigP1ZxXcUZPIG2CR05o0HZpYPrNZHKutd%2FvaTWZ1kXRAKQ4mFGT57%2FdhdZNrIqpyjcVmz4W0xC%2FF%2BJkLPBRXqetKVCriiHRqM2NOKC75%2BlzDSCFMxMMRZI6fTuRI0KLJK1crzXKoCKpbaGSV%2B%2F7%2FkAwscc%2FN05IwnsTjygY6pgE4KEjlxI3UhRJRAkwICcvh3W7bQI5uSeNhmNm0h7W6TJcxRLEnwaA6A8tp1Ts4Yu8HY5cmjAMvCV%2Fjk1rCFnzDD9nk%2FwwpuXtdhmOGD7oglKKqZv57JeP%2B6S%2BU2ihllykRLa7X3rTwW4JrpAmGyGvmA7YSBA3pOaOSswoSWkgjoX3%2B81eJKFmwDk%2FKvQvy0Vz0HXppRxVaihjEBuUCLMtj2WVn8Tjn&X-Amz-Signature=09ff03b7e93cff6d8fa5e189a0e403f89edeed538ccc866c964ed2dfcd313fe8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RJZEUSXG%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T120118Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEoaCXVzLXdlc3QtMiJGMEQCIGK9C3dcy2VnbNOIWsdBPhspM211xSS1McXD54Rc%2FNe6AiAmvxkvPyv5QTfdilrlDKJIBxXBYKNZSTLbnkCy10nG0ir%2FAwgTEAAaDDYzNzQyMzE4MzgwNSIMH3GT%2BZufTLfxnsMnKtwD2cqZVQ0ZxrU1qrso94%2By3KLBe%2FGwx1C0EkCrfsRNHnd0qaGas98b6g9RV5biDi%2FuJ7zTVtU%2F%2Fk%2BlNu%2BotpsXpsiXE4R8sF06CpRy8cdIkM3YpSdrSRCX8XUAjDD84UpgDGinzftkc0KFUcIT%2Fa5HNR4MmouYBIv%2BRpbavl1w%2FqJMiq3N1gPEps7pNtPf51Qfk0f54q0%2F06W6UMfqxK%2BLV4Ebr8aMt6fxqoEPfqWbQceqcnCwv8r8pJPJ1%2FcR3cL7EEnwAwxRXLa10hVs6DEZkhX8CLE1HqYqLnX%2BuF6RqPHjW2JQUyDKuRExv5LDtHKc4KMeowxBY8Y6xaOsZY%2FU6jaHLiRFH2gQgQCNckC5ag07qyAr%2F5OaE%2FgNVvO0UlgHLUNJAFSlNz6KSRi32URq4s5gr9m%2FWVa4EPcthkKtj06tNFYoZkltG6elTacAyLphv7J7QNfg0wXNsQyGteT2djGiDpupigP1ZxXcUZPIG2CR05o0HZpYPrNZHKutd%2FvaTWZ1kXRAKQ4mFGT57%2FdhdZNrIqpyjcVmz4W0xC%2FF%2BJkLPBRXqetKVCriiHRqM2NOKC75%2BlzDSCFMxMMRZI6fTuRI0KLJK1crzXKoCKpbaGSV%2B%2F7%2FkAwscc%2FN05IwnsTjygY6pgE4KEjlxI3UhRJRAkwICcvh3W7bQI5uSeNhmNm0h7W6TJcxRLEnwaA6A8tp1Ts4Yu8HY5cmjAMvCV%2Fjk1rCFnzDD9nk%2FwwpuXtdhmOGD7oglKKqZv57JeP%2B6S%2BU2ihllykRLa7X3rTwW4JrpAmGyGvmA7YSBA3pOaOSswoSWkgjoX3%2B81eJKFmwDk%2FKvQvy0Vz0HXppRxVaihjEBuUCLMtj2WVn8Tjn&X-Amz-Signature=09ff03b7e93cff6d8fa5e189a0e403f89edeed538ccc866c964ed2dfcd313fe8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YNH4ZEUR%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T120119Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEoaCXVzLXdlc3QtMiJIMEYCIQDS6lUcWresW%2BkqfmDj1ZH3G6b8JqfGGulDyIrxQvU7HAIhAP3KmCTKaZwZOzzgkXFLIUImEkybowjZ060pFZF5rjMDKv8DCBMQABoMNjM3NDIzMTgzODA1IgwHKIRJNqmWvpU%2B1e0q3ANSeAt3jfgNzNENEy423tfDK1icwkfqso%2BsTGHTpjmW9kCwyiOkDkJX%2Fv2QTdh7Q%2FyOUSaQ4O%2BjbfhsPcseWfhaVoYulwgLkSpXesyTrsfLRRDlRp13BHTw2aUR%2FjlI%2BFbasKb4SeiSYZUbmI7xEHHydgX7aduO1cTYWwvAsFC3OyMZOiTPzUDj90%2Fp4MCJtXzVMlK%2BsQc8nUGLl17KHsbp%2FTDuAW8CXOaYNCCJAMXztEIiUfMDptSDFRG1ULiswxS5M85zrsFbxZ1d91rmgpsrcHmX4mKtLAPcXeb5qYVLhebxglHYt2yDiSP1tBm7SWX%2FK0QfkgSctznheSb%2BbJNJdIXSbcuzFUpVXmWRpZLld3avcEH643Zy7ROo%2BD1pH3vfnQ89Ku2o5eyO4SK0QPmHCK5le7n3vo1TvPXVmKF2ov6hlNgVXc86ZI6rhXLjpYcNW4BSkAmlJ7m04qS5UqUb%2BLAO%2BKO0VnwuTjvOvdXSAs1MLHOCTCIV3TP6dJq4YnfqUgEIJFAQKnRYcTjRUAFM32pT%2BOZaXpTvd5b0tr7tDeDaEYEnbQvGum9UbAiVHqsXi0FqkBCW0XAsC%2FUzmVvGafOTRB5AmZAUyTGTnRO2CYyu6zEcYPAE7WinoTC8yOPKBjqkAbeuupHKViwsFqZ5vwjzB1pIPH2sGhVcQJfuy%2FqvhLtCriEr8y85sITU0ycMGI%2FRfSCsWa22VC2nH5hXXKP9ig9Cq2VG3bqgzub4ei9EvAQZ%2BccTvMCO9Wb0nxjqvLjOsAHVNrkxIflKJvqbFD%2BUBwp5bxF7uvWXN4cF3dad5KuoxNLWAukGQzxrX%2BGAodDD8yzi1N2ZnZD8MFufdtd7RW3lChg0&X-Amz-Signature=20c69c96cca399943713d52fd370f71eaa0d672070cd76bd632c63274b5adbdf&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

