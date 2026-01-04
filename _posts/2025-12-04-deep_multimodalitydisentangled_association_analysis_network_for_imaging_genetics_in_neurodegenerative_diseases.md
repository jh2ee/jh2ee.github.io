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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Y5ZJFEBS%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T132222Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGEaCXVzLXdlc3QtMiJHMEUCIQDX3mWLYDFfBoSALdXn05L35SBVuzNyosa3B%2FczVrGrJwIgDZ1qZRBzNjYgqpiZNeHx6OpOhf%2Fm3s739qlSTiwJXy8q%2FwMIKRAAGgw2Mzc0MjMxODM4MDUiDLCptZuiNBDQ%2BswB3SrcA3eTMt%2BIZzX9YGY3rxtBSwgeJZmzQ19n7ty2ClpCOgkmKjd97xZAj5cqX7CJf9h4t3pb%2FuN2IbuiQbRP8SyC3r9hp7OZM3qg93PU86NzZvZO8aXMA%2FNrhWfXSLeEUp0FrT4ElZww%2BX3csvnCl75iSOLyseKQ83eOnZH76M2UaQyhgq4%2F6NwhkeN%2FRJBCrSjwBYPubKpU4hFsUm175bat%2BacdoF5dnNKmmRH9SHlTaDrXl39TPcmjrCq0ERkodi9uOCk3B6XC5SOn26mpZaNjQaZiPKu6qlhcaKlg%2B7lc%2BFrpblU2xJEmjE2vqdQsa4DUnhYc6FRq9f2JYo7pYFRzh%2B91T4pedmwopkj8ZQ351YJEsXiYB3z%2BJRCTM61T%2FHtDiUYyeQe6KoIP7%2FWgfXWDVQwMsDcpJ4oarXPGhylnAN61WK19FutdPFO1hv%2Fs8PI0%2Fq%2BvBK7gMtr9M6CiYKwWrFZQbQBEK1aKZgXTZPva8PRBZ4qidr6ovDRupGI%2Bmm8h1aYhaQxpR7Xpc56e6RilJFE%2Bg32J6vZ7%2Bdff8lc%2By3fHgkwRu4J7Wn1ykB9JvEuw%2F3ksXnzYyaNpUoj9092K1%2Bgn97MYOxOf2clRlwGCw06FaSTxbatGsaGQKX8FMOnH6MoGOqUBsYTngudZLSzIsiPlmwnPFis2PBh%2FM0RihXYhdvg7Fo9cwC%2FZku%2FGo3sB3PJLmpGpuYVo4ihtEmIPXphShiPngfDYExLwf12YVprjSCC%2FVcd9a%2BTUE5Bsu%2B6Zs8yeOY1KV7eBa%2FaV98b%2B703%2BXJ7%2FiVjvBtImvTKb4Qc8FGTsdQCfMMM6npg3E87y1eDSZY2dTnSpOyTKYmGw8RwjF%2FtS2xKj%2BefQ&X-Amz-Signature=fa863cd95aff0871127d81aebac28c1ec429a87eb7dd23388c4119e8cc699eb2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Y5ZJFEBS%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T132222Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGEaCXVzLXdlc3QtMiJHMEUCIQDX3mWLYDFfBoSALdXn05L35SBVuzNyosa3B%2FczVrGrJwIgDZ1qZRBzNjYgqpiZNeHx6OpOhf%2Fm3s739qlSTiwJXy8q%2FwMIKRAAGgw2Mzc0MjMxODM4MDUiDLCptZuiNBDQ%2BswB3SrcA3eTMt%2BIZzX9YGY3rxtBSwgeJZmzQ19n7ty2ClpCOgkmKjd97xZAj5cqX7CJf9h4t3pb%2FuN2IbuiQbRP8SyC3r9hp7OZM3qg93PU86NzZvZO8aXMA%2FNrhWfXSLeEUp0FrT4ElZww%2BX3csvnCl75iSOLyseKQ83eOnZH76M2UaQyhgq4%2F6NwhkeN%2FRJBCrSjwBYPubKpU4hFsUm175bat%2BacdoF5dnNKmmRH9SHlTaDrXl39TPcmjrCq0ERkodi9uOCk3B6XC5SOn26mpZaNjQaZiPKu6qlhcaKlg%2B7lc%2BFrpblU2xJEmjE2vqdQsa4DUnhYc6FRq9f2JYo7pYFRzh%2B91T4pedmwopkj8ZQ351YJEsXiYB3z%2BJRCTM61T%2FHtDiUYyeQe6KoIP7%2FWgfXWDVQwMsDcpJ4oarXPGhylnAN61WK19FutdPFO1hv%2Fs8PI0%2Fq%2BvBK7gMtr9M6CiYKwWrFZQbQBEK1aKZgXTZPva8PRBZ4qidr6ovDRupGI%2Bmm8h1aYhaQxpR7Xpc56e6RilJFE%2Bg32J6vZ7%2Bdff8lc%2By3fHgkwRu4J7Wn1ykB9JvEuw%2F3ksXnzYyaNpUoj9092K1%2Bgn97MYOxOf2clRlwGCw06FaSTxbatGsaGQKX8FMOnH6MoGOqUBsYTngudZLSzIsiPlmwnPFis2PBh%2FM0RihXYhdvg7Fo9cwC%2FZku%2FGo3sB3PJLmpGpuYVo4ihtEmIPXphShiPngfDYExLwf12YVprjSCC%2FVcd9a%2BTUE5Bsu%2B6Zs8yeOY1KV7eBa%2FaV98b%2B703%2BXJ7%2FiVjvBtImvTKb4Qc8FGTsdQCfMMM6npg3E87y1eDSZY2dTnSpOyTKYmGw8RwjF%2FtS2xKj%2BefQ&X-Amz-Signature=fa863cd95aff0871127d81aebac28c1ec429a87eb7dd23388c4119e8cc699eb2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466W34VZRSD%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T132222Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGEaCXVzLXdlc3QtMiJHMEUCIQDwOpAH7z3GNLWfElA8S0DHgaErw0sYVkryHhcMY%2BffFQIgKanmFviiIxMFN2%2BEfZelQ95fZrO%2Fh49ZAYm%2B4xvWGXwq%2FwMIKhAAGgw2Mzc0MjMxODM4MDUiDLS3n73rRzGDIcfFISrcAwEtdmkXvb9CcOQ%2BhA80KcoZyiM1dLUO%2FRAaMybmKSmvFmTjqAt5aCPL6uwmTToIgIJV6BjdT6gTLK8BID2IuIDnlulPON8xim%2FmXNK2IBQ0u7ZdAHEFk7GRtzDsB0rDxrqry%2FFDDoHcv1i7wrYrZRMpsCebXfIJ%2F0GypE8X8Dk9wUrszqhKBPZHGuDnws31GoEVZK78UbUUA%2BjNsRdRgV9QqxAYIzgMKa6%2FBrv05klUY7AiPY9VvQmpiwzBGkzKfiYWdIdHzXmrm%2BUCAt18ne3cQUJ%2FND1L6EZTRH%2FGyjPB0UySI1uB0dPjLSlvOZ8tEcujQJTrnKS0wAzAaMb9D27AiKESD4fP%2FSKmG%2FK4XrtGXBJiOZ9XjHJUm18JW39%2FEC0jQroWU6iktja4Vc27Ds6e2%2FBFRI3EeukxJJhupYVtZ8xjIfy2Q72hmNbs3o04v9g6SSu8frcwmRuTI6LGA%2BoC0H%2B32Af%2F7KPTX%2F2lalnJL13e2gUGq5U6lItH5dTtqGWbWKad10AzsXVlMJQnZuguvO2XXGLI9SpSXN%2BDXjXMTs953jKLpxOJT7XYfnHGBLmbtnVHNSy12y9dKw7%2Fu60rjxnyuNjgH3JBhRryvDQ%2BiIR3zOVDuamzQFj6MOTR6MoGOqUBmq%2FvsWp%2FhFz%2BiH%2Bqe20t%2F%2Fm3NQLcPiFyTuaZakeXnzvJ%2B7a%2FEBK8%2FaBD3lrI9xBINM6Nv0KlLL2hIUTck0jlhvj5V2Z8ryU20ZNb%2B0CCnYDrb%2FxHterKlJiVb79DLLk9ndgigL1xxyVcc4IvIITuauuv8UfTO9o1i8FfwdYyH1Zs9%2BrJNvTXh0XKvGsHy6I%2BegHNfTxMqBIV6tW%2BDLgisCiZMUzJ&X-Amz-Signature=6e33e5948d5b5a5756ddc417984faa089a98e7032b6212007fc819acd6ca17fc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663JRDJQYG%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T132223Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGEaCXVzLXdlc3QtMiJHMEUCIQCfg7zfQ5tKARbkhiV8venx0gbSS8r7rIe6qDvJJXhE0gIgax6OnHSs%2Fa6dPL7oZ3FfBz%2FvPagxnCzbVIWIC%2FC6qAcq%2FwMIKhAAGgw2Mzc0MjMxODM4MDUiDDGzKiczj42KPgo3%2FSrcA4f1H44vSMyPnbSVr%2Bowmc7TI2jPb%2FPByjKwIJizbWbio31bNHsYIpMdhFbMIP3yIpRwfosiTxcdhON%2BOd48IEAwgyOGI5NtFqMgoBcLWBHLv2v6%2BQIRoiJ2hANxInakkvQ4RSz1rqwowf6SMx9wh1tQdGdPQSxLuktNfIQrajMMeoQFga4%2FoM2g9yDReNKyURu4AMNEuFU7KVrcXR4AUaNzO9%2BoSCxt7xJwvqApICM6IFPgAyl5e7qEWVAk6N6zYxxqz0pmzLitZAZvuG7B%2FpYua0IcoLaRNaesXS4U%2Blf0kUVc%2Bnfr6BUFXEPtIIP1YT7DfJ8M7S45eMi5%2BHDpn0azUygAhSGYrAxfZk1%2FO1w66EFT%2FBsey6WKcPfMfjmuasm3QLlVAdtd3Bb4x8NEE5VUDeNYlK%2FKZp%2BRX%2BISjnsXA1ripVnmIBE66elORc1QJFwhQHg5xDBTupBt1JMW8bTWgOUo3%2F29RIXiSF74XbG8S9vc%2FVs%2FoGtC8GtNsAmFb1FDNk%2F2AmRjoGthQmtc%2BUKrDZ6L6YcFpHhNwFtgnIexGAVUvEudcDQsa0GkKpLi865TYVQvB2%2FoXizWYBwzlHY%2Bw7O6q2viuXbdItXIiMgl0mR%2F0pcxtNd8jPkvMLnT6MoGOqUBXSM5LH43uyXCt3Dkxeb1lfeq2xQZ%2F5fMovKYPNSD7d1Tbbv37V7c11417pfpLKb%2FbKvnQe0n0Cw%2Fq0vsdBv%2BoR6EXIlQCtZFg98Mh4%2Fr99iFcgOgvYJUEomX9VqZWidMXgBNh7esDelB7axWJZ96c7uz2rwsqqk%2BLUGKpd1aakrEnTXc%2B6HAQt30GlexBKiPDqh7wsziLu8ldWC2STadgNa34qnF&X-Amz-Signature=9872461748f60624a2c9e31fe7d3f72c7a4e935be541e5e45bbd59836f8b06ee&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663JRDJQYG%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T132223Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGEaCXVzLXdlc3QtMiJHMEUCIQCfg7zfQ5tKARbkhiV8venx0gbSS8r7rIe6qDvJJXhE0gIgax6OnHSs%2Fa6dPL7oZ3FfBz%2FvPagxnCzbVIWIC%2FC6qAcq%2FwMIKhAAGgw2Mzc0MjMxODM4MDUiDDGzKiczj42KPgo3%2FSrcA4f1H44vSMyPnbSVr%2Bowmc7TI2jPb%2FPByjKwIJizbWbio31bNHsYIpMdhFbMIP3yIpRwfosiTxcdhON%2BOd48IEAwgyOGI5NtFqMgoBcLWBHLv2v6%2BQIRoiJ2hANxInakkvQ4RSz1rqwowf6SMx9wh1tQdGdPQSxLuktNfIQrajMMeoQFga4%2FoM2g9yDReNKyURu4AMNEuFU7KVrcXR4AUaNzO9%2BoSCxt7xJwvqApICM6IFPgAyl5e7qEWVAk6N6zYxxqz0pmzLitZAZvuG7B%2FpYua0IcoLaRNaesXS4U%2Blf0kUVc%2Bnfr6BUFXEPtIIP1YT7DfJ8M7S45eMi5%2BHDpn0azUygAhSGYrAxfZk1%2FO1w66EFT%2FBsey6WKcPfMfjmuasm3QLlVAdtd3Bb4x8NEE5VUDeNYlK%2FKZp%2BRX%2BISjnsXA1ripVnmIBE66elORc1QJFwhQHg5xDBTupBt1JMW8bTWgOUo3%2F29RIXiSF74XbG8S9vc%2FVs%2FoGtC8GtNsAmFb1FDNk%2F2AmRjoGthQmtc%2BUKrDZ6L6YcFpHhNwFtgnIexGAVUvEudcDQsa0GkKpLi865TYVQvB2%2FoXizWYBwzlHY%2Bw7O6q2viuXbdItXIiMgl0mR%2F0pcxtNd8jPkvMLnT6MoGOqUBXSM5LH43uyXCt3Dkxeb1lfeq2xQZ%2F5fMovKYPNSD7d1Tbbv37V7c11417pfpLKb%2FbKvnQe0n0Cw%2Fq0vsdBv%2BoR6EXIlQCtZFg98Mh4%2Fr99iFcgOgvYJUEomX9VqZWidMXgBNh7esDelB7axWJZ96c7uz2rwsqqk%2BLUGKpd1aakrEnTXc%2B6HAQt30GlexBKiPDqh7wsziLu8ldWC2STadgNa34qnF&X-Amz-Signature=602b1c190d0a6b03d29f1cdd6fcbbc1d0c254a2b8dee084c94d388ba17419a97&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SJQC7OJH%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T132227Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGIaCXVzLXdlc3QtMiJIMEYCIQCgxIHY10B9LwDVXcYWhCr9tbFpGpCYsuxB9NdX0v1eOgIhAJHEyqM%2BRHl%2FxO3mh2tyv%2BH7UwyMKB24qfQXGwAR%2BBP%2FKv8DCCoQABoMNjM3NDIzMTgzODA1Igxl6kt1uEcipdl8ZeUq3AP9Jhwf7bW%2BGPu9nqs3b57JoXtQPJ8ld68HQdsVCgfaKA8vTV41uvzg98FW%2Ff7tvpwyKja%2BiBCFnka7RnpryYKZ6BWxqSF75V7SCiASMX46eV3inkAd8k53BPQDyZWAyEydH7y0TAutEYH9zwURbKzST8TY536OPoDbIHUdx1PZi9vvDcluTESbRdjKevgqe45DDpRvOsJExHiqzLS3h5zi5vPAUgFbfB%2FZZm%2F3mvinrN1c5IKRt0lw8wK8PopglA0Qa0cTUCImPLg110sWwthhLa0UpKAcA1cgLm6aKxn124qJ36MMOgp3%2FdeJcKmSk%2FuM8DwM4m3pfZbiBatq08nXPRFtdaI%2FEeBSZpT3EZVSSIDb5MzTm%2Fj4FFDOdqMtNSEDUGn%2Fw6tS6bgLKcVQn2wWv8GiJOAEvnWAyRaLIEVpe3gqCPCaa4SeWvTDQIIvRF7m00JYxLGjw%2BXZY4xkfLE6RpFeZvVp1Fimc%2F%2FE7uZxeMfC6vj7CGT6iUPU5gbKE4hpaHgKAXbWflFiaU6LaUWKl8eh5HLWmuyK6xLXjFrYpnZUpNZYpNgYtwcvygm4tnZsLSHmYS%2BQOSgNZ2KDW3wE3SwHLsIULMPqZCaB7RPkLgpli8I1UCUg0JKkQjCI4ejKBjqkAbL0YmiTPHD3ySXcacn4UKxMg1isfHUm5tedu%2BEf8aNZkB16zD92v67pb9HIHedSw9E0AOWg9PgOc%2BRAhZ3q4bltnmSgUOy%2BMIIAqRHeKfsVNMmIOhWylQeLBpbKhaEnFrNMFQgZVFTZCdCP2f%2FhpRymxZQPxfvNzjf4ObTdGOVLweioRI8Ncl3x59wLHye2CuoeLXugG5KL53Grc2xutVR3xGgW&X-Amz-Signature=ecbff32c63ced31b02f0d2a98c349e9cd7dd03289a793ba8d822116422d88531&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662UYLQPKU%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T132227Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGEaCXVzLXdlc3QtMiJIMEYCIQCzs2qnJR04ADBhOAGuTvRFRm74TsyEvVZQwaBBJ%2F6zBAIhAMt5I6YhAdDSvoEpG1Z9NhmbHrd%2BRq3Hv3oWK0x7k2SNKv8DCCoQABoMNjM3NDIzMTgzODA1Igxqi%2BXGnsc9R%2Fqv2kcq3AON5AdAWvT9pzraN7Ssl1%2BltSyTA9GhSlU7PvD8F4E4SvJQUljetBiZDESbx8FVEaAGMhmM7YMaQc%2B9ckdEVKURuv2qv6I3bsN93Rt430RQKHX8WIe%2B4%2Be05nXdgVQUQcp2Cp89DA8%2FohTV4YRCLz2cfc9j3K1%2FHFQSKyj%2FhskLekKwVvNmL5qKRHtqdip8zCP6sHPWSFmb4brw3BJHxofKsKUJYLgI6G12StLd9vP1rlQjWY4iaQ0uOTeOSOcTa5NDqiAWfD7bYjYPgPTFlZKrJrNoi2e%2BQhIo96KMJPT5qFCerlB3mjgW5qVk5XJgkpOczMX9ZR0wAb4qRovD%2BlSC%2Bka0Sb%2BSjpdBA%2BlveOYniEOtLFNsvLRiG2JAvoBcT%2FpxJGt8MBHss5V3h%2F6D5Gmz%2BHl5HFkToQKeiTEnJZ%2Bx1VvMfgEL3MeTlb7NhfhZjJww3HpjNVMbe5QETvTkP3QwZUG1vMIx0stcnuAoMQVuCqzuW6si3bD9tJLc2cbCTvvlzRkUStMBprRsDYuComxYE8uRdWUCT2bFKBu6j1AvtBdNE9dwsQ3Bg%2Bm8zD3ZVPOa%2FYksKxpkMtF1n4Ne1dHt728CxaUpcVx%2B36kH1qTgQLeNFH5FWl1wfHap%2FTDo1OjKBjqkAfo824EZXTjcS0EayAzoKJik%2BchGJlWTwk4Xgw6gZ%2F5HL07KgNrua%2FVXGYXiRX0%2FyDvtbOuBBqVNHuu%2F5kVhlf5qHrMsNj%2BR4C8zQ2m8Mb3Ks9bEtSuNzqz13WQNEbL7houWx00WIVUOHEsSRUD%2FDCqcW1K%2FlIr4Y%2FfhP0TY9DcdwXNjy86cKq24h3gB8XdVT2yj6YCgyyE3xxkKIuVpDhj959Vy&X-Amz-Signature=dde43ec18eaa11e881b6d990be015c29f43a0698fa88ddc23ade17ee43c15263&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Y4NSQBZU%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T132228Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGEaCXVzLXdlc3QtMiJHMEUCIQCrrET%2Bsq6r%2BnS2r493Cz0Y0Ti0rnjd1F9K22x0iv8e9gIgAd9sojW4jJru3tufJZtoOiPvrOHwsuMllvHTjWiiY3gq%2FwMIKhAAGgw2Mzc0MjMxODM4MDUiDMlRbjI4aO6RrwWSgircA8KvQl73meN4s5aRDniQHwZRy3lgUjCkgGYIVvHHICjU13gb9tcdK2SyNIvgwxe2JVcs7t8PgA2S2FJEzrpAReoOKsVlJwS%2BX%2FwqFCPqPd6q3MeZKVvthx%2FpOCh91n9eQs0Br5lO02XMCaFjWeuUwG4WWt9M4TUarRGZoBUOw%2B630bPNdks3gKFcp3pwTIBCEhz9ibZb1ef7HYseBvpHpuwjbHvwk9D7010p306vWb652sLeAaX0HPH6PZGSPfm%2F5R5IozDv51IQNHaIUmzlOLC1%2B2DLXRKuncKCul8UZlq7LQazd6xMmEMsp8OuiYpxgJkQ%2FBNvvcApYrVfVcqMdIcwNH4KZKLMMTmlKBsvoS0dG%2BY8N%2BzfMd74tQcJAwwGTvPHldpvJE9Ls7UxrQ%2BYA3NyeK2mx%2F%2BikP5Psm5B2IV4kCxqDgreYAchVGRy7gyFI1qHbMvgw89KoF2XAIrGimh1iDnMlrtxwJIgJ3teHltPDZaeVXExX7FuRXLvPwjyx48x72H5E7pfm2aYUuJqlrUrj4PkF5dXxPny124sts1m%2FbXTFgMJ8trRusSVnonGstCIDd4W0%2FWJU9qlbhKMB4XvKjrHQ6KoZeXE4WaawtvoYNOblDfSXR5JorgdMPPU6MoGOqUBAD5b52207w%2Bp3v0zgul7yXKDo5%2B7iaIwbaxxSLvTWBOVL2aE5KJGz06saW4lo0Cwv5q7OqQl2Un91f1OcfGE93ADEAVEuWMTIvAX5m6xHdUsJ%2FRuefytPP8T4ULIo%2FlRRohjZ%2Boz7HxP1TTqUuBD%2F3A42TmsFV72vdaKbUdkY10lAl2ku0jMW8ccPiurJraGlFoMmAaA7HCzbOfzc%2FYq7FKl6%2FC8&X-Amz-Signature=bd75102f7c55ac01a89c3681dd806a4fac9479dda79486032c72f61d242daef3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XSXJBTY3%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T132231Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGEaCXVzLXdlc3QtMiJIMEYCIQCem1b%2B5OFcq6KTdS%2FB8o%2B9c5920GrQ3FznzKcHPgaHGAIhAOvWw5AOaBfw6OXV2ArqMxYoQSQwhhQ%2B4JAF3dFAkJ94Kv8DCCoQABoMNjM3NDIzMTgzODA1Igwpo3dt5U3t6ziyV7Yq3AOIdBys0HiLcNmpNBfKu3KuZZbSzj0kHVsdSp42zolSTCdnQ%2BsMVBl2nYZ7AI5toD4iFu0%2F3eU4ja8NP%2FAY8auMzstDOG19lGYyUGflWhH%2BjTnvKDOqaTEklNHl4G665YjbeDlprzwmg%2FNyPY%2BPImCJY4SS1MsvzYBkcu4zG1%2FBkJk6xc4gdqMSyG0rG8QL9za0rXNufJxHab5kGg5rKuNcaMI%2BS5C2hNE7wooBEtEuHdL45UGVOSTkDBh%2BPdIuxjjFY7JdsiS82Cd6SJ%2BJnSpZeEBVH2fkQZx0L00eW0oZvald0P0iXHMWfdclQYNGG5lOAffvz4I96qX82DWHJLd0fvTXJJkIBjaj8Zmx91pGTfBe%2BXdyec2bsfwtU0hLlTDFhM0zpW9ixWNXXnoWKIbs6CpoARBevWqj8kpELdmNnd2yXUWJ5F9gB2zOejZRM6vf0ckMY3s9FdxtHhrAI1I%2BZM1QybUE%2Bg2uOkk38T%2B6yYkjCCEjBiCNuRgFaWmlbvkDV0ryh9R0yEBpXJ9wnKMpSTs2ftK3qV7L%2B5J9yBkn%2BdNXG%2FPZuKKs2ZWFp05SQHzo97aENUmJ9EFSDurJS8y0WRsN3y14W6jx3qn%2BWueUjid%2Fy%2FcF6n50h1nKKTCw0%2BjKBjqkAR5hHaRk7kd6nSc7gs98Yl9i2B6ycUe9vbZX%2BpfFIicrzfMG%2FV8mFc7D8Kf5qWCyofVe9UbzVkzEwGdRxtLxTfLZS2H5wtOtRnM%2BaDvrpVkMDEaG9MOZOpXCdlnN1Jujyj3WPXqssshSydCppMEYo9sz7lV6JCF6sPGDA%2B2IE0L9qWeKDR0EpuM3n8vROB1CoQdwUjCsgSK%2Bm8JIH%2Bo5sdj9eevn&X-Amz-Signature=4e2e2e7146d8ad320a47662f8c5faf1ba25f5bd1f1775d9273d37a099a76935d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XSXJBTY3%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T132231Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGEaCXVzLXdlc3QtMiJIMEYCIQCem1b%2B5OFcq6KTdS%2FB8o%2B9c5920GrQ3FznzKcHPgaHGAIhAOvWw5AOaBfw6OXV2ArqMxYoQSQwhhQ%2B4JAF3dFAkJ94Kv8DCCoQABoMNjM3NDIzMTgzODA1Igwpo3dt5U3t6ziyV7Yq3AOIdBys0HiLcNmpNBfKu3KuZZbSzj0kHVsdSp42zolSTCdnQ%2BsMVBl2nYZ7AI5toD4iFu0%2F3eU4ja8NP%2FAY8auMzstDOG19lGYyUGflWhH%2BjTnvKDOqaTEklNHl4G665YjbeDlprzwmg%2FNyPY%2BPImCJY4SS1MsvzYBkcu4zG1%2FBkJk6xc4gdqMSyG0rG8QL9za0rXNufJxHab5kGg5rKuNcaMI%2BS5C2hNE7wooBEtEuHdL45UGVOSTkDBh%2BPdIuxjjFY7JdsiS82Cd6SJ%2BJnSpZeEBVH2fkQZx0L00eW0oZvald0P0iXHMWfdclQYNGG5lOAffvz4I96qX82DWHJLd0fvTXJJkIBjaj8Zmx91pGTfBe%2BXdyec2bsfwtU0hLlTDFhM0zpW9ixWNXXnoWKIbs6CpoARBevWqj8kpELdmNnd2yXUWJ5F9gB2zOejZRM6vf0ckMY3s9FdxtHhrAI1I%2BZM1QybUE%2Bg2uOkk38T%2B6yYkjCCEjBiCNuRgFaWmlbvkDV0ryh9R0yEBpXJ9wnKMpSTs2ftK3qV7L%2B5J9yBkn%2BdNXG%2FPZuKKs2ZWFp05SQHzo97aENUmJ9EFSDurJS8y0WRsN3y14W6jx3qn%2BWueUjid%2Fy%2FcF6n50h1nKKTCw0%2BjKBjqkAR5hHaRk7kd6nSc7gs98Yl9i2B6ycUe9vbZX%2BpfFIicrzfMG%2FV8mFc7D8Kf5qWCyofVe9UbzVkzEwGdRxtLxTfLZS2H5wtOtRnM%2BaDvrpVkMDEaG9MOZOpXCdlnN1Jujyj3WPXqssshSydCppMEYo9sz7lV6JCF6sPGDA%2B2IE0L9qWeKDR0EpuM3n8vROB1CoQdwUjCsgSK%2Bm8JIH%2Bo5sdj9eevn&X-Amz-Signature=b9289a3b67b42b557158a394522512a6012cafe0e78fd28d3308bd4251512cd9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667WB2RBPR%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T132220Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGEaCXVzLXdlc3QtMiJHMEUCIEqKnKejddSYI8qAud9sapo7QlPsCjETKw7E5hHtXBRGAiEA7jc%2FFaf68biQLkMqcWfCeKD0xhwIbuEQ1aFECvsX6L0q%2FwMIKRAAGgw2Mzc0MjMxODM4MDUiDA3z6o4mk2EPCl2VsSrcA1Lw6tfSFRq6M62NO2UMN1w7RNzGpLt6imMHvSXWSvWCyneuMUQRXbLP8FP5HA2hJaRPHkXPONZ6rYWH2WgV%2FftuvrSN0zM8A58%2BDHZzDju7V1rhBNl3YrNsopPoW%2BJuoBHj3vOVM4d1mxGsAogO6vxwEW3L5FJvoKmJkypc4nXSfe5mOivxc3%2BCcP5IyjimOiw4GHNqY4PBbI0jmDijon3UJJ2dculAVWdk%2FjkvjnCwkj9oAILn2wETfZOiN3iuWmA81vgx%2FvZpSZ55cEjUal5gBixEyy345Fe2OcBMKXydqg8%2FMJr0%2FypbKHhmtwjeteLQ7UrwRd6ksnvIledK7JAPKYmphAKLKIDBsbgC8bqp1CAtiKLaS1FUlA5QdcQthDahPy%2BoCh6UAbC%2BKAWHy1nM0KQiSqzrwNe8ostDVBdfD%2BnAy5JYRjirRnRQZCZooLvP7bOs76L1sJMYodWCLqEvcLYOc5EpPxrUYIpf7lWm7hfm%2BmT8zwe0ewJrMNwicnCCRwBI1VhHBnHmL1%2BXt9mWR2brCtM%2FxeypwZ%2BZHFEUcEzZp4KFf8wUtmMx0EczkgKucHAethJq7vFy1h4e9iUjOnlyx2sPCLmPoNTZg814M7ntSu7HbRu2r%2BGTMNvE6MoGOqUB7Kn9hneSq5X%2BdGZM2xDxzn6HIjqOajApKTYJZxxW0LdmzqM3Uy5jH1ypGdp1uQxLgrJyRZm8%2FXXULq6eZo19WZraRxzHCtDF2oNutlaxg41EIP6EkdYSZpH9peEhNkCfjao1Bt6zqRrP%2FF1OR%2BPtUGBfBMFnWtq%2Flp6tPdjoWYAE1Qs0Vnopo2NA4bekC2U2Lc6%2BEFIzGjMm7jtNReK%2FeD6FjJud&X-Amz-Signature=be329b79252db44bd4dc36987f9b825faf3b6adac69a4dd24dc0a7b0a9f84f1b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663KR23JZS%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T132233Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGEaCXVzLXdlc3QtMiJGMEQCIDJ6XYrH3M34MROgYfYFbhSLEa2JIsphRnlK7brRMt5TAiAf9EvVrpzW77uo4ClLcRmH1h9Lz3c%2BzCFdIhZCuozyYyr%2FAwgqEAAaDDYzNzQyMzE4MzgwNSIMXqTIXB1nrVeiHLS1KtwDTdB8WLekmvIUzuzy2ae5KsdhOyKhtpfSx%2BNwXLEOiInTsXhesdnHeK8f%2F%2FLmOR3JFcyyKOnm1Pq7kBg%2FFz5Q9ZxdEk9dd0Kv9nDOmnjpe%2Be2W4I6b6nUmxkDH4uNuI9Na1X3IbyY7v5qjL5qOAfw2hMSKQcQ7bnC7qHve7PESoR%2BlKCBxyhVZKrOtxZPWj%2FxvC7IlEjtxroUbkAnLJQlAhRJUKdFj3no%2BkqPYLJYXvZLWNR9sXYLID20Y%2B0ekXKt2Dy0fhBEu8jFKEFkimFrzttJlPuEHQdfxYMLeWVZwp8f7jd16Lxs5S9eMGbfiJrgnAQGlVy2Iz7swqpsOeLp3w%2BOWx3xcAPWXi7cTthybKlCRbnbupWT4cQp4CyNf6B%2BShrpfwwIAH%2FuKl4JEXNjyeUtpwycMtKZPy3mJWgH9rpZ4Tpt%2Bql5HovPaLzG%2FJFfNMnbQL66mbeDgFZF%2F3v80y4L8bMKnzGY%2BubRafGi%2Bh5fvWopo4c7p4SlJs1I8vgtg5LZR%2BVgNtkwx9kkFWR1XfJ9fEWNjiQDrOQ%2FFuIn6Zc2lSB11W9DiQ4IBmEWbheg9MFcukcvl1SbbDXXPX2I06nMH7CXZ2va3nFGwtMJHM1Zp74BTydsWC9aktYw28foygY6pgGoqwFJqOnWKxnVCj9JDtVo6HvfgWYCoV673Y2CarLU7kyEBRaCc10mYVPrtfCRzh%2B5M5EDrv%2FXt1vgyYIg%2FRZM55wirBd%2BXCkQctrDpu4vet7X4Sy5M56yqObAufn21r3PwY%2BVgOi4nBy4WPlEblOwuh6NbBX42f6DndoleDSF9GI4cZp6sa9P47CBTowJA3kB%2FmJodvAm2h6smKi2MxuHr00s4S%2FA&X-Amz-Signature=fdd01930e3096b5c9dcb57406c05283a45f4a177be8bc42e0f557e8a0bd731d7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663KR23JZS%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T132233Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGEaCXVzLXdlc3QtMiJGMEQCIDJ6XYrH3M34MROgYfYFbhSLEa2JIsphRnlK7brRMt5TAiAf9EvVrpzW77uo4ClLcRmH1h9Lz3c%2BzCFdIhZCuozyYyr%2FAwgqEAAaDDYzNzQyMzE4MzgwNSIMXqTIXB1nrVeiHLS1KtwDTdB8WLekmvIUzuzy2ae5KsdhOyKhtpfSx%2BNwXLEOiInTsXhesdnHeK8f%2F%2FLmOR3JFcyyKOnm1Pq7kBg%2FFz5Q9ZxdEk9dd0Kv9nDOmnjpe%2Be2W4I6b6nUmxkDH4uNuI9Na1X3IbyY7v5qjL5qOAfw2hMSKQcQ7bnC7qHve7PESoR%2BlKCBxyhVZKrOtxZPWj%2FxvC7IlEjtxroUbkAnLJQlAhRJUKdFj3no%2BkqPYLJYXvZLWNR9sXYLID20Y%2B0ekXKt2Dy0fhBEu8jFKEFkimFrzttJlPuEHQdfxYMLeWVZwp8f7jd16Lxs5S9eMGbfiJrgnAQGlVy2Iz7swqpsOeLp3w%2BOWx3xcAPWXi7cTthybKlCRbnbupWT4cQp4CyNf6B%2BShrpfwwIAH%2FuKl4JEXNjyeUtpwycMtKZPy3mJWgH9rpZ4Tpt%2Bql5HovPaLzG%2FJFfNMnbQL66mbeDgFZF%2F3v80y4L8bMKnzGY%2BubRafGi%2Bh5fvWopo4c7p4SlJs1I8vgtg5LZR%2BVgNtkwx9kkFWR1XfJ9fEWNjiQDrOQ%2FFuIn6Zc2lSB11W9DiQ4IBmEWbheg9MFcukcvl1SbbDXXPX2I06nMH7CXZ2va3nFGwtMJHM1Zp74BTydsWC9aktYw28foygY6pgGoqwFJqOnWKxnVCj9JDtVo6HvfgWYCoV673Y2CarLU7kyEBRaCc10mYVPrtfCRzh%2B5M5EDrv%2FXt1vgyYIg%2FRZM55wirBd%2BXCkQctrDpu4vet7X4Sy5M56yqObAufn21r3PwY%2BVgOi4nBy4WPlEblOwuh6NbBX42f6DndoleDSF9GI4cZp6sa9P47CBTowJA3kB%2FmJodvAm2h6smKi2MxuHr00s4S%2FA&X-Amz-Signature=fdd01930e3096b5c9dcb57406c05283a45f4a177be8bc42e0f557e8a0bd731d7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QJMYDOTI%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T132233Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGEaCXVzLXdlc3QtMiJHMEUCIQC%2FFpNhU244wfBrBDT5wyeOOcviQsVjIRnJHNjYspMddQIgEtR66OkFjC9Kgm6%2BYxGFyOdWiSt4Appaz7L240eN8CMq%2FwMIKRAAGgw2Mzc0MjMxODM4MDUiDC5Cgy1oPzZDy%2B0wFyrcAxWrggnGcQv8BzCt587Yd9z4BSORgcILQSQo%2FKTS1OiwBiGPly3Czkxh9PVeKd8ffiuf9e4IAedHNE9awYKMo3jUe22SguP%2FVSLgsTNpUmNWgB8cAx%2FA62qOO8W4DCyxxVW6rxr%2FGmz4mtnD7a87Yw0DuT0DbPTbL59i%2B0FhkQpy%2FjqKb0P4l%2FN0RG4vOyaSdMfityHsht%2BNkLKNKiryK8SV%2Bb3lmlvQocaGvjhDtjqyUIaoCCfGn0xZLl1WmhxKoIDw2zjrDQDqucxzC62XWdAIJf6dpWtsyl62fQIekJA3nHNb5DoOdeK%2BZsod%2BvN609Qh%2BUky2wx86gdfXQErPCm8SaiZvvdr9nD5lY4EDbx9MjNnhWv41P1HMp68vPC5iyLzOPXgkcoVQ3vseekJDETnNGrTaTDfXkYGir9BO4KCHJBlOSqSYtclkgkNFnZKFvxdJaG0z%2BzD74j25URAeib57l79InisdIii0QaeeB9ELoIfy8v%2Fs5YhUVuaDOjVsFPBUwLjY8ZVMkuByFMb8YmTmXoixPHpIEHLa%2BpJQ7GW7KKjxYyfINQw6iKcWEtL%2FJKRWYw3eQevG10xqxk3UkfmTi8r8OHFLZw0iCFIbt%2BtlJgl5ij5SmCI%2BbcyMNfE6MoGOqUB4shObqUwu5K1%2BAUezZg4kCF8uVF%2FmCMH4ojEnLPHx45v6jhskI%2B2Kbyf79waMO%2BopXfzFbIDjlg4qsaXM4QmDwSnOSzRUM1CJQX9qOS5JE4%2F3bzaha00ooF3TDKMoVPR%2Bp%2Fj%2Fgsm%2BSg2rf8eblKUsO2rx4NKNgqeiuDGanrNsm9PklPVshSFAP6rxGZYuggVfffsYAqOvLRa2YocgAr9ZBQnnvkp&X-Amz-Signature=048f6dcd73b017d9ba368651ffd79e18327ba9a0c35d8df83c3b67b75968ff52&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

