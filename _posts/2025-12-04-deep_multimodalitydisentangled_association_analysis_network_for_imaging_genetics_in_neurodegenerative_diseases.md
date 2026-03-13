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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WLQ65V2E%2F20260313%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260313T182355Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCICdaKUVkBkjmUg07YZkhL4ooPv1UquFGfP7Q5tr2nXKNAiACl0%2BU5tDwRCVQoRSLvRGYBzMBCRoT0C666MEvQc68pyqIBAiT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMQJ3zXKDm1a73YpLJKtwD%2BtDedHcOltXP%2BhDXVPyw9IFurAZ1Bny9ikOVA9QpdW7ZLSD9WimOFyRjs0mInrk3A67tJpILlQwd0ywp3Bk%2FlgUkL2h%2Fb3TssRtMWdhwSlaguxGW3FdccQnZEukM3MPVwc%2F6pgOURxLggze5Oy6qLyLGikTFc5g%2F6dWUzzLSjicnEh3SqTbEnpJ6Euf%2B27kYdvSREWfNNk3xX11eulNwSF9UeMTwRI%2B9ubdFh%2BZEMvYFWGL9qxHSqrwoErnLBHQlBotb%2F95CwTJ0G9A3zHc4YG2TQ95x2XB6nDIANWaOHieOHzX%2Bxamq7Xvj6ArfbqKaegc4klE1zR%2F8O46QJgoVuKBkptxWhUzbAr9Dlyy%2B9OzSjQ2MzWdBirRsN7VX4GSeywfyVWK3rvEbEd4rEPxcWeZSkhyAJmd5t4zok9DdgRBBDRf7S35p6fXpvrmKgOZY%2BkA8usjFfz3p1GpJ2yf%2Bsr%2FueNQsZGeJqvQ5fx5l485rOBoqD7ivHSKJLLKFgRS2atqf5oLnlgddupw94F%2BUgpH1hC42BAMCKusBxOb4UevedyZMU6YmT71nrlARDxXZyOC4wnWDBhwdvaomkyMRoXc%2B%2Fns4nXAXnDNbV1yc3%2B8%2BAZdXZTLRnWk3s6Qw7ZvRzQY6pgFRFPOT1eJEhUaRXj6wAuLmLLUVpZnRqDkXgzZ9owuc8jBH6%2FZ94i2hOr1YyYC4cwpwT%2BXY4iDYS2DvI4Xzl0iWzx4axthC%2BES6AXcvQO6Iuk7Qdhc35f%2BbblfgdXigMs6pN3OIqFE1Zh6V8Y1AT18HRino4QZNtIpo0ZyM79lWyATd15aixtQ21iL94vMMo3dmmm0kxED8f1uwzXoxGfU0rDBdKnNn&X-Amz-Signature=8061a7c28824d2dc25fe6b7c6143a274b2537a14e89f35c9c6270782e32843e3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WLQ65V2E%2F20260313%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260313T182355Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCICdaKUVkBkjmUg07YZkhL4ooPv1UquFGfP7Q5tr2nXKNAiACl0%2BU5tDwRCVQoRSLvRGYBzMBCRoT0C666MEvQc68pyqIBAiT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMQJ3zXKDm1a73YpLJKtwD%2BtDedHcOltXP%2BhDXVPyw9IFurAZ1Bny9ikOVA9QpdW7ZLSD9WimOFyRjs0mInrk3A67tJpILlQwd0ywp3Bk%2FlgUkL2h%2Fb3TssRtMWdhwSlaguxGW3FdccQnZEukM3MPVwc%2F6pgOURxLggze5Oy6qLyLGikTFc5g%2F6dWUzzLSjicnEh3SqTbEnpJ6Euf%2B27kYdvSREWfNNk3xX11eulNwSF9UeMTwRI%2B9ubdFh%2BZEMvYFWGL9qxHSqrwoErnLBHQlBotb%2F95CwTJ0G9A3zHc4YG2TQ95x2XB6nDIANWaOHieOHzX%2Bxamq7Xvj6ArfbqKaegc4klE1zR%2F8O46QJgoVuKBkptxWhUzbAr9Dlyy%2B9OzSjQ2MzWdBirRsN7VX4GSeywfyVWK3rvEbEd4rEPxcWeZSkhyAJmd5t4zok9DdgRBBDRf7S35p6fXpvrmKgOZY%2BkA8usjFfz3p1GpJ2yf%2Bsr%2FueNQsZGeJqvQ5fx5l485rOBoqD7ivHSKJLLKFgRS2atqf5oLnlgddupw94F%2BUgpH1hC42BAMCKusBxOb4UevedyZMU6YmT71nrlARDxXZyOC4wnWDBhwdvaomkyMRoXc%2B%2Fns4nXAXnDNbV1yc3%2B8%2BAZdXZTLRnWk3s6Qw7ZvRzQY6pgFRFPOT1eJEhUaRXj6wAuLmLLUVpZnRqDkXgzZ9owuc8jBH6%2FZ94i2hOr1YyYC4cwpwT%2BXY4iDYS2DvI4Xzl0iWzx4axthC%2BES6AXcvQO6Iuk7Qdhc35f%2BbblfgdXigMs6pN3OIqFE1Zh6V8Y1AT18HRino4QZNtIpo0ZyM79lWyATd15aixtQ21iL94vMMo3dmmm0kxED8f1uwzXoxGfU0rDBdKnNn&X-Amz-Signature=8061a7c28824d2dc25fe6b7c6143a274b2537a14e89f35c9c6270782e32843e3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QXJEUQY6%2F20260313%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260313T182356Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQD7MEXF0muD0%2B7Ud%2FjDAtVrpko5g9GQE9QK6RrWKFaKTgIgPohDThmJs1930Z0FbCuCJZ0x%2B%2F%2FISxZmPY6iY9aziekqiAQIk%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDMTthjvyg16MBISoKSrcAx%2BBHpxlcuzT%2BIi217zXEZy73qXxTKGjZH9msi%2B74hHEN3v7JPHW8wmToxzBgZOARxpvyvqZPUmbgbi7nkDNQ47YAP2Wk%2BIlY%2FIy5z1dMKa1rFw1lQtYyv0EObWBYQLG0EPcKmO8DktOBECBFSF%2FC%2BsCsGg8IWvXHUWbVdc3ZsCclLGctlmhJgVcBN1fJOnHwln53KBkO%2FYe1K5jzsU4t6dPUSwDKgHMXGiosHvqi4AJ5784JYveDtg%2FUHJI7srwDbqSlFvNNhKl5jcLbf4CYgLSjRuI4vWRM3BxE6YUS9%2Bk%2FfsEiAsgmQpwBLzG5CiRT8jSA8hN2pnargrC5jUYipeug8by6QOwQK%2F9pX%2BsLu7gk2i%2FaguoMrq%2BPVKYpmioFPkxzv6l4aniBC5vVAgPQFJjJB5EwiIC32DaPC0Qz42s3EowuR1EyU60R5kFo6JHmmRNvm5kaS35rNChMuvX2DH4WM%2FWs70LEFLkdU2D5Lyj9OhsaoleIGI18XLXrcb0OUwLmdZpMrDNAE9cL8eeizThLb5FlwYRTtpY0kELL2hl4PqHZ%2F%2FHt9mytYPUmwNQVG4j7kD2p5glALTHM8VCDHTM1op7MWpH58VtYl%2BJ9Z5hseILACrdTXKeikUeMNqb0c0GOqUBtwIKDvQmT7VEw7aJciUKWJZErf0AQrHfPR24W4NdHgXBf9ymM%2Bdq2Lviy6Oc3tZ5CZgkeUPwoUyKWGZsdy4fhUNSL5JlJUJ66cV3DugSfbOzVsfCZWC9d9a3%2B1V9sPqIu56ju1r0W4TNm4ZHz39WU07FwfcO9GpVnG7MyLf7FHNVGyMEy%2BMfYNTnvD60ircqE0gJowL7hvcxXr2qoX90XGD%2FczpZ&X-Amz-Signature=b7977072d21c9ab2a1a6d96f44f5de099fc458f1cf22f0f8339b438c77581ea3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665OD4NADY%2F20260313%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260313T182403Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIAE7thy2f6YxsC%2BBu%2B4tSYpeh1hBXVPlvF8Z1zv5So%2FjAiEA11RBREqpTeeJLEN6MtMcXBc3%2BDU%2FTjA%2B2CHyY7UTH%2BoqiAQIk%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDGlks6DjR%2Fc6W9KH4CrcA2wumx%2Bgs85iRrDxqBfJmYk5O5VAj9hx4sPUKe2%2FWwwt%2B05nSSeoAUxgfM9Myv6q%2BqL3Wfa2gD%2FjIW2AbjEIKvjkHXGNBLZOx5LZ8so4AVC2JvAHkNnelRULyaKBDj2e7yRrA76nSkz1eWNwqq4yhVm7zjkUtH9Q7uih1JEvytFcGk%2F5fpPrA5yokFQCUvc3x12Vu2lK91Af7BLlHaWE7QtnG9v9T3Jywky8RNPUSQCcZGLcYdV5y%2FLvbN26BcZl%2Fn2dpRYyEt0k48aihW%2FBmcxW%2Fwk%2BB%2Br2TklHKSV28sURrxs4UrxviOrmLDVX0AFLxm%2FT48xy16kIxrwL5h915ijvBNscKEdRqy3afAjQW2tJglBI5pA9dR0G4CEMaYFdnunnVL7zB43TzahTX%2BnMTzfkXZSaB4lCVXASDMc05gqUhkZblLNq2RErgG5%2BC2ZOTc5eZygLt9dX1OASmyOcpRpD8kAosb7ncUV2b2CiMjvuzYzJpyZXyqIsA%2BpvxqsnRK0BuLnoKZ3mfB%2Bm3fJbzXPTOoEiUKJjbv5R%2FwUU0CRA%2BWmyromqM331IOBGSesEDx9KUJTpsLtgY8NFJWRK%2BStJfJZrzUc%2F%2FauMXzaLFk29uPr3zkbmcecQvik0MJqd0c0GOqUBnudiM2ARef4oPvX7mdv0NBo1xflyHNyMpIzYUriRKrVp3XTFZ%2BYaVLwWEmf8hFUSSXJJ%2FcXCi9AtWET%2F0fdNg%2BSnoJ1zYllnC4%2FiuX6wTBGt%2Byc%2BJ3P9kyilyMUeWDa00U71NdrrgLnCeClKb3WsfEUTALT9eWVTq9k6IrphAQogZ2vijYXqGQi8ci45JeIouztHPcKsfgSkOyTBwf6clzRbFcRc&X-Amz-Signature=04236b192b7b8c23a3061cc182e4dead7d2701fc3be1847b40d71ca98b622fd9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665OD4NADY%2F20260313%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260313T182403Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIAE7thy2f6YxsC%2BBu%2B4tSYpeh1hBXVPlvF8Z1zv5So%2FjAiEA11RBREqpTeeJLEN6MtMcXBc3%2BDU%2FTjA%2B2CHyY7UTH%2BoqiAQIk%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDGlks6DjR%2Fc6W9KH4CrcA2wumx%2Bgs85iRrDxqBfJmYk5O5VAj9hx4sPUKe2%2FWwwt%2B05nSSeoAUxgfM9Myv6q%2BqL3Wfa2gD%2FjIW2AbjEIKvjkHXGNBLZOx5LZ8so4AVC2JvAHkNnelRULyaKBDj2e7yRrA76nSkz1eWNwqq4yhVm7zjkUtH9Q7uih1JEvytFcGk%2F5fpPrA5yokFQCUvc3x12Vu2lK91Af7BLlHaWE7QtnG9v9T3Jywky8RNPUSQCcZGLcYdV5y%2FLvbN26BcZl%2Fn2dpRYyEt0k48aihW%2FBmcxW%2Fwk%2BB%2Br2TklHKSV28sURrxs4UrxviOrmLDVX0AFLxm%2FT48xy16kIxrwL5h915ijvBNscKEdRqy3afAjQW2tJglBI5pA9dR0G4CEMaYFdnunnVL7zB43TzahTX%2BnMTzfkXZSaB4lCVXASDMc05gqUhkZblLNq2RErgG5%2BC2ZOTc5eZygLt9dX1OASmyOcpRpD8kAosb7ncUV2b2CiMjvuzYzJpyZXyqIsA%2BpvxqsnRK0BuLnoKZ3mfB%2Bm3fJbzXPTOoEiUKJjbv5R%2FwUU0CRA%2BWmyromqM331IOBGSesEDx9KUJTpsLtgY8NFJWRK%2BStJfJZrzUc%2F%2FauMXzaLFk29uPr3zkbmcecQvik0MJqd0c0GOqUBnudiM2ARef4oPvX7mdv0NBo1xflyHNyMpIzYUriRKrVp3XTFZ%2BYaVLwWEmf8hFUSSXJJ%2FcXCi9AtWET%2F0fdNg%2BSnoJ1zYllnC4%2FiuX6wTBGt%2Byc%2BJ3P9kyilyMUeWDa00U71NdrrgLnCeClKb3WsfEUTALT9eWVTq9k6IrphAQogZ2vijYXqGQi8ci45JeIouztHPcKsfgSkOyTBwf6clzRbFcRc&X-Amz-Signature=b442bd0f37f592c4c921dadaea89ec3236183c3e76dd9969c9553cb2363fa815&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665EZKKOBW%2F20260313%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260313T182404Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCQvq4wweVpoHS8rVeNKfxLliADXPQEQhKiCk0i7euriQIgJosJ0nLrKgEyG98N2pkpr2M5V%2FAjlxKOSJYb4HzzW6oqiAQIk%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDFzt9PPCmnOXgfRPxyrcAy%2Fx6au3aB9oFoEKz8orRsqY2j2CH5EyJloueg5ssjdH2a1JqB0sSwaEzoSxh6HIWjDbMuwD7hvkHDSdykIAbvZfQVZGikiiDlbfZF7JArEj8i5jjuFtaE%2BSasaTqHrNsoLNYyD2kpgxaDwoSG8vusCOpDxsprNHrfoa8TNJGYN4k5rpCcbraSsqdWx%2B4sEivgTy8I0TFy5%2FYZ2TNnX%2BJYjNBFev2V4R16eeF%2BIE5O6kDTJ7kdHGvg9UfJKYQvLoaQ%2Fgilddh1t8R%2BBsHZwL1ca8Vra08CmpAXjsWUwLKMZJqM748pyRgU%2BFCqnptTOCrIfFFqbVLJF14KNwUzbBhlqeHDEpKw96ZjuU%2FYLaszyILcP9A%2BYGI26VMJWYzWviOMM0wWqA9NqfN9uY7Jnn6j3bfDnmgjDqOr7LJW2rxCPTfF7osCP4sh9Bewuw8KgG%2FySlDp8%2BB%2BCcQhbn60IDiqx2B8tP0%2FHGbLoeDZGvgGMXStZbG8Fi%2FToMYTyCWyqCKa1kvrCXQXJXPklPusIINaXxR7u4lghSxFAzDpFjHm0ZupcDHxbTQJazjTngX2%2BYqPAYf91QIL2B4Ef6qLJCE3hEz37HscMs26c4iNyHMMbaTpXkQ4UFIfhuyKN4MOub0c0GOqUBiOIZHP6iQs0WsqqjAPHZaE9IdvTYPJ3H9b%2FJZWF2HZwuYV4TBpIwsYc7LZrh3%2FDBIjrUXKesxBixNow5qleq%2BK15irUY%2FJCleInoZiRQgvfVtR6ptgcokb53HOvf%2F9hOZKdamW6YDRLhNbcQOD14P3Db6vV%2FQedZMzpCKbrfAT%2BnfeQZcu5L5QEo6iJbReuWuKU6CJ1yuQ0k4pk5yV0Q7ReRONNE&X-Amz-Signature=2ef981a214e3226d8427e9e4b0ec2cbbdc109b7325c8dfe4d029a1b978f5330a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667JK4MLNV%2F20260313%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260313T182404Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDvcxbb%2F7pVdcr2OwVcQNjMUp70faW7WdyjxMj3qK27ugIhAPEOHfCunxFvAV8zwBjPnErXCYF7QbRgjXgyZXsesC7iKogECJP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzCVlAA%2FDrs6ow0vesq3APjaCL%2FIFlqvWumgurAZ4Mez%2FKQa8eykeRWu8N2ZdyJ87hrD7F%2B5VtNj%2B3xUCUqyYJKWrYjtS64YIzV44Un78AtKo53pQuOw2TVq0nEaGK%2FiykX5r2VINdt1zntqG%2BRqya1X51iJidsNSKe39iAa84I1J9s%2FD3uzWA5YOvxv8mBCUDgUGwhgTK0WzyW1QuCA2fSDm%2Fd7pkaY6Px46lwX9nxgJH08Lx4yb2KS9GGgsnlQoogAa0yBBsp10c1Hatoow%2F4mBy%2BclVCbfBy%2B8hJlSxwIrZQRhDeyr37sNoZvcNnMb09RL2ZFL3BUn7VRWCKC84GtVWQmXHgrVb%2FXZIzBds%2FtbFGsa6oAXJj%2F8g78lTDtDXIZeeqi80JVOjjTPUJ6%2F6Q9x27iMBBHI1%2FyXG8J%2Ft5ZEHVN10feT4gnAEWVmFkKHz2Fc1D6A2L9yWjrItZh%2FKnnZH9isUxCiQQHN61z%2B%2FBYS%2BPkSUDHxygBWGj4A29VguzzTvRGvAIhxv%2F0AgzOXmN2fSfFTlne%2F7jwkRXHTkU5mf0ZSGGRNEghIKADSo9OZ%2BFSoNYuvwv%2FG%2BojwHf3UpV2aI2ou6J9VH8%2BDLQcDRlb0HgEUncvvlMZ9%2FDFsw%2FBad8RUwbqOmeWn%2F0azCXndHNBjqkAVcWPNEZUE2GEsWs0FtgIpzN1MceaZVlrexpNhnQ6JVHmtLElkRbSWL8cqmZMcAJJSmTfC2AQcb2xA7D4IpITn8sZloqGsrqXl0c3bL0Ee1zuZ2QCcH3XA9swzeR5xJhJ2vLUpuvbg%2F0L1X60nHx5JjHd7mVp5%2B1SMtPnIchOfnlyWsj2D%2FM0roBlBMMwJntumOIq3fS5DzFDbAwrVVXqjuWexgf&X-Amz-Signature=19956f3ae24cd80fea6866606dc0b8d3036b2dffd87f3aabdf866d34d2ee9a17&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TTU3V5IZ%2F20260313%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260313T182405Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIH74Pn1GYoOiLsdq4OtFC%2Bw%2FnG1rghHpaObRLOJrYoeeAiBgZBsNqFZcaEAGo7n3j%2FMblBztFxmtkx1z3d08i83ieSqIBAiT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMITWzAle7V28%2BlejFKtwDMSxeDNCJkjK9vTEaTS2AmzB8sOKj%2B1z3SzWSAjcF06b%2BXibYHBc6ywGOWGlU0rCqdB3zGN5zPgwFMd%2BE2GpOY6OU%2BAbrxq9PlppQxHsXkGS48CFQuzHpx%2F%2BSFew28yA0A9LH4cE0nsyeRTCELdlI7sinGGE5yR1erl6XRhjZlmHOW2UBdmGnhLSYALf38GN4Ag010ODRabqsSDaTuC0Hjo6biVHDOVgnPLsSaduvey8z%2Fs55kDMRPS4EOjWnn6r7myvYbmXA0kNYjoE362v3GnDXB7QX%2BlJ34tt%2FMProBH7s9vXtSVS2gB0YPCAzkPyOFD6QbTpJ2uZyPcAYvlZz44HzGdhwez3RInw114e0TpJrWyuvaiC2DbX3L5yvNE%2FdmtIxho2DyP5djAY7du14GVjPy99B8T2yBz4TCd6TuEbEpo1taQF1DzG%2B%2F0QYm6%2FmOywAIr71xB7idvbYc4K%2BghCBsBKAmkVim1jQDrUrueosgkDF39eqTbwqHX2I%2BTjBPItHDQDd5jndUXYCZjqf%2Bfz8LrNefAUTek%2Ffqtc7Du28r4GkVTgR1bsyG7UQvcuzlmi6nJbxu8jWB6xe0QjHQY9ePMl9SMx2Ghr0EDuGr0YWn1ikGk1kUMj8BrIwl5zRzQY6pgHOnsH%2FlVlQP4qC%2BIqQAJdwr7RJYP54f3m3b7tmHOus2xd2jZ2fF5XAKdQih1nq22AI4kfq34ROzhVVTGOH2Xm0UiqwXTD0D%2B5CuoCs17okl1NyuyDf8mhNIP1yrBMd8fj%2BrO4pFQKWyeL07SSUgr0QV8mGokDG1foh7llz%2BHOk6wQ9IyENpYvrzZ%2FnEGrcTHhOVdfAE8hzbzIFvuYkXUL3yDMD7Dsl&X-Amz-Signature=5a5cb9d745f78f089c12a3da717f48ff0499dd1ebd548945a1634f7b93705751&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YJ43B77D%2F20260313%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260313T182407Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQC1hUeJ1pqQ8jzOkwMXR%2BRsepwWCd2kNLdhkaJQ7j5ofAIgEg1rl0q2p%2BnKTD0bYP3bwCf3npSxEGJroLLN1ZP%2Fxd8qiAQIk%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDFG4amQkV%2B0olZS5qSrcAwe4QBCEFTSEcgW1tqsYpCXP8ULkWypclSE8KbbbxuQpK2AOlrpu4QpYkIsm8TxdLjD6p3X3QJQ7yD37%2BRrR3G1UAhM%2Fs6suugzMhKEHzfM2RM%2B45JnWbSeOLjO5fqiQhsVAZ%2FobIvhHCdj75122%2FOPH4Z5IXqBLFuaEJcV5ouDDd0Lj5joLW%2FZM4yR2miRD0Cd0FqEN4O7cQUGr%2FKXCUMoKpIe6S%2FChRQmFWuwzY3CY1NxWpPmapQdiH9RLutuTR3tBPwCImkCmyEZFsTYpBrb2NlVMkgXwMUslb2XRo04AMMXJhV7yT9A084Vdy8SUYAd4hf0wDfO2ropz9VRx5r%2FIOPbQ6H1OqMPDSH9xNG%2FbHeCTr394z4DhKo%2B%2FOH6fqnaUKd45INAyD9OHv3ISKMrEYp43VsmJU2VwI91V4vDtqy4AQCDcjciLtIDI9jNmrjOIRdGYcJuDMFs%2F1aMQ2EnznD7mVDayVSs%2FJzeXufzya7QYPqf3B5QSdGcp7no%2B%2FHfNTFKbz%2B2cY2ON1fWWiwBFPih%2BAulR7iWwc%2BTNozHYkgAT26MildsqWwkPtdyTGjM1Ns4YqEfZDOgrh4Yva9Ia0cbjSeQhhs%2F4u%2B7VwSBWwdz6F72k1DrFUhqfMNub0c0GOqUBEALFxUnaJdmly%2FPk8HY7p%2Fkd87KUdoHvC%2Fb581UgmvFFHAVdcikgU1ECCaahtUHY%2Fi2jbhp6pvndvhXkZd28SMVJIusZMY8ccQEa2lpryzKjBD2Duj1nRUdgDnfoY0pX0qR76%2F0HkFlGUavH0gKLTjh4VrB1F20H5gAUUNLf%2BlIaqTJYntqtzipsPw0QFrbHhrY%2BaPbXCiAROab8ka3OyEtHXEUx&X-Amz-Signature=320a589de38e47ffc2b65f02d5e8421262cf65a0702da6c606c0821b36a61d4c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YJ43B77D%2F20260313%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260313T182407Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQC1hUeJ1pqQ8jzOkwMXR%2BRsepwWCd2kNLdhkaJQ7j5ofAIgEg1rl0q2p%2BnKTD0bYP3bwCf3npSxEGJroLLN1ZP%2Fxd8qiAQIk%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDFG4amQkV%2B0olZS5qSrcAwe4QBCEFTSEcgW1tqsYpCXP8ULkWypclSE8KbbbxuQpK2AOlrpu4QpYkIsm8TxdLjD6p3X3QJQ7yD37%2BRrR3G1UAhM%2Fs6suugzMhKEHzfM2RM%2B45JnWbSeOLjO5fqiQhsVAZ%2FobIvhHCdj75122%2FOPH4Z5IXqBLFuaEJcV5ouDDd0Lj5joLW%2FZM4yR2miRD0Cd0FqEN4O7cQUGr%2FKXCUMoKpIe6S%2FChRQmFWuwzY3CY1NxWpPmapQdiH9RLutuTR3tBPwCImkCmyEZFsTYpBrb2NlVMkgXwMUslb2XRo04AMMXJhV7yT9A084Vdy8SUYAd4hf0wDfO2ropz9VRx5r%2FIOPbQ6H1OqMPDSH9xNG%2FbHeCTr394z4DhKo%2B%2FOH6fqnaUKd45INAyD9OHv3ISKMrEYp43VsmJU2VwI91V4vDtqy4AQCDcjciLtIDI9jNmrjOIRdGYcJuDMFs%2F1aMQ2EnznD7mVDayVSs%2FJzeXufzya7QYPqf3B5QSdGcp7no%2B%2FHfNTFKbz%2B2cY2ON1fWWiwBFPih%2BAulR7iWwc%2BTNozHYkgAT26MildsqWwkPtdyTGjM1Ns4YqEfZDOgrh4Yva9Ia0cbjSeQhhs%2F4u%2B7VwSBWwdz6F72k1DrFUhqfMNub0c0GOqUBEALFxUnaJdmly%2FPk8HY7p%2Fkd87KUdoHvC%2Fb581UgmvFFHAVdcikgU1ECCaahtUHY%2Fi2jbhp6pvndvhXkZd28SMVJIusZMY8ccQEa2lpryzKjBD2Duj1nRUdgDnfoY0pX0qR76%2F0HkFlGUavH0gKLTjh4VrB1F20H5gAUUNLf%2BlIaqTJYntqtzipsPw0QFrbHhrY%2BaPbXCiAROab8ka3OyEtHXEUx&X-Amz-Signature=1d5035126a2319c6b77a4eb2a332aae5d8e876f5a33c30d6cedb3b02a0f41bdf&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SBDQ3NLD%2F20260313%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260313T182354Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIBBS3jjIDbSJysIgrIVbkubf1onWNLW4I%2F5xiPjW2d9PAiEA%2BhlEqFBu5sY2W9L80Junexza0rsmCKoFXBWsuWIByRYqiAQIk%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDBmnjFfRMC%2BbRab%2BaSrcA9NynTKtm%2B8%2BcltIU%2BINz7PkqaxE859nYTbzIUqj9TJZxv8F%2BZogdFzMdZJq6V2vGH5xolInyAznJ2l8QoHRz1Q5mJuPG%2Fycwhqp%2Bzde9OkRj%2Bc9aOVa79jB1ax70JHKhtZvEdTEcYXnjHOZWn3UlI8%2B5hFpjo7H8tmEYMwMfMHd6QD1ofZZ3VOafThz%2B%2Fy8V2dqnvrIvu%2BAz%2F8hlXdRxq%2Bg3XC%2Fu2JRuMjbZQw6D58VwsE4N3xqW4L00Rr%2FOy1SDgcl%2B6fTx03MDSOViMah2c7ipPeTltRy71w0Qigkv5TOqPHBCkw44YLB98foOch45j8%2FGOUT7xRIrwbhpw3WJr64Y6sIBUj5tExdhxkwA4PsVTm0ty4IihOxQKXyGl%2FmzeZElR2so%2B4MDiubYJrRFgP8w%2FjCljGGVdgwaW3eGDYTVmyEIDFuYzShTyJ1ZDMoPUUtjEEv2dQ0dD0izyP2dhiALaDfxGmlJfVkLAqfTM6%2FEB53ggYXmypF813ePUCqjMO9Y18ybEb2%2BSQzmELqNONEhPj%2Fpy7DOJCpV9eRmPW%2F%2BwweZnGMr0TF7ddO03VAf7j94zqwP89VSbsJWjjTwD3Q7KrIPdaHPZegALQJ7sWEWktAz78KHxdrJSM9MPmd0c0GOqUBJXJPTJX3vkRXp83P4a2dVVE6B70yf7YY2YP009q86S4FKPpEzb9phsUCtNbCmZYM%2B88RgH6d22tXkjit3AWQ52%2Fki%2Bn5nYL8oBfKg8iPDJGIg6dVb8Ggx33mjTF102BheTWEVoxhTsT2DpHZFg89%2FKBxz0WViyF8AbpBqF8fXALNFCi8WfUsN2ZT9wfmLmHPd25m1ij9GKkVZl0f2mOfiIQSILu%2B&X-Amz-Signature=e39f77cffd7b6f2e1a2ac0e897e2a8c79e7ed56757fc9dd7a834b5c40536e829&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664WCLAA7N%2F20260313%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260313T182409Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDSecBguEmrODCjhfUYAkIIOh%2BQMFD0SzQQSTYTKtBXegIhAKroaQ14ksiBoWdrh3jmaoW2TRdi%2BSIMXDAU0FOC8MzyKogECJP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwYDqEv3gVSazi3cAkq3AO%2B9nQ0mxnXST30Yi9eCLbi1pHU9nmiozfBw0O79FiXIxmf7%2F0QZrrnmQgiOSIMDkpurOx%2Fl%2FM9u8M%2FDBhdAF7eOCEg41r7MWiIKEYH5PPByR5UwrFFs56r5FfzM3y%2B4AdN%2B%2BUghkm0XUGxQpc79fMn5rjowIzK0p8%2BQ%2FVVdBNsv0P2m7PcUYZPIXqud8sR5o3Yn9fpGMuQVlwn%2BRxDf3aU%2FKEr7Un6DnkqBhcq82QLdVwQkGhYtgKBDNq2iBM1borMjL3mi64YkoE5BNIcBTBltfik7jH%2FAaPJSw%2FX7rwWcrTiE%2BN0Zn655HeH2ARcX%2Bad5uLrkgOFHSpuMwDd7hxo1kDIZydq%2FgjPButz%2FXMKR5dndsy%2B6qZ6zoVGllbDUjy0uA1qEv3ox3TvKv9xoFJtVPLus9kgDsGYa4yXxxnUsHNmRiDwuGxdMOXrjpraf0j8wqtCvFkyyquroaCs4KDWzcZkt6UVTu1Jwd8Am8vWR8mlTNZCjWuZRcGYrUsDG1FNDNn1bJ2g7%2FoXfphcgK%2FZCWC2XEsVPGzkC%2Fcx0AOir6%2Fu4rZLdhL8v1N3Oo3U0ZUe5SbM970NmHPvt68M1H2d1MfxpVGnAiNFVSPJIX%2FyD%2BtP2Kkv8z5vFUeybTDLnNHNBjqkAf8QX99JGsPWAqb5tkfiIJGIY0%2FhSLufksChWAIXsK%2Boacm9Z2OA47d%2F8NyB0nm5X5%2BZZVUpl4n5OQAG5nh%2BTXpUx7mcXc2fIwa5uBe%2Bz0Moono0D0lR41a0GjeQrZXW8TkABdKlNXj4KqQWCvz%2FKjJkKEoAnEuDt4uUD%2BankBI8cwb32wsP%2BsAG56CdokRiNV7%2BQCSBhXG19unW9b%2BuUKK1qU6g&X-Amz-Signature=162db538ec150a5e88f1125a811864f14a4ddde29a9dc3f94ac7dfe829c16153&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664WCLAA7N%2F20260313%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260313T182409Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDSecBguEmrODCjhfUYAkIIOh%2BQMFD0SzQQSTYTKtBXegIhAKroaQ14ksiBoWdrh3jmaoW2TRdi%2BSIMXDAU0FOC8MzyKogECJP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwYDqEv3gVSazi3cAkq3AO%2B9nQ0mxnXST30Yi9eCLbi1pHU9nmiozfBw0O79FiXIxmf7%2F0QZrrnmQgiOSIMDkpurOx%2Fl%2FM9u8M%2FDBhdAF7eOCEg41r7MWiIKEYH5PPByR5UwrFFs56r5FfzM3y%2B4AdN%2B%2BUghkm0XUGxQpc79fMn5rjowIzK0p8%2BQ%2FVVdBNsv0P2m7PcUYZPIXqud8sR5o3Yn9fpGMuQVlwn%2BRxDf3aU%2FKEr7Un6DnkqBhcq82QLdVwQkGhYtgKBDNq2iBM1borMjL3mi64YkoE5BNIcBTBltfik7jH%2FAaPJSw%2FX7rwWcrTiE%2BN0Zn655HeH2ARcX%2Bad5uLrkgOFHSpuMwDd7hxo1kDIZydq%2FgjPButz%2FXMKR5dndsy%2B6qZ6zoVGllbDUjy0uA1qEv3ox3TvKv9xoFJtVPLus9kgDsGYa4yXxxnUsHNmRiDwuGxdMOXrjpraf0j8wqtCvFkyyquroaCs4KDWzcZkt6UVTu1Jwd8Am8vWR8mlTNZCjWuZRcGYrUsDG1FNDNn1bJ2g7%2FoXfphcgK%2FZCWC2XEsVPGzkC%2Fcx0AOir6%2Fu4rZLdhL8v1N3Oo3U0ZUe5SbM970NmHPvt68M1H2d1MfxpVGnAiNFVSPJIX%2FyD%2BtP2Kkv8z5vFUeybTDLnNHNBjqkAf8QX99JGsPWAqb5tkfiIJGIY0%2FhSLufksChWAIXsK%2Boacm9Z2OA47d%2F8NyB0nm5X5%2BZZVUpl4n5OQAG5nh%2BTXpUx7mcXc2fIwa5uBe%2Bz0Moono0D0lR41a0GjeQrZXW8TkABdKlNXj4KqQWCvz%2FKjJkKEoAnEuDt4uUD%2BankBI8cwb32wsP%2BsAG56CdokRiNV7%2BQCSBhXG19unW9b%2BuUKK1qU6g&X-Amz-Signature=162db538ec150a5e88f1125a811864f14a4ddde29a9dc3f94ac7dfe829c16153&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662S5BKMUW%2F20260313%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260313T182409Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCclPsF0FpW%2F2jnBSg3ZPYQvhNDPPO5vDEGsjkgiPegwwIhAIfzhQ%2BcXPFdNBfJRDJ3uNcTSFIkFZK0kEfqCiIX%2BTqmKogECJP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzzkjJvXSEyGBt8kggq3APePRSwJJteAbpwWyHF3cYhQleSOBWbqzTQxH%2FM%2FEpZFqqEJjigeavGxI4dqH%2FwKEbydsfm%2FXF41E%2FK4ZuKKXzF5AfKYXvZjMBc%2FH7p%2BA865Oj%2FJkUiNYhVJXN14pNK4lms5j%2FxT5ueUbNYtpcIqV6N%2Bll%2BklEqwJqzf%2BkOj1hv1FRHHVUyBZNPjoT3WuQwLaxdQLj7vRMenpSo7Z6CdKA15oIW2J0aXih0wQErSm1lICrH2f0CPMnuv4extEVt9Yt7bwqafrCwbkYFpe9qGp03seiD5EUqxcpmkljrzkAudPK%2B8ZPoO10djREB%2BKkASHxwGLz1GEQoTgQJiEi5epJzxDCdamJSi253tr6pf0vHAlgin1qbZ8hSAHX%2BNxjmtLG3pHgDm4ioumltcY2WkBHxNInL5NMNhHGovLy%2FwJI%2FhAAv6dca56Xmsr%2BEevU1zg97Hrb98nnAmySxo0MuE7gEArdKTWgk6VviLOeHu%2Fnye%2BR1JuXvO%2F6s%2F1q3Id3kOvYGQJ0RRozRsEKeMVlrZaqKZzfGTsmoek4yhoIDn%2FZnUoykAe8IietpyY7k%2F1DEyNVv2VHkCvnibbVW1jDdTppSW9RdbYw6SN0JK%2F0sdx91vmendHDJrbiGkmKUQjCwnNHNBjqkAVlgoq1sTNOGCV9gp7z6tm1OtgBPL92CNdXMymY0KatzUpFFq4JwIyWk624y3ZfDICgTz1BFb6x3NQChSBHAiBTrUU0yFXYvwxMGcapPSaj%2BlXfExFWKYlWr6%2BuEKufhLXDroBTBl8VJfDPZwzhVB2qIZ4TRxZblWDmqD7ecV%2FLYjXUxHwgqys5XJgu%2BpL9PbM6ldgTR8Xvdep1HAGoWYbA%2BhDTB&X-Amz-Signature=015e09c5b01052f1b1787110c1ddcf3fd252d933c2065095ad5d96a3b2d9cd8b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

