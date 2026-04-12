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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667UZQTUK5%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T083416Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEI7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIDmERTg%2FCbP%2FmRgssBpSmoiu2hfFbb85XxAIYUfcFZxmAiEA09pJIbVbzJm4GQ2Lx8t3yx22ExKfowL1O8LiqB6r3t0q%2FwMIVhAAGgw2Mzc0MjMxODM4MDUiDO5lmfYeUR2Ug8iqtCrcA55%2Fy9IA1FUGm9mQueT5b0RtxKVIdaX%2BLr0Hj%2FnyQg6yWSw9ANHlz1sAP4jE4p5irIxmPQDEwsGQmu7GmovweOve0mhs70ZS3OLWPAvvn7TaVlIPRId5647K9If9mShXnS1VCjqT4d3QRbYSyX0N4%2FUttRNobcZOycy0sy1AyWS4dHg8W4nJec2td8sK1360vT5NwiBlaFMZZA%2FVUlXe9p2Xmo2iZwhevsSozL5n05Y3pwZoeyoL9qHSoykIAgnBqz%2B0nIBaDpSPt%2Bab8n9W1A0nvY2jQLMJ5YNUbhlT%2FLAU2a4agXgR3n0BwVynJFtPv3CDpv9YEButfzm1MAqSRzQ8uE6TNkHc%2FmXQL5n7DBBN7PLu6lZLEAgMkKV7aFBt5rx%2Bgb9zQ15Fv3LqoRUhtvQwjnWbV3nwamPNvZ6efyn8IzY51rTFR4sniYekCUlg2uzFQUYVkZ5FoRMWXbHN9fPFELZk92WqLilMNyZZfT9tnW7V59fbsQwG7GMpNCgPEB0tSGGkMaeTXmBIFN1IDIoVxHJqBMeDTZ2jtocfNUtZUI06w2LzxRPRef5BSIbD50av%2F0F2cr%2Bfb8rWqldYQxIZVZeiJz21uDFNOO%2FWkDBt%2BmOfWY6IsczOw1tGMPLY7M4GOqUBDf7uiY6CjyHNDas9gTXAWMBdazwJFfEMJgDnKeeEj9%2BFMhNvCtKC9hj%2BZExrIIxZWFQU3A%2BZrBOLtlLgqMalecUDgTGxpDyR3oaqyvI547G8zBih8PJuUBCiIYl8s90pLZQMEVmTTQvrRHDqRCUdTBhrdd2RJ7jpp%2FFVk%2BJ7%2BU%2F66A7kQWYWxJI%2BzpPFy%2FtMNAlzRTe1x33RkdOqL7VkmQ%2BWrx3i&X-Amz-Signature=a0cf9b734d9ab32c49fc6b66366004f63e610ffd416fbc8ddbb1d39c6d4f8e37&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667UZQTUK5%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T083416Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEI7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIDmERTg%2FCbP%2FmRgssBpSmoiu2hfFbb85XxAIYUfcFZxmAiEA09pJIbVbzJm4GQ2Lx8t3yx22ExKfowL1O8LiqB6r3t0q%2FwMIVhAAGgw2Mzc0MjMxODM4MDUiDO5lmfYeUR2Ug8iqtCrcA55%2Fy9IA1FUGm9mQueT5b0RtxKVIdaX%2BLr0Hj%2FnyQg6yWSw9ANHlz1sAP4jE4p5irIxmPQDEwsGQmu7GmovweOve0mhs70ZS3OLWPAvvn7TaVlIPRId5647K9If9mShXnS1VCjqT4d3QRbYSyX0N4%2FUttRNobcZOycy0sy1AyWS4dHg8W4nJec2td8sK1360vT5NwiBlaFMZZA%2FVUlXe9p2Xmo2iZwhevsSozL5n05Y3pwZoeyoL9qHSoykIAgnBqz%2B0nIBaDpSPt%2Bab8n9W1A0nvY2jQLMJ5YNUbhlT%2FLAU2a4agXgR3n0BwVynJFtPv3CDpv9YEButfzm1MAqSRzQ8uE6TNkHc%2FmXQL5n7DBBN7PLu6lZLEAgMkKV7aFBt5rx%2Bgb9zQ15Fv3LqoRUhtvQwjnWbV3nwamPNvZ6efyn8IzY51rTFR4sniYekCUlg2uzFQUYVkZ5FoRMWXbHN9fPFELZk92WqLilMNyZZfT9tnW7V59fbsQwG7GMpNCgPEB0tSGGkMaeTXmBIFN1IDIoVxHJqBMeDTZ2jtocfNUtZUI06w2LzxRPRef5BSIbD50av%2F0F2cr%2Bfb8rWqldYQxIZVZeiJz21uDFNOO%2FWkDBt%2BmOfWY6IsczOw1tGMPLY7M4GOqUBDf7uiY6CjyHNDas9gTXAWMBdazwJFfEMJgDnKeeEj9%2BFMhNvCtKC9hj%2BZExrIIxZWFQU3A%2BZrBOLtlLgqMalecUDgTGxpDyR3oaqyvI547G8zBih8PJuUBCiIYl8s90pLZQMEVmTTQvrRHDqRCUdTBhrdd2RJ7jpp%2FFVk%2BJ7%2BU%2F66A7kQWYWxJI%2BzpPFy%2FtMNAlzRTe1x33RkdOqL7VkmQ%2BWrx3i&X-Amz-Signature=a0cf9b734d9ab32c49fc6b66366004f63e610ffd416fbc8ddbb1d39c6d4f8e37&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663TWFX7I6%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T083416Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEI7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDmMbohUw1vkJb6bUL0cr1wzhybG7Unu%2F5iZClPwaCopAIhAIAymJszbqYEm2vjoUJx2sdqr9YXbEcKiasAjqog75o4Kv8DCFcQABoMNjM3NDIzMTgzODA1IgxbgCR93zOce3qsRS0q3APdiZF5oDGCn3ghwMKi4ulr3Ycb0FqJhk1gynKsCnOeqVcBPgaDC5MT0pIkqt9n8idr9FaM3MHcz1McumGEHZ2jRiPQZNuQQwE9f0ElYPx5rRa9cpikJyvwDUqXI%2BWVWca2VHYUYTbF8OGI11Ae9jnonqBT%2BS%2B%2B%2FyAVeN4DRZHhmO2fz93RDqzA3CHbOudEEgYboAc4O9s85iql5IJ1YnlwH8vFPPOrs6O9bT9aGonVehogVgWtLwMR8hisDJpLPYDNFEowiCZuSRbSOiQFedSnQi1TRsegYWIKRM8T%2BYqfeNG99B9bIwLj1xP2GQr6ZIze3LcCjHW9RdDQJOV3CgA1gWBA%2Bp%2Fxzlg%2BxMxnIRe%2FRiHMA0CFNq2jmgEk05g7j9gyO4WnLOJTIQs3GHVjuuMP3Rxe%2FTQkN%2FSO8V5yqSlhQ%2F4x5hgYlM0szCG2euwYfbotgoLnNVLyLV8HakcljIfqTstFvoNarJTUQSokzsV9n%2BoaBIlpWtLVvMPW3ziSQJWImIj3tmZuhgoJwL%2FFk5FqgbWq5oqbCArPxWKie8oGL%2FXlX0Bpdac6Gp5q%2BHSYsR1EUSkxGd9IsZGJfSs1gKf%2F4AyQ5c4WJXbhOpNiSvj4vhCU6DKndF5XtsVZkTCc2%2BzOBjqkAZ6wMnRrEsY9HiTg05DwtcYd6IkjpFqoSB4ijVEGFCYh11WoyfE3fEpaC2rmHCCtsgOHhMhb3rhXFLxwmA0mAfSXopiruvA3L%2FsGmFlTm72wt2YPeMtJ%2BTyW6y3vfqy4Uahm0pGJUdAzHGZ7WsWP%2Fi%2BorGtZB1fMRZHRw2OxHksJdBaVEH8SibNJ8rheTnxzPUaW7Z5TRckaqhh65DcC17qxxPr3&X-Amz-Signature=dddba1bfe43672db0d87a708c6f8f7fb64cb29e047a0f794000e9bb9fda03a9d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XRONOVBD%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T083417Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEI7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCl4aQQ2t7%2FD8JgScHyGMQ1ys8jFrXe60iYr1bMzKzyqAIhALqtwl2Oa7ZbdRn%2F1QSv%2Fyk1AmK4xFtq09jG9rYH4ZW5Kv8DCFYQABoMNjM3NDIzMTgzODA1IgzrxN78KxHCCAAMc%2FEq3ANGg%2B%2Feg13%2Bc%2BigHKKgvJ72aaR5GufERKU6hgsQPaZbtMygsew3qLa4J8rkSi%2F3wyPHl5IjaIk8CwHzZfoYtEsD4UTYC8FmDxw5pymwhhxrFYxIfgoiLbMlJSPScTKv7REccjc4cAEFhuFjAP%2Bdplun1WpBvdpRDpWkzrNUY3S156YP3T1QwxpmWBtSb5adoiJhjBl5bxuAqLlNjOeg9VGOZYzFMHdgDdnFLeV%2FDFEh31mM60gd5dxWoCeLpK2iCkzLwmVA0qdhfSncxqFCTn319SPhz%2FuaAOYaTON4vmNX25auv6T9ABSaxSUIhe8pGN8B4WAyfaRLFtf8vjVB7NfkNOsDVXvUoCZ2Wp5eIzTvRFT9RrR6%2B%2BnGdlfol2UvgSuIIJOiWkM1hCxh5VovnjTHOE%2FNOWtxaB6RJb%2BzfhBsv%2FeY6%2B1Kx45qOA5D7X4s%2FO0eN7i4lfiyCGJvq1M6ogjmyjOvMjVhu6TY35XhMCzTCRyva8oxEt3%2FY4nAvLgkeOjhnW%2F9WTofggK1hPxWqqxn58NNwstbqgu20ovQZhb8JqxkkI1NwSLcBKk%2BNrzPVS%2Fx7Nm0IF1yANjqOA0Y1W5yVqjBLTh8UgOVi32UwvmXQKt6xglRaClXXtt%2B5DCC2ezOBjqkAW21jXNsJqr9v4fDNI61TwMFoGu1KPKkTkVZ4FsBFUlikvKmqOBfUdXSFtrjOZ%2FUwISSTv7WIPZcMEWW8CqJyGKC2uZoiL0HD8jPLgzJOeEvm0WiNuZ6hoLWZdmDruwLEcZ4q3ndI%2FkNP6CvDB%2BbCJ%2F%2FVcmS7arMGNLU4Taqwwg8sqfSv8EKFwBeuGuqcdvAW6Rto9%2Fj6IsEVZeWZzOBe7TqYrgI&X-Amz-Signature=5d569c753635d2f38eb77339969ceabe781f3f8225c60d1f4210a5c6e1977704&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XRONOVBD%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T083417Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEI7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCl4aQQ2t7%2FD8JgScHyGMQ1ys8jFrXe60iYr1bMzKzyqAIhALqtwl2Oa7ZbdRn%2F1QSv%2Fyk1AmK4xFtq09jG9rYH4ZW5Kv8DCFYQABoMNjM3NDIzMTgzODA1IgzrxN78KxHCCAAMc%2FEq3ANGg%2B%2Feg13%2Bc%2BigHKKgvJ72aaR5GufERKU6hgsQPaZbtMygsew3qLa4J8rkSi%2F3wyPHl5IjaIk8CwHzZfoYtEsD4UTYC8FmDxw5pymwhhxrFYxIfgoiLbMlJSPScTKv7REccjc4cAEFhuFjAP%2Bdplun1WpBvdpRDpWkzrNUY3S156YP3T1QwxpmWBtSb5adoiJhjBl5bxuAqLlNjOeg9VGOZYzFMHdgDdnFLeV%2FDFEh31mM60gd5dxWoCeLpK2iCkzLwmVA0qdhfSncxqFCTn319SPhz%2FuaAOYaTON4vmNX25auv6T9ABSaxSUIhe8pGN8B4WAyfaRLFtf8vjVB7NfkNOsDVXvUoCZ2Wp5eIzTvRFT9RrR6%2B%2BnGdlfol2UvgSuIIJOiWkM1hCxh5VovnjTHOE%2FNOWtxaB6RJb%2BzfhBsv%2FeY6%2B1Kx45qOA5D7X4s%2FO0eN7i4lfiyCGJvq1M6ogjmyjOvMjVhu6TY35XhMCzTCRyva8oxEt3%2FY4nAvLgkeOjhnW%2F9WTofggK1hPxWqqxn58NNwstbqgu20ovQZhb8JqxkkI1NwSLcBKk%2BNrzPVS%2Fx7Nm0IF1yANjqOA0Y1W5yVqjBLTh8UgOVi32UwvmXQKt6xglRaClXXtt%2B5DCC2ezOBjqkAW21jXNsJqr9v4fDNI61TwMFoGu1KPKkTkVZ4FsBFUlikvKmqOBfUdXSFtrjOZ%2FUwISSTv7WIPZcMEWW8CqJyGKC2uZoiL0HD8jPLgzJOeEvm0WiNuZ6hoLWZdmDruwLEcZ4q3ndI%2FkNP6CvDB%2BbCJ%2F%2FVcmS7arMGNLU4Taqwwg8sqfSv8EKFwBeuGuqcdvAW6Rto9%2Fj6IsEVZeWZzOBe7TqYrgI&X-Amz-Signature=584012a1553e2f5564866be689c13bbc314dc7678064523212aabbb4cb78df86&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TDZZDXVG%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T083417Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEI7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDkinlDXLQDlY4qLnV%2BoZhLse8HaXsxqGG1jetJCZJ%2BhQIhAIywahOW%2B0a4rDXe%2BiXQcGdKGs7mCqnBSRHhp%2B%2Ff9mfsKv8DCFYQABoMNjM3NDIzMTgzODA1IgzfGg0tuRxWn3cxtx0q3AO08NTRSo%2F2sRxXV60NC%2FtCmq6%2FSrZlbQ4cUkXSoQGAO60DheTVaC7UeShUVbz5FsLyprJRzSUfKIIA0E3L7tOUkCUNXY21Qhp4VeNalGP8kop9pj%2FopgNg7ZTkdaAGw46EFX%2B6o1mrI4ZnkHiAOOAht%2F%2B4XXs3xlboUM1yu9m%2BPToniHBhZmcjUkjxZv2G7SLlHdKDELKn6wxhPAHP5T74d9Lvjd%2BsKIMtBnFPxOaK35qqtyEPt8Rw2G%2FDMP0avh5A1Evyu6GXDkpn0VkhZFalNTu9j3c3gBCu%2Bq1hhknMcxX05hkdCjUfXAFpSR%2BJDLKj3UH9djyF4CuYKIazbiNRi62bZCJG7JVHftAa9tKD83%2FVrIlLmgPxTbG3d0y9HlZthEupsBpLoIPlNGwUIF0ckeOIoDu24q4ARikI4EFdk5pU%2BeW9csqVtXt2zJhV6OMT3fPXSn9GyFmfCiMTS5Tiso6fLiE%2BfjlVVJ7%2FnvzUX8oYxF9Bj6tc4bZuzfro2OoyhMp%2BxWjsZZDoV%2BRepHj10bOHZi%2B9e8VHPz9MFpKcoGv2SvSHy8U5jCJnT7H%2BoIfokaHFhkgL8pAbHZRghunRhmSn0qBfqnEyy9eQX4HRnW5X2928V5lYcfiwUDDE2uzOBjqkAURgyQ5D1Kxnf%2FqUgGPB5%2FbfYaZB5YFHzD8mYYaHu5r6XT9Yio%2FsXPGvKN9wDWjA0ZplxEanMssMNW%2FEo3e4P1o29TdDWyLopXoPHSjt8XAuhbnlsdi9fK2EtU0SRkM7LC6JDOn523jQ3lqnBcMgE%2FHrPbD4WPKcpWXTqId9cXd%2FP3%2Fdq0PrWd1%2BoWpjoJ%2BP3aZtu1mt9YJjln9u98PyLnEXlcSi&X-Amz-Signature=c2b5423de2b5d8f6637d404e01df70582c75f78121ea9e00cb6e5a56cce12fab&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XLSALZBL%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T083417Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEI7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIFBoSYCFKOmbka1xwB8%2BtA3ZQVOijW3hUbXJF3QG5iIjAiEAxZ0v0IOxN1dCBIjde04QyLWNoMYAbJqMSBicKPj99doq%2FwMIVxAAGgw2Mzc0MjMxODM4MDUiDNoyLW6heEf3zT%2Fc7yrcA%2F%2BawewXzro2Mq4bdFnAPpHQu0tW936XHo8piKTz8p7wYs3gnmMxBSy1Werkjqk%2FDvAItRH8nWsy0hmCZiEPMm32hzEaBXczaiiKbIlnEIQJH%2FSABa7n1oIVLqrCeKVjk6YD6%2Fh3kdNLbtZUfasFC1YXCemJWAqVoOA3snCZnr1CePnv5SSDzSUSSKuNiWgy5yPuOLjly6uKOnIrqsi3EDEYmCi8UEDrMNSZO9d6d5x8ndqOzs9CFJEa%2FmV5wP9XEWQ01uWuARMFSjkpASefz2jS%2B5F9HsD5BrY3Z6yiwquqVLGTdQ0aQCDEkgzUWPXmMLvuOp3EPgAXRxtsGu6xhrDEzkYhfwRMhvKpNOoKJ7YxZJdMcndxDXgPIfznxN7XoUrBHJfJI5vMvJpy%2B0tcbUAavUqWHe8BRZ5KXiuj99t03tFc4mSMzRK2fYvRxoIWI%2BxMGDt9LfPipQNxMT2%2BJBbt4szcotyJDavTJBhN7TXVUR5D59O433QyDjq08JU6o%2FKPezvU5dKpj8U7%2Bu21iIJ1pKrQp62g22DvzCRTuz02VNNfap3vrXQ%2FS8J0xozo6UGJn2z85JnO1J61Y%2Bt%2BnkMonKf427TBNKXZtPIgCWyNCZ31pBY9scHd7XhoMNfa7M4GOqUB5usNKCUk0K3ZUIy7t%2B4b%2BthqNTmGihUDWA6Xe9iScK8EMXj629XvzVYwsfFLyP0Qal%2BTFDvkGCOyMLvtV2dVPuGH0VJa6LTCK4Qzx6dpBeJ1OKzyLK3GV9KBdwytBSXTJI4J2Xpeqx3RbAELocrXxUNCtH30PufjKM6ydGtHnSdcMTN95LB4YzZEsN24BMPC1Gw7RA72DXCQOmuz8sFKflJmbCmq&X-Amz-Signature=595a489d1e32bbd1c06301512d346d9c205cdf8ecdcff841fc12064019bb8cd7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667CX476GD%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T083418Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEI7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQD79sohPJvtm8YiZK7CudqgeVPQM7Ctd%2FC%2FK7Z3RKQ%2FRgIhANXPB6HE5ZXpgEgRAAPEyUCErdwNP66vgLig1CzF8ANVKv8DCFcQABoMNjM3NDIzMTgzODA1IgxM3Lrphc0RAISfN%2F4q3AN4AJXtbmgLOjNS2n2hssOGPfybgGcFXZSKgSz9f6e94OHpIJtUtLYZP4Cw%2B2HB1%2FR54ut9ozon2ifoXe7mD1ZaxJQf57AR0riB%2BCIkVSclrdnLjAAIKM5%2Braxit3PSlhusA4HsMGSsmtvhfzdyKQcLChXtxWH70uN32E4S%2B6BuMXgK6s6yIiincrAP9lXP9Tb6jJphZkMiiBwpK5fJ4DxSNa2PNFsXeG3QlzbUMQ%2Bp9gDvIC%2B7sNopcVfkuBVO66lf5k8su1d%2FnFcqMcnQDicpuhxx%2Fujhcn%2BrRs9dgu7TTIgAyvs2CM5TpNz7XSNUFNxXtKu%2BEEuEM1z%2B%2FILlsDYEaatQQNQjPxYYqMraoeMzK7LtblYf7t1CXuZTIgJGBbAV6AI0Ns%2FlXBRFeaLe8vF6Sy5z8unDV97tEiz31HVIBOlc9iev0lwRPdoSBqqEv5roS9z0%2FrJ5HCftY9UgJlt530NbWTWna34vMP3uEuxLurkLJEu7Um759tjdi6W1QpNGTFEEtdNhiT0ivAkxXGopKRfmATlqXRWBTjUnkeWtU1PaUo8jHjJBOicJ49sGwgJMpVjsLxEVpdXfcIhjfowRO0oMPRdeVUGnxR4k68Mpc9Kbef%2Fo5N8o3R9bVzDr2uzOBjqkAR%2B2C7F8SByIYoCC3fjjckHtFurbY2efN45SLAy%2B16%2BPIPGYxdNO%2BfHvNqGH4YcnuxMWCgNd52m%2B84jlg1rkfFTsR%2FytF%2BqosQ0ObaAslOXR4LPKCp3gWxZOUGq%2BqHLiOI%2F8Dwjw9EXIg2HCwhxFpJ1zphgd3cQSfTPE8GLmt22%2F2SJy55B0xD7OGhb6Z86F4f%2BUUYXXzjoL4nNaLLu%2BWhXQ3tb9&X-Amz-Signature=7121f4b1dc1304f89f4ffd6081de0e2ff737c07886cb2570d6cf6b0ca08baaa6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SMTPAMMG%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T083419Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEI7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCTGklFV1Mq4cwMmufdrW5ZbN7EKR2zLIrKDNmREOvhygIgXboUItEF6QE27JWjk1WFU%2Fd3Q1%2FhgJD7hP9Sp%2FzTUvgq%2FwMIVxAAGgw2Mzc0MjMxODM4MDUiDDa7E9XyDMxZqevOdSrcA4jGW6Rw9JMPyAPCBLTsKkKCnsKC%2Ft%2BY6JybST82pxlVeqUodvPoUsZ9Qkv2T9FZnsvBqjYArLSJ8bRYP0OWBZI%2F2oe3sGnEf0%2BVffN9urNaQZEvE0dOecsI%2FQMqoUfdCBjRdcPvb5eS901iJ3I1UZGQY4dZAUSxSLKGbAMmpBP46fYuAGbQ2kX%2BmrYmK2HCL9oxsoLGYNtVJl2qelLZWa7mer1qB51hXDZMqSXROZTXeYA0LctFvnjBJJxWiPHHycRc15HDWaGFlBMUwoc%2BN3HydhTcMHyuQvogNnqrVFb5Q9CDLlx5Vhs8IHXNJ74q6vgdjBDtllSxmrzsv5SjBozGnkyRmQ5BhUD22bLNWTcF0E47VeoErskMtf5tBZqpCWc42wr6yxz60vVD5UCsihwQH5iBP36DtvSibKrnvhUgBR3RZ4id621puugeFSx60hHgYAGEv5JMRaZqnmJPxwHhs7b4RCrG1c1wyXRCiH3is9BInl9xpBnUU579A%2FzNdso9vTBDH8WF60DKCHC02oxRKIlRq5vym%2FUz6vBqYX4U7MV3KLY%2Bprci4MQ8kKZPOjP5PSioWmRiKbqC29VSYgDsz8NkdOR1YWG3EGLVwJ%2B8uYUVAvWoQ0s5qhbUMPbb7M4GOqUBBRf9cdY59huTbCDtvGAJA7gM2OPTa6sEb3DFDRQrDdyhZ5PNXyiMzH%2BT58M3TF5dgcn%2BEjTvhQxfoORhgNwF7YU8MumhKUZkiUQC074pYogvydasLOjYMGppuKLGdRh4GODUT6AyigeKv5MZEli%2F3Dl2JCj9m83AwOtwTc9ogfpMq3NAAw5I1EpWaHJjuuh4b%2FeHsEJrwb%2FEnLyflGY25OPbpUjl&X-Amz-Signature=12131dcd23b068c26d41bb70cd05c4f5d69f689db24496f519d4ceaad2c905f9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SMTPAMMG%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T083419Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEI7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCTGklFV1Mq4cwMmufdrW5ZbN7EKR2zLIrKDNmREOvhygIgXboUItEF6QE27JWjk1WFU%2Fd3Q1%2FhgJD7hP9Sp%2FzTUvgq%2FwMIVxAAGgw2Mzc0MjMxODM4MDUiDDa7E9XyDMxZqevOdSrcA4jGW6Rw9JMPyAPCBLTsKkKCnsKC%2Ft%2BY6JybST82pxlVeqUodvPoUsZ9Qkv2T9FZnsvBqjYArLSJ8bRYP0OWBZI%2F2oe3sGnEf0%2BVffN9urNaQZEvE0dOecsI%2FQMqoUfdCBjRdcPvb5eS901iJ3I1UZGQY4dZAUSxSLKGbAMmpBP46fYuAGbQ2kX%2BmrYmK2HCL9oxsoLGYNtVJl2qelLZWa7mer1qB51hXDZMqSXROZTXeYA0LctFvnjBJJxWiPHHycRc15HDWaGFlBMUwoc%2BN3HydhTcMHyuQvogNnqrVFb5Q9CDLlx5Vhs8IHXNJ74q6vgdjBDtllSxmrzsv5SjBozGnkyRmQ5BhUD22bLNWTcF0E47VeoErskMtf5tBZqpCWc42wr6yxz60vVD5UCsihwQH5iBP36DtvSibKrnvhUgBR3RZ4id621puugeFSx60hHgYAGEv5JMRaZqnmJPxwHhs7b4RCrG1c1wyXRCiH3is9BInl9xpBnUU579A%2FzNdso9vTBDH8WF60DKCHC02oxRKIlRq5vym%2FUz6vBqYX4U7MV3KLY%2Bprci4MQ8kKZPOjP5PSioWmRiKbqC29VSYgDsz8NkdOR1YWG3EGLVwJ%2B8uYUVAvWoQ0s5qhbUMPbb7M4GOqUBBRf9cdY59huTbCDtvGAJA7gM2OPTa6sEb3DFDRQrDdyhZ5PNXyiMzH%2BT58M3TF5dgcn%2BEjTvhQxfoORhgNwF7YU8MumhKUZkiUQC074pYogvydasLOjYMGppuKLGdRh4GODUT6AyigeKv5MZEli%2F3Dl2JCj9m83AwOtwTc9ogfpMq3NAAw5I1EpWaHJjuuh4b%2FeHsEJrwb%2FEnLyflGY25OPbpUjl&X-Amz-Signature=99a4f58f4c935d5489a60f35c3004dbe949c9f1e9e05641b48441fadd1100601&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466323FRZ7S%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T083411Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEI7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIEDUX2Bi7Edm0VxcAKV8IW0nvIdE1BpQ69VzSzyd4Y44AiBmdwUk4RaSr4WRppdrCTPgfznps6khHm5XgFgz8Pm2cSr%2FAwhXEAAaDDYzNzQyMzE4MzgwNSIM30gw8ppiaYPBEDKeKtwDbPTr6RcGYmom78txE8wzhlR2j8OfCkPoxu3ItKHiHqx%2FpkRpWRLwColNxudVwI6MOm1cSoyYBVdPRaICNmJcX2rDpTX30cXGSmrcHUzl5fM15VSbIapSTZBSCa6IBnOol%2FGMGAIIfmbmtML9m4gEULORrzWE7%2F4UMa8r0CNTplFvfhysYyEjQNfOD%2FNeK6AtH2MrXU9zLC51dSuYHTuWW4XN7HjMUc75Pj7dor715NpGlTBN0BTZ12LZ%2BlYwaYGs4TDnafPkDej5999ibfLlV7onJOMHzj9knb%2F4BuBrP9vloVlRN6SUKqBNdlQNeCk09VU7qFtUZENjsPLrA%2Bhd6VbBkhLisOuXqndt5HG8BOGPRmct0iyTkc0pgj7kaWXdoLaYIgpow7G7tTWq%2FPLXgPFsApLxcipzANxCp5fanWgpN3slfgTxKDxQU7QC9vBlvZz5YdlRqsFwAEqgR1c683zSDH7sMie5BekFB4klvuhiB6QY2ZR3anL34LrV0zJQI9XAShsjR5Mv5AC5n6NlWWc%2B4ATVsDFDEbpD%2F7haLWwjf5ixhlinayBwjQhuF0ARTBFXwkXgJgucEv14TZOOAVG2xBxApQborDiXUMe9BZPYtVgQ8Nz27yuKbn0w2NrszgY6pgG%2FF1YwP9mLzhCBt4zywThDClcuYufVGlEKjYpNI2SmBkEI3oycUDg1O%2FuLPFnyYaHGrM%2Fjfq72jQxYF8MieDGH1T1M5arfdrThn5tmigv1m5VJ3QXA7MCnpfBNOnkyfAOQ9amj%2FMN1uu6bhTPXHZz5vdxIz9TNYtFDWzSJcH7qlhIQXINf2%2FKKzDbUv1oyfG3YqJh0gT%2FjYK3ggHHA%2BQPZNsj3X0Uq&X-Amz-Signature=9a28fd3ae7b21e86d3402c8fb8cd8659894d8468e319b385c940277bf4553733&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QMMKPZC2%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T083420Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEI7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQD9K%2Bg3R8CjLB1T3nGgmzojOMY811uoQmmls3cVfJzRGwIhAJHrcVHi7211bWpnXC7bL1DEWv%2FYKTaGNmb2r1vOdv8qKv8DCFcQABoMNjM3NDIzMTgzODA1Igwtk%2BoZ3HD5G%2FpdWQIq3AMLDvhZf00z1PcsApCI2i69NyIrL%2FMVTWS1SImRD5v96u6Z01t%2BodIBcEOHxflitf20Os0JT2EoanUULdnfOaP4DQX59OpVpS6KA%2F%2Fd3f%2B0JpV0sMieF2jJDEqjJrcMgOM0IL22do6noFqwNejQhmG9Yh8ne5S5JhF5PC4Q4VvtGeOgmtGtFL05vG%2Bd7urscMBmLFSQaneA2LY3yWNpIBPNaGwqugeE5ToKED8HGYq3YtyvYoMeRrHnF1fwJ%2FxvuPYjM6K1haz%2F6bN2F1Rduw3v8UulxM5Xp7IcJfgIVqznlf6258eQei0rNeUZ%2FgMv9ialLWlZjSC5IQFu%2BfN%2BliYu9Gznd6mlY3CCup97yKIDvOVBV%2F938jGWChTIzwac2m5U%2F%2FPOR%2F4TpJzYmDctRPBTu2fkBs%2B%2FXyzb5gngA4%2Fe5hDv%2F12nZlVv4E2Fk8vg63hW7TCi%2BEzkln9fDZxJ0pMCxELcJcOdBUazIqlXwWgBxMupPEr1Du9QUsaSwUc%2BdXxLpejV5FgistpfGK1Xw3Ekz2C7W%2F8KXeV8wdixa39zFFJajMMKJw6hplkn9NdkfM3oEiLhnmoR0tvqa45sQMX0XFc3tqb3BbmmKq3W%2B%2BAlQlvtpMZfkXBF9X4JXDDF2uzOBjqkAdIkZzk1KtVk9oaj8ITxJuYdd2%2BjAYvjFhnhl5MaJ6j2p3Abnwj4XkcViX5yj0TrAFkwM3bQSQ3treIyJ%2FSowO7iMABrP%2FC2sxC%2BugAU4fxxC%2FVx61v901wgLQ6gWGLdWRjyBtKjQRCMdqeZxHJscZdTcAg%2BDCn7gGLhroZWK9ivu2k8wG%2BJchxLS7a%2FvGQKLjhunvc8eDdDwMVTNs86l%2Bu0S3km&X-Amz-Signature=f58a4e15a34b0c6a632230374ec93b97b2c63f2718c515a3e6d05372e9d48d01&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QMMKPZC2%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T083420Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEI7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQD9K%2Bg3R8CjLB1T3nGgmzojOMY811uoQmmls3cVfJzRGwIhAJHrcVHi7211bWpnXC7bL1DEWv%2FYKTaGNmb2r1vOdv8qKv8DCFcQABoMNjM3NDIzMTgzODA1Igwtk%2BoZ3HD5G%2FpdWQIq3AMLDvhZf00z1PcsApCI2i69NyIrL%2FMVTWS1SImRD5v96u6Z01t%2BodIBcEOHxflitf20Os0JT2EoanUULdnfOaP4DQX59OpVpS6KA%2F%2Fd3f%2B0JpV0sMieF2jJDEqjJrcMgOM0IL22do6noFqwNejQhmG9Yh8ne5S5JhF5PC4Q4VvtGeOgmtGtFL05vG%2Bd7urscMBmLFSQaneA2LY3yWNpIBPNaGwqugeE5ToKED8HGYq3YtyvYoMeRrHnF1fwJ%2FxvuPYjM6K1haz%2F6bN2F1Rduw3v8UulxM5Xp7IcJfgIVqznlf6258eQei0rNeUZ%2FgMv9ialLWlZjSC5IQFu%2BfN%2BliYu9Gznd6mlY3CCup97yKIDvOVBV%2F938jGWChTIzwac2m5U%2F%2FPOR%2F4TpJzYmDctRPBTu2fkBs%2B%2FXyzb5gngA4%2Fe5hDv%2F12nZlVv4E2Fk8vg63hW7TCi%2BEzkln9fDZxJ0pMCxELcJcOdBUazIqlXwWgBxMupPEr1Du9QUsaSwUc%2BdXxLpejV5FgistpfGK1Xw3Ekz2C7W%2F8KXeV8wdixa39zFFJajMMKJw6hplkn9NdkfM3oEiLhnmoR0tvqa45sQMX0XFc3tqb3BbmmKq3W%2B%2BAlQlvtpMZfkXBF9X4JXDDF2uzOBjqkAdIkZzk1KtVk9oaj8ITxJuYdd2%2BjAYvjFhnhl5MaJ6j2p3Abnwj4XkcViX5yj0TrAFkwM3bQSQ3treIyJ%2FSowO7iMABrP%2FC2sxC%2BugAU4fxxC%2FVx61v901wgLQ6gWGLdWRjyBtKjQRCMdqeZxHJscZdTcAg%2BDCn7gGLhroZWK9ivu2k8wG%2BJchxLS7a%2FvGQKLjhunvc8eDdDwMVTNs86l%2Bu0S3km&X-Amz-Signature=f58a4e15a34b0c6a632230374ec93b97b2c63f2718c515a3e6d05372e9d48d01&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Z3MC5SSH%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T083420Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEI%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDPOtoy4cM1JcQdh9RNpF1c1HyqaFJsaFyqGM8lEk%2Bj%2BAIhALAIifAFfXuw0ovVhsIv7BudS%2BizelZ%2FaE%2FmIF7oyOKKKv8DCFgQABoMNjM3NDIzMTgzODA1IgxI5%2B6Phc8j3bkXdN4q3ANxPWVkh%2BbeaULa4T%2FU%2Fxx9uyLJ3ors9dd5QJMOTPGiPRYZA1jkiflnIi%2Bpu%2BpfTDmGDw91uQtIV3DwB1H7Dle6A8BkmzlnL6UrvG8J%2B%2FVv8Ab9VQJvSSrCcNT44ozmnWo%2BQ64%2Bycj8VTL3y3ayEECoZjaJ5CDzcAqSmOKN8%2Btng6tP1h4qHVT27KmY4twjUCDytWjRJDEPCXiGEy5GMViGLPy7fhYEYeRWvIfXR0bvpQri8sOVCC4boECteTWRAwFrACbwFE9tMR22RQhTfhbWgSKTzMK0YjwRWaj%2BT4nHppMXhj3R9C2Un1poZSmagWz7ES3oEEBn%2BykvVa3rPqy%2B3i9IsGFh10A1I7UQHxyfNuwu5MGXFbXOZCMBZnFRYfrE7yM6C0KSjLpwu3%2FtV17%2Byp%2BSv9pkQBE5k1wyv4tT8TuloTC5u5OBGpn1gf0eheNUgLjnHX%2FPFpikhEHjYPrV65U4p5nOiGVrQHljCHO32lzA3AWwird5mHZZjSwWAwSnlD6dwqjsvTQEQuaiJUhBHa8o5FvI512UovIdmFhihcxMRWDtVwfS9JNXY94P%2Bv7Vc7%2FGJB9EH0J8tUjgolpPLAoQHo2i2UVUJO5Rpp0oklqfInK3brM0tQjPiDD09ezOBjqkAbqcW8%2BmK5cWLEvNl8i3Zf86nJWj%2FR3W9ItT4NsgtJ4bWeZqtAqIurVoL0KMJrjoLgF7eEAPudol2dKgvNvDDBMoOlgcl8Xt%2BIo2B6NzDtxZrU3ytHG%2F8y4oCmZ%2Fextat8rX%2Bqv24uiMgfMAHq2r8Uu2zx0R7ylcl8o27e%2BmNG1%2FrLdSjniFhGGK7QllMi24Q99%2BkolvC2Pz83PrdWcZEXhYl80y&X-Amz-Signature=02b4d25d1150e4419799b7a38eb7d7a2cd123935a98d4e2c85b215380267fa36&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

