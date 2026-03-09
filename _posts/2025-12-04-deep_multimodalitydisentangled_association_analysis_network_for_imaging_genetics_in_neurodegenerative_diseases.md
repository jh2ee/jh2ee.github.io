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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RZN22MHK%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T082858Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGAaCXVzLXdlc3QtMiJGMEQCICXZha1%2BNYuiqauEDG92pc4p%2BPmwhQYoBeRoq4V02D%2FnAiB5%2FtdR9C8d27%2BZeWHFUneFM6PF3ljg4DhCXPiWlY3wzSr%2FAwgpEAAaDDYzNzQyMzE4MzgwNSIM9alliZYw9ePdW1lCKtwDzP%2BQAVRAHodX6L%2BuaRwGAwQJaOO4YMSnOLOUmyC3EU0I%2BOUN%2BsGc9Jz4t5gH%2FSXZKB1TIau0YS%2FLGHFVU5L63SUgAHXzQlET%2BkJlhYZptFyZZiSkTPZ6UQ9Ei66knz20SurUw91A48yBAr%2B0J91EqAUJPeJXXNmIj7IlWKa7c6XF%2Fl0iw2OslHWhw1u7KDOiJ1A%2Bg0KlV6Nb9Brt6SDOcCB3QCzhO%2BYx7qQ9CKpTd9DzFTDiGnfue7YYfyhjNZy4p0OXftp18Dm9v%2BpVDeXP7VaJYi9x7XqBnNg5lOUhDdb1JKj%2BbmgHPdD4L0FVVIKo9o4SUkuCs%2F%2BWTZwMJcUnWaVtIYIWAffKDTf%2Fop7%2BbEsjJu9OIilVfdsdMM8%2FQtIgJk5C%2FNr%2F7sWJBcoIQYJD%2BFTYQRHhezk2cXLGEQnUy8nFIC13V4yq0Su9d4h9lLj74tp4GwvQ0O25nhOxm%2Bqr0h57nJrIsKVc4qpSqRg%2B2%2FeI9SQ7kqlS2b3NG80NQy%2BClPrqL46HDAW%2F3MVT7yD8IRElhQ1AVbX0FE79s6LMs3pkD1f%2BQ9i4wIfM%2B0EMju80OQZRcfZjmI5rmuBelDLlRxa%2Fpp7yPBlapfgXpbkGNGUxqEG6Q%2F7GUm%2Fy1zwwioK6zQY6pgFe41qAnK97QtTDhnyd%2BHUw8Zi93M9Wqtz8bzKqy%2FxlXa0ZNtcAYhl6OduxF2IB39a9Vs1N9GarYlqiYor3MSYCKibskaQg9GfsVCCYJmBeuqVwzBC4hhZFxXuPDizltl69fnW6PddwRpEznhTXF1t92z3I%2B3ZA73Un%2FLanbj50nWybrqSNOSTWFJE9UFoVHq%2BV3nrYFIxnYyp7C5vA60IKBIZKll6a&X-Amz-Signature=c6bbfe16b3cb3aabe27258a4f7d0301846560c97a27b36647ee937906174baf5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RZN22MHK%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T082858Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGAaCXVzLXdlc3QtMiJGMEQCICXZha1%2BNYuiqauEDG92pc4p%2BPmwhQYoBeRoq4V02D%2FnAiB5%2FtdR9C8d27%2BZeWHFUneFM6PF3ljg4DhCXPiWlY3wzSr%2FAwgpEAAaDDYzNzQyMzE4MzgwNSIM9alliZYw9ePdW1lCKtwDzP%2BQAVRAHodX6L%2BuaRwGAwQJaOO4YMSnOLOUmyC3EU0I%2BOUN%2BsGc9Jz4t5gH%2FSXZKB1TIau0YS%2FLGHFVU5L63SUgAHXzQlET%2BkJlhYZptFyZZiSkTPZ6UQ9Ei66knz20SurUw91A48yBAr%2B0J91EqAUJPeJXXNmIj7IlWKa7c6XF%2Fl0iw2OslHWhw1u7KDOiJ1A%2Bg0KlV6Nb9Brt6SDOcCB3QCzhO%2BYx7qQ9CKpTd9DzFTDiGnfue7YYfyhjNZy4p0OXftp18Dm9v%2BpVDeXP7VaJYi9x7XqBnNg5lOUhDdb1JKj%2BbmgHPdD4L0FVVIKo9o4SUkuCs%2F%2BWTZwMJcUnWaVtIYIWAffKDTf%2Fop7%2BbEsjJu9OIilVfdsdMM8%2FQtIgJk5C%2FNr%2F7sWJBcoIQYJD%2BFTYQRHhezk2cXLGEQnUy8nFIC13V4yq0Su9d4h9lLj74tp4GwvQ0O25nhOxm%2Bqr0h57nJrIsKVc4qpSqRg%2B2%2FeI9SQ7kqlS2b3NG80NQy%2BClPrqL46HDAW%2F3MVT7yD8IRElhQ1AVbX0FE79s6LMs3pkD1f%2BQ9i4wIfM%2B0EMju80OQZRcfZjmI5rmuBelDLlRxa%2Fpp7yPBlapfgXpbkGNGUxqEG6Q%2F7GUm%2Fy1zwwioK6zQY6pgFe41qAnK97QtTDhnyd%2BHUw8Zi93M9Wqtz8bzKqy%2FxlXa0ZNtcAYhl6OduxF2IB39a9Vs1N9GarYlqiYor3MSYCKibskaQg9GfsVCCYJmBeuqVwzBC4hhZFxXuPDizltl69fnW6PddwRpEznhTXF1t92z3I%2B3ZA73Un%2FLanbj50nWybrqSNOSTWFJE9UFoVHq%2BV3nrYFIxnYyp7C5vA60IKBIZKll6a&X-Amz-Signature=c6bbfe16b3cb3aabe27258a4f7d0301846560c97a27b36647ee937906174baf5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TVYRBZGO%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T082858Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGAaCXVzLXdlc3QtMiJGMEQCIEKJvnyJW4%2B85Xs%2FdEasub1Gl4oGviKkiuwiXLsvpxamAiA1uqueoKSwVYKCdboxk6pWFlDMTg1JM01w3ei29TQexir%2FAwgpEAAaDDYzNzQyMzE4MzgwNSIMT%2BJK4poCwx3OUBhRKtwDM%2FQuxW31QuGOXmlMQFscIGDC3V%2B1haGFAOIfPk2vRXu%2Bm15KdQAdZo%2FwsCWo3A0nyEDxPI9oQASZ6oLVsHUisBHsAfLBNx06QmZEEIG3lJUxO4Wwi8s%2BvUvGmzCM6VjGP%2B3kZMfsJ1VP%2BeI6h6BJRj%2FIDc9YPYQ5WMZB%2FtMatpnBBstvro4yNfatOEPKp1gEGTl38vJhmVX3hAI%2BTqfIG0gKw6it2Rv2OxKSSXl%2BMNSjTIywki5ALpmjMBXxp4VqZ7T2NXpdHihJbvoXhrA3sPAMN%2B4Je4q88fm1NYdsf8gjTbLGNMNjevyTS3JDf%2B5f4tpKoLSNmTODuayEvtTjqv9LtfSBLGejGjRwtaOnLHJ0JeNCaNJlw%2FTs6W%2FGjPTUgiJaUGtCctDEGhmwHBN8CM1b3F7tGhUIexbX6RuaNSHt%2FmDF%2FVeWYMtst6M4QsFdO0%2FaWlMnByXVfpWpPQazIhatk9mN0tOZMCUJAUvJ3tIACOKX4Bj6PbXeBYCrRLsrrZb89cbV9aUlhDOikfiteVlfWg1Z%2BhtIiUuDq54ErO%2B3O0xc6I%2FGD2Jt0WVbNEfrpSg0wi1K8LF7Z7BTDFxjcE0KCq8nhdtra8TnJI0Za%2FjmdIl5%2Bo%2B7l3xCwxgwg4G6zQY6pgGRtVca7sfk9ACZm6uuW%2BiIaSpjkrxJL8vD2F88ds6poxtGScAt0V09ljalZe6uZ6FBwoRFPdrjwgWcXIlGHzR9PVoZZL6gFdTVWnBkL6jVgYVCO4H2WIkBlymHDrQ8APN%2FJYD3S%2BFtikYKGPCoY59tiLK0rxNcUdLI%2FGoQB54BwmfHBKWOO8IHSv5RLOHt3zWZVVSD0%2F%2FVxOagLoCsz1q9R9C2xe82&X-Amz-Signature=f5d142915b847a21e68c29cb59a1a60968d83ee85eaf9c3db67de716ee59a307&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RZLCGWUQ%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T082900Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGAaCXVzLXdlc3QtMiJHMEUCIGx7itxM5Zq9iCqLMZNRm00PyrHQnmj3QlAtjZki3qtXAiEAmSqIZew7xHRZB5kYqRvruN8MceRcFv%2Fp6PeCEpTEm8Mq%2FwMIKRAAGgw2Mzc0MjMxODM4MDUiDENEKTpZyETgvTc7oCrcA8geQJAjW2uvkl5pj4H0UUmAXdNn2%2FdYq3XufaiVyXTboX99KYBUU0rbqUy05Y6BzeS6h6ymJFPVwPjaBbZLja8yPDZr1a1QRFBVQIBYwA%2BBrp%2Bbywk50YazLZZ%2FBIeOAf95oLhHBrsu3RgSxtFjL%2BGaLCE0AEkUl2gEvPf9fpUKuiTs3AUbwhE8h%2F1YHgm2%2F0OxaELU9NSeLdhuxu54P%2FJVhOMrZILBGUm7yYzxQC5Zhpv8xe6EpRgormkOLKhPOZUgMl0WgHY0kroGWIjRCg7BPkYsMBWSEfG1BsTV3YJY%2FIkR2Qaa%2BBsnEsjfGgWO7uIAQuJTPeH%2FEqKkcH68ii8k1Wo2XP8I%2BLJVIayutu0ydnwLtjeTDZqa5frJ%2FJDujPXcKKmnUzF1DpaJ58B%2BK5ZL3jqk0DGh8Va4cqwEcVL%2BycStfrhv5SKbx0ZTcLgfryV1eshqXN3%2Fr6Uy3za1uqRt%2FagrTjHoTIbm1ZLVmgcf8hZEiqQV253G%2BjwIdqr7t4KXS3fEuGEnQBRuvI6DM0wEPEsYEnCMyRxf3HN2L5qp9MdHybb7U6oAcosCtaXBCPVKMQgjquW4Jej%2Fmqd6zz3EEPBv70arvfmq3S3VDgmNCdjmTToZD%2BgKD4vIMKqCus0GOqUBvNEBe5AEho4jr7pts9isKXG5QOYCS2Cr%2F%2B3CXA0ztQH0rNnNL%2Bi8ZeohwX0suUtIdcqOcOnua%2FD4AIzvCyW%2Fam%2FuP07%2FrguobjU6nbrJO60aMNWsR7%2B5Ys1GA%2Fy9rD5He9ddD1ZohgnyAeYlkey%2F0R5pLGP5tIVGJM14lI2LCXOe6MPLsFTLfGUggwAbcJ52iff020pRfFJ7apOTO3c2h3NbtuQa&X-Amz-Signature=fdf8839dbaa2de42fe95a726fcc7fe980fef208906c675504a09f0edb0770ebc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RZLCGWUQ%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T082900Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGAaCXVzLXdlc3QtMiJHMEUCIGx7itxM5Zq9iCqLMZNRm00PyrHQnmj3QlAtjZki3qtXAiEAmSqIZew7xHRZB5kYqRvruN8MceRcFv%2Fp6PeCEpTEm8Mq%2FwMIKRAAGgw2Mzc0MjMxODM4MDUiDENEKTpZyETgvTc7oCrcA8geQJAjW2uvkl5pj4H0UUmAXdNn2%2FdYq3XufaiVyXTboX99KYBUU0rbqUy05Y6BzeS6h6ymJFPVwPjaBbZLja8yPDZr1a1QRFBVQIBYwA%2BBrp%2Bbywk50YazLZZ%2FBIeOAf95oLhHBrsu3RgSxtFjL%2BGaLCE0AEkUl2gEvPf9fpUKuiTs3AUbwhE8h%2F1YHgm2%2F0OxaELU9NSeLdhuxu54P%2FJVhOMrZILBGUm7yYzxQC5Zhpv8xe6EpRgormkOLKhPOZUgMl0WgHY0kroGWIjRCg7BPkYsMBWSEfG1BsTV3YJY%2FIkR2Qaa%2BBsnEsjfGgWO7uIAQuJTPeH%2FEqKkcH68ii8k1Wo2XP8I%2BLJVIayutu0ydnwLtjeTDZqa5frJ%2FJDujPXcKKmnUzF1DpaJ58B%2BK5ZL3jqk0DGh8Va4cqwEcVL%2BycStfrhv5SKbx0ZTcLgfryV1eshqXN3%2Fr6Uy3za1uqRt%2FagrTjHoTIbm1ZLVmgcf8hZEiqQV253G%2BjwIdqr7t4KXS3fEuGEnQBRuvI6DM0wEPEsYEnCMyRxf3HN2L5qp9MdHybb7U6oAcosCtaXBCPVKMQgjquW4Jej%2Fmqd6zz3EEPBv70arvfmq3S3VDgmNCdjmTToZD%2BgKD4vIMKqCus0GOqUBvNEBe5AEho4jr7pts9isKXG5QOYCS2Cr%2F%2B3CXA0ztQH0rNnNL%2Bi8ZeohwX0suUtIdcqOcOnua%2FD4AIzvCyW%2Fam%2FuP07%2FrguobjU6nbrJO60aMNWsR7%2B5Ys1GA%2Fy9rD5He9ddD1ZohgnyAeYlkey%2F0R5pLGP5tIVGJM14lI2LCXOe6MPLsFTLfGUggwAbcJ52iff020pRfFJ7apOTO3c2h3NbtuQa&X-Amz-Signature=9cb1e6304bb6b8af3097364114d377581d9a57fdc4a542fc895cddbb7f8fb55a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466W7NBXVGL%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T082900Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGAaCXVzLXdlc3QtMiJHMEUCIQCQO1gMaBffwp2XLndQf17xKdduJra55DwEKEj%2BEFbr2wIgAu6LAgizawF%2BbE15sOkDSYquaW%2FWBas13h083L4EJgsq%2FwMIKRAAGgw2Mzc0MjMxODM4MDUiDKgRE6c7cvc5jbDeGircA%2FydP2MEH6%2F7h6J4Zu7r8gTx84FKNQdsiNaYJeYTc%2F3wVLwTpSJeq5%2BOO%2FVGZALGYdoozUsEbpASosCkB0%2FebY3NcyfGJkRy7oAMKESQRS9Ak9QjePRoWzTJ9UdHZif4WT3VAXPafRMHLbDM4NEw7uzLDn2YSMhRpZC1UC6TJBUNXUCzTWheUIQ5R697sjdVGMorSV682Dj2tQKpKzvUi6qKKxW1tNIWxqh5ehY1zI0Pg99EAhO0DENoNmYeRfzWXYjvJ8gkZh%2BoUV7wgEU5buryPxN32Pc04lv3U6O9nNoxPB08AOSnJfmXTzWUsYdOFxQqe97BvQ9dXLUOa0eOcJNmjHEBlKZjbUyo2wbudOQ%2BYHhAAjhSFphmvBJe2%2B37ogkLwYHXR8H80R7vprrrnrgPwqRO5hLAlvx9GHqhJBsAuG3DId0Fww4nhIB0yIvW0mW4bMOEWCCwDs3LD%2FtvE9cUB%2BVwa0WQe%2FRTdHNuXIVhsJV7OhGwYWifFT6WsGB6z2YDcHJUO0JnriZeLkbg%2BvdKOiT99uFhPBBZJ7LcunoVpjsRU1V3iqENgJMzoOkWDgPT9xZ7uziMPUa4INrRnikbh6EbzvYxxOe%2Bhj16uUmdeepRFbkuWNcp%2FVmWMOn%2Fuc0GOqUByJJxsj6whgULqp0Ylkg4IWZLOSjR368Eb8Xyem42MaoNetSouA4k1FM1F0bKVYqjdwi8XwpjYgT%2FBUMbr1NkSJS5yuUio%2FEgXfjKjN1Fm7hpC%2FvPMSdOA7XozCEA6p%2BATCrTEv7K1gK7YNJgKGMwg536v9svNFbHhNMlHeQW8sGAp9wIJCGbi%2FkbVp5X3liyk%2Bf0p2OgluPx8Usr1lJg4%2FTrECka&X-Amz-Signature=60fa36ab25f111d21e372f71f301b1479ec27f7d36bf8c37d2ee35a650a246c7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SPAAF45T%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T082901Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGAaCXVzLXdlc3QtMiJHMEUCIQCwySZptCrBJS3VHknFT1Kdhn8ip8GDTyGwZMGamkWlKwIgC3p%2B2KwBlwTP4p31BdJII3GnQrbzl409jAktKxO1TU0q%2FwMIKRAAGgw2Mzc0MjMxODM4MDUiDJoHg0fUr6JXKTOVVCrcA2FRSq%2BAwrGc3ZEtVBNYEqOW5tmIDu1kVdoFv21JoK7ebHO2BtmIME%2F1lqTNXqSvoQTNbz%2BJtqseHKWHdLhBqn%2BQVWw4af8gmdqF6%2FPhK27yN%2FcNUpb%2BYcx8LrRXcrIghcr8Gut65F0o2uNcUap8d%2BSp75jpzmkT6kJwVm%2F3wSPKRF%2BVC6lZCER7OYiOIarTu81eOgZnkA5Vq7%2Fl7wJ2se3ZuAJtZaGl7RhdivXAAEEyb14MCMTM7YSciJhVraGE3rn%2BG3SW4GzojXMX4U5XMKcSw6avxnaNPTetHQNvFkmroYb%2FwITwLsu0bE%2BRJXshlRjLE5C2AAWb16B7KYdaIFDdhSGCeBk3zsnixQhz%2B2PwlC%2F%2FLUechX7s9zgGPZCNKUOEguqPvZoO%2B9YEQc%2Bt6BfI4tbKQJ3RY6iUIfwmtxwh046AUcJeY1YyEqJ%2BgdVd%2Fye2JSWANUgsFzyKOqtmYr82pClBAvhhkeKmihAprjMmJZUJuKH6%2ByDFtBQB%2B4C%2BtUgZDw2JA1Y8FW%2FHZwSoVN4ArYwSXypBIdXneLNammjf6CAnVbAky6vj0nZ3KyAiQ7G1NLJ1YKkT6ByPiszTosOblU5TA2zc1qRWPvslgGHuv9x6HgeqqE9HFFeXMKCAus0GOqUBLgAshNCQMeLTvHpNOA6Tc%2BubkSy2EeTy1V%2BzYRJqstETCH3apRpoQwJUoToZjtbhCl7fdLHL7hwHJS4OWmuBxZd4dmuLx%2BOzRfE0TL0xSZS6k4nng3YRVVRO6Y%2B08KKzg5U8ywGx23S3zzChV5145ZUXC8X71X6rW8LWsbZAqyG2WXElzUuzevT6nqBlS0Y5vIXcAoxXsBkqF813KuyZhtORLP80&X-Amz-Signature=bc814f0248aeb34292342b7674fb77cefb566630f27e36705fb90174bf51cf8b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QQ7UZ4LO%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T082903Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGAaCXVzLXdlc3QtMiJIMEYCIQCudJ1biuWXgVxQFSUmloQJ5kAW9TqtRmAb43BA2PlxAQIhAMBuMRttGf8%2BokCCT%2FrXXh1qj4SfIwoLTD4OR2rHCxywKv8DCCkQABoMNjM3NDIzMTgzODA1IgwRHeWypX93FXK3Ca0q3AN707QQi7xuW1yrM6DNjcvuAKuu6ce22woNPO7sRlcNs4KU9YCzvckqJ82aesCJF5gzk%2FJQl3PA89J8Fzv4pib39JgPJCEsDiNHShs8ecGONkIGot9vuIjL9n74F1PcDrPgMYcwVO0j4Px4iljORlaiPxlj5WN3gKKCk6JvmxsBPB2QKMSPdB6TjPM0D3BGUsNgPQJCTOWtxfoDHoJ8ksf3XAwh3%2BaHyFTPQafU0PGOfbyBKBR6wUkx%2FmsWnQOlBvCqS62h%2Bixo4Go%2FONgNwLlfvjd18WcBwK2dBeqPccKn3gxkJHl6gWkj8aVglXwjFFDHFIM1R8y1cVqwCx5AyPft8ZcDK7XlnyYrwB84xjqIBHH2onqUxI7ctNp5%2FpyvfAV3IFLgbn7pxJverS7ovU%2BwGyrWRCzltkcn7s6tDFNPTwn5yWY0lB1mH2qcxDn4uHDnltAQhdFT%2FobMGCscscP4WRPmj3AIEqULgMIW98oVYVbkpGiGqjsxAxSZWFlWL8fzhPhI%2FqHBU8JVminbW6z1K4ywzvvBBzxE9nQDqSKZyszKVK97TEmzBOW43iVMbJvZfLvRCs06G95d6EJZgWDEHJ%2BI%2FKtWOH%2BXvvXCF86Em4jlprTITg12Q2DOazDOgbrNBjqkAUBHjXyCf0DqQ%2Fneu3WTBzP4gYmnSZd8jjCO6dLfNdRlDYiLU9D2ZJO7Ghdjt2H1vfQcLePZRIYArKEHI%2BKfecgSnvwS894jj4IedwzGIYhDHAOIhK0mEbE3D%2BCP4MMFd4hK3EEHpxEQR0WQlcvW2ScZCtJwj4rBmaQpwf2%2FuufwEE1lyo7ias%2BSNCg%2FtQMtEUtovcwMyouUo0SQhtx0aH%2B86tdz&X-Amz-Signature=0fe7800aed4663295bdb27fd9fb0eefaa384805daf883b53c2a64089da63b648&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Y4SGJFKV%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T082903Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGAaCXVzLXdlc3QtMiJHMEUCIQClST3stlWSSZEa5WOF6iZVZT%2BeYE4L1duED2VU1eByEwIgIawx4Eb8LbD0T3UyEzVd2vhUgB15zz9u7ek0cdlAx4gq%2FwMIKRAAGgw2Mzc0MjMxODM4MDUiDG39B0rWvjW9mvoo3SrcA5vwxqpSBIZCWbtEywZ4zfm5fb%2FmLEw1k1KD8EVNoTEZC9moP1gebmOg7pAITkVKdzvSUZiWVWA8%2FNYnJ%2FAt4DIwE1UZ6iXy7KpEBN%2B6yrMUlRwBSZJFXJqQNx3WDbv7zHhec5Y65sZt5Klls9znkDWXWdohRp0YIwwahpdlbr547ksLyYN7tOm%2Bhb7Ux0Qn%2Fo1eE7nHnGrAadzpTDBsUmHW0VWWTEpE2jIE4E%2ByqCCnmQyupsQWH8IqFrKZRocPo5idaPhBCAxE4X47RMJqfsYqZX4DTS67DdACP9xjGS3t7jKaTw947oCCptTFD7Sl2dZlcQkpNwGydeKzrfrVpT%2B50%2BpYB1L78q3MbkbVtawu5xANkZZ6tpExURYO2SARTgA3qSgO8CaYiFuGHu57e75SJpazOXh9D8lusHiSNXfrrQ3fkf8p%2FNqMHTiEaY5f4YBYW%2F62sIhO0SFwFW331PBMTuUeewC4RAITncJL9kuiYRm%2BUJ%2FqcH%2Fxrn5s2YWoFnfNsdlQ3NPdklOEXo758T%2BE2%2FhqwBTi2ZIgkwbG4XzfTsVru%2F99%2F0d85vQipns4y6MzjGtYnipX%2BUtSHlNB49vE94FUSQ542kcdGrtKg0gaPy9oFOxFIniCqNUtMNGBus0GOqUBBUUu6t2TO%2FDQNwZMaofrHgs6iFtq4CkCN0SszIROVi9ZiM%2FX3gs%2B%2BIxUKnLEFsxPycVBCZE6Gm%2BozuTOtpT93yCntIGHHdzjqn0zolPXCRLky1pfzz7PjH96ZNvhox%2B3iTobYqCcUsojhf3BTG%2Bj7quL4XqzqD16WTQYbGaq0qR4jUcjXEo9tNy7sHNRYOZFLgP5Bp3Xq3nkp6W2bus%2F3yEl3m%2FK&X-Amz-Signature=07a5ba2b9574cf765db078a7e94b6762229544e8c2063a8f9616446237d8d8e1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Y4SGJFKV%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T082903Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGAaCXVzLXdlc3QtMiJHMEUCIQClST3stlWSSZEa5WOF6iZVZT%2BeYE4L1duED2VU1eByEwIgIawx4Eb8LbD0T3UyEzVd2vhUgB15zz9u7ek0cdlAx4gq%2FwMIKRAAGgw2Mzc0MjMxODM4MDUiDG39B0rWvjW9mvoo3SrcA5vwxqpSBIZCWbtEywZ4zfm5fb%2FmLEw1k1KD8EVNoTEZC9moP1gebmOg7pAITkVKdzvSUZiWVWA8%2FNYnJ%2FAt4DIwE1UZ6iXy7KpEBN%2B6yrMUlRwBSZJFXJqQNx3WDbv7zHhec5Y65sZt5Klls9znkDWXWdohRp0YIwwahpdlbr547ksLyYN7tOm%2Bhb7Ux0Qn%2Fo1eE7nHnGrAadzpTDBsUmHW0VWWTEpE2jIE4E%2ByqCCnmQyupsQWH8IqFrKZRocPo5idaPhBCAxE4X47RMJqfsYqZX4DTS67DdACP9xjGS3t7jKaTw947oCCptTFD7Sl2dZlcQkpNwGydeKzrfrVpT%2B50%2BpYB1L78q3MbkbVtawu5xANkZZ6tpExURYO2SARTgA3qSgO8CaYiFuGHu57e75SJpazOXh9D8lusHiSNXfrrQ3fkf8p%2FNqMHTiEaY5f4YBYW%2F62sIhO0SFwFW331PBMTuUeewC4RAITncJL9kuiYRm%2BUJ%2FqcH%2Fxrn5s2YWoFnfNsdlQ3NPdklOEXo758T%2BE2%2FhqwBTi2ZIgkwbG4XzfTsVru%2F99%2F0d85vQipns4y6MzjGtYnipX%2BUtSHlNB49vE94FUSQ542kcdGrtKg0gaPy9oFOxFIniCqNUtMNGBus0GOqUBBUUu6t2TO%2FDQNwZMaofrHgs6iFtq4CkCN0SszIROVi9ZiM%2FX3gs%2B%2BIxUKnLEFsxPycVBCZE6Gm%2BozuTOtpT93yCntIGHHdzjqn0zolPXCRLky1pfzz7PjH96ZNvhox%2B3iTobYqCcUsojhf3BTG%2Bj7quL4XqzqD16WTQYbGaq0qR4jUcjXEo9tNy7sHNRYOZFLgP5Bp3Xq3nkp6W2bus%2F3yEl3m%2FK&X-Amz-Signature=608b44e19d6cfc0f0ae2535c412f128830ea7245fd49834990c4ba47e94d94ab&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UEOYRXJG%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T082856Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGAaCXVzLXdlc3QtMiJGMEQCIGmLnguPoyLCzStg0SCP%2BBVC3SoF0%2FstryClPJ%2FFYuZrAiB4PDJTGrEALWLggO8zivJrQFiPgvS6XIbzwMKDW%2B42Oir%2FAwgpEAAaDDYzNzQyMzE4MzgwNSIMIhxG%2BDVAjCk0r%2B4wKtwD2Vlrj7vDQkWssvzSQIpo440WjG%2B6THe9LYefLiidvbqtv6eqvVvttcus6eYWNRCpNrN3Tu04cGkTiq8NF8tYMlR%2BWJvHsx1u%2B68IMAvPMDYnlXTeMMfNHiV%2B89sA7uRVqc0FruuyeuYd2Vo%2F50PvKie6qd%2B54vQSNS2P2PlYvabrWm1Z3i1HuquVASrfAS24SL6nsm0bDlHLlVl%2BV8q2lFZDKejEKjgjVdKTKnRWcQpIqIUmO1dEqwkmnmoCLWxPw1y%2BrIEn383%2BpktCZl8QWnOaCU%2BR81zDWoUidZY3TVA8KhhFOMAA6mfgop37c%2FyA%2BNy7SaZbKQe%2FgXF4%2FTXmNzFiiRDF0Mz0ZEhmqv0mwHcQ10Yxlc4qb%2FZqpt7sxJ2N3XsGi9IrdZn4eIoWORfnnyk98zVRJreL6dorLgIEf%2BM%2BIg4onbPv5QXGJ2PkisCaB23GAF%2BciafFhwSGiU%2FkOlwq4S08BuzTfK7MPRUYH2HS3gIhPPtJp0%2FyqPynIHw7be7Av%2BdFkjHYdNkl5ApT3F71znyiwsRzxjQsPMAs8y%2FNpv1%2FcHBmOHvROQqnXf2xiTrbiVoLcHhjLcvVFSs4%2Fjm4iFAupQhzo2jtfl9jy6S4DUfR6LB1Za6X9C4w3IK6zQY6pgGdkRrnrs6p0ufVwTIERYdrSlEMMYEgUvJamp%2FP5QcyIYm6TC%2BwS9tK6GdfFFKXLgbL6C7T2wGkjPLsQLfU8sUZBdaeiCPF%2Br1Zjs%2FB1J8TzCZJwDc7YwW%2BZsbQ1yznJcIlzmH3CpWkstdtEgXfFFjip9JE46j%2FrW5B8tFXcPBml5qUpWlabyyMrU9OePL7Opq5DmSpl%2B%2B09QDEtKvvRQvpm1j0SSmc&X-Amz-Signature=c6d6a0a9c00fcdd9f54bf271e4ec7c5ee2d4dd9e0d2bd24d8ec59456238cccd0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WNVUI2UO%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T082905Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGAaCXVzLXdlc3QtMiJHMEUCIBb2s3n0ihVvDCFT7wWWiEhv0lFT30WLbtxcjpmpCenWAiEA46EJl6wZzAaGQVTDfWcwxmMYG1%2Bx6S5GiZxKl5%2BPctoq%2FwMIKRAAGgw2Mzc0MjMxODM4MDUiDHm%2Fj%2FLVQPZSFCno%2BircA9lb2Kd%2BFnb1OtwjyL3A6xhPttA2h7%2F6bcIlEeEMs%2BsVNcTGZUcEiPnL6ulCFSry1vQYXPQhGc5LDIKnnsV%2BaN1ixgLZ15cW9MZC6c3aDG5BqAhfpAH%2Bnw2KfuK%2BP1aWmUSF8hHVtdNOLpEF3o%2BOiDkMmZLA9LmoqG6hZieE6dJt%2Fzo1XsTBPesH9qru7jBLhQio%2BvnxQjItHd%2BEE9bw9FZGjn7h4ITVMnf%2FrrZrlTKRIIzsvL85TwjrCLk1eLd0z6G%2BMNgSVHGEpmzphD1XuO8XQdK3ffDNkK5O7gE%2FbJGy%2FrPvx0B6mJbBQi2LHWlagkjxFab8XbKzsNNaSasNCgBfaOzwkd%2FfV9WY7%2BYMGPN8AOdDh0UMBuAJ%2FO6lA37G3C0mdNeweq7zM1We7fFlDr9HxEOrXfBAyYiMt1FvRvHPg4hwq3NNkCKmWifRA3ltAmEGpphfuSpGpSRBvtQq29n9QyqeNCta24PQoBbpDp%2FwnQ8lPEKiqSTD0nwiOFT9qZM2VoSrSWCEpFKKmzgFD4lJbRcY2IX6Geb9cu5zl5SGfS3c4nZJIrcN%2FSPDpsMNwt2Q%2FahYGov14H2d6E%2B7cmU2LkeQBxa%2F0m7u2MPCHeGN2vZIF%2BcoLee%2F5CplMOiAus0GOqUBZJ2PFtQIbVESTxTMEHDIj09wFoj7b3vBCsgeeOmM1z2zshAtMMUtvRhW29wr2ypGF2dn46ylRi7JHj2pK%2FWehHB%2FlGwqFXC85NGhv6UxnobVuIMmFTqq6LqUfEd%2BQGhFp3CFzoC4RPfbQqyAXm5hJLppWOHaFTQdziWZFdyoK%2F4bFvqBWmGE%2BuAbRX0tKfTnDIf8L72kGj%2F5bvQqPvkhE0uqf1gf&X-Amz-Signature=c8e67bbefc66b8d9cb4cd06a0f7e5f861a9248c66017b07bb30d1842e077956a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WNVUI2UO%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T082905Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGAaCXVzLXdlc3QtMiJHMEUCIBb2s3n0ihVvDCFT7wWWiEhv0lFT30WLbtxcjpmpCenWAiEA46EJl6wZzAaGQVTDfWcwxmMYG1%2Bx6S5GiZxKl5%2BPctoq%2FwMIKRAAGgw2Mzc0MjMxODM4MDUiDHm%2Fj%2FLVQPZSFCno%2BircA9lb2Kd%2BFnb1OtwjyL3A6xhPttA2h7%2F6bcIlEeEMs%2BsVNcTGZUcEiPnL6ulCFSry1vQYXPQhGc5LDIKnnsV%2BaN1ixgLZ15cW9MZC6c3aDG5BqAhfpAH%2Bnw2KfuK%2BP1aWmUSF8hHVtdNOLpEF3o%2BOiDkMmZLA9LmoqG6hZieE6dJt%2Fzo1XsTBPesH9qru7jBLhQio%2BvnxQjItHd%2BEE9bw9FZGjn7h4ITVMnf%2FrrZrlTKRIIzsvL85TwjrCLk1eLd0z6G%2BMNgSVHGEpmzphD1XuO8XQdK3ffDNkK5O7gE%2FbJGy%2FrPvx0B6mJbBQi2LHWlagkjxFab8XbKzsNNaSasNCgBfaOzwkd%2FfV9WY7%2BYMGPN8AOdDh0UMBuAJ%2FO6lA37G3C0mdNeweq7zM1We7fFlDr9HxEOrXfBAyYiMt1FvRvHPg4hwq3NNkCKmWifRA3ltAmEGpphfuSpGpSRBvtQq29n9QyqeNCta24PQoBbpDp%2FwnQ8lPEKiqSTD0nwiOFT9qZM2VoSrSWCEpFKKmzgFD4lJbRcY2IX6Geb9cu5zl5SGfS3c4nZJIrcN%2FSPDpsMNwt2Q%2FahYGov14H2d6E%2B7cmU2LkeQBxa%2F0m7u2MPCHeGN2vZIF%2BcoLee%2F5CplMOiAus0GOqUBZJ2PFtQIbVESTxTMEHDIj09wFoj7b3vBCsgeeOmM1z2zshAtMMUtvRhW29wr2ypGF2dn46ylRi7JHj2pK%2FWehHB%2FlGwqFXC85NGhv6UxnobVuIMmFTqq6LqUfEd%2BQGhFp3CFzoC4RPfbQqyAXm5hJLppWOHaFTQdziWZFdyoK%2F4bFvqBWmGE%2BuAbRX0tKfTnDIf8L72kGj%2F5bvQqPvkhE0uqf1gf&X-Amz-Signature=c8e67bbefc66b8d9cb4cd06a0f7e5f861a9248c66017b07bb30d1842e077956a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466USMAT4BK%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T082905Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGAaCXVzLXdlc3QtMiJHMEUCIQCJ6vWyO3LBO71QhXfOqwbhgS1bs0tR3o9foI8Bwi61RQIgDH2sI60LOdjqjGchh%2F%2BWbYhoK0uMaIEZ%2BTsfyLIYiccq%2FwMIKRAAGgw2Mzc0MjMxODM4MDUiDMMC7ssXdhpNtDPgVyrcA8ytopvT5aY9STzECFjg2v37wN1Zv9OGBvdHOLSt2lkVJJY8k6YimMn30uj2eOBbhro08ZGa5fVX0LVQlf2pKs%2BC9MGTrnjJzSW8L6c8Uf5pEU227825nrXnvjG0oEp3laCDxx8QpU9vhrFDGqLaF1ZEOhxa8I9VwZiyzYtUmAsiLkZMDXNtjaIm58IilaAVc80s5DmAkdXXw6CqU0mF5Oc3hEtgfMImuBnhxbidg%2FYDWlYHCjYmDTXu07t265WO5DE6yMyD2A9U0Cksh6njqKgaMhmLWwgJOVKfCeiZLSPq48owg%2F7x3M51WsQcC%2B3%2FVCHg7U67cqniglIi42L6IFdex0xFJys1nAtUUxGPON4xFnzc0%2Fgo4n%2BR6r3SGatq5s62sWF1xI3%2B9aEx20DOHIprCAGI6tdhU16dKICkuJqUM3y7j6ZwsOEecq%2FZjU29q8iSJiBJUHMKJxc3%2Fsb1eCUDXlRNhyPqZToHYR3GBE3QWz8cZvu6GMJxFmcqXeQSpWw%2FCnLqnxLn2VVo%2BsKCPfYwTDTqxmIUsBUsBBf9DRT3W3QAkLP9UWqDLoRHpZumFCwlJO3fSrG7YlakDzpc3Dc%2B6UM1h%2BXgpjMLQdGrwNGkLnVG1gmFzf8U0dBRMNKBus0GOqUBxu0RGiafvK5m1090Fy12%2ByNZEL%2BN0MQYK6xJfYRyf6pToE6sOJa4MZjnernvCwWHwVnLznq22CQXTtlOCHed9%2BioZChph%2BRDQq70mNtS0j7ghO7VONGTsXhDk3QyyTF%2BWrOiGgwmQdIBUNqOHnGp1%2F1J8DAR5uw9yJOJZyUes9MNvrCf2u6wmW%2BR%2BEp%2BWDm53EsHCutYon5cktkTfj3q2fy9rbd9&X-Amz-Signature=f1cd24fa6fbb05647365f2b972e7968e2198082f962a45d9ae02f3da7ab4e67a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

