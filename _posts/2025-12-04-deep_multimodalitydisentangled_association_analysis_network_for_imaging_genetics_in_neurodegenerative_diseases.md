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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZFTIQNPW%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T005702Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEEaCXVzLXdlc3QtMiJGMEQCIGYwHQzCb8lDupSTS3cPnQcJXSPqXqjpKHZu%2FiQdKM4oAiAh3jCvIUcjUZ6NZKvpRVagNVrd3PnTFWkX%2B0%2BfWHVQSSr%2FAwgKEAAaDDYzNzQyMzE4MzgwNSIMGlXShy%2BYU1OKHthOKtwDA7wKW4shNcNKqprp7vBlgN6RpypHmBa3lrI6t%2BQL5djH2pyoLZMTRVF1OXFgKo1jfNFym9QJoPOJRnaajvdyrlQqm75E4RFIdmKdBlc%2FPoa9cl1i4KwUwtPoL3JrGEIrjvyw10EmbdZdWHJ3a52LBf5g4STzYeVh6xIx4O0fjkUFRZ74UCp8BfAnFWr8YdTif9omoaGPK9PlkBBnrKjbbZ3hu9tvn0%2F%2F8ZFEeTHxniPpOjWrAFly6akHIl6wXas5LTPAY%2BUAxLikIwVOKPUk3fcTIQTul4PimaRnJYme3eqPtvT5y%2BEA8epW4WAIPYTA59ZgpxlvhHR8zlYW1G2zaqQauSW%2BpvO7yz9bNZzkUYd38nTbKwm147zQ6rjjE0vpmUhvD5LzMorBR2aX1hGldofo1jAbyf1SE1Mk9k%2FNwFe08GtxySPgQ2VlyKUGqHqNorqgAAIA9Cb3Np1m5dhHese1ELxsIBrxNk8ATHgqcrpYcPaQppeS0tHgYnAiFFCny5Tz2iit6K0bhEzYrttbaXCVr0zp4hoeGgTytvzMtqQfB7niGsB%2FA5yCg4%2F1EgGnTtJU40f%2FTTjCGMivDEnabM8%2F%2F5g2j1BOigE21zKTSQcmNJ3GI1ixhc2l7Eswg%2BPbzgY6pgH2DoC8nehbj8%2F8JXcvG8PX0cHA%2BgUTqgxKVnbDlAAy2OUSBB00g7VZKPBb9T8ux96wJfxrp0zHPD0gfhSOWRjQQVPRHXBOszSS2T7ff%2BfmN67B0qlu0O1XK70Uy%2FOGYB95Bg%2Bqsryl%2FuNPl%2FsMIViy12Ri9%2FubBWeIgx1JIt18FHMuxuYUyVbmPGRvp9Phg0nehtilkCNQ5HYZnanCuruTraYbaaSH&X-Amz-Signature=97b67e2dfbc9dd386d1a9e76fc8be6b77d733e8ab8538828d25d634cdf2f492d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZFTIQNPW%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T005702Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEEaCXVzLXdlc3QtMiJGMEQCIGYwHQzCb8lDupSTS3cPnQcJXSPqXqjpKHZu%2FiQdKM4oAiAh3jCvIUcjUZ6NZKvpRVagNVrd3PnTFWkX%2B0%2BfWHVQSSr%2FAwgKEAAaDDYzNzQyMzE4MzgwNSIMGlXShy%2BYU1OKHthOKtwDA7wKW4shNcNKqprp7vBlgN6RpypHmBa3lrI6t%2BQL5djH2pyoLZMTRVF1OXFgKo1jfNFym9QJoPOJRnaajvdyrlQqm75E4RFIdmKdBlc%2FPoa9cl1i4KwUwtPoL3JrGEIrjvyw10EmbdZdWHJ3a52LBf5g4STzYeVh6xIx4O0fjkUFRZ74UCp8BfAnFWr8YdTif9omoaGPK9PlkBBnrKjbbZ3hu9tvn0%2F%2F8ZFEeTHxniPpOjWrAFly6akHIl6wXas5LTPAY%2BUAxLikIwVOKPUk3fcTIQTul4PimaRnJYme3eqPtvT5y%2BEA8epW4WAIPYTA59ZgpxlvhHR8zlYW1G2zaqQauSW%2BpvO7yz9bNZzkUYd38nTbKwm147zQ6rjjE0vpmUhvD5LzMorBR2aX1hGldofo1jAbyf1SE1Mk9k%2FNwFe08GtxySPgQ2VlyKUGqHqNorqgAAIA9Cb3Np1m5dhHese1ELxsIBrxNk8ATHgqcrpYcPaQppeS0tHgYnAiFFCny5Tz2iit6K0bhEzYrttbaXCVr0zp4hoeGgTytvzMtqQfB7niGsB%2FA5yCg4%2F1EgGnTtJU40f%2FTTjCGMivDEnabM8%2F%2F5g2j1BOigE21zKTSQcmNJ3GI1ixhc2l7Eswg%2BPbzgY6pgH2DoC8nehbj8%2F8JXcvG8PX0cHA%2BgUTqgxKVnbDlAAy2OUSBB00g7VZKPBb9T8ux96wJfxrp0zHPD0gfhSOWRjQQVPRHXBOszSS2T7ff%2BfmN67B0qlu0O1XK70Uy%2FOGYB95Bg%2Bqsryl%2FuNPl%2FsMIViy12Ri9%2FubBWeIgx1JIt18FHMuxuYUyVbmPGRvp9Phg0nehtilkCNQ5HYZnanCuruTraYbaaSH&X-Amz-Signature=97b67e2dfbc9dd386d1a9e76fc8be6b77d733e8ab8538828d25d634cdf2f492d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VXLZDSNG%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T005703Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEEaCXVzLXdlc3QtMiJHMEUCIA1aO936zG2%2FUpbHNNXBC0Q9WTvdFRQWEVqTTH1W9AQJAiEAwYj%2FGS7NYsYhJULTefPS26p5tctXnxkl1B5Dn9obvfcq%2FwMIChAAGgw2Mzc0MjMxODM4MDUiDNPlN6AnBrR5KVCfnCrcA3Yqe2g%2FlC6hMcILOWQ20FX5tQbWmkG1JVVgneHl8ALcP4lh%2FoCQN7UrDDp3gqAeLVfdDUn0uyJFrVCE%2BfOSxdfTp5N9yTCEHzuJuh316JgLxy5E6hcqn6C9DeowUZB0wqufSkMzuG%2FiBIfoPZdVvD%2FFLAl3JZe5oC%2BsLW9iDNJG%2BZq04emspIe0LQ1dxjc8A8CWchihpMwZxZnjifUdzk%2BTrDZiOPY56d%2Bsf2RnmVdJwZiIdvXq1Fv5Q2GZSMLeTJJ%2BdBC2jc3ladz%2FVaxOGVRBqB5avRqzfuNNevdZasjmErMEWNpMDg7Mb1udYPgYczJoSon%2Bbr9BftJ2ThpVwPiJRCdIAPcTBmqRvYF6iLmaMe%2Bps6BEvUHwOPkkEy6r2S8Rtiq7eZlj4YWkcHi%2BR8tvTNv704mrZuiBfF4ssdRpW7%2Fh5TQTKqCR0J%2Br6F%2FGx7A%2BRzU8EVzdwIVf0qIgZMMKn4%2FHfdvvTr69fZxgpBY8GQGCVpfOC95R6khcGYEgnLAeMDRBVrkl9RDHnyGW00Q3ICTG1L6FRfJfFUjZiues00t4e7hysos0lNkjI4%2BL2V1D4vmCF8cLAqUBbymfn6qBUHUlNo01g%2BfPRcKIwtzPxgFT69PkGMbSLskuMLfk284GOqUB8nTMmP0nQE4yhXRe6PoIObfg0fWjRbxp9tGT%2Bp5WgfGK%2BHWHEkkQdbRcD0YYB%2FyEeFAXH3I%2FWInJ2BqP6artNc1l8WOEfCy8DZsyWwKrn0X%2FE0AW80jX0JujEvNMdRUiozTf0UxY9HuMS0fYGZx7KpCgZ435TPwLcoqAGRn2uAwR7kaeB0PTHq%2Bieleo6e0YohYjZhO5%2Bn3MGxAZBmJIVcVn5DeM&X-Amz-Signature=f4f822fbdc5d1159aa7436341fcbfa34f5dba55ecc53f3199697aae975b2e8dc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466R2QC4F33%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T005706Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEEaCXVzLXdlc3QtMiJHMEUCICvB38cQ0HOck1acFdkR4EVazCxjjeOJiEgIC1Z%2FrqtyAiEAjDioLKaAQgPlhfw2m4UOpR6CzHyNnj7satcUBayF48Iq%2FwMICRAAGgw2Mzc0MjMxODM4MDUiDPZ%2FIczrze85A%2F9k3yrcAwkAXGgZsATVZGsYWEe1wQrs66lxXix77f%2B8XnYLBAd%2FNCggZf2JTyg70bXpLwoibJIAQmPB9RHrXyaXgX0C%2Bkkx29M1wQSRErGjvnq2R69kCpOwCuf4bu5A4c2RBNK4exk7mYEPQyKiySkEeHA0tVEGS8AV1RtWoScIfVIB2i2DkkB3c%2FkjR9NnnWtewDoIjuL%2Bkaa4iF8OsloRpEDZjh6wfyhD61MCnLwFey9NAhQEhcz%2BNgAKW2qV6TSsF%2BSBa%2FGPR06OgjGSH%2B7gnbbV9MEKnN0NBeCpQaxbXCheigQH%2Bs3Q98IxwBkUSpolrkgiMZwUGLRhcUEENScqTiqrYdFvhXnt6Ywqjy5%2B0Tveg5XnZTu7T2nx%2BQW2RyJUNLk6KYH%2B1ErrOhrWOIiMzlu5zz5e7LHkHS8q1l1zqcWiHDbqGid%2F8nak7CuwIvilon4d1rXJuFLpt2uRmdhzuBnKIEb0NWeEGMGoghcZdkljK8IHuF7hV1BhfrRgpGhEsd%2BrxMqVCI3BwaA1mcPhzFwQ9s9aJJWjNoEcZ6LTi3k0csLvJCZnap7oY1%2Bvw2HKfqbW3bo2q%2BS9Nu4g1iNi%2FzAIs4HQe2hrSpDldMgWhLedijj1WFeezOoBk19MPgx6MMbh284GOqUBlqT%2B2C9QvaSJdzG3yf9pUNHncziWkxRbP1CCtH2XX%2FlLiFeM1dqz52ZHz4GbQHMwscwpOivEeuS7uDG3auFPyeozPdUyM%2FsevXYOFmVZUhBx2oGVdalOpz9rDoY1FnGkhNqmcEo3i4dko4mulf9hlj4yN6w%2BQzXi7KGb8yWg3FgEzyAO7igESgn4sm7k4mBP6zU2UX1GE3fbdP7Jd05u2tL%2BRjOm&X-Amz-Signature=59c8e5acf0e494dfd25c5b23b682b80202acbcbfab990d5e7f876d2005b04ef0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466R2QC4F33%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T005706Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEEaCXVzLXdlc3QtMiJHMEUCICvB38cQ0HOck1acFdkR4EVazCxjjeOJiEgIC1Z%2FrqtyAiEAjDioLKaAQgPlhfw2m4UOpR6CzHyNnj7satcUBayF48Iq%2FwMICRAAGgw2Mzc0MjMxODM4MDUiDPZ%2FIczrze85A%2F9k3yrcAwkAXGgZsATVZGsYWEe1wQrs66lxXix77f%2B8XnYLBAd%2FNCggZf2JTyg70bXpLwoibJIAQmPB9RHrXyaXgX0C%2Bkkx29M1wQSRErGjvnq2R69kCpOwCuf4bu5A4c2RBNK4exk7mYEPQyKiySkEeHA0tVEGS8AV1RtWoScIfVIB2i2DkkB3c%2FkjR9NnnWtewDoIjuL%2Bkaa4iF8OsloRpEDZjh6wfyhD61MCnLwFey9NAhQEhcz%2BNgAKW2qV6TSsF%2BSBa%2FGPR06OgjGSH%2B7gnbbV9MEKnN0NBeCpQaxbXCheigQH%2Bs3Q98IxwBkUSpolrkgiMZwUGLRhcUEENScqTiqrYdFvhXnt6Ywqjy5%2B0Tveg5XnZTu7T2nx%2BQW2RyJUNLk6KYH%2B1ErrOhrWOIiMzlu5zz5e7LHkHS8q1l1zqcWiHDbqGid%2F8nak7CuwIvilon4d1rXJuFLpt2uRmdhzuBnKIEb0NWeEGMGoghcZdkljK8IHuF7hV1BhfrRgpGhEsd%2BrxMqVCI3BwaA1mcPhzFwQ9s9aJJWjNoEcZ6LTi3k0csLvJCZnap7oY1%2Bvw2HKfqbW3bo2q%2BS9Nu4g1iNi%2FzAIs4HQe2hrSpDldMgWhLedijj1WFeezOoBk19MPgx6MMbh284GOqUBlqT%2B2C9QvaSJdzG3yf9pUNHncziWkxRbP1CCtH2XX%2FlLiFeM1dqz52ZHz4GbQHMwscwpOivEeuS7uDG3auFPyeozPdUyM%2FsevXYOFmVZUhBx2oGVdalOpz9rDoY1FnGkhNqmcEo3i4dko4mulf9hlj4yN6w%2BQzXi7KGb8yWg3FgEzyAO7igESgn4sm7k4mBP6zU2UX1GE3fbdP7Jd05u2tL%2BRjOm&X-Amz-Signature=cbe994ca8932c9370498d47b3c626171263f6097b91d719cb25868e67dd0b464&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665GNPNNLV%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T005707Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEEaCXVzLXdlc3QtMiJHMEUCIQDVO8WJI187d8SIbnujQGryLmsoeS11vNYgwq5u9HyViQIgSAldADauiGb336WgcFQN5A7F1iRmc7wuQTZxsoyUqFQq%2FwMIChAAGgw2Mzc0MjMxODM4MDUiDDoUXChOIJt1Hy0whircA9BF7QC0DLXfke1YXakKnAQSEC4sD%2BvFDxE0FsC6c47TAGtTY8ciVbbfgqxViE9DsMgbWQAtvJg%2Fy1viyGC1m0hZTYPxy5kbw0Hs32VU1cw%2F60fzRoxfFBHsp%2FczBYNq7FLAkzT5dobeV2Ba6R%2F%2FR4OFfVLA98OsSPPUU%2Fa3tBIylAtNV3mk5VKLroQb9guQ0X3scK9uvVWi9uW4uCuOWbTeyaAc8ZjXph6wo4uaK8Y03y2qE0fIU0i5n%2FnYSNKIYCnsUy6G8gJJJ1k4VywTM%2BRfCdDKh5uVI0JlU5W8JddUhqK0H9l6Dh60S%2BpHZAB%2BOb90uQJUGiMcusyGv%2BHqaTIg0E4bY29pWt28Pa4KiHU6SkfKsv5YSwelrtm2voB%2Bdx%2FGUDd%2FDfAHVnSSenGd9Lgn1am7cFa6r1A4C85VFvxCt5wTeJUkcnH52gx8BjuraBWSB6K79petjk6HLZFrNeQJNmotGqHNVx6kx%2FU8Ejb62aWHuv6Qo4RnVQDVQFmy52dXbh2o8TwENJRGB5rvlvzDUSIQeexvXXKK1xQy42jEEzu1obc39x3vk%2BjRxMN2Hn7X481SuENJBXwi7p2pBjauEawcxQtJlLWtsVSrkBdsT9XGX2zjExC2Clo0MJ3j284GOqUBiuGylDeOXb2KxXeFfe0PufKOZkP4Ssu2KPb9AybRVTnutw6iweO3%2BHJXvK9PdNlhz2e4UMqmhbNc4GNDIW7ZgNJScKZ6zTg357dcw9EYBL19ulR%2BUpRisiupsELez14DPqJWufnON7uObACCvnxCj7GGK83UkEeTJdNjDu9njUz0GWN1p9AyNcf0KHcJUoKu4taFjmnSDMSMzi5NMGp6y40FU6Me&X-Amz-Signature=d5c1f1acc20938b7a96a70a85adfd5bf124656ce64f0e5da5e6c7fa0c8439767&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664BPYPLP2%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T005707Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEEaCXVzLXdlc3QtMiJHMEUCIGbtFmcIwPgxpBBgEnccFXl%2BpFAT2F01bSZ2NtaTsq8GAiEAsg3ixXqZMmVKQ1nMLHM2IDaf0kv4W%2FNshybrzehdsdwq%2FwMICRAAGgw2Mzc0MjMxODM4MDUiDGeZMr4dwP0MWarc0yrcA3w0sHTJDai5xVnZNk49XbEPz3lHZEORB6yRbN4GwQjAzZvRT5edVQW4abEjc6izxSmJHKomkIF9ZgdN9dgPJppN8ZZWdY7Z6DS1Lcnl9D0AzXogMLPyoutajWLozyDzwluXZ7vVFrUBJVmoAro%2BjfMszcHZY7VwACxrI2xoSgr6MD1sM9%2BlEREmlrDmGlq%2FJK2JXEG9yGvM7Jo5kH8WqnhI7ApbS2VNy6uEcuoqdKL4qU8SH60ZNNfIN8pPUgVP28usviPNfGAnbR2Pupf%2BRmaAmYyxRvDKlYoOZIj9eNR0Xr5uL3hOLid49Q0fOHWrgMgMMalJKsErtyL0Jm9rPKlnsCtpt3MbMpsdy7vEj1gdaoyC3pn2GAaIxEg2nN1bpPjuOwNeFA%2BqiMSspjnHm10zS2B0Nm7brRrIkkZNzwkaXSJntq0oMDxAR9gO7Io20ckpnMntjont55qRsgVfJevjOvItzdsnO6rI7GnYkKECZ%2Bn4zvvr5uJYA%2BSH%2Beg8FAboCYpbv8t8rtfyiNooXe88p8WVQS5O1KP%2F4peS4DB7nZBVYDhljIJLzhTetV5IDkXqNNHn2PB5GJcuukga7MZBiTxjrIJtCTtD%2BeeltSZbyA686DRZemSoSTWKMOfh284GOqUBU9S8SCd2uuvoda9SqiIT%2FNw4eOFb%2FOSqaeRtjTqrwRF2O3GrTbeXEkmnbPxUC0kKOrb134qiqchH2HVXOdwYwgqrkI1HzLl%2FJ0bylMFk2dh60KBjq%2BoUv6Nky1CDK%2BXTBaxysWK%2BKhc%2BH1%2BeRy%2Bjv3n%2BHRjR%2FMwU1DP3FSoWDeC%2F1qFWZu%2F%2BC4smf%2Bo9xb3IhkkzKO76bU9bUMLTbN4sy3iBTYgR&X-Amz-Signature=a08ed8db456182ac0300ed3f8fb66123aa283a552a68c96406865cbb94c3353d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WQ5DUDL7%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T005709Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEEaCXVzLXdlc3QtMiJGMEQCIFuxpfEMyG8yejWT3bj5EQ53QkweYiUG%2F%2BfOVkX3ktZsAiBcAVDQ6b%2F1A6OWRLSxfhVJyzGe7D8ZZfjHEg79nxgE9Cr%2FAwgJEAAaDDYzNzQyMzE4MzgwNSIMsVChpRNzQwUOELd9KtwDP5EteCIHjdwo0TcdLlA%2BEjfwKKrimeMB51xfm5WqzuDSKH4PJgQcTTdyP5R4CTeUL0JxqQXaMiNZ%2BStbUHBotgixKGFs%2Fzi2AdXGDIyZC7%2FJDGIO1KZudMCyXJEbt8q2kxP4cz77xBE5Qz0frVxki%2BDsA3UMfL2RbATUJhbE4AOJdt1YOITNKvJCLKTPqmu%2BUPjJ7hvgLJz3fxF1CnmnsY%2Bxle%2FCinRiox9dxuFuwnvSbCsnNhm5S0%2FZNRKQLLyleHdCwYRqBKiaDOZvxGDLJA5EMs4XkdxI2wVP3GCnczGTT30SMNq4Tnh39QuOzl58lR385wb%2B7tQvxiUZTV%2BqmIRzghaMQxKvImjOT8sWEw1d5K61XJTD%2Fb%2B0WCsA1pPZhC6K8G5ifPO2%2FwODr8RpDkkJ%2FLifG0hhcqzuyoL7NhXa4qvqmTnwKIg9s59pYp1bbuzmFF5%2FJAbabxfxnjtNv13fSIDrXtJeesYlCVpvSOTru2cR8I4WF4%2BJwEkg5Y5ASAYZ3i14%2BamjcCAvTdWYLVeVAck9%2FZ4J0RLx%2F03Qo7bd46kKiTvI9UPoE%2F42JBROyEQ4GjxedRN4M5OZuOQpfl%2BNHyFg3DMxJ43d8vwMQY6dJSKidq4YwwCe%2B28w3uLbzgY6pgE7DmcHSEIN8K7Q69NWCSLsKwYRVQ1KMTWVD%2BNtdyIbMHg7lJdMuPupkcP5zbSr2jw7lVvu%2FdsW5LH0ZpW5vJ9EdFVUEv2mBQvt4LrHKn86FPVEmRkmCLcnPJSJCVDIdgGlEULI4zayXREyAlUvZaVK1VAR9rG%2F4V%2BZ0ypUgewyTlZyV4%2F3LO12f2a1succM8m%2FTxImOuD5%2Fs8kA%2Fpa5Lqoda2g3DOv&X-Amz-Signature=fada56dd836699063c57e835d5b213c5b46ac53b5fb6592d5297f8150ee8e026&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XFCKAW3H%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T005710Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEEaCXVzLXdlc3QtMiJHMEUCIFHY6w%2FDhiHH%2BcWfnZc6%2BEg%2B4jK6IbDjmxbEG1jdTsU3AiEAuIbwPf6NIKdTlwZEs4yoXemmtECIOtST%2BVt%2F7mzjbMgq%2FwMICRAAGgw2Mzc0MjMxODM4MDUiDDrE4YkItf5ReP5DXSrcAzOfF7eCVKVz5DW157Uz2buwosMGR%2Br%2B3D66qvpGSG%2BHcjWntLpMoXgOPwpTQ%2F%2Bp8L8qiuG57gVnaWE5%2FnMGE6yuQkhL7kw1EGkNzvdLyidh3xGMs6h4wqC5kOt2hgOjjFzE8u2tGJuOdqI%2FlsFvYk8EStYCzkRjzBvsNEBTIHPjFbVF4uur%2FPjvG06YD9DqRb82VJSbm2j6KpfJrTxRrRtXqeHFY%2Bzv7xxYbI58oJvKfbx%2Fk4jRp3VvM8NAoYUxxL8CwcrzL8jGuyouxUXNINm7Sev8QEcgZ3W9LuDalGpQ6TTGSx2aS5hFif1SGpoLT8lKMSMmOu83k0Q8pPBSsiAiaR%2FycYFNkJvzEOxW72%2BV%2FMTA%2FLVJNM0uF0WZxo2B%2B%2BhNpKXSRAY4hiSWtOsB%2BPN6XPltYhqWuTa7lqCNaZBocOo89%2B%2BdxC84fTty1VBZ528tt9DZG0Jp1B8LK2EYDkptDdRCnShYjPp60wdT4diiNW9RvulF9NInKP2TZUvQwRxMLv8x1AYeSL%2B8pt8%2BxwMWbnDh5OlMah0jXvokAQEXKcKuK9o8ZStXINI8L2HBUQVMuCZyFXE3nF4mK6nNfQIUEW4ywmpAhoa3adyeqNDkf%2FV5VJpZ5ElZdon8MJ3j284GOqUBRIgXayfBvCaPu8N%2FnPY94P%2FmRokndRHaX4ONyIT5UBXD7JV4ybUOXi%2BpIJiNEb5S3bfaMy2fndiKkbnKPXANKpNVryE7PIDleg3i8HpE8JvVSfGjvnwyAeTEVS3djNw5GZQcH9H6GQutPNcV7lYHlmwIZshv8C5cXv%2Fmse4tecoyoVkyCPmzHGJa%2B0uQr9EG0E22xHCE2Fiw0M91YxPTzSvBh3jm&X-Amz-Signature=7d521b86a574ffed0b082b3d2772326c869d49499fb20d3375cca09ebd730e28&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XFCKAW3H%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T005710Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEEaCXVzLXdlc3QtMiJHMEUCIFHY6w%2FDhiHH%2BcWfnZc6%2BEg%2B4jK6IbDjmxbEG1jdTsU3AiEAuIbwPf6NIKdTlwZEs4yoXemmtECIOtST%2BVt%2F7mzjbMgq%2FwMICRAAGgw2Mzc0MjMxODM4MDUiDDrE4YkItf5ReP5DXSrcAzOfF7eCVKVz5DW157Uz2buwosMGR%2Br%2B3D66qvpGSG%2BHcjWntLpMoXgOPwpTQ%2F%2Bp8L8qiuG57gVnaWE5%2FnMGE6yuQkhL7kw1EGkNzvdLyidh3xGMs6h4wqC5kOt2hgOjjFzE8u2tGJuOdqI%2FlsFvYk8EStYCzkRjzBvsNEBTIHPjFbVF4uur%2FPjvG06YD9DqRb82VJSbm2j6KpfJrTxRrRtXqeHFY%2Bzv7xxYbI58oJvKfbx%2Fk4jRp3VvM8NAoYUxxL8CwcrzL8jGuyouxUXNINm7Sev8QEcgZ3W9LuDalGpQ6TTGSx2aS5hFif1SGpoLT8lKMSMmOu83k0Q8pPBSsiAiaR%2FycYFNkJvzEOxW72%2BV%2FMTA%2FLVJNM0uF0WZxo2B%2B%2BhNpKXSRAY4hiSWtOsB%2BPN6XPltYhqWuTa7lqCNaZBocOo89%2B%2BdxC84fTty1VBZ528tt9DZG0Jp1B8LK2EYDkptDdRCnShYjPp60wdT4diiNW9RvulF9NInKP2TZUvQwRxMLv8x1AYeSL%2B8pt8%2BxwMWbnDh5OlMah0jXvokAQEXKcKuK9o8ZStXINI8L2HBUQVMuCZyFXE3nF4mK6nNfQIUEW4ywmpAhoa3adyeqNDkf%2FV5VJpZ5ElZdon8MJ3j284GOqUBRIgXayfBvCaPu8N%2FnPY94P%2FmRokndRHaX4ONyIT5UBXD7JV4ybUOXi%2BpIJiNEb5S3bfaMy2fndiKkbnKPXANKpNVryE7PIDleg3i8HpE8JvVSfGjvnwyAeTEVS3djNw5GZQcH9H6GQutPNcV7lYHlmwIZshv8C5cXv%2Fmse4tecoyoVkyCPmzHGJa%2B0uQr9EG0E22xHCE2Fiw0M91YxPTzSvBh3jm&X-Amz-Signature=d07783a4ad0239cd5f0203a4a7cc0b445d0461ce4b32d2a3a0ac1d7539b2250a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664JKKOTCL%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T005700Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEEaCXVzLXdlc3QtMiJHMEUCIH7cyYBSM0tpp5M%2B2lZgnv49OOvPi3FC0d%2FO9WRFArLZAiEAj4eUZs50U1GzJS%2By3VKt5%2B8tzNg03sxG10ZKhKv0fG0q%2FwMIChAAGgw2Mzc0MjMxODM4MDUiDI1mYYLTcVZOH7dT5ircA%2B%2BQsaooN36%2FUUiVT%2BRMAKEGQGWlEuTc0ZqN8dW9drbq3RnTSkVtlhW5zpaR9nJrdIjQTtfKeMY9xk5llTtdb0oy15khEFKKfOUi1nAlgDtdVjlSNM7YxH9FydVxJSsScxMsyYLpuRkSU76JC7WPUyn8XxyNj7UaD96aRqmt3XJYIGApUd8yUKu7cdd4FcYjuykNdozjif%2BeGoEtkerXLD5Bvd9Q9lSfqHzXg4jEuU1DBb4TBWWSa9XtZKsOQiBrpJ8pWIKaXBV9Y1BOkMoNtDogIO%2FO7ok0gGjanaicRF1GEEdU24xdQ%2BrTHBduzOkyPA4tMTjEIZUTQKqNtq1uFb0%2BPtnAkpOSkRZcyjK6YXLnO7S7etWkWvP7RuiKkaE6QN2Udu2bXY0aIubu7c69Sy09NW6PeVGQ5BotxTrieiRLj0jYaRondbicDb27QzVoGMdBJHtLhBvkBz9Fse1vWt482KUbtHE2OAGMA9%2Bly1SJVQXppjyt7OkbcC5aaGAtIrwqD%2FU6YGRDGLxG1oz25HGV%2FOCNI8VMxNPMBMSI7FPcZ8Avv9j%2FmSFZALY9NkvQ94YJSaDoUtO2gFDkC29VFB6zkUJIU4xSFqpLIvre31eYC4PR4Ckd9Nr9UpvIMM7j284GOqUBeHLKM7IWVXFsl8KtodYCpUOY4p3T3rv3bBiMQjhYBqakXmO78EQCROLit6Z7al2VIkDjTdFofh9k8RaryfdCW1m%2BUXjGwPGTWpUXBis8LR4tRFl09UnR%2FRyl7MoK8A9kTobQQz3DlLnkWU1kBFNh5k2iIlcPmMY8RhECOjcbJ1ceOfXyvrVlcIJzo02%2BOH4f9M1zSRBBn9ktVCamFTw44xTDJ%2Bwp&X-Amz-Signature=7c509cfe2248df1ec5c7b7c7a0fe41bbe0ce74ee172732d5fb20c73c4db8abbf&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SQCNUUOY%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T005713Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEEaCXVzLXdlc3QtMiJHMEUCIEh0zDTJgbcQpGBjdlUdWehQn9LJkByfuvnOOqM76AwHAiEA2WhJ3OUJTSCmGycuPZrYHSwkvwMZpwrB5KH0iiHPZYIq%2FwMICRAAGgw2Mzc0MjMxODM4MDUiDFGu1AIYIcSrlW58MSrcA6nFE1%2FgRS6sJZUF7J87OCo46Gb6dz5SN2tQM4S9tq1D43MOduzIPNAq4Wn1idaQ4eXjs%2BpWhOrlZnaNc%2BWV%2Fq1VsFJ3o5wdwRJl1lgFK9Q6VoNWNzV5NitmceCZtQflM5HrdcTgI%2F1f8DmbQSNe4aOQq1gjCj%2BSfvDwUCQfZ%2B%2FkGBthjOCR3eZrxwPzJkz%2F1HaYMY6UCYmI8EP63zxF2T4ewoajwicPYREUbY3xrbgAq19nlUpIjHf6sVmpSymD14s4TlXves08s4OSN0crDzy2%2FErjJgNFS9UK98uAklE8DoDf99c7RV2iiZ51MNqtRxhAczFzi9YWphtw2F9oqvsftB3%2FlQYi98Hu%2Bttcqh27LTutEwT9WtpggxqujDq008cfj9T37BXSeR9zf%2BDtRrq9KIMbgtEQDFA0aI%2Bt3MFmOB%2BQ1BVQ56sATJ1CHzknKvrYjd%2Bc4jhWxNJm%2FoVxHM47o2y7iy4S2i3xJKEaSJ4Ghj6uVtvvPSo980sQHd9gRjipWe7Mf4LdtKEzvpGE%2ByWWiohOpUp5xZH2CnRTF7f5ozk%2BiZh5ImClsAgP5%2BajQj0PjmBkv708R4%2BHBrvZW8EJtweA6VF7VKhEE5MrNEVWlBANBl76yo90lIgNMKbh284GOqUBpSfQHpOoEX6NepRLLo8Ulj8NOf0xgP9TAAVzpspd%2BRBSBE25C9vVCWrnM4HGvBvzWUOupBNlZ3uLe6%2FClM90WMOtwuFNDn5hSmn2fJ7Ad9pmgZ9vlmn0rqRE7mq%2B%2FQqzV1Rk9vTUgIjhdPJSI0FUzT5uELBflxA2QrHH2TQvwNIMMAd%2BTXSK5mva6pP3u4sOxzt589NnbTxCjFOvQNmcvrpqR5ag&X-Amz-Signature=8a489ed7e2618d62c3528a2a72352dc29b90c12394da492fb281968cd9ce514a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SQCNUUOY%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T005713Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEEaCXVzLXdlc3QtMiJHMEUCIEh0zDTJgbcQpGBjdlUdWehQn9LJkByfuvnOOqM76AwHAiEA2WhJ3OUJTSCmGycuPZrYHSwkvwMZpwrB5KH0iiHPZYIq%2FwMICRAAGgw2Mzc0MjMxODM4MDUiDFGu1AIYIcSrlW58MSrcA6nFE1%2FgRS6sJZUF7J87OCo46Gb6dz5SN2tQM4S9tq1D43MOduzIPNAq4Wn1idaQ4eXjs%2BpWhOrlZnaNc%2BWV%2Fq1VsFJ3o5wdwRJl1lgFK9Q6VoNWNzV5NitmceCZtQflM5HrdcTgI%2F1f8DmbQSNe4aOQq1gjCj%2BSfvDwUCQfZ%2B%2FkGBthjOCR3eZrxwPzJkz%2F1HaYMY6UCYmI8EP63zxF2T4ewoajwicPYREUbY3xrbgAq19nlUpIjHf6sVmpSymD14s4TlXves08s4OSN0crDzy2%2FErjJgNFS9UK98uAklE8DoDf99c7RV2iiZ51MNqtRxhAczFzi9YWphtw2F9oqvsftB3%2FlQYi98Hu%2Bttcqh27LTutEwT9WtpggxqujDq008cfj9T37BXSeR9zf%2BDtRrq9KIMbgtEQDFA0aI%2Bt3MFmOB%2BQ1BVQ56sATJ1CHzknKvrYjd%2Bc4jhWxNJm%2FoVxHM47o2y7iy4S2i3xJKEaSJ4Ghj6uVtvvPSo980sQHd9gRjipWe7Mf4LdtKEzvpGE%2ByWWiohOpUp5xZH2CnRTF7f5ozk%2BiZh5ImClsAgP5%2BajQj0PjmBkv708R4%2BHBrvZW8EJtweA6VF7VKhEE5MrNEVWlBANBl76yo90lIgNMKbh284GOqUBpSfQHpOoEX6NepRLLo8Ulj8NOf0xgP9TAAVzpspd%2BRBSBE25C9vVCWrnM4HGvBvzWUOupBNlZ3uLe6%2FClM90WMOtwuFNDn5hSmn2fJ7Ad9pmgZ9vlmn0rqRE7mq%2B%2FQqzV1Rk9vTUgIjhdPJSI0FUzT5uELBflxA2QrHH2TQvwNIMMAd%2BTXSK5mva6pP3u4sOxzt589NnbTxCjFOvQNmcvrpqR5ag&X-Amz-Signature=8a489ed7e2618d62c3528a2a72352dc29b90c12394da492fb281968cd9ce514a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662YZUNF7D%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T005714Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEEaCXVzLXdlc3QtMiJHMEUCIQDbIuJQcWK%2Bz6KkWaP9hXYL5xgUir8%2B5LWHPjIDlUGqQQIgNY0AzYF1U7HydeQhV%2Fpz8QFdW2KdndICjeZ4IZEfN8wq%2FwMICRAAGgw2Mzc0MjMxODM4MDUiDLp1BHHN1IndiZn%2BECrcAy83LHGB8kHqcZDi4SSq4SQdE2gPJ8F9Nqkfsa5MzVBB%2BF4J5P5DS5eBXCB1BN%2Fe90%2Fp8aHSd1vYuaUEH2rcmeFc8ZOF8fLTa7QCxQ2H7CT7XtlcoVGYKZGfj1%2FAvr1xzTALCtKiB%2BaaQlMl8jCoLTHU5pQvgTFQtlmHVh5ZEi0W7csp2vQnMQFIqLRD8DRD%2BX9mv%2Bn7RLG5ZKiWDHln6hoKASNvSURmnNFzD3cBjTXu6MeydTkQxSiH0krjBIwAlQh0%2B0Y3t1osLPS7X7WgrxBkimICV5Dpks8IjiAlCnPX7Vqvscf%2BeiWnAAsNuuc3JM2ZEMXcYTvU2BPnScj5CbftYsx1tVmLZoWmNRwhf8zreh6KW10wzlj2GWmTEyYrG9t1H7EHV%2BTZAPdDMAVVCvBJqbMFk%2Bh7Cc68Cz6uoBuk6DLestJLVPLsuvRcPB%2BWBZDeNxB1Raqx%2Fi6JalH9bcZA5CbfEcOv4EPxwgFLOEUADSVot4qxWbCU%2BBTEMJjNt29GGaEDI%2FNZztUD2Skynu4GrgYryUEjlHTkEnlaZuKg8TmbOaYXo6ZmBUNvcBwtsRYgUwD%2BKXcarHm87gncx0wdMT75f9ev%2B15%2BtOhEcrxp0A8lIgNZd%2F00yrjkMMHh284GOqUBmAHyp0eYj0LHIOr6JpwW8EIRvGFBvm1GMvXWBWAIbaweRpDTYv1AM8AXJOGGqF74HowW%2BaF3WMuzOTQ%2FXxqUCcK9R0abDR4TYBfvhBUm3fOwgRhPZYWbP1Imy%2BQMGbRdvG18rWebNJRMrIjZyf1yi%2FuUSfYipttpO6B%2BDOosg94HQmo8cO6Q9L4XtKxehEJu4Y%2FBUxQoeOfvQkkF4EY1mk%2BUIzo%2F&X-Amz-Signature=296bd0f87e2ed3b7ef49945f151fd347b873bc6320296f0f9c333fc1a0c70c65&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

