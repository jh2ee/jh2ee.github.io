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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666JAZKSR7%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T154537Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEcaCXVzLXdlc3QtMiJGMEQCICUAJwMNFY1f2mnUrKVTM%2FPA4ptZqyGf6N3UHxh3uNjdAiBcBrV%2FB2Bg7kqJyj2mv0oI7XzH5agyIExPS1jdJ4kW4Sr%2FAwgQEAAaDDYzNzQyMzE4MzgwNSIMYmLWpOW0HUZwR69HKtwDJBp0nmwR2I0q%2F9pkTgXdA6Wsr%2F4R4n4SzO1M9x86knXU94Hmt33ttTol7oVZkYrn3zvcEdeQkHIa%2FUINunpxZREcJgSgb4xGU07bKtvszwryBnv0efvAyoGk2yaEew96jRJDgsjtp%2BDsBhz7Mneb7x7WWYoBliBZxiAbXLUTpuwuThXiMKDO3gNVWxG%2B3dR8e84aj%2FwYkH236UR16q2B%2Bm93DZRBrEj5J6%2B9Ddabu9FiJ%2FaKYq%2BznABsUYTxmvfpLmmYdyyl%2F3Pup601kCIrvcgJ3IiWy6bCDyz%2FlgGVtoekmg8rkhzyPQ804Wdv8A9xTLlNcSpmlzw2%2BGci2MWxUmQNvNpR1aAvnSwrdzKMx6uwrKLebvMnm48A%2F4zrEBfLUg65InNAQaBNSYQLrg5JyRe5Eod6aPO1VPENf2wUlq3lg3%2BUIQQ1ap7XfmwE7IB4w37OEAn5mqW5A7Pob3FPaA981BlZCK9LHVvDV2hja9iWKBtbHHuLgcH%2BXzkTzsQ%2FFL52mSHHp3bOxnAQDmd1O3OQRZWtIlsomTIVuQJc9y8Lu8lacL0%2FG%2FOtpd1zmi6R4n%2FBQGu3Q3PBNueUPzth%2FqXZv%2BVfIwZ8DTAklsSt41OaNhzAQhCo2kAgTQQwuZP8zAY6pgH8EAWx1w96C3DQ6Ouom0ee9WHhn4YZE%2BETc6PIEN1%2FjqAWVoTGQ%2B8zYF0KSk4iyw2oI96gj1sCFRJpdnrp5PE6ntcCYj3Ucpb3zeLfaAey6C4Q3XM0TRAiw4Iax0qJszLXbZiPommWxJyqYaMd8OwAqpx5FIAB5VHAvCI5rYFFHmKhoS%2FclzBp%2BsvKgjFXQ%2Fru7iqxHrqZrLIh97hSNVXA8keUqNi0&X-Amz-Signature=d07a9e8d1961c28a5ad211991a53f2951b8f64685cc9d67bc9bc09d6aa2599de&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666JAZKSR7%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T154537Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEcaCXVzLXdlc3QtMiJGMEQCICUAJwMNFY1f2mnUrKVTM%2FPA4ptZqyGf6N3UHxh3uNjdAiBcBrV%2FB2Bg7kqJyj2mv0oI7XzH5agyIExPS1jdJ4kW4Sr%2FAwgQEAAaDDYzNzQyMzE4MzgwNSIMYmLWpOW0HUZwR69HKtwDJBp0nmwR2I0q%2F9pkTgXdA6Wsr%2F4R4n4SzO1M9x86knXU94Hmt33ttTol7oVZkYrn3zvcEdeQkHIa%2FUINunpxZREcJgSgb4xGU07bKtvszwryBnv0efvAyoGk2yaEew96jRJDgsjtp%2BDsBhz7Mneb7x7WWYoBliBZxiAbXLUTpuwuThXiMKDO3gNVWxG%2B3dR8e84aj%2FwYkH236UR16q2B%2Bm93DZRBrEj5J6%2B9Ddabu9FiJ%2FaKYq%2BznABsUYTxmvfpLmmYdyyl%2F3Pup601kCIrvcgJ3IiWy6bCDyz%2FlgGVtoekmg8rkhzyPQ804Wdv8A9xTLlNcSpmlzw2%2BGci2MWxUmQNvNpR1aAvnSwrdzKMx6uwrKLebvMnm48A%2F4zrEBfLUg65InNAQaBNSYQLrg5JyRe5Eod6aPO1VPENf2wUlq3lg3%2BUIQQ1ap7XfmwE7IB4w37OEAn5mqW5A7Pob3FPaA981BlZCK9LHVvDV2hja9iWKBtbHHuLgcH%2BXzkTzsQ%2FFL52mSHHp3bOxnAQDmd1O3OQRZWtIlsomTIVuQJc9y8Lu8lacL0%2FG%2FOtpd1zmi6R4n%2FBQGu3Q3PBNueUPzth%2FqXZv%2BVfIwZ8DTAklsSt41OaNhzAQhCo2kAgTQQwuZP8zAY6pgH8EAWx1w96C3DQ6Ouom0ee9WHhn4YZE%2BETc6PIEN1%2FjqAWVoTGQ%2B8zYF0KSk4iyw2oI96gj1sCFRJpdnrp5PE6ntcCYj3Ucpb3zeLfaAey6C4Q3XM0TRAiw4Iax0qJszLXbZiPommWxJyqYaMd8OwAqpx5FIAB5VHAvCI5rYFFHmKhoS%2FclzBp%2BsvKgjFXQ%2Fru7iqxHrqZrLIh97hSNVXA8keUqNi0&X-Amz-Signature=d07a9e8d1961c28a5ad211991a53f2951b8f64685cc9d67bc9bc09d6aa2599de&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663SLNTOJC%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T154537Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEcaCXVzLXdlc3QtMiJIMEYCIQCqHviIYooNNzNTjiJ5RRCumkhv1f7UfM9z6YfVD1KW8wIhALeEt5CXPMnlKKJaum5cIhCJs6NRs5fX%2FXkEJgovjHgTKv8DCBAQABoMNjM3NDIzMTgzODA1IgwM7BofUSnd8ctY%2F%2F4q3ANH4N4%2BTUtP%2FCMFkX%2FRx4a30mcZrYbfU9Ur%2B8PgjjeH72dqkR4MsHurdg5sSyJURcbJzuCbeztR8rMHq11Y4vU4T67GwSU0RG7UKPZUMC21ZuvRpaYRAsgxHYa%2Bdq%2F5eHIwq2K11HUbw%2BQ8wxj5t8J95mVU4pu2NWCUDy%2BHgivK36JhMqhnVWP%2FuRCzt9hlzZmkHLzWC6HAY30lZBbxHkbe3JwGkfX8MvB9kd%2BWRqLtkpTBuGLLLpuVACa0cvq86G6BHKze%2FQj491jUgzhWraXS9fhZFxjapPU4wHQTKyLSpMr7Eno72VEs1B3nhyutmN1VTtkELKiHRYvpdlK1PAzLjTbPJrU0GMYwJlD33ofjeeDaLkCG7mA9FDzEfAxvUC1ycUv1Z8GgD%2BSSskTYXtRXn9jnrY%2BR9e%2Bjq7KWqirTP6%2FIGCOoFV0HT5X6AGtl7aS9X0nHistlz45ioLIntN37F1NxO5mdJP7t04Mh0g8KsypWPehg%2Fc0o365QUQqGVaA3EMk597jwWqo%2BVPIuRNWNcV1ilcUZSj9s0sYgof0AX7bf4KmZz5bUNvPp3emxlx5Su%2BVLSghHXfYJSuq1w%2FsH0NS8qMIQLOBZhn8X%2FXW1%2FRoWvXZwJQU6wH6ZyzDPkvzMBjqkAfq87qc9qC%2BcWKrqa%2FXSYtjKVl3FyCoaevxd4g3TA63b8RikA%2BfTt%2BhOzrW3pCFvUg0LKBbJnA02GKHveX6eBvVJlz9hJnmP8%2FSIKHnMxmPg2eUBb9GpSgGQRdUYkmyC2tw9CEeYdHYLM%2B0e2LfdVFvM%2FQCZ4kd5KW5YdkhyRQjpT8DgaBQaNkpzfP8owpC24%2FqREMlQOjXkRrSg5%2FAyhBQR1WCZ&X-Amz-Signature=a3ec1870d48b44222f3bf8f1ddd605bd9f7640e1bf76a9f1360752a3f26866ac&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RKBHJCL3%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T154539Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEcaCXVzLXdlc3QtMiJIMEYCIQDhMuOQQObNjMDHsmKgKKk17kACz7dTb378PRn0NP5PJAIhAJujxNE%2BF%2B%2B5DkisXQZNcahvVyiT4JvPfBbUGMXHO%2BAIKv8DCBAQABoMNjM3NDIzMTgzODA1IgxTR16WRUWZEWmgT3cq3ANUw4HyXqDP5exNe8mlK1VBp2AX%2FfPiIfipnK2QljcACJumKJS%2BfUnol6%2FYS60jq2je84IO7i1z2eDQ9soQLR3oSJIqw%2BrIEfZ7eWtx4zxp1zSCBwXQdCr6SbdMrlKfYHgUmJif7jcNI6R%2Btnu1W0wiU76YH4eQ%2B%2FWDlcUccmkv0TjM7V%2B9hTuwDMNm2PRlcNZ48HqpxT75iWEq3XogbE1YhKDUVYXRPDgMKv5MkaMf4vzuK%2FYrC09v74V6dvd4c%2B%2Fmt%2BS80JoiYpsNgWUUnvt8zHQTOwAJ6LGEzfZZ262f4TSo%2BVs2dIP2xJBVU3vEE9tabMxfNCm4VdjW%2FxZK%2FLHsPNhONKQswISbxkou4awKTJwQnx89PKYtbhvjFf6xKInqHMEZSfCRZSWjwOG89Uw4zujexHdETcRqEftuuu2RHUo%2FXdNs7g6idXkVqn9y%2FONmcSJK34pr6u9HK715dtrBAMNzcDjjCzsLgZ0pEKZA9nZJB9PpwT%2Fxv6%2Fzzx8bUTV9ogLvLhT%2BKTHOfEO35uWymVbB%2BKyzo%2BFnfO5JdCtTXAE3s80mZJR52OrWjMGkcMPoRMTxwkTas2HAy28IvkmroXyKiOYPXcVmbjHPfkJ0AwK5mRoshNKW2l7dmTDwkvzMBjqkAblStp8hYGTpa8%2Bw7gPxi3s0Ti%2FOFk8Wm2iWYKZHuqnClDnAWfR9rE0eaW%2BdnrZ5ZB7L5LfPamnQCCAI4lN7DuF7KlyDIV2vemgmqytY8gKFaY2w0AFWqJPneBloOcpDKn7Asojc2HQxMn2qPNGIn0VsocJlcsZMkrmPt5u%2Fgzrz4w6ZTDhJL%2F65XAmToeux81nGJ35FXSnSXRdvCumW5yZvoIaf&X-Amz-Signature=cd0aad8b97016a45b83d33ecda953b2138075d9c04525cc2e2fc20378ba2fa1f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RKBHJCL3%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T154539Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEcaCXVzLXdlc3QtMiJIMEYCIQDhMuOQQObNjMDHsmKgKKk17kACz7dTb378PRn0NP5PJAIhAJujxNE%2BF%2B%2B5DkisXQZNcahvVyiT4JvPfBbUGMXHO%2BAIKv8DCBAQABoMNjM3NDIzMTgzODA1IgxTR16WRUWZEWmgT3cq3ANUw4HyXqDP5exNe8mlK1VBp2AX%2FfPiIfipnK2QljcACJumKJS%2BfUnol6%2FYS60jq2je84IO7i1z2eDQ9soQLR3oSJIqw%2BrIEfZ7eWtx4zxp1zSCBwXQdCr6SbdMrlKfYHgUmJif7jcNI6R%2Btnu1W0wiU76YH4eQ%2B%2FWDlcUccmkv0TjM7V%2B9hTuwDMNm2PRlcNZ48HqpxT75iWEq3XogbE1YhKDUVYXRPDgMKv5MkaMf4vzuK%2FYrC09v74V6dvd4c%2B%2Fmt%2BS80JoiYpsNgWUUnvt8zHQTOwAJ6LGEzfZZ262f4TSo%2BVs2dIP2xJBVU3vEE9tabMxfNCm4VdjW%2FxZK%2FLHsPNhONKQswISbxkou4awKTJwQnx89PKYtbhvjFf6xKInqHMEZSfCRZSWjwOG89Uw4zujexHdETcRqEftuuu2RHUo%2FXdNs7g6idXkVqn9y%2FONmcSJK34pr6u9HK715dtrBAMNzcDjjCzsLgZ0pEKZA9nZJB9PpwT%2Fxv6%2Fzzx8bUTV9ogLvLhT%2BKTHOfEO35uWymVbB%2BKyzo%2BFnfO5JdCtTXAE3s80mZJR52OrWjMGkcMPoRMTxwkTas2HAy28IvkmroXyKiOYPXcVmbjHPfkJ0AwK5mRoshNKW2l7dmTDwkvzMBjqkAblStp8hYGTpa8%2Bw7gPxi3s0Ti%2FOFk8Wm2iWYKZHuqnClDnAWfR9rE0eaW%2BdnrZ5ZB7L5LfPamnQCCAI4lN7DuF7KlyDIV2vemgmqytY8gKFaY2w0AFWqJPneBloOcpDKn7Asojc2HQxMn2qPNGIn0VsocJlcsZMkrmPt5u%2Fgzrz4w6ZTDhJL%2F65XAmToeux81nGJ35FXSnSXRdvCumW5yZvoIaf&X-Amz-Signature=6543bb2531dffeef0e12244dac4518075ce393da0e4a94b3c93d735a410857d5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RCA5BD56%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T154539Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEcaCXVzLXdlc3QtMiJGMEQCIEojtWLp0ciX4DJYP3930tuzQXeuu168dkPh%2F94a2L06AiBgSdreV1%2B%2FkVzJaMOc4sTwgWDQz2WWmFaNJ8W2QCB7ECr%2FAwgQEAAaDDYzNzQyMzE4MzgwNSIMbDh6VtfeHk1hLia5KtwDFEWypUnfHT1FRfAq6EjFaQgH%2FZMjv%2FPBvuG8VqT0LItIJTFO0Wvzsc%2B0CTYkYhBICinCdeVQ2u9t0iIaQR4GhuMYIVn%2Bxnq%2BpEEI4JuxV9e0r7Dy%2BwcQAvLORT%2BnMhP7lbSgTa68ceQIgjSxfgS9ekrs2ZGIfo8w%2BSFn9QfL23S3%2FHoPU3Xel%2BjqK%2Fq7ynZax0%2BPjuj9m9F9lSGp3Uuv2QmpC%2BHAP8NETIe5xpARL4b1QQSZRTxSetjWpSWytFqK%2Bi0qStA7I9E2WU0lKOl3bLKutPabN78nFVJYhlCF5DVMOZeTL0K%2BKJIml%2BO17S3foofMGXh%2FU1JU98exvlG1ncoNJ6IPxEfPtOQQzRcbzBx4czFte%2F8OVblS7VWc6V74tgtALadv%2F3g3dqc1oa4rHhgp%2FbWqKLAGoAKVhBw3OhdV3PvBdw7AB1l2UuxKl0p0TyRkJ0MjT5cAmJ2MSl3SbrA8SFvBfvu31AeXmJlehC6d5uCqt86Z6%2BFQsyq5jBjRhMhuoE%2BEj9us%2BL1iD71UNoSJ0hQDPOGhtORuu0UQ%2BNTmfVwAga73FXxPYtdn5ODUzj0OtjCagaYE5NKJXJawvtjXk8D%2Bp0TVl3pRtcu8G8XyuJfVLSXo86N537UwkZT8zAY6pgE9wLH4NTX4K2nxWFQMXUQ1rFCVnpzFdwjMiiS%2Bl03N8lbJAG3PgdhQj6%2F56by6wCtHYEhjwDgmSpQNhxInWqqqWVoH%2BucMYBLqa%2BqlG6UtYG9gooC7tIg7MeEx8hOBeacpH03ZM4FDdTwgTh5Nu%2BsoSjE%2B%2BbrcueBGn6PWAJoYzy7n9QoqgMRlb4LMSoifQEekH%2F5GqRbt4%2FixxYtu1FfpeJkIT6sJ&X-Amz-Signature=75fbee378d813182bfb959283ee826bbf58bc1161195ac49be98280fec000231&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663FEFGP3C%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T154540Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEcaCXVzLXdlc3QtMiJHMEUCIAhHBXRk%2Fy7V0RvHaeQeYidSFOGSWDNhPJ1H1KbBO52xAiEAtxxAZHfkx1uDLF46KxVphKStCa%2BWgAsOtBbyP1dkFw0q%2FwMIEBAAGgw2Mzc0MjMxODM4MDUiDAEnu2iMdtA%2FRqTWNyrcA9B9kCpwO8BDQc8FYh1PIUg5PXDrD5tdbTGrnl3TbGC4nY%2BE41RkLM3614xm%2BoX%2BcyzdshhXZYwckydFJKED%2B1GIHRCbhGiVp1s3y4OICkJPYtPRIG%2Fb3Omb9u%2BU6UtWpiCJ36ZGP0zWB5R3WWdRDC%2BXbe2hXickWic7WKSBC8eeZdiY34IS%2FclVt7piWiDzoGBE%2FAUdbOuDxt5fnnH%2Bby1c18jdxt9c%2FF7LyzOlDPfRbRKE%2BzKciDU%2FnuWYEJKCCe0JdGLPf%2BapPgWBZlEAL1tYWPmZzzl1%2BbOHKzuPtEA%2Bk7PGxOPSTn%2BgEVNhtj5BSF5YUGv1j3vhEVBwKcUcnYoxemQc1UyV0NIREf32pOrArw%2BI6FFwXVHwQuS5Yk7oKFJUAGx9IlU1hypJ6cgst%2B%2FSrLYKWTY4yBQokZBx38EAq%2F5MZKxK6yv8fDMS%2Bq0GjVX3ftsnC4%2Fky5Vui8BOVC15qcM5oAcmdMS83VJaS6r%2FgWWb1hOO%2FJWy3R5nOUa2OyxHVvpGgY6aatcJ57k1J5Q2Y%2BI8jP2%2B926AfbO6FbI1TGZTY1bjr4BT1pn2YrjYox7UxLa%2BoMynUHxV10HWdcUKAAidPjPSz4QbveCcbDD%2FTs3VeJZM6zCqWyzqMMqU%2FMwGOqUBvfKpdX2TTaga43nOLxi%2FyPmXVqBe4dzRZE%2BEqKVOEWIoU0t4qBZukH9ulqybJSAk%2F%2Bd%2Bp29HaDkPsglVTN%2FWOAJY3o3L8djNilCFHg%2FKLkOkpwzpxSLm%2FDttPBLPSXKpyfwchm1EKczA4q9V%2FbbajP4m8QWtEleMIWJhj2oVF62DIOwhvBfynuxM9sse9ixej20NXoq8Kcfrt5cWo91yFAGAmttd&X-Amz-Signature=1891ede884f43ec53de9d16e3413233e1e185e8d15e0a352532e57030b1a5981&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667SSZMO2D%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T154541Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEcaCXVzLXdlc3QtMiJGMEQCIBqhFHVYO1NZx6WSHMTzrPH246xxnj8tQwx4CyoHSOglAiBhIY%2BEn%2FF%2F8T%2FiasE55TzUz7sDn8rQm84JD6AhVLUTBCr%2FAwgQEAAaDDYzNzQyMzE4MzgwNSIMilr3hYJgJ7OTwrZ6KtwDovVoe%2FihXfdVt%2FEn9Pya%2BxpzdHO0VSAca0QUvP4WopD3ftFCbWxlzi3onSJrhBT74Rh7fg5Anwm1jrZDiW9S6BN9DQVPnvTMoV7jyf%2FqnMUz5%2FR0W04Ot6Am8UKQD%2FKFBNwJfjDhuY5ISMA51P5PO4CHiPhJwAm5lDs0l6DlZG5kQuTIKuwsSDuCoo8Mw9%2FEPqVm7b9UlKnG7qVgx6%2FL1XJhJhi4YScz%2BalFUvgAiTfld5EqYbv8jk9b%2BihyfPnxiEixS%2BDPkbF94ZeDtrcu9RMHa9dznJP0u%2B3iN3O81qKUAqQmbhHs6jqaQy4PN6YZwU4EGGwRUdgL48dnnWsg%2F%2BQYBnRhWY9zHUeLEHJFXg3zBL%2F253DgMx5ndKw5Gr5Dg%2FOp%2F3NHE3J1R7V6MwQDLfVOzFGSL37xWZ%2Br1WdtR322MtZ8B%2BN2ewrL7wHzOgO7mQpSI%2BZZ7IKep5b3L9QG8VXd7DSXocnc4boOOaIFvbGd9weJZfKlaF4fJX%2Bl9rpkeVOl6hDoSYp5EXBQM9boLm8sbGCmlILg90AGVVbl8P7BVHevI3T3ktp3afET0TiCDYtkci1eh6D1tVxxc0XocZhoS1aKZ7KC8gQ1Prv1CIG6YpsFELrA98GQIbswg5T8zAY6pgGi5FK%2Fko3tdq%2BxHKtZ65xkKHkwKhXLEOwzYtkZnB6Sa1kTvSlvSBSqeX0eCMOwiWkwT%2BEIdl4U5ufwghd66UsqGs%2BS6S2%2FJAWFxGznITKWPMjYzN%2F94plO%2FFsi613csanYaduft3rw2hKPiqqR2pUoOg%2BviA2UEMop55vmT3GnCTXRL9rtU0BcBZldvVCRNBS%2FJGOZ6hPo8koLx0BzcRV%2B5uCVWS%2BJ&X-Amz-Signature=79e406c01867f7530a07a17064a8f8d8eb0617bb847905ebb9496ef97a75d029&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UWVYKGOK%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T154542Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEcaCXVzLXdlc3QtMiJGMEQCIBVt7Tlpns2V6rd1Q15UPhp9LUaYUTyZtGAcYalJlqo%2BAiBkD6Sno8ipskl2LaF13WOhesxLiSu9jUnRgwMoT9NA0ir%2FAwgQEAAaDDYzNzQyMzE4MzgwNSIMXpuMNwa282HP8KKIKtwDzUtRKDaLB0jUUJaFyjwICElbb%2FvN%2BZPo0NbCoIs%2FBqjZ0vCdM1CYqcitW3cQSVKi32Bh%2FmknOyy7VfnHnqBE4z4SVnhZhU5jFsykaVhrB%2F4%2FxgTXENdrNBDPY3ewMErHa%2FWeSmf93S8yA8Fxk5gfXRwFrrn610bAjowT78dBCLeyY%2BNlbhZPTDzBqaz%2FYcTx6t5JvR710NkFD2iXLYBVaK30ZIsGfvrLC1sNCBuMXISGUaS%2F%2F0rA%2BkQcN2QkkdqgffxnEhkxPOSJDatUJtxM3j9n3y95wtYwqf9YHQ67AQ7qEo7HKBI50xg%2B0WhA7LCPxm9p8TKg0VcfeOE8o2Qv%2Fmms%2Fl%2BvoH0HoIKN714sK4brDOQP%2B8QYjh1G8og919DxjgZlbjsejpMuZT%2F3Ko3z9ZbOLcxaDilUTo4HGcWtrj8ejitdYq3yMsdoOcm1Pj7v9fv%2Bd1mNg14XXt5EJqVJaKAtfbYIyKqIvKyoPlIe4tsUBibmkj17rmzmcjbLdFRjunMK9nbbMYs5to%2BHa4tZBYMB0vWv0Gju%2FsrOiiA0BundKOLxgrzehOC1THTitJcxhmKJW3dp6CZJuhTDneWJhZuNRvww79T5impP7Cz8imH9uGZqu9cH%2BPRnxKowm5P8zAY6pgHXQFan7I8QAX77zMlEHEaXBYxWJ6HBhdpvrf3tdWNUAq4CmKJK%2Bz274BmGshrH5YDtuvPF1JKdNM3hO%2FZ6Z1FUNbLaAZ1xihv%2FAINvPq0WtturGAVOR5%2BI%2B%2B6doS09PZ96mMzLXdOmfUDtwA6e2XblsJ%2FUaeJAXgzNQT9UCksMUD3D5SJNqFJ2zImH5TGWJhWb8Nf%2FE9jKsNqlp0%2BhgnFfegETTRHI&X-Amz-Signature=4f8034cd50be2a24ee60fec258578710ff709e5b7790ff4b32a4cd55f4a1346e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UWVYKGOK%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T154542Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEcaCXVzLXdlc3QtMiJGMEQCIBVt7Tlpns2V6rd1Q15UPhp9LUaYUTyZtGAcYalJlqo%2BAiBkD6Sno8ipskl2LaF13WOhesxLiSu9jUnRgwMoT9NA0ir%2FAwgQEAAaDDYzNzQyMzE4MzgwNSIMXpuMNwa282HP8KKIKtwDzUtRKDaLB0jUUJaFyjwICElbb%2FvN%2BZPo0NbCoIs%2FBqjZ0vCdM1CYqcitW3cQSVKi32Bh%2FmknOyy7VfnHnqBE4z4SVnhZhU5jFsykaVhrB%2F4%2FxgTXENdrNBDPY3ewMErHa%2FWeSmf93S8yA8Fxk5gfXRwFrrn610bAjowT78dBCLeyY%2BNlbhZPTDzBqaz%2FYcTx6t5JvR710NkFD2iXLYBVaK30ZIsGfvrLC1sNCBuMXISGUaS%2F%2F0rA%2BkQcN2QkkdqgffxnEhkxPOSJDatUJtxM3j9n3y95wtYwqf9YHQ67AQ7qEo7HKBI50xg%2B0WhA7LCPxm9p8TKg0VcfeOE8o2Qv%2Fmms%2Fl%2BvoH0HoIKN714sK4brDOQP%2B8QYjh1G8og919DxjgZlbjsejpMuZT%2F3Ko3z9ZbOLcxaDilUTo4HGcWtrj8ejitdYq3yMsdoOcm1Pj7v9fv%2Bd1mNg14XXt5EJqVJaKAtfbYIyKqIvKyoPlIe4tsUBibmkj17rmzmcjbLdFRjunMK9nbbMYs5to%2BHa4tZBYMB0vWv0Gju%2FsrOiiA0BundKOLxgrzehOC1THTitJcxhmKJW3dp6CZJuhTDneWJhZuNRvww79T5impP7Cz8imH9uGZqu9cH%2BPRnxKowm5P8zAY6pgHXQFan7I8QAX77zMlEHEaXBYxWJ6HBhdpvrf3tdWNUAq4CmKJK%2Bz274BmGshrH5YDtuvPF1JKdNM3hO%2FZ6Z1FUNbLaAZ1xihv%2FAINvPq0WtturGAVOR5%2BI%2B%2B6doS09PZ96mMzLXdOmfUDtwA6e2XblsJ%2FUaeJAXgzNQT9UCksMUD3D5SJNqFJ2zImH5TGWJhWb8Nf%2FE9jKsNqlp0%2BhgnFfegETTRHI&X-Amz-Signature=8007e354e3b6bc04511181bee176890719381a4fc8703db230927a406f78499c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZQTZQVSW%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T154534Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEcaCXVzLXdlc3QtMiJHMEUCICgVwhnFz196vvEc68YxRIr4uGEXBUn9RNWYsTtAO4pIAiEAh5N3YBpg94nTH4kTm9dTEgjczSj14AiB3K%2BTBEhiA14q%2FwMIEBAAGgw2Mzc0MjMxODM4MDUiDLSn76sGQeZPPXN5ZircA93e8%2BRifBWZqH%2FaTL%2FEzJD%2Fcx7GFPN98LKGkrBPlubp%2BaJEnMQrZsoP2Qcq8nLWLHa1OrFvd8LiM29sdt%2F6ykAJEJRlZlx171l49a%2BJFDlS20Rq7TtP4HNE%2Fiq9cJXVAIRYQENzPW6PkiT452D2nr8yYTiQESa8iqgxvw92oG163kkUmc2PM6IGQHyFzxLWdyAZAwdUxLItihzV5sykiSAzIcRrEKCJF3TTeRiFMDy6I2zSFYq8pYOz2dNxWRrkIi6211L%2BpHPmdRSSQJJusWWV7ksAc4hYsNFjgnQ4IK1%2BKtzZXpkKlZ8Vh7yCiaPVNRtHgQ3teON%2FrF8Lg8Q3GfKy24u%2BVsCTSQjPEX41xyqH07qUZ8x3fUGOU%2FtUSc8%2BrnhkusoG%2BYlIG82lqqWsgSGxZYZq9CSeF5lkbZft8SxusS7vyYf6HqoZvnQFufn9I6XUVMGUptWpDl4HjQAGFGBzXKmGk784sgg6P14Y2GDAb1amzus6p0SZFmZvRj%2FdYzKG40wuKnxoCURQZpRxgia3y0%2FuiUFDVaoKp93oZE6XhVwHPmtijlyXbIGhYtaDXN7906TEIE4x2G13qjIV7UYLTQy3mVErQobEvFqPx09uwtAwmcxLrQTEYUDHMPqT%2FMwGOqUBWUFdBWxlLM61zw9QffrviYxaJT4YHq8Xx34HmP2zPr2qvKMz63N2BR9A9d9dBznq%2BvQT7bmK20muxFzNCpDzFKyOrVQIjv03mpQsUn%2FOmOjqerlVjexiXVZm8YmmPwgbQUU2DvV5nxg%2BphKy920VojHtDGavdqJGdrdRlNP4kf3TyU4uhc9fW3s1RDtJRstNTcODP1VaVWTykah4RLm0yDalvfXr&X-Amz-Signature=e448e7cd38dd94fd3e89ebdffc4f26f781f809f039f90388a22f2df3c8f01248&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SNX5XOO7%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T154545Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEcaCXVzLXdlc3QtMiJGMEQCIBQUVmxaCIvYw0OILX2G2LaRXg6tETNhTidWYLlxlcK6AiBFntja2sQLCO8iOMenvfGtykSma8f3pkhcovkiQi5DHCr%2FAwgQEAAaDDYzNzQyMzE4MzgwNSIMczQwTXOnwlLWgNhrKtwDoS%2B9P0%2BMLDY8T1zMuhniUExnkaCjafQrrCnVhmhGbow9YynB6NknMZ9%2BBeFaSM6cAExaaqADw10VluAt2iN9p9K5VUHD2NqQ%2BOBXUfN3%2BY0HbFyVTP2rUKkUp1ZJ2TSHb19CMRWy6ytiY%2BuULHNPTXBvWBVNAahvsTC4%2BEMJROvi0hyCkrfLWc3XbmFh%2FTCbAE0Q2PhpqNQjWPYGFS2JU%2BsdEaUBETKFBiQeMu7AWr7kXp1zL96v7TSBpa0yQHiebLW3NdLdVsXsDumjGqpj9%2F6L3VEaVJpffuCueaAPieIT71lpyYGwgKaCskgKuzdH6PWiOZoAbBHpGmhFv0VmcBUF%2FdjQN6OmBqDmno9KG89h0Oq4c2S2UJJY6J3Kcflu8IQ3PPkzVGXD1NHuIUxX8xIzojbLykWbhUfWT2tKvYrZKGKCbwEnQ9LWAu1u8o1B81l6V%2B1nyjTi9jeHvcyEh%2FT778GbJnZ0%2B6q9vGHkPw7ke0ATk7n88pMTKKUcVQBC56mWnGrsQla34tD6fIQXx%2BvqOZjL1vs2VQxom3tA%2BcGS0HCGN65T671fcH9KBXD5papghr7019B5s3r9QV%2BKTTj4lpMsG1Yt4PIj4gOyGUz%2BotbOqszblMVnr%2F0wjZP8zAY6pgHh4516cFPtAjxI%2FK0ubOucwvogxleYSBvBr3T5vA4FLZwWrucbJy6zZ7iuE0rnrZVfiwO%2F4ZtHgbCc1dPm83NygPD5l%2Bd0UefuHevvQa3WJDcbluJwMWQITBgUOfeuWG82w%2F%2FBC4gC39F4Ov5hgQEXe%2FpYG%2Bh6JVxWQyE4Nl7HMKoHLM1TXb8sKdECWKhVkln%2FqdVybWFQlrSnqEs6EDI8t7PgGl%2FJ&X-Amz-Signature=c0d63af73d67232221df315c22dc96329dc1e486f6fff3f1b1f8868b15018f80&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SNX5XOO7%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T154545Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEcaCXVzLXdlc3QtMiJGMEQCIBQUVmxaCIvYw0OILX2G2LaRXg6tETNhTidWYLlxlcK6AiBFntja2sQLCO8iOMenvfGtykSma8f3pkhcovkiQi5DHCr%2FAwgQEAAaDDYzNzQyMzE4MzgwNSIMczQwTXOnwlLWgNhrKtwDoS%2B9P0%2BMLDY8T1zMuhniUExnkaCjafQrrCnVhmhGbow9YynB6NknMZ9%2BBeFaSM6cAExaaqADw10VluAt2iN9p9K5VUHD2NqQ%2BOBXUfN3%2BY0HbFyVTP2rUKkUp1ZJ2TSHb19CMRWy6ytiY%2BuULHNPTXBvWBVNAahvsTC4%2BEMJROvi0hyCkrfLWc3XbmFh%2FTCbAE0Q2PhpqNQjWPYGFS2JU%2BsdEaUBETKFBiQeMu7AWr7kXp1zL96v7TSBpa0yQHiebLW3NdLdVsXsDumjGqpj9%2F6L3VEaVJpffuCueaAPieIT71lpyYGwgKaCskgKuzdH6PWiOZoAbBHpGmhFv0VmcBUF%2FdjQN6OmBqDmno9KG89h0Oq4c2S2UJJY6J3Kcflu8IQ3PPkzVGXD1NHuIUxX8xIzojbLykWbhUfWT2tKvYrZKGKCbwEnQ9LWAu1u8o1B81l6V%2B1nyjTi9jeHvcyEh%2FT778GbJnZ0%2B6q9vGHkPw7ke0ATk7n88pMTKKUcVQBC56mWnGrsQla34tD6fIQXx%2BvqOZjL1vs2VQxom3tA%2BcGS0HCGN65T671fcH9KBXD5papghr7019B5s3r9QV%2BKTTj4lpMsG1Yt4PIj4gOyGUz%2BotbOqszblMVnr%2F0wjZP8zAY6pgHh4516cFPtAjxI%2FK0ubOucwvogxleYSBvBr3T5vA4FLZwWrucbJy6zZ7iuE0rnrZVfiwO%2F4ZtHgbCc1dPm83NygPD5l%2Bd0UefuHevvQa3WJDcbluJwMWQITBgUOfeuWG82w%2F%2FBC4gC39F4Ov5hgQEXe%2FpYG%2Bh6JVxWQyE4Nl7HMKoHLM1TXb8sKdECWKhVkln%2FqdVybWFQlrSnqEs6EDI8t7PgGl%2FJ&X-Amz-Signature=c0d63af73d67232221df315c22dc96329dc1e486f6fff3f1b1f8868b15018f80&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46672CIQD4Q%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T154547Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEcaCXVzLXdlc3QtMiJHMEUCIDJs3AYRonvF2iinp7x%2FoZs6HdWWd5JXljSHK9ZtPAIrAiEAvdbydDhrP368j88poDKxqoCFKLIACp5i6L94KgtK%2FwMq%2FwMIEBAAGgw2Mzc0MjMxODM4MDUiDBSrCuoFHjcWcIPdNSrcA%2FEZl8nzqIldQzXTtP2bemSMojk8NsdnmyfxO5tVmqpKKna8SMG23msEskCyW60%2BL7xGRs5IYf17j7GGWRL1BHXXkR4ji3%2BIPqfNmGKjRBl2KLJ3UKkktq%2FR3odZleOsD%2BUPb%2BOQLJEfXDlzdXLKnOLwTxY9BKVEiQ9ZcgaxQIu2jzt18gogPuibi4vPMsUQsO3sBoZBauA5Ie1a4nG1Bdmx7svAk%2Bk6p0tYF%2BkSfzwfZRPCIrvtc7kD%2B2TEv41z%2F1Q4cOwwBMlJ7KioGGoWVsH41WX5NxBHSRsmJp2cYRxtrP7sb5zSHedmxoZG23qJF12oudIuslfglQEgrEcuWnGMAHIPk5Ny%2BQPmeAf7LBIZb3dYszHiwuG5qZ%2BTRQPjMd7tGE4irhkZbym7wFpKU402Kp2B%2FEp1iXAmCozfEZeKcuwfRufl2NZNgiUjL1pf%2Fldp8cirX1CvmnJMVi0OBHjhmJdxPP7BUmGNqOBoeEhRaqpaT%2F5tppxhAyOf4B288nYDZZ6Mi8Hfc6StJsHD614k%2Bj8AWBaI7DfNs9Ola52RCoI4iPAwfIWKBHjq1yB9rcW4BK%2Fq5oaoLmfjFSj5N5T4MlLk5SqwpNsfZDpyrZFJ32D6f8cFuTOfRDqfMMiS%2FMwGOqUBIn7cLHmg900W9dUHWQz9KNcPuzEd2JE5rgGFV2nj0y%2BaWpQlUBUhFWjeu8AUoXG%2BbylzdhYdtfumr3ttLArwE04EXv%2BE1zj09Eask73kr8qx3sZAr1h%2F0fuxPLMBRzn%2BB9%2FdsJEtlnSmERfRpQ4Du321BfSzwS%2B6quAf%2FbtjAWtuRVouNuefejmq5f3yVUIOHS1Rm%2B9wL9BXjdl5JkBkZ4I6x9aJ&X-Amz-Signature=682d5de6c5b9b986b5171f111f426f8000021d31ba2829138214bcbc9c60e288&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

