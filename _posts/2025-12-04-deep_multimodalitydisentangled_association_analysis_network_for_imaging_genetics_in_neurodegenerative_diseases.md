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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46652ANYZQK%2F20260406%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260406T140216Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAUaCXVzLXdlc3QtMiJGMEQCIGLZcxIfGrFVSBtrXpqpcCzfQcN%2FmtSUX35Hcb%2BdRmc1AiBoWT%2B5whF3E5lMWyvKkr2CQZ%2B7UYfDhEAXpHDHZgj%2FMCqIBAjO%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMxM3Mrt4Dk%2BMqoTfiKtwDp8Svp%2BKfFfWPhclPcYFRt7qhNumUdNlb8SVfVth6Su%2BknPieRfQ0yn45nM6ufnNv4IpXTLYx8Rn9CVNq%2FEo2Dq8Pl03L%2BmiiKxKDoq6roT1t8wSzNjhlnq0a85CQ%2BTQaJM%2F55Rd%2BXE%2BydPIU0FA4dvnWinVflvtF%2FGHaFNRPSdFT6gcCR7I987xuPI8avwoiMDy5xuHoan0E7uTKDpxIpWYh9O4wquXDvL1g60DJbhPp5ka%2F%2BEkZlBX8PkQ6s5wE1eUxq9RdiLdhU2fHBopMuU98YpyYMd%2BynHIrhbeuyNRKB9g6c9l%2Bz%2Fyjyjom8qT2wEVTiMdRrTsrHTj%2FkB5Q4JsbBhD5J6qaT3Y3VOq3S59iib5fPg0aB%2B79wQdGyhTmDJe%2FLya10nVpBOzbkX7QcoRSbkTN5UrR3Jcp%2BEE5%2FgHyAol2JgkQ8Qmh8fgUsXGUFi8o%2FIOCgXnXU0P8anyoBslwMXprndtJONgt4op3qroP4zmKGnfrH6l6tIXcIqWCrQ8fMZnSVqcMYiibhKLoGo4is6q1TlV3C20LzSf3OsDCLCW7wMZmfmQxZwiE8XBIK6TiWKnKurslelknx%2BTOAZmWMSFypsh6u3XLUHQxx7E7vDYuk%2BpIsI3%2BqJEw59rOzgY6pgEKoW1ePEkMriCvL%2BLut45tJ%2BrKsZRE%2BrpADx85bOPyjnltBgkALFSqGhziYJipBCHJVijTU%2B6QFwV6TTE20T1PghgWGuyCAOe5JBiZBhLgiFeKiDefmQIqs4S6uBiwvNySPJCBaiFfpCQXoW%2BQRTBSDmIUl2AeHr4Hm5Mlxeh4YR%2BlA2qZk60RMh2XeNW4s%2FiHB4sKiuRtqJC2VYmfQuq1mIo0wDZR&X-Amz-Signature=8cf81c58ac097a32a7e6d7620abed4e3b94d90d722f5c65800c757f4ec0a74e5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46652ANYZQK%2F20260406%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260406T140216Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAUaCXVzLXdlc3QtMiJGMEQCIGLZcxIfGrFVSBtrXpqpcCzfQcN%2FmtSUX35Hcb%2BdRmc1AiBoWT%2B5whF3E5lMWyvKkr2CQZ%2B7UYfDhEAXpHDHZgj%2FMCqIBAjO%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMxM3Mrt4Dk%2BMqoTfiKtwDp8Svp%2BKfFfWPhclPcYFRt7qhNumUdNlb8SVfVth6Su%2BknPieRfQ0yn45nM6ufnNv4IpXTLYx8Rn9CVNq%2FEo2Dq8Pl03L%2BmiiKxKDoq6roT1t8wSzNjhlnq0a85CQ%2BTQaJM%2F55Rd%2BXE%2BydPIU0FA4dvnWinVflvtF%2FGHaFNRPSdFT6gcCR7I987xuPI8avwoiMDy5xuHoan0E7uTKDpxIpWYh9O4wquXDvL1g60DJbhPp5ka%2F%2BEkZlBX8PkQ6s5wE1eUxq9RdiLdhU2fHBopMuU98YpyYMd%2BynHIrhbeuyNRKB9g6c9l%2Bz%2Fyjyjom8qT2wEVTiMdRrTsrHTj%2FkB5Q4JsbBhD5J6qaT3Y3VOq3S59iib5fPg0aB%2B79wQdGyhTmDJe%2FLya10nVpBOzbkX7QcoRSbkTN5UrR3Jcp%2BEE5%2FgHyAol2JgkQ8Qmh8fgUsXGUFi8o%2FIOCgXnXU0P8anyoBslwMXprndtJONgt4op3qroP4zmKGnfrH6l6tIXcIqWCrQ8fMZnSVqcMYiibhKLoGo4is6q1TlV3C20LzSf3OsDCLCW7wMZmfmQxZwiE8XBIK6TiWKnKurslelknx%2BTOAZmWMSFypsh6u3XLUHQxx7E7vDYuk%2BpIsI3%2BqJEw59rOzgY6pgEKoW1ePEkMriCvL%2BLut45tJ%2BrKsZRE%2BrpADx85bOPyjnltBgkALFSqGhziYJipBCHJVijTU%2B6QFwV6TTE20T1PghgWGuyCAOe5JBiZBhLgiFeKiDefmQIqs4S6uBiwvNySPJCBaiFfpCQXoW%2BQRTBSDmIUl2AeHr4Hm5Mlxeh4YR%2BlA2qZk60RMh2XeNW4s%2FiHB4sKiuRtqJC2VYmfQuq1mIo0wDZR&X-Amz-Signature=8cf81c58ac097a32a7e6d7620abed4e3b94d90d722f5c65800c757f4ec0a74e5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VFDZP4VH%2F20260406%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260406T140217Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAUaCXVzLXdlc3QtMiJHMEUCIF5jvQQCxTsh1D%2FDve69qeoBD1VQDDvcVQaiMguIcFBrAiEApcOKjzBPQ58tnrcKIZQFSwfzEHD03%2FqSbt7DVydpc94qiAQIzv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDDdJbvxDqfa0fUgokircA4am90qL9f9JTkkCjOkdLbZPP5RmABU%2BuvIy7wiiftKTGCyVLWVPRZsF0tfRsZ8tWH%2B33ifDxBzAcFIoJ0Bd5BosMllnNeSESMmUCkLtbo3mMXo0R5vNHKgv01ckottkqruPAMf0OBJM6Qvnn11z14T84VZBvWb9qjbjpH8TpZYqmjvJpbYNO2kjsLKNUWVjbArtPGkovIdJ%2BgnNx5JR7Aw5hg5%2FuvttMVw6uJ1bdc%2FV1ftX5ONTPAIHhr3Yy5LEA2W%2BFYXugAcIZ6J%2B69xM8GGLrOU9AY0Kek4xvJVn%2F13vR2L6zHvffvIN3kUeJBn6dDfYkJIHUgNKiHBRYXOjR89H8E4w%2FKRdyEz1%2BF1RcV0D2b89O1qFlfLrKrh%2BdzbqipW%2B1pMaVkGOIVoaGL5hwPsUHnZ05IUGqLVNcHkPXyeTespNuh3iIbEJxi74gMJkd9lMc%2FuNjJe0kJ%2FqKDV5l9xjc2AoFmUvYryD0oELAARrM%2BKM5tWtuIr8xYWOSt70%2FYeKv9yryWJxgE1Z%2Fg4vLiRJleQdOZ4%2Bw%2Fzpc9SSZ%2B9Vvwo%2FxUIxS4p05yyXjCuSHVz8%2BEvWnAXmm%2B5c1oVZXkvsCDbk0lPHx7aPKwxHazvFsCV706W4TiY8JquKMLfbzs4GOqUBjzsfcmGeZHxf%2FnU0gSb%2BYXm8aifF273VSqPOYLSwRLJ%2F5QpAb4pBe2rXiCXHhNeSliUW4cIw00upJ8oShCWla3QRRAiCkbXHjRFcOA%2Bang3XXDWTXzNEEqPFKYeML0AjlinRPpKiSvkk%2B0Dron%2FKx7ebun45eDKgLdOo0mCP%2BFvuLb2dZbYvaUzka8GEFv3SJuoEsk80ZXwn7mMbBLet%2B8Ibq8Ic&X-Amz-Signature=2cfe40e87089c2641335593c87582a0c999c1de367c8e66ca3f6be17866a411a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YHYJ2M7I%2F20260406%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260406T140220Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAUaCXVzLXdlc3QtMiJHMEUCIQC7%2B%2BzR1GeQoxF2Glo0fGSbyb9PuU6n%2BZQtPV7ckAzfMwIgH0ABJwNOwLvTxf%2BFBoaS8bkNbPQeoeccZU6JJurabrMqiAQIzv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDFnxhukm0vCK%2F8%2BPMircA5C84k9X3szto2YJ9KH297AOJ8be%2B9x%2F6SVEEnwQpt%2BCtb58xlM%2BSExUHueSmSqlFRV7x%2B3pV%2BHMhEnBcRyMUZtxtci1Z2OJiKcnWmz1oQe%2BameXrS%2FYsKuYURs%2B9hgOqR7B6CmEx65nfqhEnMyud66CmMtfMw0%2BhAfD04Wt2YrvM1mybLraqfcSUDRaEkQz8ESQzKWSa9OJ9ldUSYtJ2ixv3F%2BK7LsikRWdIEjbvt7LDLHQZuf5vOHAyJ6dfnnA3CpvWve0m70meHtM5v5kdcVt5KPoz%2Bp6PIBmf%2FKAvg59NTuw%2FWaRd2IgEKKL2OPHYTsQBtsNJB3kC7t%2F4arc4xidl5jG%2F7XjCMvaqj5vAuIsx%2F5gF%2FsajyeR5Y3zAvDNHTspS1kyEGM3IhNacp%2FR1g2qf%2FwTmmRNDHODNDq9JW6YyttGD4Ch8mFxy035EvlDvpstSfedEErLQ3rBy4EgkfIX8XY9b8YIeRTcYZDrIMCgRBuvhPWfL9NlkiK5pZKhhq4bX3wOfVhM4Y0vHTIP0SUeqFtR1YVnKbtCD3Nanz0Z%2BapWeaiFn2kRM09dmjcdG%2BYKYkK%2FW4j9tFS3fUfsRSjcN0WS7uTZfUlF83D7CgSTUL4grxd4l5iJ%2FC0qMLbZzs4GOqUBXuBk12W1pGG%2BaZc5VNUHEYrRzUJMwHqG5yRK1iJfhdVmjk6ExnFoJGdk%2FfyTf%2F0H9olKCF2afM8Q6VxEH%2FdxNf80k7swHP8XegGrSsn1949%2Fs9K3P4kdGanHSPNNaW0FTn%2BEbbIWhG%2Bwj8eTloQmZsqGCF%2FwwhcIuW09dsnI906e2xxyEFuJRG2P%2BWNqU1oP5ek1rbUBddGZriPywyS1WIqYO9nZ&X-Amz-Signature=ad308fc9580df81a1450f68b602263bbf8c05d7f43d785c320e0584bb4e090f1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YHYJ2M7I%2F20260406%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260406T140220Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAUaCXVzLXdlc3QtMiJHMEUCIQC7%2B%2BzR1GeQoxF2Glo0fGSbyb9PuU6n%2BZQtPV7ckAzfMwIgH0ABJwNOwLvTxf%2BFBoaS8bkNbPQeoeccZU6JJurabrMqiAQIzv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDFnxhukm0vCK%2F8%2BPMircA5C84k9X3szto2YJ9KH297AOJ8be%2B9x%2F6SVEEnwQpt%2BCtb58xlM%2BSExUHueSmSqlFRV7x%2B3pV%2BHMhEnBcRyMUZtxtci1Z2OJiKcnWmz1oQe%2BameXrS%2FYsKuYURs%2B9hgOqR7B6CmEx65nfqhEnMyud66CmMtfMw0%2BhAfD04Wt2YrvM1mybLraqfcSUDRaEkQz8ESQzKWSa9OJ9ldUSYtJ2ixv3F%2BK7LsikRWdIEjbvt7LDLHQZuf5vOHAyJ6dfnnA3CpvWve0m70meHtM5v5kdcVt5KPoz%2Bp6PIBmf%2FKAvg59NTuw%2FWaRd2IgEKKL2OPHYTsQBtsNJB3kC7t%2F4arc4xidl5jG%2F7XjCMvaqj5vAuIsx%2F5gF%2FsajyeR5Y3zAvDNHTspS1kyEGM3IhNacp%2FR1g2qf%2FwTmmRNDHODNDq9JW6YyttGD4Ch8mFxy035EvlDvpstSfedEErLQ3rBy4EgkfIX8XY9b8YIeRTcYZDrIMCgRBuvhPWfL9NlkiK5pZKhhq4bX3wOfVhM4Y0vHTIP0SUeqFtR1YVnKbtCD3Nanz0Z%2BapWeaiFn2kRM09dmjcdG%2BYKYkK%2FW4j9tFS3fUfsRSjcN0WS7uTZfUlF83D7CgSTUL4grxd4l5iJ%2FC0qMLbZzs4GOqUBXuBk12W1pGG%2BaZc5VNUHEYrRzUJMwHqG5yRK1iJfhdVmjk6ExnFoJGdk%2FfyTf%2F0H9olKCF2afM8Q6VxEH%2FdxNf80k7swHP8XegGrSsn1949%2Fs9K3P4kdGanHSPNNaW0FTn%2BEbbIWhG%2Bwj8eTloQmZsqGCF%2FwwhcIuW09dsnI906e2xxyEFuJRG2P%2BWNqU1oP5ek1rbUBddGZriPywyS1WIqYO9nZ&X-Amz-Signature=961d98af72b4288f374bea47ac452b7db89e5e8da5a2e68a1aea5758d0062bb4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QKLK4VSP%2F20260406%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260406T140220Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAUaCXVzLXdlc3QtMiJGMEQCIDCcQZOwnpLBfhZEz4%2Bv%2FEOI28qncXdptveuOOVqYDg0AiAPXN4XnHt7gC988nRFLQkNErDt4h6M2%2BJC%2FL3Zk1yWuSqIBAjO%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM98AfWSQCUHW1rUVIKtwDGpQpJ5v%2BjytPdZ11pq%2Bdz3VzoV5jnVG%2FyQ2ADi5ZkVTgXc%2Fk5QcQa%2F%2Bs0CeGmtC7RyG0zwIzN1M0yPUfQiOpuM%2FmXMiEJsinqR4wCXShfmOJpRqSmp56JQyVhp4GQgiIJCZ6EI6dHOfEUt1kPFhamHfLbUYS5B64Xpv%2BGZvrJdG6r%2BWDrNzuq99fFWCCI%2F%2Bu2HJZO8wWWGQlVF2Yu0U%2BcBZ63b7AnAfI5hHDi%2B4uwzdOCEwt3MnAmJ8QX5wwqG2rpUVBy99x1NFUkDNSYv3aseM%2FvG4OYfAkABEDI9q5Qvizp%2BLm6qlUi1lIkaTqIYBPMeyKjwjQOEuP4SwzsdHE2iiZ7UQzdKUFi9faIMeGOVaffCaiMacwIWGl6XOUpUUeC0uRVBlrGjfaSgL1V19YkCdxj4abp%2BMikXQ7d9anc0NIJTSNmD%2BwP1UGjn%2BxknQmRk49t7Glfn1qo22z5E%2FvC%2BYiqZO6MPWfwDx0eNO2rt4APVZjcRIvLXEiW9%2FTIbhgxmrWOTY7Uirpw5CJSXi74dCMOwMj%2Fe2%2F6SbrEDeXBLRoLTP%2B45CgOq3nu3s8WYS1gblfgAi8fT%2FUE4%2BxRv%2BsCEr1yFvLGR7gqoCMe2ghlx4zQT4vUIkCRi%2BhQh8wjdrOzgY6pgHyDCGt%2BYBl7cY9XQajkjZINaiJEGzE4xMsUzYn8y%2F0w7L2NOAi9ObI8AFOfQMfOx%2Fz5mEOF51JUiFWKZlAfGCUBLlOXUVF12w6YCKEiWzum4crut7uX1yQ8h%2BwiAvjToZn3nQYpnMgilbLr2aWs64SEIs6oXHiN%2Fcl7uIx2wq0mGKtSjJHEC52ZehPVA2qP2ti1EmQh7FM6Zgi4GDgWAzXHOJU8Zkd&X-Amz-Signature=d970db0af7c1655a89a9562343788de98e5e3ba40d1573c0ad0b3b1a72056370&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XIZJ2KGS%2F20260406%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260406T140222Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAUaCXVzLXdlc3QtMiJHMEUCIAuFk6MGaki5j%2FzmgKrTPG%2FPNP6d3Tzn41Ckn7zK2zPQAiEAqvHduEDYGui%2FYHtrM2Ia6%2Bw2H16pMAApM4l%2B2hnWwLIqiAQIzv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDP2Y9adIo6kHfBZ%2BEyrcA%2BDeLbGgwLziRlPpTJVCyuNxwKeYsjIC%2BtTBn%2BaxLUCCREZAUoIoU%2BxG8wivuYgqq%2BrEr86Oc3tZzI0B2BKTV2B1vClXsKduGJeRzfotc7VNVuutmo1ArteC1PgrUlJGh7J4m%2FZTLrLl13zCxQt18Pfa%2FeDnUZEU2Aq6dJB%2Be05x6Dwfv6jm31yt2Oa4qQ7cAKS3tH%2Bs5uG7gY1zIEQhVodjC1eUunpCN5cMUp5IeAV%2FGj3QZB5zZEa8hrGlCBFjQkvV97KZ5JW1bBp8p4XoiGZ5t7CXQNLhWZsKqM%2ByR0bk4bytqF8qBAEu62CBVNVuv6JF7NFu5wR5RgkAGoGRaNN6gmvpOjzNtRXRKAYXp7pyq6%2BbXG5Cvn%2FMZtPBU9OEcHtlr1OaPTDPY%2BSeZtzpmeo6jJypphRBJ%2FawDg9bOi6ekMq3FgdHwZARdvhOGFvc%2BaMeHKaHuVmlED0Mr4onoox76oDRGgtXr%2FU%2B6rI5OEFe3Ry1wMp778%2BV1odl%2FnMGChZF6X7ok0nz6oP2RfxeYh8vucvFTaVAoQAZhYpluVBuns42kmjrTPpmV3Uqpoky6khSK52%2F%2FVQ746KtH5WsdNRusEkEFanzBf50nOOlrX7jTCQYrSfWJCG40dJnMOrazs4GOqUBJCnIAWbYIWjZW0tRXPO62lb%2BF%2BA7%2BUMsM7dM6aTQOBKPXc9%2FH8ouQhk8vcChgLiYJb5LYAz6w%2F7ysikzuS9EGS%2BZhyPXLFKSpIX4eG3du5UpClzHAQf1g2ylrhwrPChkECYcj0WcO9TILuM%2FNt6rg%2F7B3WpAHHwe9Exx14t054%2FsUM0dTQd0VY%2BR9iFOXXjhQ2vf2ljuySqoRaJnkUE%2BpYM4ksRe&X-Amz-Signature=3cd42f5c79a2206e126b510b0bbca293dc3177d4bf908f07b0513f502295c1d8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VKXWEJIK%2F20260406%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260406T140225Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAUaCXVzLXdlc3QtMiJIMEYCIQCheYZEKwVhKRKQFpAdE7U2NeXNAvzEoNh%2F7Q5%2Bjiz9XgIhALXRGnBCKWLj8gSfLvGxvf3%2B13lxgsfnQZcbuemxynFHKogECM7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgyT%2F40X3PE46hdnF18q3ANghhe9H%2FkMFD2INY1%2F5gNUb2tYxArrP2RvLoC3fOaCYv1plft%2Fmlc%2F7mCl%2BIGcFniZb1vEAhrM4SWAgEYx7%2FT9MmercLwb8ZLW8giOe9QbKe1TmdatfROfRUXVCEFq1r3Wo51ZtZv%2FtbW%2FLQcXa2QhtLVTBp%2BlldzHSav%2FR3Zw3xyC6GLRnJCGhS3Fm0xwG0TCcIu5INH%2BdRU%2Bmtwq6m%2F9Ojsxn3skp%2FvP%2FUZcQ7cu5yB%2Bf3WUyIlDn9YB8HvANNkoL3uLbORaBa9Lzl1X42HQ5UiRktTITy4RWq%2FH%2FyWNRweTKGWT6zKPEx7%2B36dxCV%2BxGlh9icqjOPrDD10JJbrqvFWKJPkz%2Bu%2BaMjv%2BFE9dsIfYWAhmRr4dJrxse%2BnsMQGBpllTvuDgZYfDmAgiVBckCSUS61c%2BnQwGlyp64%2Bs1eMNSywUQ1TZQb%2BqjVGcyGsS1LBlDhf%2BJc9c5Jq%2BSgDbuTfJz%2FqIDtJEqa0Zb6XGI48VrOPxjcw%2FqTLHJV5nFNqOa0YnGOEuMJOn6%2FVWeZXdqkrb3pGqKJNQDNqOtJvZMzyVlXY7MzXddkHagaJuCDE9IPPlCwU8wMggUyuexYaOtc%2B9ulAAr9dL0lrLzu2pbSkHtXG9%2F1zz00jmL%2FjC62s7OBjqkAbMieVjNJqYCIALlqdrHi%2FX6rXQrdkwj6Fk75wvFreFr8yNSri3Cx2pIMs%2F50JZPby5pjyx8hAu9F6j75x1u4m%2FTJmRKrom5gQtIZEE8AvKxoA%2B7sya%2BTw2V3Zj7h8exXQAShaNh3hxTm9IxGmh9EU4TqOvZRfWIR3uHJH1YZSCpuVROcRpms5mv2XtCWJt%2FlMGpuzrqEXnrjehU8z9MpScG8KNq&X-Amz-Signature=895ec7b447ea7194ec84310222e9fe7519b2173a1a5c4687ff9111a6110f731e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S6UZSPV2%2F20260406%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260406T140226Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAUaCXVzLXdlc3QtMiJGMEQCIEz%2B44jmeJGJ%2BFYOwB%2FqzCcx75gj8KjjcxfrCBiRmOyTAiA3YWFn8h2Yioh%2FN%2FCgtpGq%2BYtv0a1kWihGPAm6YE5lsiqIBAjO%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMRjSDR6qlJNdw6S7PKtwDPJ9gaVwZAhpNaxWvYkM2EuSKaHKIJELKGWuf3m2YKvtRVptXOB%2B7UZfzMRFZNiW%2FOYlgKSW%2B2199OeJHBz3Dnx7vLHGvWjXuTOJzLbTcwyXdrFedX3J2Zh3mLNVfgb1FTOM%2Buik%2FeIzKJxLWTm%2FX%2FI58QUXV5CGnYF5Z4IIjWR6w6xWBoPxxwxx5bBIFo7783QML4o%2Bz3%2FIzggRbPhH%2Faye%2BqQjEWVVVyeXxC4%2FlTbXo3WnJ1tOsE%2F1ctp97NfhPLIWf4FJsVeF8NBeTMNnYQ1PNVzATptQPOd82MW1a71aP2smfIV0XtKTVtYCIA%2B9j81zNsrZ6CydqEA2%2FOYa%2FS2BeNKwjMwUn3X75cW2uIFQgZRLTnKj2oKuUuUNrg5shriSg5RktRVUYPoFSxb%2BTtWRKc68rZ%2Fjr%2FoDNtlVqesuwd6%2BsS0HdKStsJH1SmOYcm5ZkbkisvHQiyyX1Qu%2B7xl6C1A%2FeQ3C1a0k6HKT6P0NMn2wJ0HAZRucpA2MN%2BhAwJ1sBmNW13iF3LmrMZKYvOwQgb8AelwO2U7eBhlaVcldTgQSsvt49T8lv0TiJmC7nkuzPX%2BD0XQupB0QfCfnwrZ97TV4raIfO8gJVc6vXRBuXyvkYudPzRqhUgHAw0NnOzgY6pgFcyZ9GFygUGT3YFmbkr1JZFZ8Wvo4deIKny%2BxrL1xKmK9FyRKl168wd825X5iM1pX5zsvodvtwtxclJzyYHes8NmYQ9i31KZISvk96RbSeuWlwdteuzxugO2UPDv3%2FVM%2BpKTjVUFPzzlPsEw5yzF%2FqruLsdx5Nn1W1pPryoxouGYHM8jSZlUNUOPs2goqzfDByKdbXWLKb7jAPiG2ec6Zb7TjphgIh&X-Amz-Signature=e8db2d23b9a90fb1a0e7cca74c591d89d2b69f398821ff841e2c0b50cb3f8b92&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S6UZSPV2%2F20260406%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260406T140226Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAUaCXVzLXdlc3QtMiJGMEQCIEz%2B44jmeJGJ%2BFYOwB%2FqzCcx75gj8KjjcxfrCBiRmOyTAiA3YWFn8h2Yioh%2FN%2FCgtpGq%2BYtv0a1kWihGPAm6YE5lsiqIBAjO%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMRjSDR6qlJNdw6S7PKtwDPJ9gaVwZAhpNaxWvYkM2EuSKaHKIJELKGWuf3m2YKvtRVptXOB%2B7UZfzMRFZNiW%2FOYlgKSW%2B2199OeJHBz3Dnx7vLHGvWjXuTOJzLbTcwyXdrFedX3J2Zh3mLNVfgb1FTOM%2Buik%2FeIzKJxLWTm%2FX%2FI58QUXV5CGnYF5Z4IIjWR6w6xWBoPxxwxx5bBIFo7783QML4o%2Bz3%2FIzggRbPhH%2Faye%2BqQjEWVVVyeXxC4%2FlTbXo3WnJ1tOsE%2F1ctp97NfhPLIWf4FJsVeF8NBeTMNnYQ1PNVzATptQPOd82MW1a71aP2smfIV0XtKTVtYCIA%2B9j81zNsrZ6CydqEA2%2FOYa%2FS2BeNKwjMwUn3X75cW2uIFQgZRLTnKj2oKuUuUNrg5shriSg5RktRVUYPoFSxb%2BTtWRKc68rZ%2Fjr%2FoDNtlVqesuwd6%2BsS0HdKStsJH1SmOYcm5ZkbkisvHQiyyX1Qu%2B7xl6C1A%2FeQ3C1a0k6HKT6P0NMn2wJ0HAZRucpA2MN%2BhAwJ1sBmNW13iF3LmrMZKYvOwQgb8AelwO2U7eBhlaVcldTgQSsvt49T8lv0TiJmC7nkuzPX%2BD0XQupB0QfCfnwrZ97TV4raIfO8gJVc6vXRBuXyvkYudPzRqhUgHAw0NnOzgY6pgFcyZ9GFygUGT3YFmbkr1JZFZ8Wvo4deIKny%2BxrL1xKmK9FyRKl168wd825X5iM1pX5zsvodvtwtxclJzyYHes8NmYQ9i31KZISvk96RbSeuWlwdteuzxugO2UPDv3%2FVM%2BpKTjVUFPzzlPsEw5yzF%2FqruLsdx5Nn1W1pPryoxouGYHM8jSZlUNUOPs2goqzfDByKdbXWLKb7jAPiG2ec6Zb7TjphgIh&X-Amz-Signature=ba52034020692a60676bbb0bade3f79752b09c04c40f932e50b862692fd9b57e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46624YWTFYO%2F20260406%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260406T140212Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAUaCXVzLXdlc3QtMiJIMEYCIQDzyg83RxM6WGSoszbF8fOrAKqQrZewoZfercv%2BYzEkXwIhAPdVX%2BY06nhmt%2FdV8ZVt%2BQ8twee6FomuOBi08D53pP5yKogECM7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxmxPzmrtVa%2FZA4Nvgq3ANsogQg4BArkclxJwa%2FzlB82xBEQX364UpRJAaNGOP7f2nr30iv32FXT2jKuxGLUmyP%2BW3LdIello0yzP9Wo0ho1ahLPx38JwDVA%2BeqQXFmmQHzGSITyt2yEMdEu9BixwsAVRwjf777eXnpcwzzSaNm9ylVNvyC9PsbTDaIaXtJEgdLXO4YXaGIDgfDVLtZRBfL5ixmAgoBpgXxdbwW7%2FV%2FHr%2BjO60XyCS9%2FgA6AraLaDIlXQ%2Fs0csBgG925K40sQ6pOYAVBj%2BM585Wv0kxN2mZNqpUE1Xcyksoze49TVnYKL8%2BymnoIdDDr%2B%2FEQKVBxB5KXjBhn0EssDKNWIXA5Smr8qxk%2F0pf402U0OQJ9tIKaZy36FL8IvgmpUCX74n91Tp%2Fq%2BM8tERe6zUySjXMfWqQtx6oVzsiB3JP8p4nq9M5ojHdLsbGBeDDsg8N1%2F6ti9UObdNqygSxRvcQnC5r35sUQ9qAIRU2%2B4q2%2BR2LH%2BHGMCSeS1bJ9orYmmc%2BIIKDBlSv9n6iUm19j8cJq%2FKPy1XytJYE%2F%2FO8ho5anh38lflEFC4dNhiW6%2F%2FSV5cIeFLPnK%2FnYtDjUktegN9LraPBXE84Pvg2jp9a05l4goiSR%2Ftgw9djiYtUqWe1bAUzoTCH2s7OBjqkAcn7dsJJ3snu%2BqJdRtp5MaH9Ws0VOj%2BmUhvcUYF5lQjfo2lSaBda5L8UsedQREZb1wswBJh74BakWmWLvKJt%2F7jlrjfYaFjBi6GeBSn0pXZF7Su0n3YrRGvnwIsOdt%2BjzcTUUwhek8jA6AJUWInWcpUBC6pY%2BAUfgctsndxp5cMZ8Ruort2hU%2Fw1jelBvafCE2X4tcGHPORjDWpnsEFlveuD5EOc&X-Amz-Signature=41c649fb7a1c6b79ac5044e790bd30d9bce9d004b517cf66c29308d147249fb1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QGNKILEM%2F20260406%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260406T140230Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAUaCXVzLXdlc3QtMiJHMEUCIBTiXUTxLti5HrY9%2FidvCaR20V8FmZMbxCtsbKrkQMHdAiEA0uXYpRpCBE7mGQE4m9ponddWZPx0RPWh0Qdy7rFbJ9cqiAQIzv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDC48UC5MWlyi3yJYlyrcA%2ByNXqkN5BPovuLr6z1a%2B6p%2FZGM9hj6uDrfBWKj4zysQ%2FR0QsNY9%2FbvruSZhbM4CJyGHH7gRP6lm8mhjEp%2FCharFPSnc5E8Myq0%2BGF2a%2FVOJ%2FcCN5gOS4hP%2BS5F97%2BCfw9yw0O8ZxpRJravB6VXMgxBsiAY0OWQdLCHHWiSTdIGJffmEj2zZHyCrV%2Ba6rKXfI47G%2FfkfO0GuSmMIcfRaxgszIU8jIidxpSHCP0g2hn4L51AwJBKZ4cQFj0EjrvoO15qlNjIwBBw9o2nVtXJvGzZUCBkMfhqwaUn15br7oNpQXRRa%2BIlZYQL6obwAK7xUYghJncgqn9Zx73Nsm3JKbPleqy%2BrXswIxlQ0iePD3jknUH6lBHjOWO%2F1lAOj5SgvU%2FvnK5VkXaZY%2FnhT9dfFVnqAGmpytNO3Zz18AgRDmvGgucZ1KbWObqV2i%2BJpfLAT6ZXHGU4SrbQ1mLD5jr2rLX7PM9IwdUifqmO%2BLgCpGl2X6a6yZRGQ9CNOwt%2FJmzaGjbTTqh6nLIr2aNGFX2FRc7yRC9CkMkwxv2ooK%2Fto4KZCgYEPSzAiVJrsbuWFYmawgIRMteWGaWL7rn6ulQKa%2BCHgPxffxYY70AlXEkWGRwY0CXk%2BctFuyHgLmQEEMMTazs4GOqUBIOyij5i8QFi1mMHhGD%2BT1j8osSWMGpn6OVMMms0sf%2BQ0lK6en1z2zxHzuSE5onf3ptLCEv5fsm8UB2PkpsB9NOtVRYhKlrkST3NuPBs1oDptRobAyGSlqLDWzV3nfhRbfY8LQ7XASRZ7k0iJIU9e5oHjIYfD0Itj0nAW9%2BysPqquwVAEBpQLnZHdu2owFN%2F7etyCgVUOLrMhNxcmvqhzosh%2BsQfY&X-Amz-Signature=a0b8b7b8a59a50d3f5839882282d6a7913177307d4d94f7310b74eab307aaed9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QGNKILEM%2F20260406%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260406T140230Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAUaCXVzLXdlc3QtMiJHMEUCIBTiXUTxLti5HrY9%2FidvCaR20V8FmZMbxCtsbKrkQMHdAiEA0uXYpRpCBE7mGQE4m9ponddWZPx0RPWh0Qdy7rFbJ9cqiAQIzv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDC48UC5MWlyi3yJYlyrcA%2ByNXqkN5BPovuLr6z1a%2B6p%2FZGM9hj6uDrfBWKj4zysQ%2FR0QsNY9%2FbvruSZhbM4CJyGHH7gRP6lm8mhjEp%2FCharFPSnc5E8Myq0%2BGF2a%2FVOJ%2FcCN5gOS4hP%2BS5F97%2BCfw9yw0O8ZxpRJravB6VXMgxBsiAY0OWQdLCHHWiSTdIGJffmEj2zZHyCrV%2Ba6rKXfI47G%2FfkfO0GuSmMIcfRaxgszIU8jIidxpSHCP0g2hn4L51AwJBKZ4cQFj0EjrvoO15qlNjIwBBw9o2nVtXJvGzZUCBkMfhqwaUn15br7oNpQXRRa%2BIlZYQL6obwAK7xUYghJncgqn9Zx73Nsm3JKbPleqy%2BrXswIxlQ0iePD3jknUH6lBHjOWO%2F1lAOj5SgvU%2FvnK5VkXaZY%2FnhT9dfFVnqAGmpytNO3Zz18AgRDmvGgucZ1KbWObqV2i%2BJpfLAT6ZXHGU4SrbQ1mLD5jr2rLX7PM9IwdUifqmO%2BLgCpGl2X6a6yZRGQ9CNOwt%2FJmzaGjbTTqh6nLIr2aNGFX2FRc7yRC9CkMkwxv2ooK%2Fto4KZCgYEPSzAiVJrsbuWFYmawgIRMteWGaWL7rn6ulQKa%2BCHgPxffxYY70AlXEkWGRwY0CXk%2BctFuyHgLmQEEMMTazs4GOqUBIOyij5i8QFi1mMHhGD%2BT1j8osSWMGpn6OVMMms0sf%2BQ0lK6en1z2zxHzuSE5onf3ptLCEv5fsm8UB2PkpsB9NOtVRYhKlrkST3NuPBs1oDptRobAyGSlqLDWzV3nfhRbfY8LQ7XASRZ7k0iJIU9e5oHjIYfD0Itj0nAW9%2BysPqquwVAEBpQLnZHdu2owFN%2F7etyCgVUOLrMhNxcmvqhzosh%2BsQfY&X-Amz-Signature=a0b8b7b8a59a50d3f5839882282d6a7913177307d4d94f7310b74eab307aaed9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZZROFDUP%2F20260406%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260406T140230Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAUaCXVzLXdlc3QtMiJGMEQCIHT%2BABtPL9UMzXF8%2Bf3C3Zc3M9H57JZLgLJp8qWCksTeAiAZmwhhBaV06r2KYMYWpKqNmZ8idDBYZfIm1zgtxgVlACqIBAjO%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMMCtNimjwc5xx8vOBKtwDmzjXHYQof2DHRlutU000P6L9DU6lKdwAv5EY0j5S%2Fa6nd%2Fpu0wOk2TweEAv9VatAyC9rPLMI4CEbPwkH1EUsiNjpZK%2BsDGR6EWYLXK87GD21gFIoBaaGz%2BkIvi3IhVm%2F%2FbLzHBQMVbAqzoBexTgiewwVXzVpIanFyIFr8ICfvsyxLuhsj6RwitEA0qM99Z12ddtCi%2FPJwCQfe0yH4Zte9m1o%2BfLDFhAxTNG3%2FZZiqUo%2BYc8OJOEboadG0C4xYDYqzcvbjXoOIBo%2FPhWRPsKFnEVh5zNIZ%2FtZRGHiHnIBBUtRN7bpCnVB98Yqe7TjlR4KGOl9oVzK00rPNxjEq7VLX4LutB2KuFGXH%2Bg2fOmh1i%2Br79myaKUe3tUfgv%2BlojLnabaNdL004Cl%2F0I%2BM5V58sXq0XzgXMAG3td9C594EATK1zRiNLDrMaU58%2B2jFtbPso2cByddis6%2B2S3BGrpG%2FWk4HxYNoZP114iI24LnaL1L8%2FvJuiI%2Bjt%2BZa8fTG8tRvgAkAde8uYIq%2BOvbbJqqCEfjvjOb1RKvZYpYbGR5%2FkZDCdWp7Cvi%2FStxktzmD6zpgpV06yJexrVSpP1hOWCn7rCfDhsFtGWN5gsroGqNxxiw5%2BCAbctIqehFgMb4wwdnOzgY6pgEO93WTR%2BIXnY8VXI%2FL31X2qewkN7TInNZnGyc0O5VpvnV8RSSXiyPgeqoa1Z0uCfsDf6NTsu9uUfOVsI8c3V5QKR6obRt0wRfmNI1y5GDDOen9QTd8cS9KPRO%2F%2BMIB67vlIXbG1Qydcp44GNA2qgfh67YkJyX5bXJCQ9MPsDZW5ULvKMnBr7gubCnmtyagyIN3dyihtr2xwEw%2B6XYZoOcmHJeEjdDU&X-Amz-Signature=1588e5a3187f07d55ca770e28f4ed05b51eb04f7a6b701f9b5ce97d7443af746&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

