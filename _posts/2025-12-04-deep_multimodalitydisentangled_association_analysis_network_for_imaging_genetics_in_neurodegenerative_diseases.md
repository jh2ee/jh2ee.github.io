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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZENLBC5B%2F20260204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260204T050239Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEQaCXVzLXdlc3QtMiJHMEUCIBgXbg2xPZM8Jai%2B9TPioucsH8177LDY5JUYxzNQhhw8AiEAugLPa0e6FvbQ3WeZ%2BCYdzatdPrco2vTLsAZHcXzTFUoq%2FwMIDRAAGgw2Mzc0MjMxODM4MDUiDLgVZBS%2BRGiTmmFcdCrcAznKYuqMJ1TB9b%2BDV6GEBMcOiDzL24ghBPk4JKKfkNQrDjTjPHNTjMatWFWgcW2rJe%2FRvv8C05m%2BDNelxHidNwzXx3OjO2JpX2lF3%2FPJNgPQaXTyanQ0kvRB%2BFNB8QDaDtHCr8eDRHSyjREq1Lr8k%2FW2qfiPxziLd%2FDgviWwxD%2Bnhwjc%2BNWU85vmCbsWd09uIIHwtPbBHSDil2uMrMiytDvy6rxFCElGPXlKEfId%2BqDvBncDr7lVvPxk1D%2BG%2Fn6XC5nW0xuIlQoaU7gi3CoYIPmR5v28ZCc0yGHM1oGYGOObas7zqrAeYWtzqNfAhm3uAUkjZZYDm38o2KJWtUCzjxrLrKMoJSFjQz6k35UANkvaY8I4lyfHbyJJCAbceXFxC7gum3tgbSxEtqKaGS4x2PVH48HM%2F3YaPgbuff1WOnhPS6rmvDEhjeguXaj454%2BKlXrH2PvogojWl0jng3GxSA3zu5F%2BOlr3g9kz1JY4rKdxRxp1J8DS6VmvCTcEj0ZIiR56cMqkGo2APaiFqxZGW6ckl2FFFSBv5anRCehpd3wPLBS5iCj8CiH2yKbTLD9WkKKLGO8RM1AwZGLeP1y8DCDZ2jmWD5A%2FuWdHL8jJS%2FY6Gpda68FopMDfhDtgMJuPi8wGOqUBMD5cArR654PVoB8k3NfQRseay9uF8NnHINopCVKDokAmBzvPmqeBRTQ1v7sQxQxce7Mm2WKJKFW8OH67gVhUjjKsys2U8czNZtl7I4CTcNPVtLgFKJiwWXcIyewoeMqvYgsfxkhSHavYUfTR0QuaTQyE%2FTFcChj%2BBKC9rBvDta%2B7%2BrZu4lVAcctTbXYbv0or1HzJOrwFbt2kguGX90tbByWVW2jT&X-Amz-Signature=52859593a625205156c85d405e644c95a32f6883c745ec18925b1b0e5a03e03b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZENLBC5B%2F20260204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260204T050239Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEQaCXVzLXdlc3QtMiJHMEUCIBgXbg2xPZM8Jai%2B9TPioucsH8177LDY5JUYxzNQhhw8AiEAugLPa0e6FvbQ3WeZ%2BCYdzatdPrco2vTLsAZHcXzTFUoq%2FwMIDRAAGgw2Mzc0MjMxODM4MDUiDLgVZBS%2BRGiTmmFcdCrcAznKYuqMJ1TB9b%2BDV6GEBMcOiDzL24ghBPk4JKKfkNQrDjTjPHNTjMatWFWgcW2rJe%2FRvv8C05m%2BDNelxHidNwzXx3OjO2JpX2lF3%2FPJNgPQaXTyanQ0kvRB%2BFNB8QDaDtHCr8eDRHSyjREq1Lr8k%2FW2qfiPxziLd%2FDgviWwxD%2Bnhwjc%2BNWU85vmCbsWd09uIIHwtPbBHSDil2uMrMiytDvy6rxFCElGPXlKEfId%2BqDvBncDr7lVvPxk1D%2BG%2Fn6XC5nW0xuIlQoaU7gi3CoYIPmR5v28ZCc0yGHM1oGYGOObas7zqrAeYWtzqNfAhm3uAUkjZZYDm38o2KJWtUCzjxrLrKMoJSFjQz6k35UANkvaY8I4lyfHbyJJCAbceXFxC7gum3tgbSxEtqKaGS4x2PVH48HM%2F3YaPgbuff1WOnhPS6rmvDEhjeguXaj454%2BKlXrH2PvogojWl0jng3GxSA3zu5F%2BOlr3g9kz1JY4rKdxRxp1J8DS6VmvCTcEj0ZIiR56cMqkGo2APaiFqxZGW6ckl2FFFSBv5anRCehpd3wPLBS5iCj8CiH2yKbTLD9WkKKLGO8RM1AwZGLeP1y8DCDZ2jmWD5A%2FuWdHL8jJS%2FY6Gpda68FopMDfhDtgMJuPi8wGOqUBMD5cArR654PVoB8k3NfQRseay9uF8NnHINopCVKDokAmBzvPmqeBRTQ1v7sQxQxce7Mm2WKJKFW8OH67gVhUjjKsys2U8czNZtl7I4CTcNPVtLgFKJiwWXcIyewoeMqvYgsfxkhSHavYUfTR0QuaTQyE%2FTFcChj%2BBKC9rBvDta%2B7%2BrZu4lVAcctTbXYbv0or1HzJOrwFbt2kguGX90tbByWVW2jT&X-Amz-Signature=52859593a625205156c85d405e644c95a32f6883c745ec18925b1b0e5a03e03b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667PDHLMX7%2F20260204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260204T050240Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEQaCXVzLXdlc3QtMiJGMEQCIE0bAQEl9ZZy9yHVT5iMStEl0WVER%2B6Z%2F40uebLZRt2vAiBoV4QxT3ahYQNaVWwUtP%2FBqKQI8qM6kJQA0TAQDcsxrSr%2FAwgNEAAaDDYzNzQyMzE4MzgwNSIMrdoKft%2FODqVfHj%2B4KtwDH67eSG9RIr6UOIuO1U%2FqDd8ofPwcKWgCkN7fqKSdyQRtH5iOM6n5SrBNzn5S0DSa%2BVrqoH6kVNOaRO21AaUtdkpBshCJ8Tbjn2IIc1QmB8mkbpI52A57aMF42m1ET0jyV6%2BOqejM89ZXMJsMiOpPi%2Bz8kcgydab2u2vp%2FC0sQ%2BAYNouJc7b%2BcjEAGa5NLNtNDGdEJvHwbJExqNIDh7j8fxWmUShJsrCsCFg1ndU6F0HQjOQbw9llNhC6YmqkJCCD31jRFqXmAkZ1USdl7jE68sr5ECAdPdMpbavUT729OlvRSCscdH9QwEKH9eV4pNJ4o7psfnChkFeHaYDeM14rgb3VWQmwgIcdtwRSsDG6wN51UZpxsPHburK5smtW2uh4yDYhI%2FCNYsQIQw7kSvTrPqSI2yjUgr7GCeWmF0rKNEWe9SZUQmf%2B3hL4hAhSjFS7ZdteAYPh73gt%2BBTiSH8xFQYbDP%2FndJjnlo1eQR8hcLPmLrTQbb7B3mNo7iR2t36HGZnNuAvbLnbOgefQsxX65NGyV7bx%2F0CUF8AXGgkhSGr2YwGenVPDBBb%2FoC5DKcTh9i2huLAZQnShh%2F6NhHZrskb1lz8kn9w5b1t7N2vPzE6vw7IQi%2BFIa7XntZsw546LzAY6pgFn%2BRWO%2BbZQMM4MAjHYiEo%2BF%2Fn4GB0oYlZfLmR5kALDjQc60y2f94ke7EP27NsE6Jx0fhJOZV%2B9VFLGQ1Aq4zF674gg8yn2cDcFAVK1WRA1G6wYK4eygv%2Fu13BnAmagrE%2Bkpfr1I%2BBPZnoYrIvO6zElhuDLrIXWb0McIpl7K%2FY5XWh8em4KXaDPsRqpYwmcF9OkAVo1YyGqCV88W8b9ifi9sVGF7KS4&X-Amz-Signature=ef832e2920eaf21718c5086fd2626c3362e181e2dad906f8698cbd2360b56efc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WOUFJZQC%2F20260204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260204T050244Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEQaCXVzLXdlc3QtMiJHMEUCIQDlvfJ2PkWHFOf4IvLe8rOX0dI3eAnFI%2Bj9mp7a9wbycQIgZ7dfK%2FtUek%2FjRyMa9g3TgrbBCejn2OaeqI0eCrx%2BePUq%2FwMIDRAAGgw2Mzc0MjMxODM4MDUiDAnMJyH338sMaScLKircAzrhbZoSNocPK%2BlhEzxEczDeaZXdAuKRBSSjfJ4l4SRf0x2%2B3Bj%2FrKaSXBSJnQvWpEMgDQxoQ5ze4A%2BFElK0M7UmEy6hA%2BMts4B5614I0QABJv%2BuN71S7HkBo7RQmDmAan6IMxQXu4yv56ELM8fybEced9hS69rrKRLlIbhYW0VcKQku18mDlT%2Fg%2BEMQ2AGOdL10EU8Qh69Yp%2FKlg%2F54R1ZK877rPxQfyLmSCab6KehSUBAQlFJs%2B7%2FjQhBJV8ClKeAwyd95CLXXX57ZRAZZ52o6XZIyZuzxF2h%2BtmJTJED%2Bt0c2rmpThj5c39R3hXOE3XdeICx3vE%2F2%2FrNS6%2FdRmZdunQI7%2BYaDbLThGtPMr3zfakYbNU3VcPbUvWVMZPsBHqEPU7jKQ9tAlSh9ACN8nSv8YO83hfBnWRjqMuqs0WYkDg1aXqGr72cGZ6bUnaWh7iYbzqsqvw6OdOQ4TekRvidJHvfstufRqX4H%2FfAxuRJCUSNvAGvbb7QaWqh87yQgeNqef9edEE76KZM%2BvkFU68ovGGCQUb291JtNUJkOSgZGzYhQEI9tAjbJcGN7sT99yLdw3mNBt46w5Qg59NeGSSJ0mPub0RSp3AXKNGMFiUdHZcOGpc%2FgML91KeX2MOmPi8wGOqUBRcI1eYSqtudbdghAWop6k%2Fb51Lr6fvncxm%2Foyvv7ZuhuimGEh4SgmXyDh6jUQCuOb4Dl5pCSMfWJfK3utwsbiuKRukItTZIJ5K7s6078VRx3LePkd2blYH%2FeO0oiUoV0smihjnKTu3hRvMxw%2FknKjjAA2qfWEw%2Fq26jSnd%2FbgoFm5eW0q3K0Z5NOfog6h0Ng7TE2kvaTik5Vx9MjwPTp7LYqS5qq&X-Amz-Signature=06b3af78a6cfa133e7f074e6e3513472ed48d3a84b430db228452221ebd42ccb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WOUFJZQC%2F20260204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260204T050244Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEQaCXVzLXdlc3QtMiJHMEUCIQDlvfJ2PkWHFOf4IvLe8rOX0dI3eAnFI%2Bj9mp7a9wbycQIgZ7dfK%2FtUek%2FjRyMa9g3TgrbBCejn2OaeqI0eCrx%2BePUq%2FwMIDRAAGgw2Mzc0MjMxODM4MDUiDAnMJyH338sMaScLKircAzrhbZoSNocPK%2BlhEzxEczDeaZXdAuKRBSSjfJ4l4SRf0x2%2B3Bj%2FrKaSXBSJnQvWpEMgDQxoQ5ze4A%2BFElK0M7UmEy6hA%2BMts4B5614I0QABJv%2BuN71S7HkBo7RQmDmAan6IMxQXu4yv56ELM8fybEced9hS69rrKRLlIbhYW0VcKQku18mDlT%2Fg%2BEMQ2AGOdL10EU8Qh69Yp%2FKlg%2F54R1ZK877rPxQfyLmSCab6KehSUBAQlFJs%2B7%2FjQhBJV8ClKeAwyd95CLXXX57ZRAZZ52o6XZIyZuzxF2h%2BtmJTJED%2Bt0c2rmpThj5c39R3hXOE3XdeICx3vE%2F2%2FrNS6%2FdRmZdunQI7%2BYaDbLThGtPMr3zfakYbNU3VcPbUvWVMZPsBHqEPU7jKQ9tAlSh9ACN8nSv8YO83hfBnWRjqMuqs0WYkDg1aXqGr72cGZ6bUnaWh7iYbzqsqvw6OdOQ4TekRvidJHvfstufRqX4H%2FfAxuRJCUSNvAGvbb7QaWqh87yQgeNqef9edEE76KZM%2BvkFU68ovGGCQUb291JtNUJkOSgZGzYhQEI9tAjbJcGN7sT99yLdw3mNBt46w5Qg59NeGSSJ0mPub0RSp3AXKNGMFiUdHZcOGpc%2FgML91KeX2MOmPi8wGOqUBRcI1eYSqtudbdghAWop6k%2Fb51Lr6fvncxm%2Foyvv7ZuhuimGEh4SgmXyDh6jUQCuOb4Dl5pCSMfWJfK3utwsbiuKRukItTZIJ5K7s6078VRx3LePkd2blYH%2FeO0oiUoV0smihjnKTu3hRvMxw%2FknKjjAA2qfWEw%2Fq26jSnd%2FbgoFm5eW0q3K0Z5NOfog6h0Ng7TE2kvaTik5Vx9MjwPTp7LYqS5qq&X-Amz-Signature=deb9d9cde448c091a1410dc6e8b35d60031133c0bb25bab330dde15a18827f30&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663FEJNZJS%2F20260204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260204T050245Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEQaCXVzLXdlc3QtMiJHMEUCIQDrifZSS4lUb5eS4p7778kmLovu9k2WPL9c2c9ZZnN8ugIgMVgpSp3C5TWN7vI2PPQAd3H5pxe8K9tU6CqhdI6hHekq%2FwMIDRAAGgw2Mzc0MjMxODM4MDUiDKsGr2WuOz76lIadeircA4QwLorElVpyVtubkDFsi7SSkbP6r4FZEq2ktOXJJrkkZb6jWL4sMFl%2BlyidmdRiKiFUdy7i4a7czT72Tl9tZ6468Y%2Bf7BuWDNlXP3dHbtWwLpVWDXBtYrPn0P33JsM03TWpsUL49RID%2FX063NpsOKOfxsRr3O2LQNq0Pyo42kUQzT0KtxRp4WFT4eBxfRxxF0AqXlJHmKkvPh8F3SslWk7qwHURhhMw%2F2Xyq0eL9Bgoy%2BAp2RO8AhpbYZ%2FLWjWp0Js8m32873%2BDqO4HcJLv3jFY%2BXTt3%2FMHKKp1qAVteavAAs0WDC9T6wZ%2F2OoVcOte8T75MqbjybMGydLHbEZiCckO7kzdlJIoQv69pq0Ev%2BMBkhMcs5ZJ1%2BtlZfIsxUB%2BgapnNLvv39D5kPEupy1n9kgXD%2Bi%2BY9Jlrhnkcf%2FunJNhlWLaGTd1nu7kjadp3ENjtVd9P2OfK8xCo5GdtarJCtz92R7wRLrZshGpDbHD8%2F2pvdXxsP7JPD2ek7DzVsILlTGu%2BblvpwmQ%2BduGxkKztnDRQCjqUTgpFmBdrcUZg1KLyGb1%2BRBLi5TfUyTBwnAoVSMiMYitB1VHYH11xSMMKFmtH2tRwwMQjKjTbPY1MIcmo%2B%2BrQzJRVpBdqfejMPOPi8wGOqUBgk1mgkqoEhhJOQO1ypecW126Z7%2F09bKioj2FMy6GNqNgx8uDZwmqU%2F2qOHvtsVct6ud1gqaID%2FhiC%2BjrVlAM2Qs5vr7dr2keUQKhKL6UHVgG3KzId8eDeXyrCADA7S2nzQCnU71MIkpTNkq2h21iWwYX8ANjFV%2FumDL7zu78ql6coOk5l7dhbEo%2F2r%2BG5l9Ma%2BdrL1Ae6GbDyEOwvNmHEDJnIKkY&X-Amz-Signature=7af53bba93d2ff39409a8a6c3e17988fbb3938acaaf0f076a80510448e388737&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665NTDQVBL%2F20260204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260204T050245Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEQaCXVzLXdlc3QtMiJHMEUCIQCtigOla1lPunoAFcKfMsyxzAtHDz7I1%2BKjoObjVCn9NwIgSYIbybm2SQ5RLZBossJdrdJVcDHzftHzPrK1R9YjllYq%2FwMIDRAAGgw2Mzc0MjMxODM4MDUiDBbk%2FcwrK7XuicvmRircAzd1AGbm7193LCSZH3A3t4TnXbt8T549Um6DfgaXyzNyWZ%2F3vzgI6pk%2F%2B4UKdvWtvyh5GCTzkDO01f%2FmQKzQsovI0G5GBC8WVyGxsgmhQNB79VgWgXGO9VjYRuDqfMqs3TgYWPLjs9SjHpTw6ESkT8hX2z1yXWgQoO6%2BJXQPTJfwWdqZkpzzaTKb0ujyNeZfZSlH42BIYcdU5b4g5rH%2FTxqU3sW%2BQiPGjqgWn8czJL4WFuzQ8MVmZ1VVJANKch1PIC1lTEcdKrNVR35lWMwP8D2gzzB1PVEt4kpKH6m9TqlRiSfbfpj6eNqaWbq0DztVz6D9iooR%2BAtkeB2Hq64vsslLa3muhI2bHcn%2F4ewL4u21KJJNdJagBFvNm7aQzjAdytdZdI5s8K6nwEhKdY78ILjW3YfdEoA9ooVxFg0HE4CNo5FHGcALXouC6jFoSdyXIl%2FdMzfJhb3X7JlaJAIBBzyKZotyZSOUllklAkvrO4W8uoN05Q6H4panwvjMZU%2Fj%2BGGJgL79lbN05aO%2BV7hS4hGdD6bkZxMGi1dq7%2BDfMh0VU0fhgroHAXG%2BhgDlHmTWzIo4Sio%2Bha7fBccR92wk3x7KGyaL0lWTmsxrLOt%2BWGbupzJs%2FWMUUsnYPEVxMLGPi8wGOqUBkAu0QpCtJ9viKvktm%2B%2BNzt1dfYA4kmKEYgsUL4xN2RHeyNThnwBFLOD%2BzM9%2BBQV11ReZrPSYVCPCorjaXJsr8UwOAG2D9SUpT9ziGp%2FrOlIxZTgsAu3CRuPVOhkO7k72aOHioV5HrRBerbk2lvJIBhMuIljWeUfQzYDY3V9jFFN%2BHIsAUyZQik3plRE5oyhIj1%2F9Ys2GS4jkhh%2Fo9cr5xW83p24q&X-Amz-Signature=834822885ad567922722c9bffe85f58c8e143acf7cbbb3924dfc24b0375decb7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UEJTMXYD%2F20260204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260204T050247Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEQaCXVzLXdlc3QtMiJGMEQCIHZ8yWo93uVyd1SfUmt7z0ITYJOkAHbVJrYwGzpcCjqhAiBhnf7mm3S7NVCcVNNeKca3jAms1c0xUDaGUN8rU%2B4Vjyr%2FAwgNEAAaDDYzNzQyMzE4MzgwNSIMOKk2Mo5u0Oi3QC5gKtwDOIRIYhcg%2FuOJdNw5u7Bbhj2YK%2FL4lLP4O3Qh4khvKTfuDgcDZVveNLcf%2FXq1Oh9GmAtTZSmVB1sNipuw4fKi9npZOxJ3ryJtKuagmXZFpVL6mOrhgctRhooluRkOe5V3UGTZiEpd%2BOE0TAVpDlDYCKt8RFERZzdYoURg1NAaOj86GTt7EuZ%2BWu%2F7NiLJGhTX3UYV25aJ2D9UiBYIbMsjcbGA5lMQu2SemVAD57LrQFggJLkoBKFaSihwwNdghhuxnd6BhmUffuZPyzw3QK2BfEwZHzkTQPbRRBPAzfV8m2511LGj%2Fy4BwDJOsAcLyAYzuDN5rn%2Bs9%2F%2FjelImGDhr50zp%2Fx7m0f5fpDMmEwSaWG6rUm%2BrLYt4YBa%2BeJ3BF%2FGsjRIUllj%2F8jl254%2BeWl5DlnF6XLSLDk2zILYkF0EHYuRcJpH%2BxjJz8jq1rT02iiz5LuUcbTNBY6XATeR%2BawGkbCljc1vRKtcp1lj5Vm9KiY1XLcSRv3EDvQZXrwXkQedFILh5Lg%2FKvdxy%2FXZZ5R8fpYpSCp%2FMtPcmvbJtkgMweBVWTgUe0NLDuwUqz5sbzbFXal7IBys0rsTukShw3CBBHvmwEOzArEO1S6QyDrSj7zw5CB%2FVpSjaH1PBMwgwiY%2BLzAY6pgGqNcuF4fP0huPocbQzj%2BeKghmoUdLTkHcR7yA9V3Iav1Yty8a13BrwZS0idAQfLk2%2FAFNal9HeyiDjJocFym2yU1xy9hb6ms2CoTPGr3vZ%2B%2BEXAeH8v4woZRCNGMkDb%2BfLsR6bHiqOiZH17cmxAdhWPfc99gcyzCpF%2Bqe0nkfmEenrxryRXOiV8pwXdPN8dBHcEwUAo6L47aWXNeRFpGvTPRmDCTrL&X-Amz-Signature=c082a00d1b1b0b58160a5c9b0c659597b3a34d8360dddb198272b8cb7c5b728c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WTVFTGW2%2F20260204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260204T050248Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEQaCXVzLXdlc3QtMiJGMEQCH1CzIqjyNMrrhLJY3dDV4kpDFu2EwTIeSOpMhhw95osCIQC1YmL15nOQqWBJkUTlsJlw6fbUwuBicBgaMf0ZI8ZhmCr%2FAwgNEAAaDDYzNzQyMzE4MzgwNSIMUOUWEYgdsBjLZ3wWKtwDyyJ%2FHx4up0czvfSmYZH%2B7rcC6e66%2BRBUUOxD%2BtDIxWno7RL9ZGOizrE6YaRrLD%2Bs5Qxv3h2J3Zxj6KVluasmUimyXgA3QvJSyoKR4DQhkYcfcn4OmEwjjF1gQmTt4e%2BpPRkofpiIVdbrEBlcgxz1g1K2FxFkuTw%2BrmRBxs4ZiuRG0eMT8lr9qL6iPqMq57M8%2BL300EbDKE9wZyo%2B%2BIHvosmd0zkas4ZK4LazFgws5vnOms8AEYy4Z6gt3Z3Jo3ZIa%2FPJwmf3ta2%2FRXd3c%2FUbz56tqE4oRlrkg4nDd4TuXmLEsFjAxsIXyNyOJU%2BLHgDraH5elrjNnuRC5LetyCeOnOfc4xyvWm3jxrlNNlMHr9VMLpJ6iWXEf%2BxTDi752UL1cBIkwtkABPHA5ckePLCHtRLnEcueFQHqu7eR%2Fp7fL55E1HRF0OW3vFfltmd5%2F%2Fc6iE40Upr2u5KXDYc%2Fdtwx6CCDEotA5TS8Qx9I5wXHTd6%2Bttswqyd%2B7qc%2BKtpR%2FJydH3N5QsEHG6fNR%2F%2BDuyo41x1uh0V8ePa7DzI1AHRBsNuNnG05CPTqTsaXdtLGoOVCaaGKC3NnGA8%2F5RkxYpx8601fSnJQWgKQj0pcjp2lyGEgqjPCaeS1GxeT8vgw846LzAY6pgFrIgf5%2BhGxqdnmh7wFQ%2FrsBrgnDLx1O9b0SsluiPZlo6QQr5ycRSes0x8QRnj%2F2UcdCTSEuwnM4Kj4M5w8gaqmZIAuAmCgzwdM5edDbVwJnm6uF5LViBMennNs2xZKZZcZKj7RIwbggEQcq6wnllt4KZlW35UuUmXHbFRBkKY6ebTih7oMxi0mMF3yhwRzG2bfxfcs%2F86A6DUvssMIvNqDrTbO4FWt&X-Amz-Signature=f9760324518c8b9cde9bd76190ab76dfa8b10526afc2b8390fca3456ae03533e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WTVFTGW2%2F20260204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260204T050248Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEQaCXVzLXdlc3QtMiJGMEQCH1CzIqjyNMrrhLJY3dDV4kpDFu2EwTIeSOpMhhw95osCIQC1YmL15nOQqWBJkUTlsJlw6fbUwuBicBgaMf0ZI8ZhmCr%2FAwgNEAAaDDYzNzQyMzE4MzgwNSIMUOUWEYgdsBjLZ3wWKtwDyyJ%2FHx4up0czvfSmYZH%2B7rcC6e66%2BRBUUOxD%2BtDIxWno7RL9ZGOizrE6YaRrLD%2Bs5Qxv3h2J3Zxj6KVluasmUimyXgA3QvJSyoKR4DQhkYcfcn4OmEwjjF1gQmTt4e%2BpPRkofpiIVdbrEBlcgxz1g1K2FxFkuTw%2BrmRBxs4ZiuRG0eMT8lr9qL6iPqMq57M8%2BL300EbDKE9wZyo%2B%2BIHvosmd0zkas4ZK4LazFgws5vnOms8AEYy4Z6gt3Z3Jo3ZIa%2FPJwmf3ta2%2FRXd3c%2FUbz56tqE4oRlrkg4nDd4TuXmLEsFjAxsIXyNyOJU%2BLHgDraH5elrjNnuRC5LetyCeOnOfc4xyvWm3jxrlNNlMHr9VMLpJ6iWXEf%2BxTDi752UL1cBIkwtkABPHA5ckePLCHtRLnEcueFQHqu7eR%2Fp7fL55E1HRF0OW3vFfltmd5%2F%2Fc6iE40Upr2u5KXDYc%2Fdtwx6CCDEotA5TS8Qx9I5wXHTd6%2Bttswqyd%2B7qc%2BKtpR%2FJydH3N5QsEHG6fNR%2F%2BDuyo41x1uh0V8ePa7DzI1AHRBsNuNnG05CPTqTsaXdtLGoOVCaaGKC3NnGA8%2F5RkxYpx8601fSnJQWgKQj0pcjp2lyGEgqjPCaeS1GxeT8vgw846LzAY6pgFrIgf5%2BhGxqdnmh7wFQ%2FrsBrgnDLx1O9b0SsluiPZlo6QQr5ycRSes0x8QRnj%2F2UcdCTSEuwnM4Kj4M5w8gaqmZIAuAmCgzwdM5edDbVwJnm6uF5LViBMennNs2xZKZZcZKj7RIwbggEQcq6wnllt4KZlW35UuUmXHbFRBkKY6ebTih7oMxi0mMF3yhwRzG2bfxfcs%2F86A6DUvssMIvNqDrTbO4FWt&X-Amz-Signature=3c3e97ea41a47aa965d960dc5b5d9c7d654f6c0e727458c612800ff856c7dfbd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QREX2RO6%2F20260204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260204T050230Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEQaCXVzLXdlc3QtMiJHMEUCIH6tRyHIloXe8HEd5PDD5kDOYjv8GcnSbEuJsSyrT0o%2BAiEAiX2c0cUlWBxpLDP%2BJdRzv5uECyzcuc%2F2rTCZRrhN4a0q%2FwMIDRAAGgw2Mzc0MjMxODM4MDUiDIAFv9vE6kdY37PzUircA9lUxMOd9g8w0GCNwVfSLrVLQwnf9mVZde6F7jJCiBhKgiWE55JokI9c9kdq4y7mnYgpwDu7EfSRxYxyLX68itjMm6RadboOE0QrsbPIQTMrHtu3IkahYMCknIjuuJUYXjV6PZfsjaC31opvCsEwPZAoNtvcMCYndpFtx6LcuXWEE1f6r6%2Fs27hC3n9vZk7zAt67vQy8qI4WoMsGkyMh52%2BZONXGsj3%2B9WWS%2F4Ozy9I1BcG1xXuCluwMrMqXWv3vR1eG3%2Fl%2B6H5c%2F55y7qL4C0bHy0Lz9yQPgUrS4GCQw8BYfzbBpx5zb7dWnjoFr8Kp3x1VTk%2FKzGKtOMpWxCtRSDI9tQl6TPT0qWjCSiItXsS%2FqvnczD0vxpc5ghBPLZhIRA6KeSqylAyfaf6z%2BecMir42lDKfWMkvZgLaXzwA9BrxMmU6tNsyPkFIr7Q%2BH85Lp%2Bf9hYCW0%2Fe7SJA9iP%2F8YJctg1Dv%2FgPp%2ByPBznJhdeRIqReVRRV5E5pHUMdDwKzqG1CYPDIXKkYDDsa7PGvm4EWOfYcNYLBcCwSc24A17B8i1nVYyXDOuMII7Trvos283dHReesX0XR4V%2BxqZOsrkk0x3tvbSlgCXvaxAnKWqLbiDBvN8BKrSF4XJCWKMMyQi8wGOqUBA8fdADznZkAjrzfPxjj42DsRSevYfADx9Rqw9tNMMPOOBVlox7WEqrvyuBMd7Zfqqm30%2BmN8qI4BYUObTNpjwO4O%2B4Y%2FpIq3Gjxrup2uUVrszXwQTbia5UrZBEwnJTbCFR91ynuMwK0%2BC1OSqk4FVNZ88DPQ4fW%2B8s655uL%2FxPWdC2UosnXsyx%2BLoq%2BOoSf3TpK99NTRcah0RYjFg88CvgvN4f29&X-Amz-Signature=58462d0ee0d19c9ded7d39198cfb880189cde6fba95ce3c234f5a976d65e8e03&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZNUBID2J%2F20260204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260204T050252Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEQaCXVzLXdlc3QtMiJIMEYCIQDURauLRvKxC2oQU%2FKaz%2FF2utSUTZGaWux0XDp6ipEuJQIhAK33Y7aSudlT3pyBz24voTxo3jmpSsxo9Ow4DDc9ENGIKv8DCA0QABoMNjM3NDIzMTgzODA1IgyQqz8AlQjpKc704%2Bgq3API%2BgfQb6R9xg%2FITTvglIKAX%2BEx%2BRG7i5TtkxDDzbk97pp3ujyCSjd0sSITwhd0004QPSK1KUl4a3OfzHKiv%2FzgqaOYzYWrdejdfNcdaN4uOUGsVekSceyxkEOwZWJxGaUta4xhOAF2RgU0Cj39vvoJQPXaG0y%2FC%2BFJd5J6zCOe7r5qeRagzeYYnxmcb69hci204YuTv51QhTDNI2BkG4ZJ5SUkJG%2FSS2aloBiZaesVwF%2BUfR5hoXh9fiQwmbO9P7myV9tMMaYwYSzL3wpc9aa5Qj4aIvsUCiaO5SiiQVO17o8nn0ocq5xM4TXUQWRtIe5SjDWrX28JzwVC2p7%2FzoL7uOXxOX5Lwdjo0EgJxlISP0DeHomuo55eaj50gxKMe%2FHe17vjmmAeFwQ32WHMmm7rYdFkVKJDm8vL%2BJoqgysl6TRkbwu%2BHJxqlxORe%2BoRDb0y58vAnVXTBf5Zc2Z3qkxoQhAokgm%2B6Bw2D%2BCRpXGK7VstkMNFAxKVITzLck099%2FHtRL1kbWvTR54tVKvvHsRXaKnj7kWEK4bq2zzhnRIWSgPyHEfZqWW8euQdUTx31W4Dpk9njiu7WcQ6%2BkbGWDCsK39BG4RrY%2F95GUh3DvuF1WFObWugCsz8PiBAazCNkIvMBjqkAQp4nhwSAgqAjhkh9er%2FXy0dSkDarBptrx9xeZkpxNw9XpZuIiw2DNV%2F4zRywVEfDWBZwBW5I6A2CioKrW3plsNNw8XkFx7OcCMVX40RYbCotUW6iw5SeUQWJvNC4z9u9n%2Fd0%2FSD60j7E89PYE7wGMNdNeY9it0LoELY%2BTKnEsy80PWbIB6dzI%2BlaRE51WLH48AjKNNO7NqEFEoZ2yzsR%2BS8amTM&X-Amz-Signature=2d47eecf74c53fa42bb0ef7a9f21e1fc5965865db9248b280cfb8771cd549f29&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZNUBID2J%2F20260204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260204T050252Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEQaCXVzLXdlc3QtMiJIMEYCIQDURauLRvKxC2oQU%2FKaz%2FF2utSUTZGaWux0XDp6ipEuJQIhAK33Y7aSudlT3pyBz24voTxo3jmpSsxo9Ow4DDc9ENGIKv8DCA0QABoMNjM3NDIzMTgzODA1IgyQqz8AlQjpKc704%2Bgq3API%2BgfQb6R9xg%2FITTvglIKAX%2BEx%2BRG7i5TtkxDDzbk97pp3ujyCSjd0sSITwhd0004QPSK1KUl4a3OfzHKiv%2FzgqaOYzYWrdejdfNcdaN4uOUGsVekSceyxkEOwZWJxGaUta4xhOAF2RgU0Cj39vvoJQPXaG0y%2FC%2BFJd5J6zCOe7r5qeRagzeYYnxmcb69hci204YuTv51QhTDNI2BkG4ZJ5SUkJG%2FSS2aloBiZaesVwF%2BUfR5hoXh9fiQwmbO9P7myV9tMMaYwYSzL3wpc9aa5Qj4aIvsUCiaO5SiiQVO17o8nn0ocq5xM4TXUQWRtIe5SjDWrX28JzwVC2p7%2FzoL7uOXxOX5Lwdjo0EgJxlISP0DeHomuo55eaj50gxKMe%2FHe17vjmmAeFwQ32WHMmm7rYdFkVKJDm8vL%2BJoqgysl6TRkbwu%2BHJxqlxORe%2BoRDb0y58vAnVXTBf5Zc2Z3qkxoQhAokgm%2B6Bw2D%2BCRpXGK7VstkMNFAxKVITzLck099%2FHtRL1kbWvTR54tVKvvHsRXaKnj7kWEK4bq2zzhnRIWSgPyHEfZqWW8euQdUTx31W4Dpk9njiu7WcQ6%2BkbGWDCsK39BG4RrY%2F95GUh3DvuF1WFObWugCsz8PiBAazCNkIvMBjqkAQp4nhwSAgqAjhkh9er%2FXy0dSkDarBptrx9xeZkpxNw9XpZuIiw2DNV%2F4zRywVEfDWBZwBW5I6A2CioKrW3plsNNw8XkFx7OcCMVX40RYbCotUW6iw5SeUQWJvNC4z9u9n%2Fd0%2FSD60j7E89PYE7wGMNdNeY9it0LoELY%2BTKnEsy80PWbIB6dzI%2BlaRE51WLH48AjKNNO7NqEFEoZ2yzsR%2BS8amTM&X-Amz-Signature=2d47eecf74c53fa42bb0ef7a9f21e1fc5965865db9248b280cfb8771cd549f29&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SS4ODEVR%2F20260204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260204T050253Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEQaCXVzLXdlc3QtMiJHMEUCIQDFHa5w4JasAjDW5C7cOU2q%2BzFNpJtzIrI5Ur31Upf2CQIgDqVjHWObG72OIekE%2B03t2X3Ylp0kwJ6MfGAhZiL9zN8q%2FwMIDRAAGgw2Mzc0MjMxODM4MDUiDBu9tOP5JszoBOIhlyrcA2vKxNTxA%2Bu5FLeejiFmVFgZOqsS2EhxElpVcFPKS5htVJf%2F%2BsFVeB4GhyPt436q1i1PL9aWYyurloE1taWhnxqne6mWDDEXRQp42G7LK691eZGMZhtzEMJd2jxOvX9IxBjn6QjhJvbGwn%2B3YzhbrGK1gb0sLe8tWLlWu40ADdnYSJP%2FxEm0L4sF61hJnjSh%2FCe5UXTo6LQzzRnjyP5pbyDNt07iVTPJhrNvlRcp6jXsCZLTNJdDmyUyA6nTczoH%2BuQJacgpQ3JKH5ZvmzKZID1si5e2U5PCTyKZTsYa6ZI0%2F3ovSF%2BCeR8T73uWunYqRB15V8EWaZXB1JmvbHHv%2FsckpBjN52Epb5asZWt6ES4B6dnbxA6LRY9vpEQull32RqCba5rM5S8U4GKDOYiLWC8NhzHWz2yW5rM%2Be4KEO4s5yHOwcMMkdo7KCSn4f4Lm38A%2FBl%2FwsfcF%2FEnBU%2BBDbrYgfbJ%2BnKanpKEsacOmb6xwa%2Bdhsy%2BPu2MC5plDF03rjaxIytw%2BMc6FG%2F2ihANL9C04lZohOPuy8wtTByGs6upj6pIKCRWrPvNxtnOvQ%2BINwRWmxim6q%2F1wP%2FpLcwrU0oRZRL3d5P9SarjNs%2FRn6C7y0QdV0EbkqCiB04GcMLSQi8wGOqUBvothhLURB5W635BVD9TwFWdewpgeL6sOppFTvc0OskC3M3i16E%2FuWCpb79V9N1KX8sqgQMFy0NV5Heo9xXwpUx2wujSu1hGlTMZo9w%2B3M4hcZUrFezKxjSuUeORK2CUdClmVEjHIJIqIy4xS0o%2BUPImTd%2F1PLG9ZEZGSmglt3y3fVm6%2BRJIZodd2w0TTQ7IZZsW8cy2SPnbeYDDM13PlNeyKMtxe&X-Amz-Signature=7233dfaa0b9893d9d49c17d9e9e04faca6b662164bb8b4b7d2871c14b3f5d667&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

