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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667WNXRCKC%2F20260404%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260404T111738Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIAxeq%2FSKgaFL204Aqc%2FjSTzVE7D8Nt5G3%2FTaeei%2BnVMdAiAim%2Fl5x26gxcT2xm3phSokHHlMWVB%2BzUP7yxxMDi%2FhPSqIBAia%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMncRq3VzDKte6AJsBKtwDPg2Mrk1i6qGaI7rfzPFfFmMFMvs3tZETofenJKtgh1OCTsYAI75UyWBWUOJWbKltGvX1TN1FGOptxBdNV5jaWPIg9O5hdOhM%2Bfzq8iD2xDJFDk3d0wrVCsdG5g%2Fd4lZ6r6Suir4GHEemuO8o82ki29dH8Q0n5lRRRdpolmlHw1TW0KG8jFVsy86XvcMOCiEs%2BgieCxAanMHQ1E6Jc6KvqwqvRKlx3otWT5BdTlyKARKOWiRR%2FPWz%2BeO4Pwi%2FvTtGgOX8L20kkD9X%2BPyajP00Rr2sP9w0kPgOVr60jesZFq27oWyk8aN%2FLWgYs8B4PzxMaFm5N5%2F3ll9iGxzLVwzQwOIX6H3Ik37yh%2BQTTZ4YmruqNuM3THDNayw%2FHMhCnDm0%2BXJW235DXqx%2B2BcBSwfk%2Ft6esElYad0iavBKfIUaYJpUGPchjgRH2BUKqblQxir4Rd45kCFUAUQPzwi0vina9pG6CuHGQRdXX4jJDi7sGc%2FAT%2Fp0DN2ura0q0F6teFwY%2FG4JdNEqhpJD5ekkGhFTRXMj5Dkxb43xg2SrrIk6RNPEBTymxdZNR5BGYESO8ka8rGV44Qj86Y4IbZ1zWOgmUbEWQTx5lFa8gahbEJgZM%2BjVuf9anCBS7p%2BoTg0w657DzgY6pgFwpVrZVwI5p7%2FQdCuldImkaFTThPQCTSHELSgEfuQwQOF43eC86KxX%2Bb8D1V%2BxRrRTBrosqv9CFJk3fzoL9TBEabWJxgWPn6oIYdn7ezixmQJyCqSWYjSFj8D5cVHXduXB6OwShprN3%2BeTX14TTLirXokil8%2Fr7qLEblzVMoMUmrydX1nvwMtHhEdCxrJhSUP6jtbftmcQSn6Zet5qyVCRERaeDYtt&X-Amz-Signature=f5a2a678884e30bab6cb336fb3a42a665c9e7339fe3182ecd5a202f243ab03c7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667WNXRCKC%2F20260404%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260404T111738Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIAxeq%2FSKgaFL204Aqc%2FjSTzVE7D8Nt5G3%2FTaeei%2BnVMdAiAim%2Fl5x26gxcT2xm3phSokHHlMWVB%2BzUP7yxxMDi%2FhPSqIBAia%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMncRq3VzDKte6AJsBKtwDPg2Mrk1i6qGaI7rfzPFfFmMFMvs3tZETofenJKtgh1OCTsYAI75UyWBWUOJWbKltGvX1TN1FGOptxBdNV5jaWPIg9O5hdOhM%2Bfzq8iD2xDJFDk3d0wrVCsdG5g%2Fd4lZ6r6Suir4GHEemuO8o82ki29dH8Q0n5lRRRdpolmlHw1TW0KG8jFVsy86XvcMOCiEs%2BgieCxAanMHQ1E6Jc6KvqwqvRKlx3otWT5BdTlyKARKOWiRR%2FPWz%2BeO4Pwi%2FvTtGgOX8L20kkD9X%2BPyajP00Rr2sP9w0kPgOVr60jesZFq27oWyk8aN%2FLWgYs8B4PzxMaFm5N5%2F3ll9iGxzLVwzQwOIX6H3Ik37yh%2BQTTZ4YmruqNuM3THDNayw%2FHMhCnDm0%2BXJW235DXqx%2B2BcBSwfk%2Ft6esElYad0iavBKfIUaYJpUGPchjgRH2BUKqblQxir4Rd45kCFUAUQPzwi0vina9pG6CuHGQRdXX4jJDi7sGc%2FAT%2Fp0DN2ura0q0F6teFwY%2FG4JdNEqhpJD5ekkGhFTRXMj5Dkxb43xg2SrrIk6RNPEBTymxdZNR5BGYESO8ka8rGV44Qj86Y4IbZ1zWOgmUbEWQTx5lFa8gahbEJgZM%2BjVuf9anCBS7p%2BoTg0w657DzgY6pgFwpVrZVwI5p7%2FQdCuldImkaFTThPQCTSHELSgEfuQwQOF43eC86KxX%2Bb8D1V%2BxRrRTBrosqv9CFJk3fzoL9TBEabWJxgWPn6oIYdn7ezixmQJyCqSWYjSFj8D5cVHXduXB6OwShprN3%2BeTX14TTLirXokil8%2Fr7qLEblzVMoMUmrydX1nvwMtHhEdCxrJhSUP6jtbftmcQSn6Zet5qyVCRERaeDYtt&X-Amz-Signature=f5a2a678884e30bab6cb336fb3a42a665c9e7339fe3182ecd5a202f243ab03c7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QWLKJHP4%2F20260404%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260404T111738Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIHiEcKRhQ86XJ0ObA99LiHo7ySO200mEZMZ0CeywoTIbAiEAt3QqBOrZuq9ByCagiTTlLMvOI5W%2BD8xkfsSK%2Fc6816wqiAQImv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDFYGMeSKF1Gyn9Fa8yrcA65NZNPR7PYX2pZBkuAUhULCQ8dvDUjyPcLTkkMa1YXcabAb%2FeM6%2BIXBtSk5QbA6u3Kx2dZq0qFvB7%2FcU0LtsPtgwjNmIcXx%2B4ip5VeCB3iDxhn5FI3q2THFVyGnslUPfrPUZhybzKCnoy3%2BPxt5f5A54GYKjxIw5LhP7s3wVJRAdiQev8ImjQwsZp%2BcJ0ylRDSn9v4n2Z%2BshXyTN1sU36RLWEO75KkfFBd2NNSUWPxKGp%2BEGKc0SzItXHUPyjWpuy%2BI0wc%2BV4B9PadpbldhKdv97mo6nw4qqbk6tFERE33VuyopZnTO6lawJa6Y7mdxRkWxjesYyvS8ekXoMD3WZ4RAaYPsUDoEQVSZTJxm0RsClFUkwzqQsAk9uDsynWtchtLC2e%2B4iq1oYKQz66igQK9QGs9iRwx0Oj%2Fr8VPNB0%2BZX67t3tghtrMg0X0Tt1%2Fc7y0i2C1FX9sKgmzQL9tQMA7YhQOnKpA%2Fu8rnBEWWm2U6Y%2BPJvfu4dKgTVFCz%2BezTYNkZVJOM7MLF%2ByudRLqb4JQpuN4jYq4%2B2hutHrMCxVYMsy5RGLRmJbz7FQltt0kMkNBo%2BoDUDpmo%2B6WurZ08DlncduHk1EbJ70%2FVkrxk9TWxFtcLtTU4bb26FOJsMPCcw84GOqUBNj6HF6p4Qkq0ke2x13n0VID%2B62F0Mn6EqfaFhSGkX6wfZ859kl99myfjhMn%2BR4CTU2uU3%2Fu2O%2BBKJ6uoia6lIuSwMJpTEpnixHHZRRwOfJVLPn9eN1QdURwTtvziCyfoM9y1plqyVpl7HwT3ZbbQ8YVhQEbgW1U00Ub5qSJpeyhVxOU%2FS1tI%2BZ4gIE4VizZIR5yPJRqL%2FekmZDKh%2FGgTcpMYKfju&X-Amz-Signature=f02be7876ed3229fffb75dcc6e29eba46a2314db981e30aceccdaa48ec3d6287&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46645BT3TD2%2F20260404%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260404T111740Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCd3LqnkPnUxZZxjLHj1CZyafxNPF6tRoZLavQv69A05wIhANURFbbPFcn2FnuDq0reA%2FhwEkcInC8y5tKwD21EFP7uKogECJr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgyByEkhxgkqlBMSkBkq3AO5uYt00fQkIXwbu0x%2FMQUrDgYPonx9suHHRtObYgBc5pTL%2BCy6b342bRcN3QbdjGaLlpePxrPnDuJ9A9QiAOhPPwgOxs6%2BfB4dylSmeB08nufmPHS3%2FYM%2F4GBu%2FVMIDqnuwmd5%2BFGq0aq%2FwbI1jzavatbI9XasLQPJvWDA%2BvVjscJxvFSAE6cwFtZRkkstRuM2Jjn%2BhhUPEfI3hO%2Fq94zLe05MSN5ABVOI2IU7XtQnwdGAKjGXS6DxLvm3QuO0FQRYgXUBz%2Fkm0WD0c7Y2hJL9n5M9yywiGh%2F55mdgZ%2BvJYh%2Fzs7IFn5%2FBhV088Uc7qJ4rf%2Fgq8yAAum5IIGJravBQuMkcB7hfh97kI5bKg%2BzVinSxcPo9z47MLxSBE6MxmJPNCIqLlJ%2FrJGVw5plrjqHbfErVSJikZq88PljC5TDawRM%2FTnorn1iNP1Kgv923r69hbgKMxJMJ5ub6kuzoTypqGelEZ1FMxrOT1hKbm%2F8zX3mnXIDZkzoXchA3siwa0Z3UvZ4k1i0dhN3sPFUiDtQR73HqNbP5Ky%2BFgS9AkcYePgmIKMdWc6TloTTylLAgnanyhYIr3S%2BlXmH7zhIsmoBt1ZOWqFVFrWHB%2Fj5E4XkYJ3ylDqfkc%2Fnn6bqa3jDZncPOBjqkAcSBRkk%2BZNfxpwXmE6%2BiGS%2FGbqXCI2Chk5H0stT4TjAjW1X37dKDMdkyWkt7R1QKqf%2BHCgj5nWA4Zsu2Vlk5yd%2Fjg1Y4V1eoU5pxmHItqbxjHII56yVmQqOK%2FmDXswqQSLq78036hQy6s2L5rqEMBbmIhhwP4TR%2FdqE28idNg7Wq6yvDsLY8%2B7ZnA0kbzGCUIUgdOoy48n5OzhiJo85kY%2BdxAqy6&X-Amz-Signature=a9f1d7364d6967ddcfa3e6cce164ac450f3c6edc70cf4193a54fa23b966a2b7e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46645BT3TD2%2F20260404%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260404T111740Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCd3LqnkPnUxZZxjLHj1CZyafxNPF6tRoZLavQv69A05wIhANURFbbPFcn2FnuDq0reA%2FhwEkcInC8y5tKwD21EFP7uKogECJr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgyByEkhxgkqlBMSkBkq3AO5uYt00fQkIXwbu0x%2FMQUrDgYPonx9suHHRtObYgBc5pTL%2BCy6b342bRcN3QbdjGaLlpePxrPnDuJ9A9QiAOhPPwgOxs6%2BfB4dylSmeB08nufmPHS3%2FYM%2F4GBu%2FVMIDqnuwmd5%2BFGq0aq%2FwbI1jzavatbI9XasLQPJvWDA%2BvVjscJxvFSAE6cwFtZRkkstRuM2Jjn%2BhhUPEfI3hO%2Fq94zLe05MSN5ABVOI2IU7XtQnwdGAKjGXS6DxLvm3QuO0FQRYgXUBz%2Fkm0WD0c7Y2hJL9n5M9yywiGh%2F55mdgZ%2BvJYh%2Fzs7IFn5%2FBhV088Uc7qJ4rf%2Fgq8yAAum5IIGJravBQuMkcB7hfh97kI5bKg%2BzVinSxcPo9z47MLxSBE6MxmJPNCIqLlJ%2FrJGVw5plrjqHbfErVSJikZq88PljC5TDawRM%2FTnorn1iNP1Kgv923r69hbgKMxJMJ5ub6kuzoTypqGelEZ1FMxrOT1hKbm%2F8zX3mnXIDZkzoXchA3siwa0Z3UvZ4k1i0dhN3sPFUiDtQR73HqNbP5Ky%2BFgS9AkcYePgmIKMdWc6TloTTylLAgnanyhYIr3S%2BlXmH7zhIsmoBt1ZOWqFVFrWHB%2Fj5E4XkYJ3ylDqfkc%2Fnn6bqa3jDZncPOBjqkAcSBRkk%2BZNfxpwXmE6%2BiGS%2FGbqXCI2Chk5H0stT4TjAjW1X37dKDMdkyWkt7R1QKqf%2BHCgj5nWA4Zsu2Vlk5yd%2Fjg1Y4V1eoU5pxmHItqbxjHII56yVmQqOK%2FmDXswqQSLq78036hQy6s2L5rqEMBbmIhhwP4TR%2FdqE28idNg7Wq6yvDsLY8%2B7ZnA0kbzGCUIUgdOoy48n5OzhiJo85kY%2BdxAqy6&X-Amz-Signature=2a804b4e66a7139d7883346c0ef892480d8b7d901e9cd297d28315bf86654a31&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UDV75DZE%2F20260404%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260404T111741Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDTGUEoECAESuFLJjY%2Bu3f6o7I8fR2saD4DSpIsJ4M3IgIgBw73x1gv%2FjmCtXmPrVJMfXIzH7HLw0AyBLZxHO8hihUqiAQImv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDFhYb3592Jm%2F650hJCrcAyVHHzNmgFIxpSRrFWFJb766fI%2FrP02sxZi4ySYzeW0pbVPzBWW7BzolwNqMCFeWbt8KAcGYSBYFliw4MP%2BVNeOkh%2Fw%2FVMnoRHkLcn9dBHLkv8JDUimm%2BEyMGgFSKljPOQxGOYkpKMY7GpEh3RJAGYecYRdMLViyfrYcanXqbFeFqCEeU214CoE0R%2F3s2l5vRHI%2FlDimUZ1XxSaQXCa18cOQdRogDC8WnzXVn51rRCouacoaFUxncbrUPeFDNzEPpLZWrsp5T9jHcZOIJ1%2FrRDgomkxyNn5AgzpyGCYWyno3W%2B1rAFo9HzaDNtin8eVewmmWvGzb4e%2FK%2BmDQECKoXF7jDpOZ8znOfI4MzeWBX1KCBD63tv6BlJzh34g9vK%2BEEsyMdaimTcQWL8ia7Ps9eBxJUIIyAZCKSwpS1xOp12WRN04y5kEkpZ3FFoENPDcaftOTqnrX2B6huqFI6oE7L%2Bfu7QvE5vC6rlqpRmTYQ2hFuU5F%2Bb10E%2Fj5ZRp7JIjsW5aOtJX9pOwrRJ4JWhu5SSYSwYkSxe8k3FX38XQiaRpcSd0n8ZRJDJKvnujhs8VNfoVQ6kMQxv7BH1jQPAimB5wm1iNqPRnec7Ym8jpg1Xn5ZsAj7Xr%2FqyNVjMmqMKOew84GOqUBmOsLdfPcd2P4FVZ3Lpt05TXAz4UXkLxz5IkaP8PFcx%2FfXMOwLCbQch2YfHg2EYUXmo1aqkpCwA9BLbPOdnE%2Bq6W4DFc6pnMEKcalf5emaxkfW%2BxeFkIjz%2B%2FJkTBt9IZcWbZi0y%2FIcY6EyhVSjVyo27yxy6gV7XTq%2BvpZDXRnvxEx%2F1t2SYmWQam7%2BEjNJeMsI9rSn5WY3JgZzWJrnQcRPMby6Y6o&X-Amz-Signature=dfd9847f9fb6b5660198a9c9377a8f0808c29dc95e313c50c13910b6384a74d2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WADFH5HH%2F20260404%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260404T111741Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIBsJXghgxpdWIZzr2D6j%2Bm8zVHTaPLQ3ARKHvt4hqw%2BOAiEA%2B4XlNmnsBEOEl6%2BR%2BLTAq5Xu4NMJtT7cLNLUk5%2FTyZ4qiAQImv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDF1ptU4HYPVIyD97WSrcAydQKqlch0z3QLLhsjzIECHxfLhOtuI6bhWRx9TYIx%2FWb6ow2AIZNfWJfdrPpQWe8GoYf2lddRkgLY9%2BOJIfQqwZ0ta9GU%2FJiiRRxjGnxrR1FcqOUUJFneMHLBwfXVOMBq6TDlOXf%2BPrb6anpUWIHsnRgqLQD%2FXoqOlgqj90v5E9Mq3qVmQOPvQqnJ%2FvdeS%2BrRUrOxZRZqoMy0JPu86pBDgFkVRCki3sRQsZuUpT2rdJI1WDtvp7A7bnw70i7qSKH%2Fsby2wXEKdxEln7EGiqSZk8rxcJhsJxyvysBEpZVBp95OWpj0XZjzm0EhVox3xXZdP4x%2FeLusZ%2FJv6QjSmDd%2Bqpn015npmUYprgacCKTPyVHXGedGsJHYdmMjOEPepO%2BDYgAqsLYKSpIDuvCfgTjVQ0o1BqaMxd%2B973FJLQ4f8yrI4Na%2Bo477moeu9Ti8qF%2FHabGOLFal9Ji81eq9Sk3QLNrdlJhOE6qP9JDpEuocKlgPYp6lOApBKwFNsHoZ7OX6LoU%2BtkU3Cn2xIu2eM7ao1YpN5H9iPqtBTDtbAdK5d8np8BORUwrtbz9glU79DXN49awWs4JJU0JShF7bTJEC%2F%2FsO%2B8uhch2pQj8InIuZz0gADcOPBrJK6SvX1cMPSdw84GOqUBH1rj0799oW4zOyb%2Bt7XWv94YzW1YH34LNlNN%2BlHOyrfh4AZyYsDPxE59Z2SLpMQ3w%2FmiLMoMhYdpnOM%2BEYl%2BJq3%2BOF3cFErmzeSbC8%2FlCVrfDkud10dvJlvKGg%2FFBlx%2FPEG8nDMkmzewOVcbBRGkLdONMbWX7AP9TVEBVwN6ufexS%2FTFxtD6V7VMKV8CtkW3Q0kXHVr98eRHhRg9thdubCndDZor&X-Amz-Signature=8a56de965c3561e3c4e5fe6da100b8fcddaa05881e17c711fae21793f5b38e70&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466W2P5BZC7%2F20260404%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260404T111742Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCo9ibvNjTglyeNhymbf2vkueOPirAuEu4N0tpKDMdkTQIgfEe4RABsrd4ufaukzJ5cW1N5w75%2FY1a9wT8pSRjPdLEqiAQImv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDD7E%2BdJPy2bLfRWEPyrcAxG0LKuVTtiHZdXxz3LG8To2HGsZoegpKXqJsRrxbk2pPQxnxpOCRVFeBU2loLzi4itzkskN0V69SDeiX76qDmfAJ%2BMv1PLes7kcw6ZSSagQMWeRyT3i74ElV5yZVN%2FQD62QcmMn3f0tGbP2DlJHMuYEmAxyp%2BmtwQ1PQomYjlrdT0lInEoT%2FYnlrSQIgjsmw1%2BttIn4lum1rCgmuEPo1YFjeojVDnwqKHy09Wfchb1OrEJgFNRctgo5HNN5kCNlpgkNxVvOpqIMqySJzxFHTcs6vsv%2FhOT8WtV%2BlA2H8khqxxWyVtGMlcsHG1HQE7Oym5ZIRr7nfFEeATUohkKLgw2Cs7pov8wQE1FUZJBmqkpRh7OcxUKhdpoFJtOYVMpA0764e9XgO%2BZKQzOQNjGg7KAwgEmmTwzH9K49ziP4BxiZEZV8dm98kU2IbFTcIfigeVs4%2B4gXKQAWxZ6Z5F7QNk4TLUVR%2F3Js0YT4tUthw%2Fip0o64GAah5rT10%2FFq6rgCnZ3VRaEAiCD%2BgZAWMzii64q2AY6T9qrJATWmByjzXPEgghyuim3cGNiqiFzUkQxEK4oE2hjE0ql0FCjnzJ1tdNwplp0hcVewLx%2Bio5xitrnHKtsdUbwWjqSdR2GIMN6ew84GOqUBPUw57eB97UIn0SZI%2BfyLdXeCI2WpYq%2FJLk8J%2FfgGJV7WvrsooC4T1ts48Kj4Qi7vqHOc73oezMblbaRMC5rxRIPThOaUNiAYcPuKLQ81ZhSw5GXJhn5PfF1KVFq1lY%2Brd3Y3dezRXvpJ%2FraAYMMIoWgjLE2zU2BEH5dx6gsqE3Wrs18%2FkKmKCl%2ByfGSW9DU%2BrEOWk77VwswTWUfJyryCS6ltVJg6&X-Amz-Signature=e4c6bbc932eea9e0f6dd7aa06b586e186ce4e013f8b827105dcf6e99265458ef&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SXNFXIJZ%2F20260404%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260404T111744Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIFwGmO2muuQuZ6JOuiNcarJX0OlHMYgvLjkLvLsX%2FOp7AiBA1B1aEvzNv95kq%2B9maZCOvN5l2ITiMKocvZK47fa4CCqIBAia%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMtKasb8fDPCjkavnKKtwDFsOSGnd59ZyLIplDyIkjXL9WHbvWH8Zdp2WphCbEGOBdStIsJlLKsIEYzGu7iZawRIhFziLzHJwZw8vtzNmvnZwc1FuVAFmYGj%2BG6QrKEbGLzuCtQLDBsN8w4hUAamq6E7UGLVjXkjdsKh45w49oPxPH6un6D6MBJqNWJbPfBuTXaYLOkTPR8PWe6ImvLEgUOY2Jp%2F4lBOPR%2FwTn2CsxUdV9VDrCVGLxJGb2Rstpl%2FKzD9iPvVxrMjIWx9gKwn223q7PiYZ46yNRR1mPQiMK06DbCgMLeXPfgNT5sUPCx6dcLCOYQCRNAw%2BjWy9jM5gvzc2qu4YpXWvJXjq4%2Fw8t2qq8lnPGG94qDQmV2KnvZOYoanaU3ZusL77NPhsClJ4w7PpoFwiXaNwcFxF5%2FwYQYMtwuwqI%2BkR43Y2kTaRl0ovdcCw6e6ZSokiAynKmeaw8Q1Ug3iyW7PbqWSIu4%2Bbp79LImg0QIylypZrxZDRjyo8jsJszWt8MVoZGUrGkKdX3XzAJrMjX9pw4AHvXDPGEkRAxER3CaGp32HSAW%2F8RtFbCT%2BF1fvP6UIGCmaP2KiUxhyye4NR%2FeRZ6EID387xXrWaBVGMX7tyKH64MaIzswf%2Fwkx3ODPyggWSTRWMw8ZzDzgY6pgEvgNwQhzKDkgjjocQkQFdEVerA5r9eAxh4q3qwx6hQNF4aSXNITPd4wKbyGYqp%2Bi2CPUJ8E72ZqOb9IQ90E%2FIbQQHxbw73uOHlAgOtdJoFck7l2YlOOC%2BxGmX2JUqkVtjUwR%2FbrhdVY2Mr%2Bwqe%2BWY4GOLG9LLavBs1I%2B%2F2WRpJGzGvzd23utNMy5BQjCEt1OHMjZSGTQ4tb545sCH990YbeeC%2BZMOJ&X-Amz-Signature=8264304300b16fdc5d6fef8df2b1cf7e359be93f2edf57c4f8a5e46efbf25bfe&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SXNFXIJZ%2F20260404%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260404T111744Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIFwGmO2muuQuZ6JOuiNcarJX0OlHMYgvLjkLvLsX%2FOp7AiBA1B1aEvzNv95kq%2B9maZCOvN5l2ITiMKocvZK47fa4CCqIBAia%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMtKasb8fDPCjkavnKKtwDFsOSGnd59ZyLIplDyIkjXL9WHbvWH8Zdp2WphCbEGOBdStIsJlLKsIEYzGu7iZawRIhFziLzHJwZw8vtzNmvnZwc1FuVAFmYGj%2BG6QrKEbGLzuCtQLDBsN8w4hUAamq6E7UGLVjXkjdsKh45w49oPxPH6un6D6MBJqNWJbPfBuTXaYLOkTPR8PWe6ImvLEgUOY2Jp%2F4lBOPR%2FwTn2CsxUdV9VDrCVGLxJGb2Rstpl%2FKzD9iPvVxrMjIWx9gKwn223q7PiYZ46yNRR1mPQiMK06DbCgMLeXPfgNT5sUPCx6dcLCOYQCRNAw%2BjWy9jM5gvzc2qu4YpXWvJXjq4%2Fw8t2qq8lnPGG94qDQmV2KnvZOYoanaU3ZusL77NPhsClJ4w7PpoFwiXaNwcFxF5%2FwYQYMtwuwqI%2BkR43Y2kTaRl0ovdcCw6e6ZSokiAynKmeaw8Q1Ug3iyW7PbqWSIu4%2Bbp79LImg0QIylypZrxZDRjyo8jsJszWt8MVoZGUrGkKdX3XzAJrMjX9pw4AHvXDPGEkRAxER3CaGp32HSAW%2F8RtFbCT%2BF1fvP6UIGCmaP2KiUxhyye4NR%2FeRZ6EID387xXrWaBVGMX7tyKH64MaIzswf%2Fwkx3ODPyggWSTRWMw8ZzDzgY6pgEvgNwQhzKDkgjjocQkQFdEVerA5r9eAxh4q3qwx6hQNF4aSXNITPd4wKbyGYqp%2Bi2CPUJ8E72ZqOb9IQ90E%2FIbQQHxbw73uOHlAgOtdJoFck7l2YlOOC%2BxGmX2JUqkVtjUwR%2FbrhdVY2Mr%2Bwqe%2BWY4GOLG9LLavBs1I%2B%2F2WRpJGzGvzd23utNMy5BQjCEt1OHMjZSGTQ4tb545sCH990YbeeC%2BZMOJ&X-Amz-Signature=5ce2071c0a09f90417ddd24079c2a2235286994d7c72552c897d299ab6ef45e5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WOZZ37NG%2F20260404%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260404T111736Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIFkT%2B1FNyKJJ0DwZRtloUzck9af3gTeT6tNb43BhtBilAiAe4iPSXByrPKYLjEFLL5nTLcQQryXM2GRbMcDj%2B9XZRyqIBAia%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM5HFfqOZ6yU56CEFnKtwDzwMnOsKxvF1PaDhBtKRM60eBgx5k5pXNTxsisN681KGyHHryFpEpHmL3iwauWuH7jherU%2ByWMZuVPXe8ktdpMxdk7JsO5bdiYqEKa1x5P8mUxIJKPY5mY13sjNkT2%2BAmEP7G1vjKtySdMqcLkG%2BknP%2FjgX3cKO%2Bg3iYHNX5DPlsahxDkiAwKG8DjlwdjODGbtkevZn7kpZEzJ99Aed2MU2AsUbUS9T0seOxmS1hYo99FY53BKrPmUYV8zMm1t%2Fwo6YFv86pKNPvbDd8yxdM8H8%2BbjNB6SP%2FgvCOkfhZKLuLlhVWhteBB6gKpgNhSc%2BvtWtXLe1T5lAdM3l18mMGwF5XMmC6c2Lo6x8TSbxgkNh28VLoyao3UN1yYNFqyGgKcabgzPWECKgU%2BGsMM3YFxFl3qPrmKZQfy4YWF46HhPqBdcZ7ICJVxeEZhWjGV4pBUzbvyIEd32tcRFPn3TZ1Tu9imcEwOtX89fUZcazwLcgmu4clDZx8yG9d%2BGYTTG1FaBSdWDstvqFTDq%2FnrJ1IAsGy34LccADAipMhNhJMVMcYVVwzxiqvk32v%2BOiwD3S6dMRR4Ds%2FfYdnGxulTtscAzI7kV0wHhS30WIptcoViHRG2iSc8j0qOMNFouJEw8JzDzgY6pgGKDT34pia0bf1zwAbIkWb31pNT%2FPeNWZK55jXpQkd6vpAjphqadoWc57f1x73tXUbp5o9I6N3%2B0f1sUJ7Og7Um0iF%2BWw2gA8qDY0rJl0lWi%2BRbRWADNtOVwt%2FhcP6xkN2Zn9BNkfBGk2vxC3QFFnQ57uzNFZUZDPiuyqmhYGCAVYX7dt3xeaOjhuX7yxKS8K%2FGby3Tl8JWojCDZUV8bgU8Kw9GMAk1&X-Amz-Signature=9e6cfdf52f1414254aae40e37bba7876aaf1f9473f680a48b835b99840e7a8e0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RRO6HRJJ%2F20260404%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260404T111745Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCICm9KDAuioNCTii%2BS7IO6wHIF5RjADXaK9HtgfMfOjyVAiAb0QHyyHe9wCypq%2BFZWEIXvOpFMwGkFeApNSVpJzrxkiqIBAia%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMSJZbM9058e13IldFKtwDY2mvP%2FvkfAQ%2F%2FQDlpu2ZcFBcHK3ORuRE2sAQmQO0%2BboMhqOWf9X%2BBP1suF93wbijQx1kKqWh8oDVoB1ZT6V153i6Ir30dKozGArN51eLqzdMVHGl%2B2jxSf0qYSBxDzw5oVGuSLuiY6AzIv49vcpFdYwGRrKw%2FVyBCSh46P15%2B%2BXgoyNQgAwxSviB73P7G3f32Vs5eC13HpQ%2F8dbHwk5cgo%2BUXZQHnBqF4ZWYz8zC1RCbs5%2FlyFv3CvBINh8j%2FRzbsTyEUpZs9t97SVA0q55xaMhKEn1Mr6AvmL9StJdlo2znOUsSskZGA%2B3LtI%2BOGtAu7AfhfpWWYclHFxey4qVEhwIxgZa%2Fy6Da%2FjaTeWPAQ%2BGc0LpOX3jdjqPCRlSyXuWVf4f5YFXB8uejvHircWMIaWUUYLyXasSg%2B%2FqtDIENDSIXgDWOC1Ot7%2FsKmYxlBQgQ2fvFBKcjdzMTRURS1AZ08z%2ByHDo43it%2BdxuVYThU2MkHrBrHRAJQcgXLuNxaqWPlv0zHX4Sm2rGkb%2F4UQzitOkXuL6%2FWcM4NBA4GcLToN1b7lmg5AxzqZIj8KXee70uEZX8YSM1GQTS5jB%2BTZCz6dLzqh3kDuZOfe1j0okCtu3ujEL0ZYDMwFD2I1H8wvZ7DzgY6pgGkuQU3cWqZBCXV5sMZHK4bSPYgXoJPxV5ooby4yzuDHE9VAZ4msQwa7VLCuGwF4bGfubBQSAFk4lQwUmWhghnttdfqngAmLGzhpx%2Ftt%2BmrX6eyn4D%2B324H57UHzGVIpABabHtg9WtGmHY5f5tW5%2BfUnACDtCgzlTF%2FUJCF%2B6qucPEQTDwTCU3CUet7JrDOLfDa5zH1SKsOsTQOam%2FZ3ysbLHTdJcZL&X-Amz-Signature=c2eb2ef732c399e6217b5c817b8202b9a6f4b02506b19c6c938144361dd72046&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RRO6HRJJ%2F20260404%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260404T111745Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCICm9KDAuioNCTii%2BS7IO6wHIF5RjADXaK9HtgfMfOjyVAiAb0QHyyHe9wCypq%2BFZWEIXvOpFMwGkFeApNSVpJzrxkiqIBAia%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMSJZbM9058e13IldFKtwDY2mvP%2FvkfAQ%2F%2FQDlpu2ZcFBcHK3ORuRE2sAQmQO0%2BboMhqOWf9X%2BBP1suF93wbijQx1kKqWh8oDVoB1ZT6V153i6Ir30dKozGArN51eLqzdMVHGl%2B2jxSf0qYSBxDzw5oVGuSLuiY6AzIv49vcpFdYwGRrKw%2FVyBCSh46P15%2B%2BXgoyNQgAwxSviB73P7G3f32Vs5eC13HpQ%2F8dbHwk5cgo%2BUXZQHnBqF4ZWYz8zC1RCbs5%2FlyFv3CvBINh8j%2FRzbsTyEUpZs9t97SVA0q55xaMhKEn1Mr6AvmL9StJdlo2znOUsSskZGA%2B3LtI%2BOGtAu7AfhfpWWYclHFxey4qVEhwIxgZa%2Fy6Da%2FjaTeWPAQ%2BGc0LpOX3jdjqPCRlSyXuWVf4f5YFXB8uejvHircWMIaWUUYLyXasSg%2B%2FqtDIENDSIXgDWOC1Ot7%2FsKmYxlBQgQ2fvFBKcjdzMTRURS1AZ08z%2ByHDo43it%2BdxuVYThU2MkHrBrHRAJQcgXLuNxaqWPlv0zHX4Sm2rGkb%2F4UQzitOkXuL6%2FWcM4NBA4GcLToN1b7lmg5AxzqZIj8KXee70uEZX8YSM1GQTS5jB%2BTZCz6dLzqh3kDuZOfe1j0okCtu3ujEL0ZYDMwFD2I1H8wvZ7DzgY6pgGkuQU3cWqZBCXV5sMZHK4bSPYgXoJPxV5ooby4yzuDHE9VAZ4msQwa7VLCuGwF4bGfubBQSAFk4lQwUmWhghnttdfqngAmLGzhpx%2Ftt%2BmrX6eyn4D%2B324H57UHzGVIpABabHtg9WtGmHY5f5tW5%2BfUnACDtCgzlTF%2FUJCF%2B6qucPEQTDwTCU3CUet7JrDOLfDa5zH1SKsOsTQOam%2FZ3ysbLHTdJcZL&X-Amz-Signature=c2eb2ef732c399e6217b5c817b8202b9a6f4b02506b19c6c938144361dd72046&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664YO67G2F%2F20260404%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260404T111745Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCtKq05P0D7Z4x%2FVyPom5vcT0H4f9Z22WZAVj%2F%2FuZxwMAIhAKXpF5ytFra509%2F68jxUtra5h9STe4UBWD9cUlmbpfMiKogECJr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzjmLHL2gxk9Le5aaYq3AMQgpkKt%2Bk3rDomJWqdDUch5iMk4ZzBOI90TEw8CrDi9r%2Bu4LUjk9a%2BHf9V1%2BlxAcujJ8M4%2BSJLAANWIVRV0dsKVFtZ42DQjpYWLSNrOEho4NEkielMMdqTtdGlJb6yT10l46KptKhf0e8t5%2Bfi8PTIKIMtxsji%2FYJbpvtpgrgD0bIzWBAp2ybX8EnP%2BuCF0mjRUPlMjdN9YokQO7GelsQleO3qBdXYpAOi7dGf1kCTPbNqHkTeZX6NDcdZQW4oxP6nU%2B08u%2FVsJjfYPGod8nfIU348zppiyS1yio6BzlHO6HTUxX2v4%2FCakDHg0ZVU%2FpL2CvnXDZegS42UrGUMBeIuckFgKpThjzN1PZRwhrOcs0ftu05E4XWg6rswEniqWtNXBTn1BhVCeMSLLhd%2BySnaU3I7FzmCHddrXoz8ZWEsrPVHmciaAMAE21HfrUFEn4L5VHVqBUK3gMypJvYSUDODbSzf7h8XzcWhs9GK86uowA12jul%2Bt9frSDztiWJSyVlh7nJKf99GEO5WIB9J9LKeBN3UPumunvyxd6pGQ0P2Xv%2Be3R2VKl9DSOGE69u4jF0ruGXoA5rlizFwC7vIP%2F0XvN9gzgXMbl2F6zK5TuF9AqbU6jexWwiklKmEIjCnncPOBjqkAeaAEHJvAYNphZDjmJ6n134tUjXNiN8Hk0gxCJuv1wBwrl%2FSGtfuSeFQIa5M9sQ8TAL2XyAUWy0ybMwlb3ViVmgNyfEZmhT%2BLrahe%2BNdCmv64l7f32TUrkNftsDhNAEiAM%2F2mEeGGuPOnooWBWx3b%2FTo%2FtHDb7MQeqViXjI2VQfaWngRTJggggxw4T2F08FCNNb2a%2B7vx%2FLA1wCLwmdrX6U08C4n&X-Amz-Signature=315cce7b1b76f6b3df9d3ee59b4dc771a0b2c839349dfb36360de767f1901b1b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

