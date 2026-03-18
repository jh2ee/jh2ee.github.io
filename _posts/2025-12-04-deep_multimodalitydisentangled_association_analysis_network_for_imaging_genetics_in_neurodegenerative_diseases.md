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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663Z3WBY7D%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T103739Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDoaCXVzLXdlc3QtMiJGMEQCID9E8UX7uwcBvWnQSntwFnf2OZw4NQSGnV7OQZntfGipAiA9q8GA0JTmAPu%2BJ0xqn1kEE0ddTVOeDm0jQ7guh%2B3HMSr%2FAwgDEAAaDDYzNzQyMzE4MzgwNSIMsxlR5BZg8jjxyKXMKtwDhU4mjjSyxuGxKk4fZrugO6guTuvCotxLuH9ttg%2Bw8vVwPzEuIpiWUI9rznDgXtUY8rVrkjZH1TFb%2Fj1mB32lNlZfZwXBGwLttzDyAxhkxhlIpvVBCwVgaG4kqZ5oNFnHlvTEmsFyXzPnuU53AruJU5gql8HJPwMdgAmIOC%2FvaSAqxGZzhFwiX2%2BrlZP0Qu6LTX7STtuH%2FTj%2BijDVbHdez5IaDPLdHfrXnNT%2B6JjYsTqZ4vILlGxestAVPSHRX57ZSBApoOm0%2F9eT0Bx7ayHV5403f37MHL0yv%2BMnPeWNIHKrFX40T3D0KgK%2BxydVpN7jg1xTFY%2FuJXWql8Gql0G0fGiAxHaJc69kyoiQ1S%2BYcb4H1t0XJzpM7C3Oy6bSMU7R8QoZ0pUBNFrJo3ZrsSOA6UWjZG2PpUb7lvU2JrX4GGUxgRW2GkLJMVq8LyFMYNjCNCOd7WLBf%2BJ8Xe8wfy5UcRCB89WVaczKFGZVjZVX7PpX9ZeEOeuxKQ7dR6FwYVL3rSHfZjjnnicQEceVBeKZm5Iih1fvhGWt4PbDpB1Q1N%2BY3l%2B7nF8fcbX8%2BJteS7gg%2BcUQ7wauoWI4kTwI66efMZfh8ufI4qK%2BEUj4jhJsRvkGbUQTVdmcBSZHAkwwlPLpzQY6pgGEvo%2BZnoN4PoJPf%2FWIwv2xQpPrga1%2Fhm4XIfdgUghNZtD%2BqWflVwi%2F%2B3QN1g%2BlN3oyGMJV7%2FzvNrzxNu%2BqImq5rQjbbxOK8QFddeuDxHg%2Fd06jXHbAcxA%2FUfhU%2Fq9g2ZyVnhMSD9ddovhuPfA%2FWDEPSeyYczC1Ea%2BmqQBWaEHIHj3UVQXZTZ%2FU%2FvV2E6CIZbdpDYFdck5hZN0arO4zA1tMQGdZLUMC&X-Amz-Signature=70d2b2c38a324237b6679ed0b1801b20053b1fb07b2f42844ad758e323ecac64&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663Z3WBY7D%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T103739Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDoaCXVzLXdlc3QtMiJGMEQCID9E8UX7uwcBvWnQSntwFnf2OZw4NQSGnV7OQZntfGipAiA9q8GA0JTmAPu%2BJ0xqn1kEE0ddTVOeDm0jQ7guh%2B3HMSr%2FAwgDEAAaDDYzNzQyMzE4MzgwNSIMsxlR5BZg8jjxyKXMKtwDhU4mjjSyxuGxKk4fZrugO6guTuvCotxLuH9ttg%2Bw8vVwPzEuIpiWUI9rznDgXtUY8rVrkjZH1TFb%2Fj1mB32lNlZfZwXBGwLttzDyAxhkxhlIpvVBCwVgaG4kqZ5oNFnHlvTEmsFyXzPnuU53AruJU5gql8HJPwMdgAmIOC%2FvaSAqxGZzhFwiX2%2BrlZP0Qu6LTX7STtuH%2FTj%2BijDVbHdez5IaDPLdHfrXnNT%2B6JjYsTqZ4vILlGxestAVPSHRX57ZSBApoOm0%2F9eT0Bx7ayHV5403f37MHL0yv%2BMnPeWNIHKrFX40T3D0KgK%2BxydVpN7jg1xTFY%2FuJXWql8Gql0G0fGiAxHaJc69kyoiQ1S%2BYcb4H1t0XJzpM7C3Oy6bSMU7R8QoZ0pUBNFrJo3ZrsSOA6UWjZG2PpUb7lvU2JrX4GGUxgRW2GkLJMVq8LyFMYNjCNCOd7WLBf%2BJ8Xe8wfy5UcRCB89WVaczKFGZVjZVX7PpX9ZeEOeuxKQ7dR6FwYVL3rSHfZjjnnicQEceVBeKZm5Iih1fvhGWt4PbDpB1Q1N%2BY3l%2B7nF8fcbX8%2BJteS7gg%2BcUQ7wauoWI4kTwI66efMZfh8ufI4qK%2BEUj4jhJsRvkGbUQTVdmcBSZHAkwwlPLpzQY6pgGEvo%2BZnoN4PoJPf%2FWIwv2xQpPrga1%2Fhm4XIfdgUghNZtD%2BqWflVwi%2F%2B3QN1g%2BlN3oyGMJV7%2FzvNrzxNu%2BqImq5rQjbbxOK8QFddeuDxHg%2Fd06jXHbAcxA%2FUfhU%2Fq9g2ZyVnhMSD9ddovhuPfA%2FWDEPSeyYczC1Ea%2BmqQBWaEHIHj3UVQXZTZ%2FU%2FvV2E6CIZbdpDYFdck5hZN0arO4zA1tMQGdZLUMC&X-Amz-Signature=70d2b2c38a324237b6679ed0b1801b20053b1fb07b2f42844ad758e323ecac64&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TBB2TYOR%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T103739Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDkaCXVzLXdlc3QtMiJGMEQCIAHKr6uoU7cDDgrnkvxPt1OIxAZXozrjkB6fm2fRlXx6AiB5HD3rOuwKlkNEQJgbX4bU0mORa2OxmVikHfIENRjupir%2FAwgBEAAaDDYzNzQyMzE4MzgwNSIMwFQVvBFkqCQiGdOEKtwD4uYrK9TlEZm4tY49M%2Bs5zuo3hdmHqgZ8Fze2rVVq902za7M%2FpwRwoec4%2F8T%2BgBgxZ77HFNsHiTM4UqxCQfHQmnkDs5Pa3RHxYSq%2FVYk%2BESZvbTZoda4J5a4CzvxlKvUOupkESnmfGu2uPHPHT%2FiCc9sXIib6G3MWy9lw00R79di2qeN30w8Z%2BhkWkUPx6Xace4kNfCPcTMjklPemJgD9J1xmA8IgvAw3QaFDWYOpRCnMAsQVuhg8r9qwtXDogp8uYesOORgOnvqUTj%2FdPoptfeWElV7mxhfthUlfkbntzcNBY5ISXMheUVCaIru1QlCdneqe4zIa6bA9h1%2Fy7u2RbKNmz40uui%2F3YjoxPKHOCYTGx9K1GEGb1PXGN0OSr1NgegFortxSa6VTwOH0b5QUdSSKICWa9XDzYpAFd5vaHMkUkXutj%2FqbsquDeCsDYzr2txSLnDW3VPzyXNPMmuKF8YbdyGyH0Ozsim3mbLE2iBW6kIYDESECDiLRXSZ19ufZS4kO2czCpBxMCAHd19KSisU89Wb1CjezrXDqY9Kmsr4sqbW4JKNm701uYxV0tcKjwCNEXAVNorTWFoUf1jForYYYGLpwhC3yzS2jNo9hcqeeHwD0fK3dzD%2BM5wow7sDpzQY6pgEeOuLiBccI5OeMXpk87feCO7ZI5PxnOF%2FhA0WvdhFbHBdMJHSVc6ExwRjnbK%2BJH5zIfO5vwhWQw%2B8RKMoyVrEmFXEniGeLE%2Fkajtuo2gL5S16svFdkqvxZWQpW7nFJGY7nJRS%2BoGFwAlVJCAgGCHXv08wEfHuntU2POwOFBcgVVUnI%2F%2BlIE138JUOVmlAV9FFxdLi7m%2Bjh2psDSuCx%2FeSKrIbbSrAx&X-Amz-Signature=ef59f74689f16fa80cf983ffbf53fa235dbf97eac14180b27cac0c39c41ef70a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667TPKMZUH%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T103740Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDkaCXVzLXdlc3QtMiJHMEUCIQDpFxpotvin8gxRR4hPoAUs68ZTtuzqFxpPSqfC%2BLFwKAIgZv8kEed5J0J6Rc12%2FucK4BPZogMPA5J%2FM2QbxZnnmhsq%2FwMIARAAGgw2Mzc0MjMxODM4MDUiDNYYJoKVThnTmNB7FCrcAyjtY0I9JWE59CQskKIY5dYDwEqsw7Is9vQ0HU3aN7rlbMOlkwM9CNK8C%2FgxKJqWTJ%2Ffecv3E%2FGvvlX4mfoOD6h5bpjwZy90HJkofTIBa18gofkLg8ndc5pQNiE860UZGcMgEDfASZK0TcZxFU3v8C%2FqWcFJA8nk8nktqrulTaJKG6Eysy9rbIOatVldYsAMJjslVs5TfCWoWKfMiki0SSIN530QNxEdBUHKeUAADUcIXLWppWU8vOWP5RCZAz2be1SWVrHGl%2Bln%2BnpEDJW%2BkCVnN4aLLy3Qh1NYYaKovzOncRzuFUGaWpas8HbzKla8OP4VEm4eEjafNB3CuQjQl6FVUds9zuVq61phFS2m1MpvvlHGWtZ6Bg%2FivK28lERLfd9Jcbveul7SOsTUE3oVPaKEiVjrHsWQaaCJHIL764XsaPV5sy4E3fs9TeYHTd5So5M52fOgVGifScPtlNgYHCpQnef%2BRUIvGDa%2BYkB55iVyMZt0ihoKBEgqXcKtf3JIe5FKaTtM%2Fz5vmkCAp6yVtKd4DTkIugqtIN4T%2FzggLwyL4ujCxRmDN9GpKBQ3X8aMDCDwmhNYfPnPb%2BYwYlHtuXVUT0Bi0lpIhP8PClLx9rbE1xm%2F76pFG7TIcjqVMN7A6c0GOqUBPbPPL9ExqfOQb3y0KpfR96nI0muy%2FWu8FlaioWM4aWgavv7GFcvTYmyjPyxbsNf3heDRTFE1P10%2FoGWBp0GyBB6D4HrpmFUUNdZOX1UeJOuq5nKjc8ehgKJBfs09c3pRik2jkR8wpMGC0goO%2FS3UC0u3LJ%2B4K1SwsnOFFzdqadGhkzHuO4xeooEmInILgTUmCzAMUCB35d%2BQNv5KQmZQxKVZtU4u&X-Amz-Signature=14cb620f4215ba4534222a43ef2051fc147d2d537b6786209d1eb01bf5b75991&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667TPKMZUH%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T103740Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDkaCXVzLXdlc3QtMiJHMEUCIQDpFxpotvin8gxRR4hPoAUs68ZTtuzqFxpPSqfC%2BLFwKAIgZv8kEed5J0J6Rc12%2FucK4BPZogMPA5J%2FM2QbxZnnmhsq%2FwMIARAAGgw2Mzc0MjMxODM4MDUiDNYYJoKVThnTmNB7FCrcAyjtY0I9JWE59CQskKIY5dYDwEqsw7Is9vQ0HU3aN7rlbMOlkwM9CNK8C%2FgxKJqWTJ%2Ffecv3E%2FGvvlX4mfoOD6h5bpjwZy90HJkofTIBa18gofkLg8ndc5pQNiE860UZGcMgEDfASZK0TcZxFU3v8C%2FqWcFJA8nk8nktqrulTaJKG6Eysy9rbIOatVldYsAMJjslVs5TfCWoWKfMiki0SSIN530QNxEdBUHKeUAADUcIXLWppWU8vOWP5RCZAz2be1SWVrHGl%2Bln%2BnpEDJW%2BkCVnN4aLLy3Qh1NYYaKovzOncRzuFUGaWpas8HbzKla8OP4VEm4eEjafNB3CuQjQl6FVUds9zuVq61phFS2m1MpvvlHGWtZ6Bg%2FivK28lERLfd9Jcbveul7SOsTUE3oVPaKEiVjrHsWQaaCJHIL764XsaPV5sy4E3fs9TeYHTd5So5M52fOgVGifScPtlNgYHCpQnef%2BRUIvGDa%2BYkB55iVyMZt0ihoKBEgqXcKtf3JIe5FKaTtM%2Fz5vmkCAp6yVtKd4DTkIugqtIN4T%2FzggLwyL4ujCxRmDN9GpKBQ3X8aMDCDwmhNYfPnPb%2BYwYlHtuXVUT0Bi0lpIhP8PClLx9rbE1xm%2F76pFG7TIcjqVMN7A6c0GOqUBPbPPL9ExqfOQb3y0KpfR96nI0muy%2FWu8FlaioWM4aWgavv7GFcvTYmyjPyxbsNf3heDRTFE1P10%2FoGWBp0GyBB6D4HrpmFUUNdZOX1UeJOuq5nKjc8ehgKJBfs09c3pRik2jkR8wpMGC0goO%2FS3UC0u3LJ%2B4K1SwsnOFFzdqadGhkzHuO4xeooEmInILgTUmCzAMUCB35d%2BQNv5KQmZQxKVZtU4u&X-Amz-Signature=29ac3d86c96ab5b843f9537a5cacfd4f57ea46cd82d8f287050a877f3130045c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466V7PURP3V%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T103740Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDkaCXVzLXdlc3QtMiJIMEYCIQDkKrKS5%2BjHiTDSZ7JyxpTY4dHURXPnT2ADzmSOrnfA5AIhAPF2mascefbhpf%2FLJ861nafpakUi%2BmmmuXbFcldaz3cLKv8DCAEQABoMNjM3NDIzMTgzODA1IgyiGSPlUHDW19UqJP0q3AP3vaDiqgERF0g6%2BcnuY4tY2T871bmMKgf8hBDdorHoU3oP8gJzmV4hnDrQlEMQ2Ma9a7nN7cM3U%2BxVVPw3k1bxx2uYh2N1L6J4qjeuTR8F6V0uBqq%2FO482lX2H6%2FpgotwKlxGkO9uVOA8gIrRH8qQsBag6eu%2FGs1VYKuawVvmC6fqLD9VWBRh%2FAR58RqPcol39RYt1%2FrZJyWqpa%2FWnyJau59qPkXi%2B%2BT7SywHxke1VP0rNnZc5LVITkCW85oJcC6cef1uqG4Hsvp6BF%2FPgq4lkWydP18faiD%2FhMC9qTar4H6uxGLv9P%2FqcGzpD%2FzgYdg4tu25eimv4AIgcrmN0aKi%2BFESAQoew3gdsvsxlcfeCrQs4fNBldwFO3pmP88ybK1qA%2FNfbt7Cd7qH%2BBvAhVR5qMo%2FPo4k0JvkrhVfltyq%2Bd581MX0xVQwhYBO67czs%2B4hsN15HJTZ055umOls9Eyhptpl0RvOEINv5K0ku4J5nzcbPM8AZEigLFY7Ez0n0Yp1vGbc8SigjPoUS2tii0yg3MPq2nkDVyV7gT74tVQiQCxUEviok1gPgU9HawMsQXj8VT1ctT2XwNau4yi5fcGkdOBIZFeOaV4QNdNg66BLWixllOFaIx3Weo20e8DDawenNBjqkAY1ZdrqHCTannY%2F7X8drkTX0VJ%2BlW12PBvqLWi86LtoDWOoYTBh7Fp5eaXbhthN4NOzQoggUco5zG6LwMENjvyIkS7qzth47YggZjyWWbLTssBIN12mk5MxeNiSRO6RmycfCyJ0u3fU3d3QK6ZST45qxc9FX438moWY%2FasHAHu3FepvmYxhxd4Qn1TreHuTemwfWkkTXWVX7Y42D4fVfpYZq%2FN96&X-Amz-Signature=eb17c5d4fb8fdc6ccac6152a94ee02edac611fa5eed48db803526f0ff42b061e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UODBSAWP%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T103740Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDoaCXVzLXdlc3QtMiJHMEUCIGZKk7aiQ%2FKSO5wZsxyEPl3RtnoPuiNsZbGSTrSaPDufAiEAp8GmIPvzbWasaOj%2BvSeH8M85DAzxVX8N1a9KPk2yrOkq%2FwMIAxAAGgw2Mzc0MjMxODM4MDUiDOJVVXd7TcPSvRrEKCrcA%2Bsk9nc00IljHqpGoj1DIvFxWCtH0pMxorLBJRtr%2F6kFEW9Tg8uuRqiSDnG1Vof31ECbeE32vs3cZYgmE5CPsTB%2FG5OngciptfFQQATXuU8PNsw6nu0NaHIqrZkqGZulcSRJJ5nraNPk1D63BD7bDztk3KzGK%2BYJAX7gjCgZXAeFM09azOegWu%2BNasAOIEMhEOjgojUCSzMlpURBqI6eOxqLYd6i8go7qfdwxy2pBgK6mvrEBcp2zPbjCdSIknlHF0T0Ns0KxneAVR23MLilmRF7avo2QxVQ2eDfMvdejMsGyW9P3G5yZk2FlsgXjU0wKIKoqkANT0sMpgfgLPsuyS7CaTILcijX85IiyKwrtjVpXOFiNwtorYhwCf4RDGXV3fOaz4UUQgokO6pMg%2FmQKCNf0fqcCM4ofnTFbCN7D6Qv7yIm%2B8PSTkqhNmQ2oZG2MuS7IhAWP32z8JhJlENBc4ppJQulp1egYFeYny%2Bnx859p4K40UXe%2FGwQpBQZW%2FbdSx4ch%2F1gyNwT%2Fc4FbJ6VPxgZeB4amPRgbJnSbz%2BzIFOWP%2BGAR6XUPQ4yRGxHJRjdSMrsgc6b%2BFmkYUqn695U9MtiO5m9Hx562ScpgW9D3GjvJ43PIdN1SmWv098jMJXy6c0GOqUB1OzXrVvzIboyTc%2B0d1%2BVW0wck7gcHLpvK8IRIoGEpZpI8WJhweHu%2BXQnBJS0iMkJAdYcZp8NLHevypt9IGFS2HhJRR6LLFAddRg46M1mEhNEvqAzWdmXxSRu3AqZ3059kc1d256Iel%2BZdglCVbnHShFVQQwDwksfsn%2BpPU1dTRvfa5bh0ZKJznjaVzBYnk4FCz4zNksVBJTZZj4a7rxlpbllEcbj&X-Amz-Signature=a565c18a7b589078ba6429b6992eb37f57c9e4a8a8151103f687b498905583a6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WUKF3JYP%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T103741Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDkaCXVzLXdlc3QtMiJHMEUCIQCil4YOzPaODZXYQ6ZKFXGeiKY%2F%2Fy7Ra91Bq75D7vlmNQIgDuK70CwuvOKtSbOEUMS%2FKX8oQoRgDwqZQXDW6Y1NLt4q%2FwMIARAAGgw2Mzc0MjMxODM4MDUiDC1iaMBwzsJ%2Bs9QzWircA3AqQn7TzjhjeA2P4sc%2BCV6iWds4vxlg35SYtMZI6Q0U%2Fz1kI5C9CYzeaDt1UB3OmaClo8mSu5Vdpk4fONO4xMaWY0RzCOlQ%2BK%2BtPVeN0S5ALMRcQAtTQWENUAeJiE6%2BzfxtoJnuU6i3qVD6hf3CvbERomt6Ex4Pw50emJfqjFT1Ok9J4bU0csJz5F%2FvU55Adjutcts0CKZntj%2FYe9bNrtaVIJtrNDBgfCBWlIKaSMxLrAGLZv1M8FmDenZNCfvi33fqOGWtk9CAprVRP%2FfQi7teUqPjcytyy04csVdaevGQkImPcRrGJx0L%2BhMJlO3ChLBfEf%2F0nWnRIxkXLA5%2BOv7PNeuh8nRUPh%2FuNJE6o0Iq8eVSlS1IkLqyX%2Bvhrc14QZZZLPiKyihcGuXy9hbLnOkll%2F26ynLYw7PDBDbc2tz6Fppc%2BbKr6s7E2eiP2mMVuxtt2mRxvjPqp4l0Vy%2Bj6fskxNHI3ngnCTedW6cVUYO4pAq3Vg%2FvwPmusrvCmCUhpiTJc1LEi7jJ73FjoJRSg5S0ejMJhVqFrslDtp5LoiolG6on1pMlpCHEVVqIBFjOGOQfIzFB7o9Y%2ByuVUlUMAqRQz2BIUygIF1Bq5JFI%2BIaE4IPdS8VTQwaM3a%2BoMKbC6c0GOqUBAYogde3IpLTkmr6k3KwYl84AMGcM9Ru9t14t9ZDsfqF4cT%2FhTDZJ0P6nLXn23%2FOiYU6ZU7XHutVP1rTPdj3dvQvlTkjSOAqtyXuT2x5tVrUGoNIQYtBu0HZoogQuxyR7XJFfjBuv089RbJMnSN3s2B7523pL9YnYiiFHQ%2FEuWHfnYYM9hpWkbS00tjNYa63bJgGP7YOHMp4fMZIq1T4cO5SrgYuw&X-Amz-Signature=86bd03ad573f5c6c13fdbfe7ee6a21e34f16487b6517085f013850eb2d45963a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QGHIEN3R%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T103743Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDkaCXVzLXdlc3QtMiJIMEYCIQD3hZ72tPnHOaUFoIQCeIhku6jQ2Zp7FyB4HFQ4w1A6%2BQIhALc0oLXZlKwgdp374SuJK89g6T%2FShV0ipFQDFghF0qA6Kv8DCAIQABoMNjM3NDIzMTgzODA1Igx8bwmStqW0KTbFWHgq3AP%2FU0n8thsjkmYfxvs1fhSCqrnNiMEytAlN4y7TmeOg77RteS6Qw6sdQcLJJqU6tkWbJVhkey5dj%2FaeXEINX%2FerjnMdTGPEzQipam5g92eXsULeRpx0R31uhT%2FTZj67c%2FRvg4Trma4DTwg6EpBg2ToxmTpxvMj9IAN0QC77LQ7Ho7vEMBStDy796Gi83yZp5lNvGMwmpjqfLTC%2FEQksuHy30vT8du7odKgCRuuAvJlbTEWJfU76oBvHy7TSeT4Ze761wlSmUDt0IUM10Vw3ZwjMxeMW0MSdPGhBFG5IP%2F6Eu4eXyDiDymNYU3vkzR4oHnEdaHOWc7puwbRvekrEO9cnixxm%2FjC5XUD0eEYJRGsToJnppSCqPk4ug6rOHefcz0umS2yOFdmcJzfMPwmT3IvUFxfe%2F3hCIgrC79VlvlVJittySP7Z8WtOhHvq%2FXsJPpGuoSp1NdekxE1fsqYDm3yG36MWKTPAQ5a0IOKcTvGJUGRqZ5Ix3g7Y%2FJC1OnffwIzzwSTKno%2FsQj%2FTWHYUNkRedPTTzV4%2FAueuWlMm5p4OjPDXwdcTCtvjTjT0DT4HtrFV2ctjS%2FIIHtr1lPfXB8fyPEuK287KTNJK4S4eY3NFWJyCPEfQGsLeOQukwzDuwunNBjqkATKsFUlcyLix27MBwN9UbFpoKtcLBKwQn7rX4tCAW81%2F1rlUHRtGwwyOWxDpLdfXBmHfWCTyt7JxsRPTklAZq4RYggW9xG%2FWk0D4yVavrKxm3xyRlfuciWWzD%2FY2Rhv8H1jHt3BN1DiaC4t9%2FveEPIZkJ3VDnWw4Q1BFFkqHCdflyT%2F%2Bmoinaijifw%2FTgu2aV6mpYpF%2FhYWgCS%2B%2FNcgAK9Nw5Tqy&X-Amz-Signature=d0cd40c75be06cb8473bfc7294ddae12ceba4fcafa2174e1fda72544c5d85da3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QGHIEN3R%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T103743Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDkaCXVzLXdlc3QtMiJIMEYCIQD3hZ72tPnHOaUFoIQCeIhku6jQ2Zp7FyB4HFQ4w1A6%2BQIhALc0oLXZlKwgdp374SuJK89g6T%2FShV0ipFQDFghF0qA6Kv8DCAIQABoMNjM3NDIzMTgzODA1Igx8bwmStqW0KTbFWHgq3AP%2FU0n8thsjkmYfxvs1fhSCqrnNiMEytAlN4y7TmeOg77RteS6Qw6sdQcLJJqU6tkWbJVhkey5dj%2FaeXEINX%2FerjnMdTGPEzQipam5g92eXsULeRpx0R31uhT%2FTZj67c%2FRvg4Trma4DTwg6EpBg2ToxmTpxvMj9IAN0QC77LQ7Ho7vEMBStDy796Gi83yZp5lNvGMwmpjqfLTC%2FEQksuHy30vT8du7odKgCRuuAvJlbTEWJfU76oBvHy7TSeT4Ze761wlSmUDt0IUM10Vw3ZwjMxeMW0MSdPGhBFG5IP%2F6Eu4eXyDiDymNYU3vkzR4oHnEdaHOWc7puwbRvekrEO9cnixxm%2FjC5XUD0eEYJRGsToJnppSCqPk4ug6rOHefcz0umS2yOFdmcJzfMPwmT3IvUFxfe%2F3hCIgrC79VlvlVJittySP7Z8WtOhHvq%2FXsJPpGuoSp1NdekxE1fsqYDm3yG36MWKTPAQ5a0IOKcTvGJUGRqZ5Ix3g7Y%2FJC1OnffwIzzwSTKno%2FsQj%2FTWHYUNkRedPTTzV4%2FAueuWlMm5p4OjPDXwdcTCtvjTjT0DT4HtrFV2ctjS%2FIIHtr1lPfXB8fyPEuK287KTNJK4S4eY3NFWJyCPEfQGsLeOQukwzDuwunNBjqkATKsFUlcyLix27MBwN9UbFpoKtcLBKwQn7rX4tCAW81%2F1rlUHRtGwwyOWxDpLdfXBmHfWCTyt7JxsRPTklAZq4RYggW9xG%2FWk0D4yVavrKxm3xyRlfuciWWzD%2FY2Rhv8H1jHt3BN1DiaC4t9%2FveEPIZkJ3VDnWw4Q1BFFkqHCdflyT%2F%2Bmoinaijifw%2FTgu2aV6mpYpF%2FhYWgCS%2B%2FNcgAK9Nw5Tqy&X-Amz-Signature=515868cc8281913b67fbb090b5a2ba6e35644094e2f8a507f6b08ea80ba15dbe&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664XDJAPQH%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T103736Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDkaCXVzLXdlc3QtMiJIMEYCIQDZzROjtDQR4a6UbeDb1GuIYeX1vfQP0VxrCSg19b0DzwIhANyx%2FocqKIOD5mEHdaopobxDmN06Bkq1jEj9YPuYZDCZKv8DCAEQABoMNjM3NDIzMTgzODA1IgztSucdGtKxwh7EDSwq3ANBZqrbGv7iJIOkaqDJEWnYbkl7TZGZ%2BsCkhk56PvZzx08j1uJodIBK12ZjuOnLHyte7O1pvElIirvGIEGm4Sg1OX2XXCtKDMMr3olQFgOKuWb54hWHt0M6ZyEesaUFVhXPdh98%2BRHcd%2BMRBYv80ZZHcHKS76tkGSMnt1b5Afj2k2r%2BWArfXWN8cepJtm2j9FSl7R7L8kS3mJpEMcM6PKUA3YHzlTKoG1gSgcr2o7YYZ1yrwovkJXLNxQ8P5PHMjSAgZN7qu2ercR5P5zk9HhWlSE9Zzbvu6bvzBqDHJYBG87aq%2BIO28knMSwqJBHJ6ei%2BPyf3jjqJy25ldy5KrhnvWwjcx50VRIQbOzlhPk5AxAzCgAJRkSsWrmLPX6mt4Yc6sC29%2FPT32v%2FNG1aJYOqnBVSQtnG3cAmjEDitHwOW8f31zF0cTWRurl%2Bu%2FDjWszU8gZ4S%2FtT5Vxpe%2F1j4EIT8cVm9e7N5xiuO5K%2BC%2F2%2FsdTqYzvOZHYLUgKdWh6Y%2BXmw%2BoZxjEdUTKJOEcJtIx3fqKr5kdeITCWQWF07kkW9rM%2FNUkzbU95BBJvGcbLO0wtywNr0rEwgRTCuRLvrhD4zWVqoR%2BmblTtxMMbpphXmFoAAhnOgiNgS6xfjcj7zCbwenNBjqkAcYrQ7R5jSJSVJ2qekWz8ZOoN03w%2FWu1FV8xgo2UpVdElgRRYjwXR7HzjJxzNnqJZ0NsRIMf12f1y5rmTlogjoCsjF2CsSV0l%2F0ZxUDwVnayo2WvvYCmEp1rTLN6IyHOnEYMguHLJ7fa%2B5sEtEmi%2FERfsD7qKOc1ppDCCbEOQmz5dNLcbQOU5uf6XeVJHngCiieNfJfO2NdrgWvcMNiKHcbWNfXm&X-Amz-Signature=525c00f053dcd9f3685061d7949333c91c10828794940ac62f6b65b5e8240c42&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XKZHHOXD%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T103745Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDkaCXVzLXdlc3QtMiJIMEYCIQDJvfOnU8cmIWY09grRPQ8HcA0H4RlghlXUVzC2eGrsmAIhAPYKKdBbq3O4RIed%2FZwdGx4amLQUVPSDIs%2FHA3K%2F2BNWKv8DCAEQABoMNjM3NDIzMTgzODA1Igxq9JAGZP2kH%2Fj1LaMq3AP6wZ%2FFEFo2qP2P35ltb7XQ%2FXBmJez7ZhPQr3DXImJIzeG49k%2Bo9gsCT0p0sVkqoUvWBGgspqboBKIFNgpXegJHAZO7gIAnXCT3iepG3wVkcNQWNko0amH3nn7FRoIE%2FLj8YHlJKlocweo0WmJX8864gd%2FhjIBxD5wBHbK1IsOB5LBj6%2BgS%2BzqbYppNZtbdizTvtxKHFgIT5zNw6qNfxy%2BycwI1S0ngHcZhKrjWW5kq5tHJITvSBl9Qn0G72EhcHy8sLr0kjSG8gpBOMWYWQyjYsdX9kCwGK2G%2FkAzYQ8Of%2BJK1aiPCZrE1cGexFVqeeSiQ7dNhuT%2ByZEXMgpEJlXhG3X22fZHCKHDhOQpEJQG9vIzR7il4S3SAuheArz0%2BhIzZRJDbYiwFrDK2CJh%2Ftqi0tIFfPLRLe60JnetkE06HSZyErusW2ZopYvDDSXelX%2FILttIBl%2Bmxy%2BkbqcTmH4zMctrDVyNyvtvbu3spx5HmTPN07QHjAuHvvy%2B41NK5tePXV6xS9VTBULvLlWE1cM3i%2FTVchTYqr5qtoEd8%2Bn56GuD9R66YrlwlfEXU%2BuUf3AKYvQWxhTQPQQRUfSd%2Bx5TvUrCPv%2B6cywvAsEqsTt3QVGiXRy5ksWViZxRh%2BDDfwOnNBjqkAaUCUQvfmK1Et2eRUeEDp9yZgb8OtPvHapCEfF8b8bH6gakNCH6pZxHms8eogZ9OYSyM5o1veCgNywfFDaz2Y%2FR0h7pg7oINawRnvs6%2F9aL%2Bkw9NplaQ20w4rfDk21HJqhpycixZHDSoDk%2BzrIT%2F3VPeefeLsSXXGrYY4G804EkWaLzyCfBaVBiJ3NiWh5Y3XOtq6P9onwNyQcC6bZQwHzGXmh%2Fw&X-Amz-Signature=6de2459e6ae3b3b8199bcf981bb83ab6d94d4769f56af4d58fecf430f73c7b41&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XKZHHOXD%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T103745Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDkaCXVzLXdlc3QtMiJIMEYCIQDJvfOnU8cmIWY09grRPQ8HcA0H4RlghlXUVzC2eGrsmAIhAPYKKdBbq3O4RIed%2FZwdGx4amLQUVPSDIs%2FHA3K%2F2BNWKv8DCAEQABoMNjM3NDIzMTgzODA1Igxq9JAGZP2kH%2Fj1LaMq3AP6wZ%2FFEFo2qP2P35ltb7XQ%2FXBmJez7ZhPQr3DXImJIzeG49k%2Bo9gsCT0p0sVkqoUvWBGgspqboBKIFNgpXegJHAZO7gIAnXCT3iepG3wVkcNQWNko0amH3nn7FRoIE%2FLj8YHlJKlocweo0WmJX8864gd%2FhjIBxD5wBHbK1IsOB5LBj6%2BgS%2BzqbYppNZtbdizTvtxKHFgIT5zNw6qNfxy%2BycwI1S0ngHcZhKrjWW5kq5tHJITvSBl9Qn0G72EhcHy8sLr0kjSG8gpBOMWYWQyjYsdX9kCwGK2G%2FkAzYQ8Of%2BJK1aiPCZrE1cGexFVqeeSiQ7dNhuT%2ByZEXMgpEJlXhG3X22fZHCKHDhOQpEJQG9vIzR7il4S3SAuheArz0%2BhIzZRJDbYiwFrDK2CJh%2Ftqi0tIFfPLRLe60JnetkE06HSZyErusW2ZopYvDDSXelX%2FILttIBl%2Bmxy%2BkbqcTmH4zMctrDVyNyvtvbu3spx5HmTPN07QHjAuHvvy%2B41NK5tePXV6xS9VTBULvLlWE1cM3i%2FTVchTYqr5qtoEd8%2Bn56GuD9R66YrlwlfEXU%2BuUf3AKYvQWxhTQPQQRUfSd%2Bx5TvUrCPv%2B6cywvAsEqsTt3QVGiXRy5ksWViZxRh%2BDDfwOnNBjqkAaUCUQvfmK1Et2eRUeEDp9yZgb8OtPvHapCEfF8b8bH6gakNCH6pZxHms8eogZ9OYSyM5o1veCgNywfFDaz2Y%2FR0h7pg7oINawRnvs6%2F9aL%2Bkw9NplaQ20w4rfDk21HJqhpycixZHDSoDk%2BzrIT%2F3VPeefeLsSXXGrYY4G804EkWaLzyCfBaVBiJ3NiWh5Y3XOtq6P9onwNyQcC6bZQwHzGXmh%2Fw&X-Amz-Signature=6de2459e6ae3b3b8199bcf981bb83ab6d94d4769f56af4d58fecf430f73c7b41&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YIRMMAAB%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T103745Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDkaCXVzLXdlc3QtMiJGMEQCIC7PSS%2B2DgjFjOAZRGSrpLQRFmluvRDdbO21cQzDN3vaAiAtfEoH%2F6y2rDHyd5tK1ACaQ3%2FvNiki9tksaAvlC7%2BZRCr%2FAwgBEAAaDDYzNzQyMzE4MzgwNSIMRb7fks%2BLNmUAWzkJKtwDao9x7ec4%2Fh5YIhrMvYD%2Fbw%2FfPIbt7LOGAt%2FS4rCs53qNdkEbyWrsjYlz5OBx7tQVvm4bit9a4kiJXlDE3lqxYHHZ%2BouJStAWJMyErWGd391vp5bR2O6pH4wUOUV3wn5OLSu9vBVqy4wksnhVJJ0nvMx3GW8ihjrppjp6FZ6cuMtq4lr7Kekg9SS5B%2FIVgkXvCw5lcBTkTsQDA%2FvgLWtmii0QO4EvXZxc3ijQq5MwBe%2FC0VUQfkiDEwWwa7TlxK0OHu1lTcKIz9XRK8Alae1BG60iEiC5u2USAP8V36TCfGYjvwb97qCdNIj%2FtFiGWdeEFhNtNLk2deBjizJLnaB4b%2FPlAU50OM0VjsV%2BSuAu5lBUAONjLwUihzorDZz7ZLt%2F4IjI%2BhQLzxQug32XTJOO6s%2BA6kY1v7GOZ0OczQArI%2F%2FoY4fF71pDMRaJHC8zwBn%2BaHMuCekg78GbuQQXoQ6hcg4jXX6ZrLA5irFaRBsnLKW8%2F6GQPKXg77jkV69dENGo8LLWo%2BGJkhH%2Bny0%2FlN7NHH%2BTX8DeOc3lNjSoN5rDUhqM1bbo9U4O8Ozh%2BLYM%2FwGA8pVF%2FPHwIe9HKRzsiYvXBmy8PKV323t89aqeqsp75l%2BljubTd0IKo01jBvUwtcDpzQY6pgHfXjbZR9sUjy8QqhQVuevyAZhQiW%2Bux8udgh72CVg%2B5nPbprkTcuEMPVciY68fXTFkdoJ9unAJd4pRUC10nwkPQLXLMXt0V6cmy6UrLWWBPWE82e4npmvYiqtiM108xdEjmZdLH5ZX12UF%2F1duB8nQryzp3Qnw9KsCF9UVoVI2DUV6XSW5CwLZgyy05GrxwiZmNRjuGXFcQrfm5doXSOsPvQT2394m&X-Amz-Signature=28ad953fb58e7d2f25fa55191ef730b59c5c90d18f9a58ea9daa68059408e201&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

