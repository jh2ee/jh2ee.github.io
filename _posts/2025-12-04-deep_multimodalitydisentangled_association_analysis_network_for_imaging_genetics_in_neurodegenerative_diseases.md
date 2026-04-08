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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WB6Y7YHU%2F20260408%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260408T080341Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDAaCXVzLXdlc3QtMiJHMEUCIQCRkKV0igaWbqiEVmtd1k4SciastH91Im%2FTbRM8BJz0wAIgDGoomCdc2hpvyk1FMXYDPeFz%2FdoSV092XBsl%2Bq0AtDgqiAQI%2Bf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDK0VCv1P5BdSufzJVSrcA8Y%2FiF69PJSH5F0YCIK8Vp74qf%2F7M6WnR%2FFEXRzoBWZbDM1QRZlzzLzTmiBRd3skHv4evcIU44rRg87im%2Fjl%2BqASOvHRhEblP2VzqIPUca5P79737HTJp7k5eqoqHDXGoYGll3PwJp5CLrI0vM1eM4LupycclYUjPn2QmNHqJ6qZuQNYv6oeVp25GX%2BSJF2QlmyKw%2F0hdBEosp%2FmoGaDdttXrSROwDKivy%2By0R%2B%2F6cwT%2FTUf7tyiGjUYfhpTODs3SlCYAvrX%2FterBopySf10PKEEO5QBdYLLXNahgiswk9YM22VQzUMQnOr7btfsQLP3ZxHdx%2BauvhY00A7oFbSwG1ZxdyGUxIapxC%2FcEibqZ24YfBb5P0stm0lCpwyUf5okQ0cCV5K168K%2BLiAZqhQmGluJyoWvQaoe7%2F%2FnNy9ML5ueLmRO5lEqfTswTSiN8o%2BZGqZaEsUOw3he75LmFlKoQU56AgnarXfbyGwA%2Fyc92JYMG7EvKv8kII5FQdnqjR8O4FGKg4ETlBceNzA5aoTSo8GMj3cGEZvEgKUbKlvC56VwDSI1HVsTx1OXV58PNhYiFxl%2BB6EkEmMpNxJbgFp2HUr9HMhu%2FtGiHuwZ2ze9ImAh9B5xCEewoj04ftZzMIWS2M4GOqUBk5cKdEKMg1gXOrOeIIrtiL%2Ff5azqlCTSSf5qnJvP%2BvEFgM7DYUziz6e9HE1iMG4zOvGinTzLULjkD8jGMermMMqvYfSe4rtKDUK7AdyvYCRb1cf%2BRQjkbErC5qoIp9XFOEm3SPMYqiNn72gWjIIs8o%2FMp8DINrw1TMaVeI0%2F8vkoKHQ%2FMm91QRl78SnCdir0UtjFNtbU6fozpmGXVytuopFeZR4e&X-Amz-Signature=8133e3115eff528b957065507361f8a9abddad9c7a88a4cf0c8443b59ad93639&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WB6Y7YHU%2F20260408%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260408T080341Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDAaCXVzLXdlc3QtMiJHMEUCIQCRkKV0igaWbqiEVmtd1k4SciastH91Im%2FTbRM8BJz0wAIgDGoomCdc2hpvyk1FMXYDPeFz%2FdoSV092XBsl%2Bq0AtDgqiAQI%2Bf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDK0VCv1P5BdSufzJVSrcA8Y%2FiF69PJSH5F0YCIK8Vp74qf%2F7M6WnR%2FFEXRzoBWZbDM1QRZlzzLzTmiBRd3skHv4evcIU44rRg87im%2Fjl%2BqASOvHRhEblP2VzqIPUca5P79737HTJp7k5eqoqHDXGoYGll3PwJp5CLrI0vM1eM4LupycclYUjPn2QmNHqJ6qZuQNYv6oeVp25GX%2BSJF2QlmyKw%2F0hdBEosp%2FmoGaDdttXrSROwDKivy%2By0R%2B%2F6cwT%2FTUf7tyiGjUYfhpTODs3SlCYAvrX%2FterBopySf10PKEEO5QBdYLLXNahgiswk9YM22VQzUMQnOr7btfsQLP3ZxHdx%2BauvhY00A7oFbSwG1ZxdyGUxIapxC%2FcEibqZ24YfBb5P0stm0lCpwyUf5okQ0cCV5K168K%2BLiAZqhQmGluJyoWvQaoe7%2F%2FnNy9ML5ueLmRO5lEqfTswTSiN8o%2BZGqZaEsUOw3he75LmFlKoQU56AgnarXfbyGwA%2Fyc92JYMG7EvKv8kII5FQdnqjR8O4FGKg4ETlBceNzA5aoTSo8GMj3cGEZvEgKUbKlvC56VwDSI1HVsTx1OXV58PNhYiFxl%2BB6EkEmMpNxJbgFp2HUr9HMhu%2FtGiHuwZ2ze9ImAh9B5xCEewoj04ftZzMIWS2M4GOqUBk5cKdEKMg1gXOrOeIIrtiL%2Ff5azqlCTSSf5qnJvP%2BvEFgM7DYUziz6e9HE1iMG4zOvGinTzLULjkD8jGMermMMqvYfSe4rtKDUK7AdyvYCRb1cf%2BRQjkbErC5qoIp9XFOEm3SPMYqiNn72gWjIIs8o%2FMp8DINrw1TMaVeI0%2F8vkoKHQ%2FMm91QRl78SnCdir0UtjFNtbU6fozpmGXVytuopFeZR4e&X-Amz-Signature=8133e3115eff528b957065507361f8a9abddad9c7a88a4cf0c8443b59ad93639&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XHK7T75R%2F20260408%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260408T080341Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDAaCXVzLXdlc3QtMiJHMEUCIAyNR4d5C3rcUqfOzcIdtKZ6l%2Bgwlz8KkOPEPOZwH083AiEAiK01Njm3Vd%2BXyM0FX2CGoWFEYBArDJFemRqX3tWrFQ4qiAQI%2Bf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDASPA6idb73%2FheKrICrcA2wpAAz5Duq84RsNRcqphwaG85MUZ7Ozxa4P38y6xoACh1X88G9wRnsW3jYqg3PEJWAIr8Oq2ziqIEg25NsotSF8o7Wo8xiDYE7yn1ZIIz5Ryws2fCoDGlRBrlm7FgKduthv2ZXECszdpX%2FB5mAggEf2jNGDpgvzJj1a9FZu0iNJPCwGB7EoiA7FJ3%2BHzxmI2DaG9Rmo9L5AVhZTkcJLoMCPNFXyDHcAHEiHSYrU%2FCqFTaw9uX7FaIMES3bf1CF1eOWc%2BHPlT46Dr3H%2FO%2BJeQGv1D8dJ0QU3aFA5mfwsPopYen8wU4PG0visE%2BF%2BMeL6mMA3votmelvPFqXGD3OA4t72VRrz2yZeicBUQkfsWcZyUbuuj3DnNEo%2BIt2a74s8FgynwO87EwJGhmRXk1B%2FGLhZywy1R3ftlT%2FtMCzxLjlJ8JX%2FP49Eac0rsojLxWLlmAcitJKGvsaCmcShGr%2Bq3LUp5rVJvTP2vuK5s%2Fxmu1dISkVrhJArWOU7NqGAYeFgdsK8rpRr6j90pRGFOXTG7AgTqtLAZVE10pFJ5LT7fTO74At9zRyt3FetkzeW%2FRcct9w7N4fq6miptl%2Fo67UJKPxSYP%2BUefYh1LoVwvHxgDTJHyMLJRYL1IW4eaY%2BMJCR2M4GOqUBdkoGgs5n4MdOyRhLO5qTtCm%2BPDb4I8mlzyjQfhKebYP9LckmxU23vqXX8z6iC02QTfxpWjvAcNEKCZ5BK35QFkSdpV%2Bp16aqc0oEP84FBWkcoj44XahWSoqbw11qhuOhK55mVMOK6mzpaD1p%2B7sjbr14uk1d5euq7i1wJnexgsR53QBO3csbnb334i3leeht8O184PIPOpCeuALTDf2hhfifX6LL&X-Amz-Signature=93c735cd3341ab32a62da8cce9a82a79805aff1cf36632998ed2830c1a4ce4f9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YDCF6KXG%2F20260408%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260408T080343Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDAaCXVzLXdlc3QtMiJIMEYCIQDfVi1%2FfNhaM4izMMm4mLBwRSAOZ2sVrrtok4vHxlB7oQIhAITMDZHdn9fGeCwJWX%2FBRdqtXZPb%2FqrPbFQ%2FVLo4gVwcKogECPn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxoLvkUCU7H8OskYzgq3ANNaW2I5py%2FCGgAmDKY5Dgry2cjwE7p1g2pZr5irmOvWtw7fOmwWurhVHqWMGlVh05gai4kCLBpkwjEacCnTxUbz4W4RZHqVzj%2FvTDwOBCZCzLsEePYhZyXicqrgicI2kdoPSasWlUjAGvXO58wlNrvAS%2Bmasy74MZiKV8AmRe1X3YFpQkJfBj1c5wfVm6xwttichfL48BjfO64kK9h0yCYAt%2Fc8IPdVqbREbPtxWuWV2AYz%2F2mbGqm2xjLi0hM6OkXmQDkLvo%2F4IjK%2BwfqK%2BaYAKJ0s9iXKO1rvKDnj1o2ehN4L173CZGgrUZnzYslyBcwvIM%2Fad6TSBRu5eeCFSPgt5R%2FXKKoVb4uxlFAJK7C2T%2FAL9IxOVflGsfZoIdLzal%2Bzd3uYG3M3%2Bj85q3GDf45cEG%2Fh1gIgCZPUugXym6CmGU4ULF7oWbIFUY4TSQ7ebrHPQgzrfSynbi7OQXsWYdTk9D2K5i9tHfwa9kQXZURtjsGypwfG5w1hm5T7WMt6QYqGs8Lw3SIa19BBrIFj4ZulUaLlnfNTjWsoEMQqne%2BsZWhIPs2ytMdGZZtwB81%2B6TFeJBAxrNMfDO2DBFIoawNQrIS6h%2F3cNLyNYSnzHLGy%2BQOKIaVMpvBHo8ekDC9ktjOBjqkASTdRj3ZTg5wzZwGZMVhfqUA6KGioKOMrtvpM8vyjqa0TGt24vsEw2%2BIHlfkLCYvK8UaM7EbUPdUj8fN%2Fv68ZJmrxBVVN6PpQasSEuEkNpJvoqmgMOjj3M7L%2B6mzQNnoGC7G0W9sk6yMZi02bC8i36F4uVJs%2BwGW0JTd7kjhy7XF8pLICVP7ZqD2m5PX5TRWF8vUkqcdzGAoYCBKgJOrx3q48DT3&X-Amz-Signature=8fd88a62c543a5cb728858ce5c78604d32f86f296d6be1fb8a40f1c060c84a3b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YDCF6KXG%2F20260408%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260408T080343Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDAaCXVzLXdlc3QtMiJIMEYCIQDfVi1%2FfNhaM4izMMm4mLBwRSAOZ2sVrrtok4vHxlB7oQIhAITMDZHdn9fGeCwJWX%2FBRdqtXZPb%2FqrPbFQ%2FVLo4gVwcKogECPn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxoLvkUCU7H8OskYzgq3ANNaW2I5py%2FCGgAmDKY5Dgry2cjwE7p1g2pZr5irmOvWtw7fOmwWurhVHqWMGlVh05gai4kCLBpkwjEacCnTxUbz4W4RZHqVzj%2FvTDwOBCZCzLsEePYhZyXicqrgicI2kdoPSasWlUjAGvXO58wlNrvAS%2Bmasy74MZiKV8AmRe1X3YFpQkJfBj1c5wfVm6xwttichfL48BjfO64kK9h0yCYAt%2Fc8IPdVqbREbPtxWuWV2AYz%2F2mbGqm2xjLi0hM6OkXmQDkLvo%2F4IjK%2BwfqK%2BaYAKJ0s9iXKO1rvKDnj1o2ehN4L173CZGgrUZnzYslyBcwvIM%2Fad6TSBRu5eeCFSPgt5R%2FXKKoVb4uxlFAJK7C2T%2FAL9IxOVflGsfZoIdLzal%2Bzd3uYG3M3%2Bj85q3GDf45cEG%2Fh1gIgCZPUugXym6CmGU4ULF7oWbIFUY4TSQ7ebrHPQgzrfSynbi7OQXsWYdTk9D2K5i9tHfwa9kQXZURtjsGypwfG5w1hm5T7WMt6QYqGs8Lw3SIa19BBrIFj4ZulUaLlnfNTjWsoEMQqne%2BsZWhIPs2ytMdGZZtwB81%2B6TFeJBAxrNMfDO2DBFIoawNQrIS6h%2F3cNLyNYSnzHLGy%2BQOKIaVMpvBHo8ekDC9ktjOBjqkASTdRj3ZTg5wzZwGZMVhfqUA6KGioKOMrtvpM8vyjqa0TGt24vsEw2%2BIHlfkLCYvK8UaM7EbUPdUj8fN%2Fv68ZJmrxBVVN6PpQasSEuEkNpJvoqmgMOjj3M7L%2B6mzQNnoGC7G0W9sk6yMZi02bC8i36F4uVJs%2BwGW0JTd7kjhy7XF8pLICVP7ZqD2m5PX5TRWF8vUkqcdzGAoYCBKgJOrx3q48DT3&X-Amz-Signature=672325f24d92be7ca8c6f234c16f48265968d582b9a0058fec363700e5a1960b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UBXVRAXA%2F20260408%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260408T080343Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDAaCXVzLXdlc3QtMiJHMEUCIEH9b4Y4oj6%2FeLWFTga1hPZKbfSVSpH7DTrgvcYcJyR1AiEAkqn8hwiLNh5axze%2FrEFphNObTqmkWDBwW0e7G8ZPrV8qiAQI%2Bf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDLXcO1I1XDnZwNksZSrcAy%2BVAnwkaXcwTFKICKwJalnJ8d2qY7X1O0LKVsTrqaEnDOQtCDKq5NHzddip5x9WXbDcYfUhyZWf%2FFInGhwjUwqzPl3BkvkYIDzKBDGjnYAfXIiyzUrTyE5WtrdjyD30JGC%2FOJzrhd1qCI0rcPNExMfisHHIXMdxtoh6n9ZnKcq10K%2B2KTqVTOcpgWqLU710giM82PlF7wgRtxwJbYoQ9HjuYM61ncKUVVOJFr4QXmOQ4fCKcVYkdek%2B%2Fq5kA8asRx6Yj%2FnZicliMZ5BSHh1ZEdKWxeOiYmaqLEpA8ngdbaGeCGGAQ9OZ73cMbNSwc5wLQ%2B6IuZ809EcZUWILohSPNaLVrLV1EzemTXi0eoc4g1siWcFpqKaoSdJkWQjqEAyR%2BIErJGinNTFWOh4UPkntC5Nu3Nn1nhbdIs5cuZOdIzvcO1jUNqg2HTDfhs1plhvQbU%2FBN2BVowjfgf2AZLWGhnnWgZkVTMY%2Bv1r6Bra1f6CiCVFbVH0aj%2B692EMABOUyGioEdVGXiuWabXSi%2Fji5u%2F3yGbh16V8ROSa5Pdo4ZA0mM8XfBXi%2BLb6%2FybTKPoC%2FzVqcc0PP%2BRN1Ivswp90%2BwBvbsmsFQP2RWUtEKNMG1biRnlNj6B1Hgui6FYYMMSR2M4GOqUBWwhr%2Fko0YRQkTBYQj9WG3Y%2FvxlNi9qk24XlFdjHvNmX29SKoGLfgwdoqFuwGUVS6YGlKTFk%2FxiOjuyen%2FLSAMMr2NRyQHHJKCX1%2BG2th2Y%2FC8EPcygcHt50QtdCUegqWNNjdzXO6XaH3CgvVd52K6MLNXD7i59114oDz2l7Z9Jo8cnwqk7RUQH%2FyZnAMQ2vD35eugabGMQs2EroY8Qf1KfAhnV69&X-Amz-Signature=7c3644ef4c4b8f31e35a0e3228923182dcc1bfe8d954c3d97a3997d271cb1fcc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RKJDWZ5M%2F20260408%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260408T080343Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDAaCXVzLXdlc3QtMiJGMEQCIBAlV5zE7F54ZYoGylGkXGggPUJWTawHB%2FmY6McbmpLsAiA7XuojmNKbxwXHrCqa%2FCzf7Rgg0uSSiCSssh7BZ0nTryqIBAj5%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMp67UHrva52JEkY20KtwDkz6MY9XBq4AWS1UT7EvRc4ezgG3a1WEaSdS39F0q2%2B0%2Bi3HfP5nBmp8qL9%2FnYAsfImBbqqBkhCIyDy94WGENQMvVpEzqe%2F2Tl0kAVK7Ihb1F6ZjhsSbeWsAz3OoNO8vldow2A2UWr%2FYmqQvpxMoWKIJDy9o1w%2FvmiSnhX7avqLciEkzbFNWD5Ml%2FkFfMtm%2BntvQYT%2FoD9C69%2B51PQBrCm7SlfXF6Vi44fvxbfBQRU5dMTZfdPbVrs4nNxuM9JPeoZ%2Bq9NZDbQEjAAAjZ1pSaiRCO0RVyQoYmEEJzqUmAfl0OAWQR3Zc2dW5iiQztxMULQ10opUEFU%2FerwLxQ7Lgu2kzWrQrO%2FbVnJMReKOS%2FX813KvC3tFmlbP5rAtYGhf7DS%2FINt%2FsSLYJHqjHsOvSddZSLlAO%2BFmNF6Zw2HDTjcUXFy3fqCI8ekN1bDUggHnXR8HEzN4DvM4kRZzamJgGX29y21Qh6g7gOPvT%2FHGcdKMv02n%2FqGYQDF4qM85T9ZN%2Baw2lDFnzCyDF2LBuq8nmpOcgj7BC6Mu9dla1Yjb92o1jCvfoc0k9lKrvdq41iGSIlZ0NiIJ1uVuSD4locH0otOhmRmHgRIcVHXLXdNkYkTnEUk74K3gXAyB%2Bgau4w8JLYzgY6pgGUMDE%2BgO4Kt9bMxbHaP%2B0aGOGMFRTm907%2FXi%2F6cbBppVe0TNsurjzAwnK9eR3POmm6rDU19JP%2FzMKjVsDm9iSYYEZ%2BFlgNrE5JsQGdyBIvWSl7Vb0gYg7UOErZF8UwUGpFS3Hed1zdN0C5v5YId5gm3pzCfUXxhGdJ3hrB%2Fk4mGoEh%2F07Q175t5%2BmJ5mNW7gFwoe2Xi%2BM49uKIXaCGK0Z6SQhQROwj&X-Amz-Signature=49e90b0e3069ae756811275f7b01ad04084b02d2b3ea105fb27bc3f8ce9b45cc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664DQGE3SH%2F20260408%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260408T080344Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDAaCXVzLXdlc3QtMiJHMEUCIQD9dpe75h4Li6qeqh7EXcjQA3CZd9zUsxQxkrcSDZENPgIgfZrYF38wROqztV4nQvpwYffQiyVQ2jQTeVUXQAN05TEqiAQI%2Bf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDF0ceL17gMIocJDKmCrcAzDiVs5K9sOMh2QCV1anV9tfUATi3xMls263f7dDhDTnZZNpUGJfIB5mkk28Z%2Ft4kAXPFWc0t6FPgKnyxLRBIwYL1lpIE%2BNaynf3TJz2dVoeFQ5C7o7RBdPtnN2lAJtONGibeEkNURSgu8dj%2BxJLPq1RwOvnIMrJBdT%2B1j60kgbPVk10d3Q4OHWc%2BPlCasjx5s18J8%2BJsx1yY0gaeXjIHy%2Fe5PKbSFIBWLK6DbI3gD1Ka%2BAACvoXDcDH88E2Zb4Wi9WE4HsEAaed7Sl9KiqftF1iGw4M4Lq3dW927FSPzY%2FHP2hE9JrEq8WzhOHtXVqhgxxsaBodmOG5M6manxv6gdWK3vsMHrW%2BBq0%2FLy19PGNzJkJhWE5XYDQLy3DPvKzXC0lbx%2Bn8oPO%2BLhmo%2BM7PuwbtrecWT6NZnKxrcDk1TBmDVqCm%2FLJEy%2Fd4xIFCZyEKJLEDqtcxbu5%2BA%2BNEwffs71Je9%2BJElQcgksPZJcaOBVrRJVgrVajwOM94hLqvd8pZ8NMivkK0jSNqdyAkU%2FWh1lZCbneSP%2BuNA38jer3k3cOsSmn3bK%2FAyMH%2BgZob5KvKQjbhXxPex5ansq0In1Gt6a%2BXe8y9aRMRrM%2FufZg4NhXJUvFuUjxL0Ct5XhfEMLKR2M4GOqUBUTu5giuMcomZtRuKpt0RwLs5gEp17KJASv10FGEqJCr9bJWBeA60OQ00E1vvBlyI6dusSd2EGU1uC1C0ld7eoiZDqNaqIbokOo0oRkJ1oRspsTwXtDNayZy3Dm1bL7TEJa95xd8iQ%2FBYFk2Uig9jEuP%2FTHchJo6ig7rpScTD98eUmhRDfokmrK%2FwS%2BSszbhkGLM5oe%2FPKeNn8yiDJq%2FKLSyIWm7S&X-Amz-Signature=441b97b53bdeba29565baf36aa99955a0a18b88f450b732424d60858bc0a5c88&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666AQT7MVB%2F20260408%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260408T080346Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDAaCXVzLXdlc3QtMiJGMEQCIEN27rMdVRetrgbG7HFZD2ImW%2FHn2iEO%2B2SsGUZNWpdqAiBozmPruN5RjbAakw1vX98E3BS4XL1rHCCw23Hs5ruz0SqIBAj5%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMbHWfGgy7v%2FDuXJSGKtwDdMKj8ktXlvRO4%2BNCZrjA65dA0UVG%2BaRXSAz0xlratqGuVCTZhM7MYPz9Ely344mFWmBjZ2RoORQqrEBtnKixzGgIAPAqhkij4vTMh%2Fxilboj61RaY2lRgyDLgQPRMQTNifi1s9s4EjhHxoJX1M08PAaN1gujqJVyShC2VdWZoL4rVbhDTkQ%2B%2B%2FIHfJRrekcgbPrcQlLHold%2B5XhsiN6GdVOxrKn6lDvaO2lauDX9XWfcU0bUDmHSM0a20oks%2FbJjG2ISQbfJUxac4mPK7en0y%2FkNeDufSrTQiFdKhnp7bA1EJlgEYk08iqd7xLx44EDP00LRnMASJQewAhjAwghKYspM7m4lIhtNE8Os2drqsQsAIxrEQSMXX%2BeX4p%2FrqwmCQuvhSLsXv48wxGe%2FX76ZUfN1sGEKvUGCyDUUHBHbbqf0QduFIA3VNSePgYg4NPIV5%2B%2FqAEonARYKlepI6FUTtHcTA5o4bHOhi99onaZwKpVWggSgPGOEKIbkBzZAk0%2F92G7%2FdUNpu%2BlEt%2FnT55LXtQhT1Ni92Bz2L4NrGJhAZrBNc3MW5NbXmTsLYUkrOKvqO5N8U%2BHUw9Oj0edBmQxzJZChSlN5BtHS3Z6L6l0%2BeuZFF510ebWcuvBD9oIw85LYzgY6pgFAkmcpg95viCut15EdFZ95Az0qtvWWr4n%2F%2BRKJcKkxudRRR6V2QJFEg6vspSGIvedjkLz1pySQlAHBGf3%2BejPwDvCGrRUvGG026KxijldAZkfjRyx51gsXaUjMVRjjgvrY5g9em30YPDNV2qqpRNVU%2BHbU%2BR37ifaiJWfmtUMe0eZfT%2FRwDQQtmYaKR%2FHVNOljGO0Wk3%2BCCXVTa0ASj8GQM0NyumCh&X-Amz-Signature=edaea33d311a2e881bded87ed1490665cbbecc6b1058994f802595f9acbdddb2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666AQT7MVB%2F20260408%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260408T080346Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDAaCXVzLXdlc3QtMiJGMEQCIEN27rMdVRetrgbG7HFZD2ImW%2FHn2iEO%2B2SsGUZNWpdqAiBozmPruN5RjbAakw1vX98E3BS4XL1rHCCw23Hs5ruz0SqIBAj5%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMbHWfGgy7v%2FDuXJSGKtwDdMKj8ktXlvRO4%2BNCZrjA65dA0UVG%2BaRXSAz0xlratqGuVCTZhM7MYPz9Ely344mFWmBjZ2RoORQqrEBtnKixzGgIAPAqhkij4vTMh%2Fxilboj61RaY2lRgyDLgQPRMQTNifi1s9s4EjhHxoJX1M08PAaN1gujqJVyShC2VdWZoL4rVbhDTkQ%2B%2B%2FIHfJRrekcgbPrcQlLHold%2B5XhsiN6GdVOxrKn6lDvaO2lauDX9XWfcU0bUDmHSM0a20oks%2FbJjG2ISQbfJUxac4mPK7en0y%2FkNeDufSrTQiFdKhnp7bA1EJlgEYk08iqd7xLx44EDP00LRnMASJQewAhjAwghKYspM7m4lIhtNE8Os2drqsQsAIxrEQSMXX%2BeX4p%2FrqwmCQuvhSLsXv48wxGe%2FX76ZUfN1sGEKvUGCyDUUHBHbbqf0QduFIA3VNSePgYg4NPIV5%2B%2FqAEonARYKlepI6FUTtHcTA5o4bHOhi99onaZwKpVWggSgPGOEKIbkBzZAk0%2F92G7%2FdUNpu%2BlEt%2FnT55LXtQhT1Ni92Bz2L4NrGJhAZrBNc3MW5NbXmTsLYUkrOKvqO5N8U%2BHUw9Oj0edBmQxzJZChSlN5BtHS3Z6L6l0%2BeuZFF510ebWcuvBD9oIw85LYzgY6pgFAkmcpg95viCut15EdFZ95Az0qtvWWr4n%2F%2BRKJcKkxudRRR6V2QJFEg6vspSGIvedjkLz1pySQlAHBGf3%2BejPwDvCGrRUvGG026KxijldAZkfjRyx51gsXaUjMVRjjgvrY5g9em30YPDNV2qqpRNVU%2BHbU%2BR37ifaiJWfmtUMe0eZfT%2FRwDQQtmYaKR%2FHVNOljGO0Wk3%2BCCXVTa0ASj8GQM0NyumCh&X-Amz-Signature=606232345456a93d0df6eb941d30bb437891b048fb77bb29eff62655c015448b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UMD2CGXY%2F20260408%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260408T080339Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDAaCXVzLXdlc3QtMiJHMEUCIBUmAtzoba1Mj0CxSYtXjsimzL4Ed3%2FulHWQtrSJJFnOAiEAxrRQLuHe7WHvURLr9QH7fk2xOw3Hbma%2F51HQDT%2Bg7%2BoqiAQI%2Bf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDAxotv67YekqVvOZjyrcA3V00vGHblDuJX3E3wUD4XCHg1Z7hf8YkqEpxZfkJvlZgZA7NPifNxqH%2B4EvBZEX4RIjm%2B%2F5DXPjYPPBeBo%2FqP2DbM8CgPGW%2FA7zfX0s69lzNYJVS20pM5SxeSr5JtrT6XDpCvt8IqHpoGrB25YXlZBdC7NT%2BJQ6CByq0lrZYDYsDwayQG5EBYC4xuJ%2BElCMCGSCZy13LrmzMNQv%2FT01ur%2Fydq3CaaAizd8bPsJair%2FsutXsp6RJmFyGtVBb0AqmQHjK7eiUNrEbDvGgb9zH9T0igWWLb9DoZMuJD8N5ZfBScO1tiN%2BN5gVzpp%2FmTvTNc7QH0tM8Vbp%2BEHKb8aHXkyUheVUXxHMIzmsolKjqDok7J58MRU%2FGJnfg6WNJIGotGk2CWatFziMq77jaWpejDdP6H%2B4Dw0JZUrGUkz7blupcTrM%2FuKKiaGXar%2FDcwlHPxGNecunmQ6s%2FlENySk3Fda2DpwKXDXcrK%2F1PodojWatGolmZx740hMfiwmxa87PvJZPjqrkkxzqxU8XNQSNQRNA2nqwCnFthS5ugoVZLTD7sEMLe41wb3QTX37jYGssjn%2FopTVoN9VdJjH2wESiJAD8eqqmf0s5yvlOF3EtQP034CHdvNL6YfsTicDU3MO%2BS2M4GOqUB4lS4D7AgZOJDohNFpHiA3%2BpKbx3yeJ0L5Bv5hvzCNgw15Jsly%2FspJv%2FbQCTwmUvwjQ6MP6IrSctr7R8fDNIVOUGlPvkBjJMqwMLPm76N2bNJ8Dj%2B8N0Ni%2FqMUcn%2B6TXaUCZBWwrM7N5W2thGXmdyqAiFNYui%2BDYsMZahCmD37rV%2BzOJJIw74cIqekgzcAC5s8M0Q8Xd9CFAco5amB63LZvzM6eHD&X-Amz-Signature=d65613c527bfc8bab085491229fefffd48550310173ab5534dddb3c833a386a3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SH5KMKKZ%2F20260408%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260408T080347Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDAaCXVzLXdlc3QtMiJIMEYCIQD1wYmw3A6t%2BqI4oXvWBsIfHQ81YZhldr6Mi0k5tTQs5AIhAPOPv%2FTKdqJsk3Q5DKRxI2ttw7%2FHTQGwFJv1h8RVUecnKogECPn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzcaXRxdRpEzzs9WwQq3AMXhz%2Br3OmGNbH%2FHBkNmsj62Y8qeYZOCQEO8Ob2ZASwYQbKI5Bo7mbDX%2BQuXYl7fXOc3C00T2A2IrASIGCT9T0%2BHXZ4aopBYPjb6xnde8ZO3ueiET%2FgKiFBIwWAVOxMn8akDel40UM89gaXvt%2F4OtC0CToE27FvLY1EZSHKGXoSLkVCN1%2Ff%2BZwLIXih%2B2TDumwh45lqDZDu3xu1L5UbGeDnCaklpyx8uWQD6PSVCYZU8KwkYI%2BtNrongB5KtX7IGZPdAWUbzPTSYK5e9bweLeTf6ZKGmzU2BAS0CDBMUMOiSEx8be27ORrVMi%2FM4%2BRK2gx4ma5oDINWZ83Mah4DtObiNZcO%2BUvtIrVytZe1QZdaSlzL9yNzlX6njP6HOHW6GLimj6ux0zP3U5XlYlfBWxfv0TLONGMD3scxomIT0D%2FSaXoMrj449NKB6FzFjLCb0f%2B%2BVRG20hnsU0pSRgOVZzG3N7c7eWOLDuMK4xTeKyIBbQ68GnEQEXn1hgwJ%2BZcdC9IC2Krcy%2BxKcgJstR7tfeP7cv1yyL8ieNCGNOUxWCpJyA51NxErMlr91Ux4uUNTZIE9VEzQ8AAEfgBhzic2NEhVjitmHZ6qoy7gChePv4UkDSi2nRvuboLx7jyrljC%2BkNjOBjqkAe1mzdAPmqM4X%2BjSTcQt%2FD5SMyQDGxha481N5yNDLONQcntrVFoyULE7b4Ehzx74%2FaTrMBiEyFI4%2FBA%2FYhhjvMCkDBmlfUPWGAvAjsoCQH2aqWJ%2FCp4tRzHeIfRCGbhrJhJxusoYNxEf%2FRIPUHcSjXNM2j6dIyawQl2HzdEPrjkuindkpc4vvFmkwoQzCMq5cn%2FiNSqOFHiucKoggbkKkEKLRO%2Bm&X-Amz-Signature=4435312d3148e75a5bb308b8d38a8802db7685df43b0c89ba8d3968d9f6075a6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SH5KMKKZ%2F20260408%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260408T080347Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDAaCXVzLXdlc3QtMiJIMEYCIQD1wYmw3A6t%2BqI4oXvWBsIfHQ81YZhldr6Mi0k5tTQs5AIhAPOPv%2FTKdqJsk3Q5DKRxI2ttw7%2FHTQGwFJv1h8RVUecnKogECPn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzcaXRxdRpEzzs9WwQq3AMXhz%2Br3OmGNbH%2FHBkNmsj62Y8qeYZOCQEO8Ob2ZASwYQbKI5Bo7mbDX%2BQuXYl7fXOc3C00T2A2IrASIGCT9T0%2BHXZ4aopBYPjb6xnde8ZO3ueiET%2FgKiFBIwWAVOxMn8akDel40UM89gaXvt%2F4OtC0CToE27FvLY1EZSHKGXoSLkVCN1%2Ff%2BZwLIXih%2B2TDumwh45lqDZDu3xu1L5UbGeDnCaklpyx8uWQD6PSVCYZU8KwkYI%2BtNrongB5KtX7IGZPdAWUbzPTSYK5e9bweLeTf6ZKGmzU2BAS0CDBMUMOiSEx8be27ORrVMi%2FM4%2BRK2gx4ma5oDINWZ83Mah4DtObiNZcO%2BUvtIrVytZe1QZdaSlzL9yNzlX6njP6HOHW6GLimj6ux0zP3U5XlYlfBWxfv0TLONGMD3scxomIT0D%2FSaXoMrj449NKB6FzFjLCb0f%2B%2BVRG20hnsU0pSRgOVZzG3N7c7eWOLDuMK4xTeKyIBbQ68GnEQEXn1hgwJ%2BZcdC9IC2Krcy%2BxKcgJstR7tfeP7cv1yyL8ieNCGNOUxWCpJyA51NxErMlr91Ux4uUNTZIE9VEzQ8AAEfgBhzic2NEhVjitmHZ6qoy7gChePv4UkDSi2nRvuboLx7jyrljC%2BkNjOBjqkAe1mzdAPmqM4X%2BjSTcQt%2FD5SMyQDGxha481N5yNDLONQcntrVFoyULE7b4Ehzx74%2FaTrMBiEyFI4%2FBA%2FYhhjvMCkDBmlfUPWGAvAjsoCQH2aqWJ%2FCp4tRzHeIfRCGbhrJhJxusoYNxEf%2FRIPUHcSjXNM2j6dIyawQl2HzdEPrjkuindkpc4vvFmkwoQzCMq5cn%2FiNSqOFHiucKoggbkKkEKLRO%2Bm&X-Amz-Signature=4435312d3148e75a5bb308b8d38a8802db7685df43b0c89ba8d3968d9f6075a6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662BH2ZXHG%2F20260408%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260408T080347Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDAaCXVzLXdlc3QtMiJHMEUCIGMZP%2BnZau4IEEYgCxyVVAUT5fxUQc%2BrgfkypVn800j8AiEAvpIGrEmtcrdCbWl9i2d%2F1g0k1DNg66eVUkpYOLD0%2BWMqiAQI%2Bf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDDaHPTTKRg6JoNnk3yrcA9OkxdOwgBJbsZTkUZsKC0I%2BBj%2FGIV8DjH1DhyPUtzqDFU7X0bldfZvum4BGalC0e7admYTNvjbAzwgpyLz7lHj9Ft3JrpOw7BuD6LBVMwekLJmOf5NqsRpL%2BzU%2BMIabXeQ%2BKqrtyqqYYm4ONLZXz4tYNwm3m4H37nT6AlOsGoePb2iO1frI1c%2FUQj1jRhbl%2BL54IDJjcnjfaTWtaaC1Jy9qbZx4thlCG04xK4AJcVX5sTwgmURaH0cpg%2Fhr0v0U39sKE3khhW0DooF9HMPil7OsnVFZsRwHukR4X%2Fa%2FfL9nm3IPVVzjQKMz6mJRigRd%2BCA0IA%2FF%2F%2FlzyK4brBn77qhAJEeWGtUF62jNkqjItU861fvQZVySgWKn06uWdFSMHblIDVDyN5uImbLo07PzyKiTOMEoP52Cj5bTC5GPwpHwn7A0kFtJd5xhozBoXpPMrbuTXzXnrpBRJ7s7wLS3iwUevcLiXs%2FlpKxXWnLVoKas8zEssheZ9wPZmNO5zWcsKXNcTo22%2Fx%2FFb4eM7xCbPco4y0R3lnoPIaV7dIP7e5clA7QBDoJ38bTHafgpv2G7KBULFswW2Hqaomh0xZtwovOVK7SHTMA62llS%2BUCmpxNGMCmlU7bIKNqV%2FIIaMKWT2M4GOqUBtLPdA0jrB5Fw16RfQiL%2BP91PWzxsaTh978LWDCZm5Rdh5%2FTctTIo3DGv368dVI19WofUozl1yxFYQUi331VD92Ygp0so0GGVCGteGS0LGs8AA0D0dpimfW4xcIQOQVhRTg5%2FrwOxdFcrTb5%2Fk4jVtFZUiiJmEEwXGnEp%2B77TtBwBK0Ie6UdQhjME9huYZfe1z4NvKCMHVItbhr0qAJJWxHjNAJUz&X-Amz-Signature=59824c38fbd40293fbc5be6313f1bf6d67070f440c9d43bb2f6d6d18e98009dd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

