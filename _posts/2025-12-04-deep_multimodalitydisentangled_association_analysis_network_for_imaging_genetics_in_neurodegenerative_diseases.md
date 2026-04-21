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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667H2SLOYQ%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T155947Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHAaCXVzLXdlc3QtMiJIMEYCIQDw7THrztrlQBKLafGf1Qc0MIZLSa5Poi2gBpUQPVCSngIhANq3SGwymxvjmAz41azBOoKt2NAfxdH3UKTDpUBIEdmYKv8DCDkQABoMNjM3NDIzMTgzODA1IgxX9DGlcibiiEqTEakq3ANfOxhIse4oe%2F2llFFeLlLlDE3pVC0rMK3Nby%2BMyho87EquaqS8vwcNC8q1J%2Fa%2F%2FaFhLtDiQHhuz3uMWo29E%2BzDfKnx798IqcxVkgZcksBR8G1wV9QbSgMt4bcPOiO2N8IZiuX45tEHnwEw5Dr32HWFwkRR30Txy2X1uCF2ZWHGnKD66cqfugQBX97VNwrZrI2vsVUIXaCvIuWHRaOwecog55nqC3QL3XSswEr0mh0M3lBVUNQaGlrkA%2BAO%2FRf25eOn7faTtHKqfEyAbYrEKUSBVxz6BX8sdf%2FVvDUZy5M2JIERIbYrO0iSW1K0yqzoOUCnlo3yQ2ZOTfCbqlXTQEBGsELmVsc3qI4IhrDQgJv7MWrX4O9%2Bj5T3NSDHG5mj1yECJo13VNMIXNDxECWEihcfCvg7hSVHYOj75ALaBhignaGMKz2HyEna3LRaN%2FcckROkETVXrQqeXTqXg0mPKgstXfUBudugRDo2GJPM2vzuCu2B3k9lesS%2BcD4lb5aYV9GZP3B1Ir1wSJwNrXdseEMsmJuYUeY6bfboBL2fV1o%2BhW9ZFJHSuI7F19dlFpISuWBBaoruSj94pnoyQ2eseZPo1%2F36LRN9vORKgpzr89yI1XoLNKxmFQL2%2FhZZ1DCBtJ7PBjqkAUAmckkNb1YMofjnOGDn%2FGNXxCSAr7rNlnPDMdf%2B7xaIq9qYDVZoPn1yFEJoXZNV2fgOqIvudBH5VC0uJtGU4q2a6DziiUT07clCkJaBmsdVx08K78EGrc%2BhPw45KOCd2opAC0dHdLvoyj1KLj9V1z9sEMbIPDFFnQbwHwmJnY7Yl4gObJHElcebc921BBmP0xDVmwlSbGUMxijZvNOcXdWAuDT9&X-Amz-Signature=63f0a0337d229108265ec1045133759bf09aeae15905a82f74f8660c580da816&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667H2SLOYQ%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T155947Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHAaCXVzLXdlc3QtMiJIMEYCIQDw7THrztrlQBKLafGf1Qc0MIZLSa5Poi2gBpUQPVCSngIhANq3SGwymxvjmAz41azBOoKt2NAfxdH3UKTDpUBIEdmYKv8DCDkQABoMNjM3NDIzMTgzODA1IgxX9DGlcibiiEqTEakq3ANfOxhIse4oe%2F2llFFeLlLlDE3pVC0rMK3Nby%2BMyho87EquaqS8vwcNC8q1J%2Fa%2F%2FaFhLtDiQHhuz3uMWo29E%2BzDfKnx798IqcxVkgZcksBR8G1wV9QbSgMt4bcPOiO2N8IZiuX45tEHnwEw5Dr32HWFwkRR30Txy2X1uCF2ZWHGnKD66cqfugQBX97VNwrZrI2vsVUIXaCvIuWHRaOwecog55nqC3QL3XSswEr0mh0M3lBVUNQaGlrkA%2BAO%2FRf25eOn7faTtHKqfEyAbYrEKUSBVxz6BX8sdf%2FVvDUZy5M2JIERIbYrO0iSW1K0yqzoOUCnlo3yQ2ZOTfCbqlXTQEBGsELmVsc3qI4IhrDQgJv7MWrX4O9%2Bj5T3NSDHG5mj1yECJo13VNMIXNDxECWEihcfCvg7hSVHYOj75ALaBhignaGMKz2HyEna3LRaN%2FcckROkETVXrQqeXTqXg0mPKgstXfUBudugRDo2GJPM2vzuCu2B3k9lesS%2BcD4lb5aYV9GZP3B1Ir1wSJwNrXdseEMsmJuYUeY6bfboBL2fV1o%2BhW9ZFJHSuI7F19dlFpISuWBBaoruSj94pnoyQ2eseZPo1%2F36LRN9vORKgpzr89yI1XoLNKxmFQL2%2FhZZ1DCBtJ7PBjqkAUAmckkNb1YMofjnOGDn%2FGNXxCSAr7rNlnPDMdf%2B7xaIq9qYDVZoPn1yFEJoXZNV2fgOqIvudBH5VC0uJtGU4q2a6DziiUT07clCkJaBmsdVx08K78EGrc%2BhPw45KOCd2opAC0dHdLvoyj1KLj9V1z9sEMbIPDFFnQbwHwmJnY7Yl4gObJHElcebc921BBmP0xDVmwlSbGUMxijZvNOcXdWAuDT9&X-Amz-Signature=63f0a0337d229108265ec1045133759bf09aeae15905a82f74f8660c580da816&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TLFWUGVQ%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T155947Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHAaCXVzLXdlc3QtMiJGMEQCIEYTLIizbg1JdVOefSAyBeDz6y%2FtDhB2XKttYt%2FHbtAEAiAmqoEMEFuKOaLRaX5WtjTw7%2Fc%2BoJJ%2Bso1o15IXPVezrSr%2FAwg5EAAaDDYzNzQyMzE4MzgwNSIMSxTOjtpQkEaupXqLKtwDr%2FRUA7yDjRDo7770GkxiYdJDo7LeQ46dq6PYu3gGs%2F3fL1%2Fl7rRoaHJ1FuYRrS7DrAPs3hcRfwDTnPQNcwhr8NsCClX07e%2F7tlvMbcwvwE1zknGsx%2F84SdY79QASsiQTRioLZuWIm5N%2FFBwIo7x8AyBmqd38Ob4%2FV7u%2FbPZXH6KRS%2F0SooMipWvuOMeJL%2B%2BbUhVQxNxyhx5S5m9fD48WMTA1os50HggehWo9f%2FkKYGGmwDfO6tsQYLeEjk%2B7p%2FWuw1zmonpv%2BUcbS84CyynL%2BrNySZ9Jr1273sPn0zeIGSqvlrpGGnsr2WF2btfwparnSioGft59JOXBTt20RxqLLAae%2FZJi5mvxWCEzZo2bpEl%2FIDkMYm%2FDsNTfSB1eg2ENLfR1JVT1F4OhdHa3Dc4vr4OeZWPJGKmnp5XktrGnkG%2FLxczQraB1n91mCutGq3lltzFTIWrI8Xm9PtOkuaSXvfCKF2CvmLfTgYCMmQJwDtVT7y%2FR%2BgkqWkt5K07k79g2U92uxq5zBWJBrUaklxiGZgYZDbW4YaoM070zzNxfDnExGZBGo6QdA0FFIAFGultbkizVH8eKaC7vea%2BTIfgkqfMeGus%2B%2F6Bq7boWhHdySjbGH1Z2pq4OWZOXsU0w%2FrKezwY6pgFdmnHt3ZMjSVCd7qyeDwqG6F6CXLjQl0vSemo8J6pTSwdNNDBAiHNgLEjZLjlTNegt4hiafAVvktAQn%2FjArIHJQ%2BeUDIFmeh7EkCVrehIu3ZNJ%2Bd0YPAEAUzg3aeGhVE66nkq1oBjSDCWV5C5Ah5cFIHnjbu9QjXkPompv%2FhV%2B9d9%2BYoVRvGx3ogplxUNixFdspqo3JT8qjghGEcZQrLhbDdS8HHSt&X-Amz-Signature=03a6958ed75a3fc71a567e8eea486b8f712226de22077fd66e74a874fefea596&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666TDLFGMI%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T155949Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHAaCXVzLXdlc3QtMiJHMEUCIQC7LfkTc1R%2FMY82a5FxZUE77b1Ujfp3W5rjT%2BMaOoLmqQIgFQfm7xYuxBrYZg05TkcQVARLBKkSHnCbi2Au94L8aAMq%2FwMIORAAGgw2Mzc0MjMxODM4MDUiDOweoJ07rGwHXMHJMSrcA6XGTCMUaKNhjId9z9rEqgqj7OuzOASUhYuNojbYbn%2Fq6lvYYQP%2BP1T9rcqzGz1%2BZykQQY5qTGouT4Xpr%2BzZWEfYyDKmR1nXQYz5VQPjnTAjpaR2%2BKouglhFV8yde%2Fc%2BqZFZE3GLzFGCKb4wErIRdX841uDiDzkTaXX8DKMcC2cNN3ebzoxQ37YbO9VK3r50SX7IfKbzFKMe4K0iDEPQhLsEk83ItWNWKB4HvVcXDqK6exeFnJTlKtDPRbURSJR8G7hVuaNCYxjICtjV97RPDXTB8i4WmsrGjUFN25BJ0%2FtIvj55Z2wxMHI%2Bu5MdJfF58P6Fjilz1rmXNyJkpSq81o4gQb%2FYMhAKOFtmVgFJ4yNBrZ3%2BiGZD3TlqNWQzsDm81DJSNp%2FAFWxPshsdf%2FX3XAp0hkJtUPKqphIfhIYp6Ur9l0z47%2FKhmsKLD7kzA7Hk6T0RLY5PGANaYyemyLpxP%2B1lNr5AqJXwwrr9xIQGNUUChTYkWeoJTkqUlVmYNQmRjkpvmPQAQm%2FuGXbk9CmxNOYuD5WLfXuapBHEY6uCVre76MXXFubEjRf%2F8cy3gQ9dxKNcsvGURGJ6kUV2CuboLlffGPHq8YVVMylOkq7zaB9R7lE010gtB0ogNc3UMLKyns8GOqUBRfb%2BRntBnKXgFeMqL4pyDcth7jHvtdfm6%2FPxs5kyD0YLcK5akEpItWuYFlP8OYTBx0az1qzlqOFr0zD4qUjrJAMKyHBRNgBWCMyY4pWZR8i7Uzz941y3hTHLlg4a1SLD7CSD79V6aRzR64hmP0C4ZVFQ74UNpLt4WDb6JSecCgzl5HLMB36P6IAAvmZbZEVSuCSjvfXozUF7yZeEQJTN9%2F69%2BGtu&X-Amz-Signature=5d306b5f4f3af542e98ec890b84c363467cceee1980a33aa95db42dba178062a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666TDLFGMI%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T155949Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHAaCXVzLXdlc3QtMiJHMEUCIQC7LfkTc1R%2FMY82a5FxZUE77b1Ujfp3W5rjT%2BMaOoLmqQIgFQfm7xYuxBrYZg05TkcQVARLBKkSHnCbi2Au94L8aAMq%2FwMIORAAGgw2Mzc0MjMxODM4MDUiDOweoJ07rGwHXMHJMSrcA6XGTCMUaKNhjId9z9rEqgqj7OuzOASUhYuNojbYbn%2Fq6lvYYQP%2BP1T9rcqzGz1%2BZykQQY5qTGouT4Xpr%2BzZWEfYyDKmR1nXQYz5VQPjnTAjpaR2%2BKouglhFV8yde%2Fc%2BqZFZE3GLzFGCKb4wErIRdX841uDiDzkTaXX8DKMcC2cNN3ebzoxQ37YbO9VK3r50SX7IfKbzFKMe4K0iDEPQhLsEk83ItWNWKB4HvVcXDqK6exeFnJTlKtDPRbURSJR8G7hVuaNCYxjICtjV97RPDXTB8i4WmsrGjUFN25BJ0%2FtIvj55Z2wxMHI%2Bu5MdJfF58P6Fjilz1rmXNyJkpSq81o4gQb%2FYMhAKOFtmVgFJ4yNBrZ3%2BiGZD3TlqNWQzsDm81DJSNp%2FAFWxPshsdf%2FX3XAp0hkJtUPKqphIfhIYp6Ur9l0z47%2FKhmsKLD7kzA7Hk6T0RLY5PGANaYyemyLpxP%2B1lNr5AqJXwwrr9xIQGNUUChTYkWeoJTkqUlVmYNQmRjkpvmPQAQm%2FuGXbk9CmxNOYuD5WLfXuapBHEY6uCVre76MXXFubEjRf%2F8cy3gQ9dxKNcsvGURGJ6kUV2CuboLlffGPHq8YVVMylOkq7zaB9R7lE010gtB0ogNc3UMLKyns8GOqUBRfb%2BRntBnKXgFeMqL4pyDcth7jHvtdfm6%2FPxs5kyD0YLcK5akEpItWuYFlP8OYTBx0az1qzlqOFr0zD4qUjrJAMKyHBRNgBWCMyY4pWZR8i7Uzz941y3hTHLlg4a1SLD7CSD79V6aRzR64hmP0C4ZVFQ74UNpLt4WDb6JSecCgzl5HLMB36P6IAAvmZbZEVSuCSjvfXozUF7yZeEQJTN9%2F69%2BGtu&X-Amz-Signature=9b265a85ccd2ab8a23a7ce6e6f04d75d45d48c144ff531bfa3d5c3a06f75801c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QKBYO3FU%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T155949Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHAaCXVzLXdlc3QtMiJIMEYCIQCrNIZ9OePU9Pt1qHnPmIeOTy7D5BI63aTkROZYooYvUQIhAJ5fBTHBlShuIvnuScrmYkm2V%2F1JMI7A8kp5sG8Wd44uKv8DCDkQABoMNjM3NDIzMTgzODA1IgxpQKyShad7w4d5dPgq3APW6PN7eXLlZxaIJhlTYeeYyN0DJbSBpWYouKIu4LL1TxPy1ecsVW2Yc%2FuZ9dkl0rO4%2BTlN1UZsdA0vYDky03iVJJEqcKBAZKeKWpnh2zxzXqNT9TWBW9ldaslE0%2FH9t9giO3kLKe45CgnWo7K6RNbN02n8W3ifg0A2mCA6JbzpSlIC4yIY8ZUaafAjpUFzM3ox%2B4VR1awNwcOjMnZWJRauUKvfGHhliBA%2FhgkfnIQyB4ZY2Bp9V9BGFTmcq0%2B2qK0u77HRIcVIm7eiGg0geZweqmtQOcxxGBTM9igVmL6QRjAZl9reTrqiwMlgxf%2BzmC9Qn9Tq0GFaUKw86fhTY29p%2BIdg6KWAryadxULdOrmqJ0EbUjk%2BnKJ%2FDGOwx3MvOwHTACpTjZKBvUp3DuAtj20k6PetOx2VPvh6ziI8vXfGwaPIPfn1GDgvRui8aTC9ssRDcntmsbtWsgCZcaoo7gBmZL3aKBCh4VdSysKV68faJvVipsFZblAqnQx%2Byyy1NVq7i9fJlcombJp4QtmKbfdreBpJryeMhf%2BG92Ak3uBfMWMBqqCGvp3lTc6H9fmNUHi6eyim3vn6bwWgq6zytuUzwILm9T1VPxzEHl%2FEnlZfX6I4HZg3bLtpgYKf3zCwsp7PBjqkASitg5DZQzLOghfGY7D3YuCrBg6dEyatc%2FxppfJkGSi7S6VsTyHjNKOG0HJgIWAMj3zlndmr1uUjqM6pGIXlXBwP0b%2BnEZ9M1H%2FjhbvdQkDMTyWv3yWXParjt4ny6wdi3TFFeb3dzMX1guUkamTaBRC4s7XpGL6ZGH2piNfG1QL2dNXNcRDFuTpzQk5gaDEULyelmZgvqpDkgHjssXkxwdEWYooM&X-Amz-Signature=3080730a1626c75439b90b6cef3e4477bab9005f933816d7f4618a4ceb3abb59&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YYBMNAHD%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T155949Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHAaCXVzLXdlc3QtMiJHMEUCIAZmNeq39pJzaDumy%2F6l%2FPSGC4pu8IF8My4FnOpORZHhAiEAhO3xA%2Fyf6oH%2FZT%2FBhRxJ49oZzcI5wDZnORAnHnDKGkAq%2FwMIORAAGgw2Mzc0MjMxODM4MDUiDDF3dUTm8X%2FXLJQgsyrcA3C3YlAL9smzWcjBc3xHknRnQdL200MUUvie8QjIqGppIlNa7WqJJoIun6D0CXu05YeKYWZ5PNxxsmcJWGwC1o7sQ1yMp8mkQWvNeSiLbd%2FE4xn8cGzEk19KsbNivFlKws43qKm47rZXAYvdbuEzAYy5gNPIB9q3cK1HQ%2FeITcKdQusPlZCcTiMv%2B84%2F4OEJflwRm0hjsuZsB0%2BQ9PGPDgs%2BxtY0h8iE57odXn5KpgD434qec326W5pD6wHJ828B%2BC9bv0ltUYr0Bb0HCqvNFtpKyn%2BO5PwdFtlM%2FT2gZN%2BZxP4Kgt8nVeMn4fDP9WNGB13cYwIpGqvNvO%2FRPWzUICo6XFpbfqVe%2BGhTkhcMyjLeAxrGw7tey8VTEhs3zxvRcpj1KInNa%2Br77ZCQfYcVx0fhMEe1tuRl4db%2FFmf6QJZq9hkq8k%2BWRKFl%2FivncpMh0jKSW%2BDvB%2FYbooBlqNuH1mwCi8gmvzgMBascLGGweten%2BXli%2BAjAAttZ0qF0%2FFnAUYiObf604Xanx7PUzD3qzh%2FzQc4K%2FlR3uW5MRJz4vWApe6ipYykSI2Iw3bbY0A%2BKNXHTwa9H7CJQEQMfAogMiS7U5h2TUrdwwdq7WfpNv8h6HrNGQEH7ibJf7boMMJmyns8GOqUBDLpUh1gN5PoLh9t%2FXBvCFYHyX%2FggjuYEgRtz4c%2BQHRiFWfqqOIqtDT%2Ba9%2FAZbN3iB5%2Bxa5avMru5II6B59xBgMmZfuIz5KEM2NBcMl8HcesuUFhBvhKceP44LbCF%2FR7gRw1wCdCWFpE8%2F7sL%2FgkvuF7gFI6SCfOkWqQVy8hGyq4e0ctKapW9lgIr5%2BJjD%2FHhh8Sgbhq6FI7LNtKyBNnyIMv0gklf&X-Amz-Signature=1b1e499e6fdd17bbe59ac203eb7463bab0beb84830b73f9d94d735f74450f9dc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TVWCLXKJ%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T155950Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHAaCXVzLXdlc3QtMiJIMEYCIQCdrxe65sIo9QpVooIbq9BUD4TBi5BjwAPIZFLtdQ1gTAIhAJXRdQAqKLhWl0J31Qc8FoGreZHTSU39TUWRLlwyq1IKKv8DCDkQABoMNjM3NDIzMTgzODA1Igzt32dr46KXTodmALMq3ANTgVyYXAfqtziUjZlu%2BkIVrddFc4fV5POk%2BHfokOmBKk7yJiy6h%2Bnp1pkvSNNG3jPRU9oYwgx%2FOvzt0P3v5XdnmEAAnwsnQD%2BPnFvrKOVFF5SawIMcKL2RnCq4ugsH9Yo5H1bBFKhBcc2UJAraIQowwjUS%2B%2FaKBllFJHC5ijGFChVAU2fmG93mLAjtbmM%2ByhxiEXVtGWXAeCJqwJMjpZVOyMX0m420N5QSmr8dxRpS5XCvfay7wY4jdF2ELZq0l%2BPiiGVQYvnQhNXr7988mSbj7kk3Zujjxv9AUDMKPKwUXpblSIitNwpMGnkGwsPW%2BqeIf6si9Y1ovJxO%2BDInlYVUe1vcraHFa45TvX3jEe9NHibNWG%2B48zUQ3DorRxFiW3An%2BMcAYJClA5bUjs5w50v9ffSBQzndGQRR1HSehu7HLQFDJgNIKa49RuxMbZ7TRmxZW1Jr5CwUcXhkSwINDsm5X%2FgS7SlUEfiVXObNgq5xA0UvU%2Fv7nTFqg15T9chSjfE%2FSPcXy%2F1ZsfR6du%2FUoSza%2BS4nImqPY2tCCpBlpX%2FlUTEn05%2BQ%2BUhLm4fEDe3b%2B7w3pUdfuou9tISfMHl6mtj7wC0q%2BVvN2NfEic4oL8h1F304rz4nrNMePRc%2BhDDvsZ7PBjqkAapiANvmsV2wyc27rqZX6bE24WHFzQtnQUngD6Jrok5sCVnc5JZxwix5JO9bt3WJpU1IouaFAkMDW848bW7X2xdXYbi4teUMcKbvwvf7xomy%2BvNEq8oW3%2Bt26PGyCri3AnG4DLbRJ9gBX4tqPklKUwVJsD9xijecpbIcAnZXZX5FAwv3mw86RXNWP%2BZ%2FGyijhi2kdCOKxqwIBCtjeWQAZPJ3EzLx&X-Amz-Signature=7df80fbedfbe7617979d31869a5046f71e8afd7cc17b2128dc30e284dd5176d2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UVOL5JPU%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T155951Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHAaCXVzLXdlc3QtMiJHMEUCIQDtW0d3jdSLhdNLnEzD3PdFBsz3fyD%2BAf5%2FPc%2B%2BJgQqLwIgCcQZVpkuNocVxJnYSIPJ5jpHOkHNbW%2FZIMmQr0akik4q%2FwMIORAAGgw2Mzc0MjMxODM4MDUiDAZIlUlOBOE5RY3b2SrcA1hpN7X9sJYvctN4%2FAAMv8QD5YDN6sjTMcIjWIcNx52GE8qP0C5zQvNr9wY6C161yYJG7m3tQBsyGG2zZhkWjS7pcc%2FLRL89sG6zSzXgYF8MvxqZ0uJxqEpl%2FRip%2Bk9dwtyajbO2ChyDMwQAtW4gaivq6tp9T%2B9zfZY3AGSRob5tf9csw1EKq5tzNpVWfhcMAgmQYEwW2zjK9rXzJ%2FPgmy9wBcsFUc3lexETgtVsxrUPjmSNIdkKyk5kaLs%2F0M9SplRy0hzUR5wlymDR3pkvRLRWyho7P58w5dfVK65GfC2LVi%2FZcoZuhqR4pJu8kw9ObHG%2B3dJMUCO6wIrkddlitZHFO5pKSgg%2FFwvDGWjMSq5qNI8aojZS1mq9MzSdz5M2NN7bmFEtc6iqfE0T7CXKuYYzPk8dsa%2FeJxiMRm4E2fUI8Zq5rMYLXeeZgqn6zI0%2F3Yv12QkDjbRwkYo3uFHrHpeiGAqUOtz%2BNmXJmYA2XmqlfKFDFSjOszN0dPrTlwPitx3AC1wcBOClyFVIo07KUrgfmzJl8CKDywiSYt8v61GQsd%2FaxaLwx%2FfANj4ZtbGRvzAAXlx2np1EUJ7BTk3AwxkYP3pZH28JcFvmV9DKx7jte%2BlQLEOVIiiqY02vMIW0ns8GOqUBv%2BaPgHrk2pbsKbjRsXez5uQk0siO5yhrQMyG%2F6dv2Ft42kYn%2FlLr4D4NEMsf9wE6CO5rwWOvNGumRQjxPDvGckCgnPMuSSxOlZKxCjEY2xlSiuBnD%2FwEpZ5gSpNXaeYUoGVO%2BZljQ4fKkHP2%2BqBKNgg%2F%2Bf%2BacOagTqxEtY4oxG6H62Qn3Zd98uLgVQYBUBvv9x2L94wtkKmQRulwM%2BtAD8fv0%2FIN&X-Amz-Signature=fcb5f304fc78d551af343649e8285144c26030b6efd76295265b9ef09851ef0b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UVOL5JPU%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T155951Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHAaCXVzLXdlc3QtMiJHMEUCIQDtW0d3jdSLhdNLnEzD3PdFBsz3fyD%2BAf5%2FPc%2B%2BJgQqLwIgCcQZVpkuNocVxJnYSIPJ5jpHOkHNbW%2FZIMmQr0akik4q%2FwMIORAAGgw2Mzc0MjMxODM4MDUiDAZIlUlOBOE5RY3b2SrcA1hpN7X9sJYvctN4%2FAAMv8QD5YDN6sjTMcIjWIcNx52GE8qP0C5zQvNr9wY6C161yYJG7m3tQBsyGG2zZhkWjS7pcc%2FLRL89sG6zSzXgYF8MvxqZ0uJxqEpl%2FRip%2Bk9dwtyajbO2ChyDMwQAtW4gaivq6tp9T%2B9zfZY3AGSRob5tf9csw1EKq5tzNpVWfhcMAgmQYEwW2zjK9rXzJ%2FPgmy9wBcsFUc3lexETgtVsxrUPjmSNIdkKyk5kaLs%2F0M9SplRy0hzUR5wlymDR3pkvRLRWyho7P58w5dfVK65GfC2LVi%2FZcoZuhqR4pJu8kw9ObHG%2B3dJMUCO6wIrkddlitZHFO5pKSgg%2FFwvDGWjMSq5qNI8aojZS1mq9MzSdz5M2NN7bmFEtc6iqfE0T7CXKuYYzPk8dsa%2FeJxiMRm4E2fUI8Zq5rMYLXeeZgqn6zI0%2F3Yv12QkDjbRwkYo3uFHrHpeiGAqUOtz%2BNmXJmYA2XmqlfKFDFSjOszN0dPrTlwPitx3AC1wcBOClyFVIo07KUrgfmzJl8CKDywiSYt8v61GQsd%2FaxaLwx%2FfANj4ZtbGRvzAAXlx2np1EUJ7BTk3AwxkYP3pZH28JcFvmV9DKx7jte%2BlQLEOVIiiqY02vMIW0ns8GOqUBv%2BaPgHrk2pbsKbjRsXez5uQk0siO5yhrQMyG%2F6dv2Ft42kYn%2FlLr4D4NEMsf9wE6CO5rwWOvNGumRQjxPDvGckCgnPMuSSxOlZKxCjEY2xlSiuBnD%2FwEpZ5gSpNXaeYUoGVO%2BZljQ4fKkHP2%2BqBKNgg%2F%2Bf%2BacOagTqxEtY4oxG6H62Qn3Zd98uLgVQYBUBvv9x2L94wtkKmQRulwM%2BtAD8fv0%2FIN&X-Amz-Signature=6b1062ab153263c5901a894742a19ea003aad537f2a4df8673799b1eaf9ca1c9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664KBSU4X5%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T155946Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHAaCXVzLXdlc3QtMiJHMEUCIGIbO4Z6n6TJVYqDRCJCXnJ1B5%2BK9pi13XpLEFi%2FquGjAiEAxeyDXcuXVXUTjUBPeSbPwNcoEaj5wnee6bdOU4Uoxtsq%2FwMIORAAGgw2Mzc0MjMxODM4MDUiDOybnRIlxhlINCE%2F3yrcA9NrSkYfPY75e66vwUKlv0LKWzSoEUJCfSLfUrKLtGSQe%2BZ3okyH9aaGc%2FriBI34xPLsKZLCdYpJRmDrRSomzMlRdiUqRgP7cGkEL5mVlA5O3NxmOXODh957Jyn01Ec1w0iyKxGlebtplNW8UZ1BMkICUj25GtJBmgW%2F8FP7ySrY5i02iPLmGuANcHF1yMKa2aF%2BigN3WrQzq2Y2bFNN7k%2BkIfSYQQkHtuzHm9FaJWR0h3dYAJxN4biuutpm509z0AqFOXWANqAZ8klkVgh0aAKngHVV%2FEwfZFbcoEX2mWLIrdlu5ag4dDktsgJ%2FViTKsACVzCWKYi%2FHsU81vSDWP4cN5GsXKx9MI4sStP6gUJv0R8zwO%2BjUfez8wSzHpaMGpr%2FlaSVIosvjbNFLRblVHLcvTxY0gzYvF4VnKoDoXIIb2TRgPIOwS8VRxY2FOb8LAFFVow34KcRWMvAcjLTOE%2B2TOcToGEy%2BSrtxexEgyAys3a%2BjaBdQmMTWA0x5%2Bogc3%2BOeUsZYQt%2BMlxi%2BCgbGJKTlMSwO%2BCvOKVDpZ31KTJkD5wecMkgZ8ZsmMdB0H6OXon2csSq58OcjXZAJyYrlF645jj%2BghS4dvH9sPZxZjUBDRn%2Fy%2FOFBFVbKjJ2NMPKxns8GOqUB9Dk73bjb8klf3KS447eYJUqwNLHTuZYQmKnnAqIM9HwRwxr80CC0oqTs4KMVxivjP0E6oybbjtyW%2BZwtOOBSrnoaDVxLtrUmSbMl%2B8OUmQYokbabswISnjAqOiSJyfakm%2FE9P37CCtqfvjplqTMu6hLCY6qZt5yfqAt99RacF1t4Z3Ez9ubLr3Rx9LqHF5XBlD6EEAOWh5KTMhWLEPEbb0U0fb76&X-Amz-Signature=170986c2d739fb08046dd938568c75e397306a8bf1d40749939bf063bf60e36a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YUIM7DED%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T155952Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHAaCXVzLXdlc3QtMiJHMEUCIFra3NJUAkszle9cW5gKZvtazwYJ4bCjl5bn9LzMGLsbAiEAwEOU5MvLAdI1uohMOfZSOnHKknAciqBJDvOigypENEkq%2FwMIORAAGgw2Mzc0MjMxODM4MDUiDEzvvfwRmNo0ndwd1CrcAxv3qnTsWPD8HF9ccOUtcy2iXvz6eFdrz17CjcCZE%2B3e%2BU83GwvATJZFt2iEekDsnzRiYpq86VXoKdYsuEfVe%2BaC5yx8KyDX5D43JDJM4kQSpdYGhqN5V34Qr8b5cyVXDnHqr49cOZI76dfpKLe7VdOZJIoPFVsmEVV9dBkp7ue75loxbxT0bdZ%2F8Fv%2FhCfiMZ5kN9RmjBHBOIG%2F19F2QEkqFLBEnSpNKebfk0y6wXu2tOuuFIbrWY%2Fyr%2Bu5TqPvJFtFOfjM5WmD3G%2FVnbEsKP%2BHQKXz0B4WCVKBU46ZqiioYgNrw5pCG0Fdt1Z4CkOqU6%2BG0p1u4kz5RyEUkJp68TKQJl7kE64BEDlOZXnTmdHxZNrMbIgJDz0YeR3bB5PeAJ0boerYEYoMnNYm9Fd9r1uRuhxsTJELhz%2FhWawlX3V2wKbsOFCPh3ZH49VJwMyIueM%2FAdFt2gfzH1mAo5lMrd1Vjtv%2Fp0al2JV6KFGbo6aGxytwrU871G5prPUXUgyz7e%2BFOhfqLypivwAcnxVYO4qJRwmdPKEYeeCIsf75D26HgoqacauPgDAmBFCAYRp%2F0ozNLPnvlU5jnzy4%2Bg6Y1zQYsxW7nk1ujO5MS4CDjLRKRa60vN3Ern1Hx%2FebMJuzns8GOqUBffGNXYEPZb4Ao6%2B66DzlMC7C4GXgTGDoRXlDKQPHTxF9gzUz0m9PkDiZAx1wgquqP8UA941mJciD3ZN7W0ihkc5N4K55HR72YubGIf%2FFs%2BmxhmHDHMGsxO9Z%2FG%2Fy%2B1BkhvpIBWgj80%2BNHoS43GaRipAPJwIJlbclYDftKhN2ZYCKE%2FL1O8Lg9YtVnaurwsO0oq3s0oP1d6lEhgje80OovNIuEjPb&X-Amz-Signature=8cb0382367d5507a157770572a95efbcfeb314eb6516fb0327064225a419209c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YUIM7DED%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T155952Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHAaCXVzLXdlc3QtMiJHMEUCIFra3NJUAkszle9cW5gKZvtazwYJ4bCjl5bn9LzMGLsbAiEAwEOU5MvLAdI1uohMOfZSOnHKknAciqBJDvOigypENEkq%2FwMIORAAGgw2Mzc0MjMxODM4MDUiDEzvvfwRmNo0ndwd1CrcAxv3qnTsWPD8HF9ccOUtcy2iXvz6eFdrz17CjcCZE%2B3e%2BU83GwvATJZFt2iEekDsnzRiYpq86VXoKdYsuEfVe%2BaC5yx8KyDX5D43JDJM4kQSpdYGhqN5V34Qr8b5cyVXDnHqr49cOZI76dfpKLe7VdOZJIoPFVsmEVV9dBkp7ue75loxbxT0bdZ%2F8Fv%2FhCfiMZ5kN9RmjBHBOIG%2F19F2QEkqFLBEnSpNKebfk0y6wXu2tOuuFIbrWY%2Fyr%2Bu5TqPvJFtFOfjM5WmD3G%2FVnbEsKP%2BHQKXz0B4WCVKBU46ZqiioYgNrw5pCG0Fdt1Z4CkOqU6%2BG0p1u4kz5RyEUkJp68TKQJl7kE64BEDlOZXnTmdHxZNrMbIgJDz0YeR3bB5PeAJ0boerYEYoMnNYm9Fd9r1uRuhxsTJELhz%2FhWawlX3V2wKbsOFCPh3ZH49VJwMyIueM%2FAdFt2gfzH1mAo5lMrd1Vjtv%2Fp0al2JV6KFGbo6aGxytwrU871G5prPUXUgyz7e%2BFOhfqLypivwAcnxVYO4qJRwmdPKEYeeCIsf75D26HgoqacauPgDAmBFCAYRp%2F0ozNLPnvlU5jnzy4%2Bg6Y1zQYsxW7nk1ujO5MS4CDjLRKRa60vN3Ern1Hx%2FebMJuzns8GOqUBffGNXYEPZb4Ao6%2B66DzlMC7C4GXgTGDoRXlDKQPHTxF9gzUz0m9PkDiZAx1wgquqP8UA941mJciD3ZN7W0ihkc5N4K55HR72YubGIf%2FFs%2BmxhmHDHMGsxO9Z%2FG%2Fy%2B1BkhvpIBWgj80%2BNHoS43GaRipAPJwIJlbclYDftKhN2ZYCKE%2FL1O8Lg9YtVnaurwsO0oq3s0oP1d6lEhgje80OovNIuEjPb&X-Amz-Signature=8cb0382367d5507a157770572a95efbcfeb314eb6516fb0327064225a419209c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667DZLPAQF%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T155953Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHAaCXVzLXdlc3QtMiJHMEUCIAby2PMxbrGROEpLinePUZWkQUqP3kDlW3mo8K8zVeOSAiEAwM3IXwLVDiLXQlHUWwZPhN3eHAZM9BsTjQiOcHfbupIq%2FwMIORAAGgw2Mzc0MjMxODM4MDUiDBtDVtUNyddTmx5CmCrcA6%2Fb%2BgofKWp%2Ba8ToLaptEy5KcD4%2FI%2FRZu0IUc3Jh8fZLSRQmstMIiVE4qbnXm93gdzfBxpd%2F4o%2FgPm%2FicjkQrOjKITb4hKtKb9pCqcr1HJu9zxer4emu%2Ft7FUfEMH0U%2BF6gFmMNVBv5V%2FY9G0tosQoOmVB4TkM2%2BiM6Owa2SUOX2XNfEQdzvaI63NnSSif1QkYuJnIaFjeGU3kLMABgeTUvB%2BBTzy8UYWNhpmrT8CQBWmwzILo1xO7sZi88YRXpGnYY76Hctz3z%2F1nYgpkH3YtATIdkZDL8kiGOJSLFfk%2BwLFMlmpzrf2PNZydgU4h%2F2Gnz9BW1PWwNpQhcDECSKP0fPCALG5YlnC8Ni3BMuVAxzPfXSeOFgpCo%2F3nKQJX0e4ZEUE2L8q4hvsJLK4wpQlwafHuXh%2FVsnQL03MKarBgj89A7Opy%2BvPk3ZnF7agG%2F9%2FTnIQ7LNb9yJmIN6eUeP0hfzUholIVrRb5ASAvVQUVhl1reWkAB2woKjb5WwuD7H3%2BBseSjXEge7NLzkaSB0JyHsLt%2BLJgUxJo3Kh%2Br%2F01RGobBdBsUgS8XnpeFUED%2Bm0QACct1XCS45nq00UwirVWuu68pH5JxcDCIYzBJmJesxM7Xh2qiTrHQtH7%2FJMPGwns8GOqUBzgFGuvrrPv2B4lEUfaBsdxAFZSA9W%2F0Nf4%2FfCYaxXBUNgf5vqiKY%2FlNq0qARHLrlzH75VeEJo2D0an69FrR3WcP9tZi5fM6PdBs6O8uPAZOCc%2FL7DfEDhQQhKqr0s%2BRj8aE9jLYIwKroonRSWXuYfLK5VGwdfuMAZhCHpN9tUHGxx2v3gGNErM8tT7QCAgtw5vo00KxwsxkwtjoVTA6AWyarz0B2&X-Amz-Signature=a8af8085d5ea6219518f20e7d854327db7abe368f00f0dad503b38d79aedd867&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

