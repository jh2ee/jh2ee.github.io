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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667INA7OXG%2F20260124%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260124T132303Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEUaCXVzLXdlc3QtMiJIMEYCIQDVjmqoaPiAuDdlm1Z2Nm%2BRXNzncIl3GpCgeKkedQMEZwIhAOvlatrMB%2Ftkvkz6F6XdsPUi5yD8H0m96LwOus6qRvF1Kv8DCA4QABoMNjM3NDIzMTgzODA1IgxKItTIQi7%2BwIHZo7wq3AOHGjDn835%2FCQ9HlZeaUyvw971ZEAXbcvfks7l7pkMhw4wtcWRUYLy%2FM7ihiDalfMBlklNaoMN98fyIHdXq8vVRgFG2i3U%2BwKbcIy1FDeCVLEsJ8RbiC%2F58Yaas1SbDY2D4946kRJlMhZKyZa2G3l5L9%2F7SOGrRTNNpYrGi6TyZV%2FQzOrULwzDtTX1lt4WJr92QEKRm2Skg%2BI2m%2FoO0rVwCaPwUNcMdAUok9eAbxShW1rkyxE7cKlhMyUx0dt2jQE03zmAOjcUx%2Bi1o2gdxNCqqrEGm2PJMpgUURnCfSktNMgpOjlEj9hlIbFpKlL%2Fhj1TNQ41B6%2BWaJU85zgs4UnHqxGo3HDHR3dBY1mwaMLuwZ%2BlECUuIuffACYNuJ%2BXTXYr3nuSL7RCBr%2F84anga2rBnJi73pR%2BgQrqxkxlYEDHN93iJKyQFapiEclXXV4pFWr8uSe36rEVkdXkV5nct7o43Rtf7lT9M5l%2Byglv5mFBSvWj%2FokH2%2FqjqupZqiSQnyLGakTpu9bwAmtfcAgSmUUcChcnHX9dEejFXDD3X0C2xHsd2H1U50J1Npf9ClsYwaI0wUD42t0AeY0Hd7gvMg58dtDqqLCKZC2byV0yEh32M2f7UuxCGpIowPmiWwjCj%2F9LLBjqkAeyg8Nf5JRwzicoUkaEBD4PGYKNfLdzTq4bN9oXVPFIUhjIdBBS19sXORqmnns6cYtGj8JnRG1uivvv24pggi9LcxODVIu5UdpTjSXHy3o0fG12BLQHThWPnpHPvd39uNmcNRISVnj8MM5grhGYEFKJYPUYV8ckTb2U7zCxuoNQpDSc72okWrh0ttgZO1cUak3aaEqLJXzPZ45uS%2FAbo5WLgibeI&X-Amz-Signature=69aeb547e5187fd0c0a4ec4d035e1e24bfeadffa37b7dec3b658097ff4e4a58b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667INA7OXG%2F20260124%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260124T132303Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEUaCXVzLXdlc3QtMiJIMEYCIQDVjmqoaPiAuDdlm1Z2Nm%2BRXNzncIl3GpCgeKkedQMEZwIhAOvlatrMB%2Ftkvkz6F6XdsPUi5yD8H0m96LwOus6qRvF1Kv8DCA4QABoMNjM3NDIzMTgzODA1IgxKItTIQi7%2BwIHZo7wq3AOHGjDn835%2FCQ9HlZeaUyvw971ZEAXbcvfks7l7pkMhw4wtcWRUYLy%2FM7ihiDalfMBlklNaoMN98fyIHdXq8vVRgFG2i3U%2BwKbcIy1FDeCVLEsJ8RbiC%2F58Yaas1SbDY2D4946kRJlMhZKyZa2G3l5L9%2F7SOGrRTNNpYrGi6TyZV%2FQzOrULwzDtTX1lt4WJr92QEKRm2Skg%2BI2m%2FoO0rVwCaPwUNcMdAUok9eAbxShW1rkyxE7cKlhMyUx0dt2jQE03zmAOjcUx%2Bi1o2gdxNCqqrEGm2PJMpgUURnCfSktNMgpOjlEj9hlIbFpKlL%2Fhj1TNQ41B6%2BWaJU85zgs4UnHqxGo3HDHR3dBY1mwaMLuwZ%2BlECUuIuffACYNuJ%2BXTXYr3nuSL7RCBr%2F84anga2rBnJi73pR%2BgQrqxkxlYEDHN93iJKyQFapiEclXXV4pFWr8uSe36rEVkdXkV5nct7o43Rtf7lT9M5l%2Byglv5mFBSvWj%2FokH2%2FqjqupZqiSQnyLGakTpu9bwAmtfcAgSmUUcChcnHX9dEejFXDD3X0C2xHsd2H1U50J1Npf9ClsYwaI0wUD42t0AeY0Hd7gvMg58dtDqqLCKZC2byV0yEh32M2f7UuxCGpIowPmiWwjCj%2F9LLBjqkAeyg8Nf5JRwzicoUkaEBD4PGYKNfLdzTq4bN9oXVPFIUhjIdBBS19sXORqmnns6cYtGj8JnRG1uivvv24pggi9LcxODVIu5UdpTjSXHy3o0fG12BLQHThWPnpHPvd39uNmcNRISVnj8MM5grhGYEFKJYPUYV8ckTb2U7zCxuoNQpDSc72okWrh0ttgZO1cUak3aaEqLJXzPZ45uS%2FAbo5WLgibeI&X-Amz-Signature=69aeb547e5187fd0c0a4ec4d035e1e24bfeadffa37b7dec3b658097ff4e4a58b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666XSSVKEX%2F20260124%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260124T132303Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEUaCXVzLXdlc3QtMiJHMEUCICJNI%2FVCnmqtwgjwtBcadbkyRbTeb%2Bk%2FPqFyiQZiu7yXAiEAgNznA7whAFDzaoVktBlBsGu8f00O9pB%2FeGZnuoxQpN4q%2FwMIDhAAGgw2Mzc0MjMxODM4MDUiDIzeUX93lVWZsY%2BpnyrcA6AEsMYY4rC%2FauSBpQfr90FgZeXUF06MX1My9Zll5wtWIUpjlSnfLMkjy8Ssw9t7WKy%2BHVL42HLofkJtUjO7LrOuXdzTWfXS6HcYVlT9QLJMpoyzuC37ipFH%2BJw4KoPtPdU5TF0UsvUQHZ%2FzzeL17yZP%2BCKhw5R%2B8ypXUipJa%2FQSTnpCFzVwSU%2BDx11kDAD4bEMzZ0xKRKIwew2CMpIxQB5NsBOGAOnzhBUh6afbAW%2FU0B7PDT1jJyUhkiZL0RoYSCNRfZYzm2nGhx%2BIJOqapWuegSPbBeAeT3d4H%2FNKvHwJqfdshq58pVd%2BdIyF5SkKkNhG7YavwrzKvV7ptT0%2Fsbkpzp7763ggC7%2FZrHBBe9%2FPZwXk%2Bp7U5p8RFPdvHQCYvPezmt597EGQQ4GaFYhmlaEtX8qDTMGLyBDCz%2FeCz5V1htsVJbC4I8vPxFkI02w%2BvICPmkQxWVBKbIpED3wpz%2B0edMIcbiro%2BuZplSeQfcHCgDn%2B4qwj0w0uqFE%2BiKRS%2BDcICYEPE4yEWorzyAOntb7d0PplqMUlgGjCOUv2BqhppApKLANi8iIcxhPYpp1Lkkopi5pf47qos%2B5LE%2Fv%2FM1CGgYmLrGGAfnUmuM7GjE5sElYnZuVFbE4gR6A5MIn%2F0ssGOqUBE%2FuWuINbm9V5HU4OsZLjAyZK7EDMElLBBJjAU1Ew%2BIz%2F9dhxmC89%2BoTZ%2BrngXEcbMG395FQEYepVbxQwBHUxpY4MmZ%2Bm58xnASRTER3SsXkXhA1C9njF5dyNdLfcaRqXTa%2FiDuopfEeUZR%2Bc1oU59qQ2xPMMgklSPfYquDFC07dvILlaDb1amumnlXOLOY%2F9fJ09Lh04vhviUDqk5NqyZ6wMB8kv&X-Amz-Signature=6cc5ea3dc690f0aedea2ae2634ebacac3f9e399084cd0a7dffc359a207e27181&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YCDS3VMH%2F20260124%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260124T132306Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEUaCXVzLXdlc3QtMiJHMEUCIQDoFJ56CSZ7bCZimeCQw%2FkpQqZEddu3HEOemWT8JKtF4QIgTdWfQIQdLFoaHC8dIZpcyz9XX6EUXmO3Fzv6W6vS2%2B0q%2FwMIDhAAGgw2Mzc0MjMxODM4MDUiDC3IUE4JtOoHbUs6PCrcAzM6%2B%2BCEJgJ61XngsP2UEmLhLefMspeMPPMv7C2mqbSO2lPzgG7q%2BZI7e5RI2MudrDjwKOJ9KXctFm8YZmEXLVI70INlRMEjtRBLjKxpanFuZu6beeGYy6QNziTpJxKjE632H1H1gsPEaSc%2Fyq0Wa2ZKpwY2zRFDO1D4sjnBXLlmd9R0etghUk52NpbEPTL4HFces0b0x4YJoVvAS1DL8KkUBqGG4ObCB%2FhSccWC9N5R0nsQK6cxr6wzkucOVSZuGU7KianNjj3DmpQ8fxXe0aCg8nSvjXX5XTau%2FE2mNAKaS2TpT%2BJ7zu%2FaFlI3KXkLfZIbzK9tVtajC4fNenfT28k1Vs6ehh5gjN2wXUJ9%2B72EohjgATRtKrWjU%2BJb14a19%2BZl50eGiy0tkisWaIQyh%2BklBDxq5wCVmCUxjccXC50cQLlnpcZIppHrDOUrChY126Lp4eh73YxHjHueNGw8bt0XoSQGcmbA6KLv1ykaX%2Bh%2BNBO7roQXZCih41gDavGvQmmuQXeiSSFKBq8huqBd6HiSpnsylvGnVz7t4e%2BVXonYqu5HiDXPIU%2Fb8Tkuo40OaAepdbdCdqWDe230GizOvrG2couo60YWZPfBHwbamcoqTpwlk6Slyl6HS%2FFnMOb%2B0ssGOqUBRGHNxd6NqxJkrM4ltXLOBFsxNyDE1EYrkO29iJJ4c3GW3vCcpujIW4KxwM3bVAmYhoDLiXZtRFMzX0WMd%2FRAzPc63D5wunW87CoVlpBYZPXsfB4XbMQM7X0iLZxumfiUa3toe6hzlzKUm6O6C5F8ZaDBaxnPBqbVzqIgF1578ikDcUkEapjt%2BD3GDKbvJrb47nTmr07X4nri2oFIx%2FVF7Zw9thYZ&X-Amz-Signature=53f96b07c3ce499e6381229b5adbdc577e85aa59584aa2058e91610171c5483a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YCDS3VMH%2F20260124%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260124T132306Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEUaCXVzLXdlc3QtMiJHMEUCIQDoFJ56CSZ7bCZimeCQw%2FkpQqZEddu3HEOemWT8JKtF4QIgTdWfQIQdLFoaHC8dIZpcyz9XX6EUXmO3Fzv6W6vS2%2B0q%2FwMIDhAAGgw2Mzc0MjMxODM4MDUiDC3IUE4JtOoHbUs6PCrcAzM6%2B%2BCEJgJ61XngsP2UEmLhLefMspeMPPMv7C2mqbSO2lPzgG7q%2BZI7e5RI2MudrDjwKOJ9KXctFm8YZmEXLVI70INlRMEjtRBLjKxpanFuZu6beeGYy6QNziTpJxKjE632H1H1gsPEaSc%2Fyq0Wa2ZKpwY2zRFDO1D4sjnBXLlmd9R0etghUk52NpbEPTL4HFces0b0x4YJoVvAS1DL8KkUBqGG4ObCB%2FhSccWC9N5R0nsQK6cxr6wzkucOVSZuGU7KianNjj3DmpQ8fxXe0aCg8nSvjXX5XTau%2FE2mNAKaS2TpT%2BJ7zu%2FaFlI3KXkLfZIbzK9tVtajC4fNenfT28k1Vs6ehh5gjN2wXUJ9%2B72EohjgATRtKrWjU%2BJb14a19%2BZl50eGiy0tkisWaIQyh%2BklBDxq5wCVmCUxjccXC50cQLlnpcZIppHrDOUrChY126Lp4eh73YxHjHueNGw8bt0XoSQGcmbA6KLv1ykaX%2Bh%2BNBO7roQXZCih41gDavGvQmmuQXeiSSFKBq8huqBd6HiSpnsylvGnVz7t4e%2BVXonYqu5HiDXPIU%2Fb8Tkuo40OaAepdbdCdqWDe230GizOvrG2couo60YWZPfBHwbamcoqTpwlk6Slyl6HS%2FFnMOb%2B0ssGOqUBRGHNxd6NqxJkrM4ltXLOBFsxNyDE1EYrkO29iJJ4c3GW3vCcpujIW4KxwM3bVAmYhoDLiXZtRFMzX0WMd%2FRAzPc63D5wunW87CoVlpBYZPXsfB4XbMQM7X0iLZxumfiUa3toe6hzlzKUm6O6C5F8ZaDBaxnPBqbVzqIgF1578ikDcUkEapjt%2BD3GDKbvJrb47nTmr07X4nri2oFIx%2FVF7Zw9thYZ&X-Amz-Signature=457a7adf604be97e760313d932da3fdccdbe09e1eea1d7e27f3a1edf8e9c3968&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YRNJVCWR%2F20260124%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260124T132306Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEUaCXVzLXdlc3QtMiJGMEQCIDLCK4e3z7z5WOPjzcXaYZqm1OmWnNV7JSQOwugIxNohAiBHwok%2FLn9QW1oJtsRENU2AlR45lcV%2B8og2nNnmvPxn7ir%2FAwgOEAAaDDYzNzQyMzE4MzgwNSIMH%2FSRuFQArIkRiFvCKtwDJo6FfYjb78R4kbO7T%2Bo%2F%2FWdQt%2FKwiekjGC1cdg7HlwJBXY7542nhkTHZUpTFlcGqs3DJzf35IxRF5h54q38mMVqhj9lvE4G1wmCQcP%2BUfmebo%2FStag23KZUUIAy6NRDdkmwp6GXqxYS7xxjMZwwWvr1lqQhL6iDXIIjFhttDfy5A%2F7vbxFsPp7BFJmz84%2FNG1uTPvax1fQ49uysQEnuU209f0BBHogRPS29%2FteaUqsfktE%2FN2I%2B2XqsBerNiiqq5eT3%2BvlMwIh9mDaKUWbSIXVkSIBzIC2m9LXMV%2BuDZSfaR%2FO%2BSvBwt8zKXL9HnyMrzk2OyTfgQIiLzxMNAvyTgV4QSYfguSkTx6AFK%2BZ1zP%2BstJ6ICLiAsgNmM5xkw66VjwK3uNScS2Ji7jkT4XucT93%2FmLjlXFRyq91by%2FiAhGXIc2rW9NgIdWiUeon%2FeEDYmzEaIGdSfucozcIZDGwqrv0y8%2FdMhl6ILUzPNvIufL7xWnbN7G2j5ZKHKcbg3aA6R1Bq7LXxwlKyrx4XPwssoPAtcjLhydM%2BQlA4QoENdyDRgLyZpVH9oexb1oIRhpO4dbjlhxksUgpD5g0qYxMcMvV1pqNO2vWsnmmwptKrl%2B9hUMLEJ%2FwNaO2CkdkkwtYDTywY6pgHuPTG3NQyR4PGCAX0DwdWW%2FZfA6ErcCfSzbwKP31LeOqrgP%2BAs6EcmxoEqB6cetpR%2BfUpbkRG92p%2BxpB9%2B96%2FMVgbY1d3C9NHpuKjjdkR02HURzBttKzvDxisK3GNtmWJxb5glWPcLveTS3lhLSofX6Bu0LEsZ0E3zrImaQu4WuOwSE1p719Z3W6%2FnoWlBZx2LxH2N22RkLfFBHczk0cbVJpJFhkHc&X-Amz-Signature=e1c79024d97229e978b0cd2f051294b27f37c4f3b18f8e072da7769d9911e889&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663Y33TUG6%2F20260124%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260124T132306Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEUaCXVzLXdlc3QtMiJHMEUCIGvVCY8m9EAI%2BC8czqHn9zDPsX%2Bf4eucsDALw6vyUkIhAiEAxIrd7uGB2rzXpg3eXKQTF7xsbe%2ByjzRMj9EOxw8%2Bj9Yq%2FwMIDhAAGgw2Mzc0MjMxODM4MDUiDHrszjXT0ML0srJyMCrcA9qjdljiVwpfSIRU4RjGnIXkDdgM8VpQXXHXG7e%2BIYFrEV0zHpnuSvzicon23W3V%2BGpiWYpU05oQ2e3XoznX2RYs7jwtfXnvsx2YJjhC0lyJc1sQ%2FuQHUBk5n4pQuKcBPw%2FdbOMGuGNuCVISz2rZzbCnOsagCPajYklQOd7gxDeFr2gG9XGuXTNs918GxV86xea9mWk15%2BRJLlietGTqeJIK9rjET6pN%2BEP23ZlAkDCoKjbTQUXUx9WH4HR0mfYuLRs92aAd2j009iXkW6AQUeB3UaSmS9tv8BceAQ53%2B2BJEKyDca%2BbDa8%2F%2Fj2SMIvRY0xh0rx3En8OsyUcnAtbPS0BCwFskA6hLbkmLOQlJVvWhNhYfXc5b7V%2F7GiWeFmIIv7oVTRd64lJy7%2FWEowJ1EkaONJ2eiEZtG1gROPTEz8LGC81U3k%2FTGCBnRHUxSG8OZW9X2nmoakV0%2Fm8xhkQdjJ4zMViJDXoFnPMpsbY8Q2u36SSBe%2Fp87wn1TWghgv328KNcUmVU7ZNN7m8%2B199X6FVY1bj%2FzpDyhCYbG8bebXRAyMMGOGO90qqGp1%2B13q%2FIZytAbqp8l2EFQgKrKyNtz%2BKynB9y5Sv3ph8OI3kMfWgJzxs4Nt8N8l6oc61MPz%2B0ssGOqUBneklwq77n6QR6Dsm5fUMiGmte%2BU65%2B1seg6lDaozAYDOiysmxhTZbRPeB5bZ19Gxrdwpm7E4h8m8f6cGr87aLlzt0vTW2Ko4As%2F8NPCL0pNWT5pGk6IdLyaotdaig8%2B%2FPZnpKbu028V2WGoHcJVzFd5Rv19LzbnYFhwDJMLAS2KD3Qzwlc8YBwkxDSD6%2FG99vLp0CNymA13fExMMMWQssDZ6zW3V&X-Amz-Signature=a0c98f743c98d26d2d85ef668644b096d720d173ff9214e0db6cccae180a1c43&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QAXQYF6D%2F20260124%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260124T132310Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEUaCXVzLXdlc3QtMiJGMEQCIHMGJhNmLURC859lzWIsn%2FudQgibhjAZNwq8ULPV0dzWAiBCIsJOX8riF2yV3RerJz4DYX7zwodsjlV%2Bl3Gkc%2BI77ir%2FAwgOEAAaDDYzNzQyMzE4MzgwNSIMpHGuZ%2FYJ%2F4l2%2FqyNKtwDplA27q2PGJmYr8oJ6sH0WFg8jvU9DyxKKaQ4pZvtjQCwV527LRhjyup6ntLj4bpeFd5z6Rrul%2BMGs3XfkU%2FSbMf3kex6KbQhH9JozW1OkSblIKFJAC1azYGyvhzN7qKBTai5PYxX%2B6AiDh%2FRcE6R3fjI%2F6SmbVEMEcq9tIWfwpEpt%2FqfImXLiSAM1ULAOpuEIfLx%2BEmN%2FQyygutmLqTbHGTvHT0XdbrGdCbuE%2F9xLmUBvyyLNdLm%2Fe4qO%2BdtRwBqnxQXOBcGjsl5a9Mzbdez2jFhJu3Sr0KcFXc5lJ2lO5rse0oVt%2Bd9KwQdKqae5Ot6N2EwUs4wkmUkpWk533F%2FP9TfeaaHbOLgoehBem5wlC5ayqlUw7DxtJ3%2FgJCLECgYi6uz%2BP3jCpVv%2FqGRoatX55%2Fhy%2BT5TQMeHFbm2BUG4JxyA0SEVaTh%2BuDBNd5yyTy9pWAgWYlFs%2BtI2iuQSFcsyR7IicDjrbz0aV8QGQq7gELHlR%2B2ae5bHnsB8oIgHUEDbqTG426WCDKZxru%2Frao1srezbJ6FYWzSxCK1C4WmvXKhH2WTlfllcW8UfeE9Rb7zhyueYWhW5BWLKA9Z0aq7DK5l64cmXhhkMaIdpHdU9ik5H2HIy3Fb9L5hCEMwrf%2FSywY6pgELASA1LhyyiCk0kUeX1uaV8N2pG%2F0BTYMYB%2FHXmFAGCIIVNFcmK5EZucwrk4G%2BTlJCLGIz15Ih4lidp%2Bb4VHrt8SwC0IRP%2BiPFVLeqd3T7vKsaUWcjiAgOnKEJesos%2Fyon3%2BzDv106tISPRhU2gLqE9a5MDGZfNNDgQPRJ22o8xTNkWzZwXp5cTtjc5g%2BqvtYLqQHns%2FW9uttTMyL%2FY6CdOf4SOXHw&X-Amz-Signature=189452d5104479499fe034a2740e5caff2da044f36148519b79cb287a40fcb61&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WGVCU3QS%2F20260124%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260124T132312Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEUaCXVzLXdlc3QtMiJIMEYCIQCx%2BYf%2F8FbjaTpw0GGfNMB9BXTcImSYg9C5O7s5X5wqvgIhAO2T%2BHDx%2FKEAgJdvwvK6kQJZQGUUIstzViZocUpd2YqNKv8DCA4QABoMNjM3NDIzMTgzODA1IgxTTGnzNFq5OjHiNRAq3AP8w2wPvBi0Ol9TVBdN3cP3kvOpfFbRqdQJaY94VdyLrwcY4aXFn2S1QbzBLdwWcKxyb2cANMckxL1FXfnwQ4qm0qowc9CH8k3%2Bn%2FFVOuytkEyqQbVVytvO4m3VnAZkQ42e5aBlElmc4%2BRNv%2FIA8t0LbwEFgZcsDkwA%2FHnC8k39q6O1i8tHTXW30aOY%2F2eSQenFGuk3tMB4CRPQqZaVIrPw6XBA7CIj9N2PIIsB5%2FTh%2Bwe9xb6hr8UoNouQ0QBbhqezKjEWWUBafdlrjh6juY%2FAE5mu4ON8VjyHyfzAedRD%2B%2BBC25r3hUFpDZfQx2tdQYhc8nwByBbQN56Th4lmf85w5wlpMhnjBxgwLOiNisf3IQS3zPyz4M%2B1ISodbCo1qwOqijNThm50NwHMSiFtd1qv%2Fnv3UmIq66wVlU5XHkhn%2BokDqWyA4sloMYz20K3e%2FHA%2BVtXhNrpaAP7WtwtZeGjLV%2BAQNL2GnFuLUDb9f7sgThtlJ8VHJHioEhknv%2BLkik12QuUikNhVWlTXDGgg%2BgfRh3nYbEz9X5tjUa2NyH1f0huZAmSB7t0RExBPu2BHEBM%2BruMRQMr0fBtC3L86%2Fn0o9P2RFOy5S5tTrXYl3sezmpOBLBaw1HrcCaCA3jCr%2F9LLBjqkAcqGz0HktRMHi65fpMZ1d6vlxlDGaLo4rHA7OMFPGx2ITultyBmrZl8ACRnZGF9DJ5LM2O1mUf6%2FiWJlyr4iv6CF2Oscl3eJrssXsKzl83I8Rxn7FwssU%2BOw7RLaAZUg6CYfx03TFN0loD06thtNyNo%2BlgdGrBTp2m2B0hOYr%2Fbx0o4fvayKJfLbX2onbeRYneX1NIU4AnWnIJrVX4nVo2wwkmSk&X-Amz-Signature=25b967221368986b076f97b4aa255b8290f9da83d4ccb6e827d6e0009a84a9ff&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WGVCU3QS%2F20260124%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260124T132312Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEUaCXVzLXdlc3QtMiJIMEYCIQCx%2BYf%2F8FbjaTpw0GGfNMB9BXTcImSYg9C5O7s5X5wqvgIhAO2T%2BHDx%2FKEAgJdvwvK6kQJZQGUUIstzViZocUpd2YqNKv8DCA4QABoMNjM3NDIzMTgzODA1IgxTTGnzNFq5OjHiNRAq3AP8w2wPvBi0Ol9TVBdN3cP3kvOpfFbRqdQJaY94VdyLrwcY4aXFn2S1QbzBLdwWcKxyb2cANMckxL1FXfnwQ4qm0qowc9CH8k3%2Bn%2FFVOuytkEyqQbVVytvO4m3VnAZkQ42e5aBlElmc4%2BRNv%2FIA8t0LbwEFgZcsDkwA%2FHnC8k39q6O1i8tHTXW30aOY%2F2eSQenFGuk3tMB4CRPQqZaVIrPw6XBA7CIj9N2PIIsB5%2FTh%2Bwe9xb6hr8UoNouQ0QBbhqezKjEWWUBafdlrjh6juY%2FAE5mu4ON8VjyHyfzAedRD%2B%2BBC25r3hUFpDZfQx2tdQYhc8nwByBbQN56Th4lmf85w5wlpMhnjBxgwLOiNisf3IQS3zPyz4M%2B1ISodbCo1qwOqijNThm50NwHMSiFtd1qv%2Fnv3UmIq66wVlU5XHkhn%2BokDqWyA4sloMYz20K3e%2FHA%2BVtXhNrpaAP7WtwtZeGjLV%2BAQNL2GnFuLUDb9f7sgThtlJ8VHJHioEhknv%2BLkik12QuUikNhVWlTXDGgg%2BgfRh3nYbEz9X5tjUa2NyH1f0huZAmSB7t0RExBPu2BHEBM%2BruMRQMr0fBtC3L86%2Fn0o9P2RFOy5S5tTrXYl3sezmpOBLBaw1HrcCaCA3jCr%2F9LLBjqkAcqGz0HktRMHi65fpMZ1d6vlxlDGaLo4rHA7OMFPGx2ITultyBmrZl8ACRnZGF9DJ5LM2O1mUf6%2FiWJlyr4iv6CF2Oscl3eJrssXsKzl83I8Rxn7FwssU%2BOw7RLaAZUg6CYfx03TFN0loD06thtNyNo%2BlgdGrBTp2m2B0hOYr%2Fbx0o4fvayKJfLbX2onbeRYneX1NIU4AnWnIJrVX4nVo2wwkmSk&X-Amz-Signature=bb4fd6686ff3ff3ecd61761a1601b7908e5df12a7706f2a8bf508d1c085029c3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XGFEXYDF%2F20260124%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260124T132300Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEUaCXVzLXdlc3QtMiJHMEUCIGb%2BHPAS1hP1T0W4nNGi48rbmRDfk5aOEoFoUbOSW92YAiEAgOUYswwVsCxcFS6wLhUr3MaE2mTnUtTdxDB4u%2BxknS8q%2FwMIDhAAGgw2Mzc0MjMxODM4MDUiDGlofvrUGumcPDEegyrcA04U3VgfbE%2BDWYJJvQLu8iDcLQIBG01m3H6tfCKGGlSoz5Ct1wEPNmdnla1MYU0shFvQuTX1xpV2qngwSFY5tv9J4Jgkf4Wl3HgOw9rXA08ZbKS1n4cnmrqqaM5K7HVwTd86btH1m2SOrCHfZfW5EF7FmwhDFcxND8774W3CJJ5y%2BySyaWVcC%2BpzioAd%2BJu7psDzDuTOgDSBfMY8l4hWcdCYencW2%2BLSgaYLAWyy2gXLubvg1yXqViJmuH6HfHrezAyE1i8mL2wMQDsyXjgXCylqXcHcjwmhGdQAFGeM%2FjIBFTTjCBbY74F4WZ2ZjDfpJ6z8KrLZ8JzkrE9UqN%2BkLZY89b2bgmhxfNcKHMj%2FkuOjzDHNzeKuGXfkaBElHqgYS3z1aWA79tq8wpqHrcCwN3bpxe9LJtLyyeAwCiNt8FZf0HlIGLJrCLSmPcNS2HQYtDklA3MC7edRaTqufq98ubkFx0EddqcJJVbNteptLJyS1YK276qxK3CfPiFsTMjUIpDmppV9%2FOtC4sNDFtgyLPO0rmOCkkk8Ok%2BfO7O%2BKxZaOuXEuPTr3VXa5LvCYqL6TgizG2w5yyhh1UGpxg9ZMFtYoowJxNl3fOlbmcXlmbUcws8E6hPQ5uEVV2%2BaMPP%2F0ssGOqUBIw4Z2e7k%2FhkgTrS7Kn%2FjDCnaqS84Oj5E1XCToA%2Few4NUoYFPpqqdo53qI1DlDiIKx8sIH38jEUDVVBSiSGG%2BY6QzOD0lePtrvlN324VzbXsS6L7YWJXpNwfVJuJjqTSNEcFM2XCekMtyKjYIrG4aLYUnZFH3j61x7EruMgAmOshXWDRynOe%2BA%2F7LvlgfkD07peUQMSdEOSkXVI%2BmfZ6F8N%2FQ2V8T&X-Amz-Signature=e28fad28076b7d2cda3c9cf840442e09052453954a56c3be4ba9318bb9f2d8fb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XYRXLB3O%2F20260124%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260124T132314Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEUaCXVzLXdlc3QtMiJHMEUCIQDBmPFMlW9k%2FNTqnZw5WQ%2FyD1l9FQnTDzWFoXU656PRygIgW4odq%2B7Xu409DRIk8SEAya%2BHRhtf0lhYgHR2Vlpob9gq%2FwMIDhAAGgw2Mzc0MjMxODM4MDUiDPbdSmp3WwKnPYehZCrcAxsDk48GWCytJnp3PEMqwLYki%2Bxd8Y5L5ldetgK0okR98L9WYlHEqpR3MWnhcc5Mk%2FouhlOKkmkysL6tdpMGCYMVf1oIC8j55V%2FW5XdvHND%2Bf9ozOuFWVtudEZwzxLnZsb8ECXQwRs5anklRXGvkRrLZluHyLzjwHk7zrNPKac%2FzRddKu6SFTPYualR%2FTU0yDBs%2FYRYRxWXdqhwhanXOHudkPEcN9%2BqFsRAgG9h3U6qJ9VtJjZcgr9oeppJ8f%2FKWH04l7d0Tr%2B3sUUaGHHUVwW%2BPIqUXW8SuaMjQ7DO2t%2FWq0UuVc7nGku7o%2F1DzDh%2FXmke8EnIpNjXfJ0ihLqkc5ra0b1r5nbGDhouu1Lh%2FyfcsyrMVk9bs9tf3UOvRspUwBcTgYDv7iIQxsu7QTL7U4OOVgWVOIy1U3AW%2FYtsn2KywO2p346C4XcNjJhJghcFhPB8s4Ogcf6xd4ShT7r6DJ6eHzyLmyspm58fYB2jEMZ%2BP0qMex5IEq6azAHDpLolokthTRIgKCseg1TGpMda7ptUPJkXzE17BQ8A3%2FTeQK5pUhizwZh692fPV0v%2F4UGctfadGNZp4bkRj%2FGFSct%2B3yymecttiFpm5FDdFayn99fKToc%2FaIevNctStc%2FELMJKA08sGOqUBihTiDvh0mu9NhdaMWakW97Z0KFe9iMreZT%2BibIOgeYnMUZl%2FqbFY5831CK%2FQMo1xRJiqIn05jRzn%2BV7cdpucAejXmnkzYAB51d5Ed7ZRUmt%2FFEUEeH0m8sfiSWiAzElqD76gGRgyi6afRRUFzIxkKmPByfTvvT2%2FyaNBnYSzalraMhbBChztFERlfXYfvOXH4WtGiH2o2%2Fmxi2Jq6h168QYuBp0c&X-Amz-Signature=2d11d3dbf01e13337a26b7362d951c5c098c1cef4442d4c5e9d383896403649a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XYRXLB3O%2F20260124%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260124T132314Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEUaCXVzLXdlc3QtMiJHMEUCIQDBmPFMlW9k%2FNTqnZw5WQ%2FyD1l9FQnTDzWFoXU656PRygIgW4odq%2B7Xu409DRIk8SEAya%2BHRhtf0lhYgHR2Vlpob9gq%2FwMIDhAAGgw2Mzc0MjMxODM4MDUiDPbdSmp3WwKnPYehZCrcAxsDk48GWCytJnp3PEMqwLYki%2Bxd8Y5L5ldetgK0okR98L9WYlHEqpR3MWnhcc5Mk%2FouhlOKkmkysL6tdpMGCYMVf1oIC8j55V%2FW5XdvHND%2Bf9ozOuFWVtudEZwzxLnZsb8ECXQwRs5anklRXGvkRrLZluHyLzjwHk7zrNPKac%2FzRddKu6SFTPYualR%2FTU0yDBs%2FYRYRxWXdqhwhanXOHudkPEcN9%2BqFsRAgG9h3U6qJ9VtJjZcgr9oeppJ8f%2FKWH04l7d0Tr%2B3sUUaGHHUVwW%2BPIqUXW8SuaMjQ7DO2t%2FWq0UuVc7nGku7o%2F1DzDh%2FXmke8EnIpNjXfJ0ihLqkc5ra0b1r5nbGDhouu1Lh%2FyfcsyrMVk9bs9tf3UOvRspUwBcTgYDv7iIQxsu7QTL7U4OOVgWVOIy1U3AW%2FYtsn2KywO2p346C4XcNjJhJghcFhPB8s4Ogcf6xd4ShT7r6DJ6eHzyLmyspm58fYB2jEMZ%2BP0qMex5IEq6azAHDpLolokthTRIgKCseg1TGpMda7ptUPJkXzE17BQ8A3%2FTeQK5pUhizwZh692fPV0v%2F4UGctfadGNZp4bkRj%2FGFSct%2B3yymecttiFpm5FDdFayn99fKToc%2FaIevNctStc%2FELMJKA08sGOqUBihTiDvh0mu9NhdaMWakW97Z0KFe9iMreZT%2BibIOgeYnMUZl%2FqbFY5831CK%2FQMo1xRJiqIn05jRzn%2BV7cdpucAejXmnkzYAB51d5Ed7ZRUmt%2FFEUEeH0m8sfiSWiAzElqD76gGRgyi6afRRUFzIxkKmPByfTvvT2%2FyaNBnYSzalraMhbBChztFERlfXYfvOXH4WtGiH2o2%2Fmxi2Jq6h168QYuBp0c&X-Amz-Signature=2d11d3dbf01e13337a26b7362d951c5c098c1cef4442d4c5e9d383896403649a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RUMNJEQC%2F20260124%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260124T132314Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEUaCXVzLXdlc3QtMiJHMEUCICqYQUeFx268rrhbhXOblFqS7LLQVQ3y7W76BZzAOdxzAiEAjfspWrBCt5rx9znI0on7T8ggSUBAqi0215QFZ3yhbM8q%2FwMIDhAAGgw2Mzc0MjMxODM4MDUiDHSkOwTNFEYiDHdnLCrcA8azlSd9LozQMPq5Ymx8haZNe7caLmAEKGOpjudTZa9QRqs7jRrEvXQBX8o9xRUAXGB6IcBH4G6ZrH0dA848sqQcV8D2GJPdJpRIRgnqCP7vS3Su25NGsjAMyBUQQ2CDvdRGh1guR4AynYVEmmVq7LM%2B2%2FTb7boxR7JPg67JsWO6YXmBQMxMIziTEpWFQPyoUiCYe3KV%2BQDggXcdhFE3RqBgoZaQcJLpyWxDQrkJOZqiQcJE0DN1ZHjbnpcLZdRES92m1JYdCZ9TRVwolmh%2BQ07CSD3EfsLlXV7G4xmAi3%2B2g1iVgFcQJ6EyRqqlPmCStIr95wN8fPeXdxg23My3qCUkvKZ2Fib%2FZ5GltbfYHwPKnooI6TWTfaFPiaT7xSBHORywf0H37xYaJijYwARHtB%2B2Qx2yaXgmflHOeJebCtmnWKtDfCtkV6BI1%2BjKUzKxdiWabXrwOpG5HHNpmSvi%2BYZNi4206RRsYTIl%2BfYeX0wVUEKv9PgMVr9fRH950mWwkF8f5SrkndIgIFtqCmD9pFzhXkVreBXnkqCKk%2FBHfVHgac4Fbz2tJZFQv11RNzj94vH3VCy0mBOywZsnp8rj8wuvNKFS2QIYuMUPSgVwTtqXHvzL%2Flwrpu%2F0%2BVNpMMP%2F0ssGOqUB6adIfBGFe1pgDTRtn7zWa0fpQhYfvt6kxZy1aLRVzkRSEHgEInXvsubufv3jAWlnqbayYBidR1aY5cmPhMnYvOZW8IBN0FralkQ1dOmZVVHGJhamBRRdv32%2FsTkqX2sHPxF7QQNFa4GUdPEspgPCTJ4yPt6mNiPsDcSy2owaktd2kr3bmREYzNcia%2BDuh24YNa%2FYGRwIa2jNzTIgsG2s27tlDy%2Bp&X-Amz-Signature=76b9cfbe5c2c52d2d45b2db6bb11d07176685221d04b7b90e9221d6e6e39ea6f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

