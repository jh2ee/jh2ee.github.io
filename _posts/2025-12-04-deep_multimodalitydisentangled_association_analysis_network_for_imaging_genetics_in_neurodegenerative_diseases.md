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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TXXB5BRM%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T140657Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGYaCXVzLXdlc3QtMiJIMEYCIQCFTiAVc9mrh%2BL6H5V67hrq6cFRwpjjUzcOTL7b4zKCKQIhAMwwbBcky4tal0pMt19%2Bh6UHDDqUlXU%2BPl%2BkrMbCzo4WKv8DCC8QABoMNjM3NDIzMTgzODA1Igz2rrnoRzvg4ucgumgq3AMVMjI%2FfU1fKDWOjwDqNbjcjMP7CodOsvWNdutQNLekEzPEU0K7ahIIeR7jFl2ADUtBPjCS8NLNHAUVKPzS%2FmbQUyqp21Bi%2FX2l%2BcGDGzIpyI2%2Bn0Vk0P0zansPDNGSWJHHev%2BgYyJ2Rj6n9NmKRGk1%2BHnXITsX2yCaPSouR5US0anUWVmC2wYMIcyJZeNlu6ao814j8H4UzMuNB7TPGh3BoX7DwNTw7n0nzfnh6n99AI2aLcNNgKJm8%2FNLKFXhq38RlYiLzexZIbyy0lSPolIad3KViMgAOSwpDBgw8%2FrC479GnUQc5knoSEiH%2B7%2BnXZRc6y2tQyMdjUHXr0K9dK%2BiV2u1iXTnyXtLQ%2FEbq4musKOKgDLOpvqerLgamO4BZVBtF%2BO03DjZfFKE%2B7AOOsH1zIdmfLeB3S3xxNz730ULUau%2Beco6Er6kFe6tIR2O1EHGjqSNYmfn9hSocQay8%2FooqL2bVY7wNeG7nRg32e0PTMwKpq9i9bsZBPuo93LoK9lH8F%2BbbulS4U8sN%2FPV4LUtxHH5z2sYIbPSrd%2FFK8CaXqnJhpnjqphrgnBERi6E89g%2FWF9nOrGTvdEJgENmXlzTCF28pj9JiTwLzUznjloETdvvCG%2F1jiYbqgX86zCU9uPOBjqkAexoozwOtI%2By4brFKtaxgje7aj2O7Qbc9wVXYMSzHZ60PB1ZvgR9TC7qC1uJ8UYxW5Baf%2BD2T37T3PBvEXO8hs0DGQ67d5B9tFmIWi7be%2BzUiLioFnaJg0QOMEtjq37cOXivlMCYwZ4REcVd2QEq6%2BzCapSqiHuWgO%2BsM84rdoTF%2Ba6zKRZGWKszempZmjQv8BBfi5iGCCwVWgFo7RlFI%2B4QsKFm&X-Amz-Signature=7de3990e2548589fddc40316d087b07659834f2ab79b82837b2e3402dbf0af3c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TXXB5BRM%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T140657Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGYaCXVzLXdlc3QtMiJIMEYCIQCFTiAVc9mrh%2BL6H5V67hrq6cFRwpjjUzcOTL7b4zKCKQIhAMwwbBcky4tal0pMt19%2Bh6UHDDqUlXU%2BPl%2BkrMbCzo4WKv8DCC8QABoMNjM3NDIzMTgzODA1Igz2rrnoRzvg4ucgumgq3AMVMjI%2FfU1fKDWOjwDqNbjcjMP7CodOsvWNdutQNLekEzPEU0K7ahIIeR7jFl2ADUtBPjCS8NLNHAUVKPzS%2FmbQUyqp21Bi%2FX2l%2BcGDGzIpyI2%2Bn0Vk0P0zansPDNGSWJHHev%2BgYyJ2Rj6n9NmKRGk1%2BHnXITsX2yCaPSouR5US0anUWVmC2wYMIcyJZeNlu6ao814j8H4UzMuNB7TPGh3BoX7DwNTw7n0nzfnh6n99AI2aLcNNgKJm8%2FNLKFXhq38RlYiLzexZIbyy0lSPolIad3KViMgAOSwpDBgw8%2FrC479GnUQc5knoSEiH%2B7%2BnXZRc6y2tQyMdjUHXr0K9dK%2BiV2u1iXTnyXtLQ%2FEbq4musKOKgDLOpvqerLgamO4BZVBtF%2BO03DjZfFKE%2B7AOOsH1zIdmfLeB3S3xxNz730ULUau%2Beco6Er6kFe6tIR2O1EHGjqSNYmfn9hSocQay8%2FooqL2bVY7wNeG7nRg32e0PTMwKpq9i9bsZBPuo93LoK9lH8F%2BbbulS4U8sN%2FPV4LUtxHH5z2sYIbPSrd%2FFK8CaXqnJhpnjqphrgnBERi6E89g%2FWF9nOrGTvdEJgENmXlzTCF28pj9JiTwLzUznjloETdvvCG%2F1jiYbqgX86zCU9uPOBjqkAexoozwOtI%2By4brFKtaxgje7aj2O7Qbc9wVXYMSzHZ60PB1ZvgR9TC7qC1uJ8UYxW5Baf%2BD2T37T3PBvEXO8hs0DGQ67d5B9tFmIWi7be%2BzUiLioFnaJg0QOMEtjq37cOXivlMCYwZ4REcVd2QEq6%2BzCapSqiHuWgO%2BsM84rdoTF%2Ba6zKRZGWKszempZmjQv8BBfi5iGCCwVWgFo7RlFI%2B4QsKFm&X-Amz-Signature=7de3990e2548589fddc40316d087b07659834f2ab79b82837b2e3402dbf0af3c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662ICPMHEX%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T140657Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGYaCXVzLXdlc3QtMiJHMEUCID61Q1Rhbe8i4KV5j0oy8MnkGDXCXKi15LBfkl%2FM6nLyAiEA9Mewpw6HNBu5E3rVIz4YSjmlzaVNY%2Fkk6DAOxQ%2Bl2BIq%2FwMILxAAGgw2Mzc0MjMxODM4MDUiDO4iy9jWq3815qkGtCrcAzTPz3nDCqnkEbUvglF%2BNeIxTsA1h5Nz4%2BSHs%2B3Vu3hy%2BXAAZDT8lJqmM9vUQVtaSQCmrVyz7YGHS1bNKR0nDm5%2Bu81p3wJgfIiItP5kCDuHFvz7DG5UlUK9iHeGaJIeq%2BMKWQxQ5vJVQ83Gztf2oMArm8I2iJQFds9mDijFRXO79W10wH6KiWcY3KBxqC80dxJ0koPeNQrvDV79Rujp738nseNbPc9yIbhMDd5tomYCshUspY89SKSS0UhUbw9Y9HKdbqTM0pqITLBoJjAIJVV%2FsXU7KCOn4aSW8l1Tp0XcwRRcKCFryzO5z2Htoci3V4F97Duu7UyGH4FUKKFDQDbjnZLitAJOpeXY%2FqrXjZTNmp1B1KF7B6AGQqv84mXHOX6eD4A4XEOqNMXfLLmAjPuGELsfQr5l09s6bf2I8MhAKAI3mSTtpMpJiH5Tde%2FKo9bod8p5t86ssAEpDz2WVE3KzYGrB8e4EPaDMLuIFGQeNt%2BKxnBfMvM7I1ia8GZTKv23Ch2s2frNL96usaDDwK4d5VkLwNLCF%2FdYUINt9U6Ejk8AOf1XyiBhYS2CFYAvxNua3RY88%2BLtR6QFXcr3VG4NTASEM%2FSlKM1ByK3LuJ2DjxSXzRCMaT%2FRRMbsMMr3484GOqUBmPgjPYmkMiUmLITNEuDXMqb4kskPOeHFb4Utbc1nbiDOjJdmoPDbLDwgoxy8fa4aVs8etQ0RQNYYRoCDOEceAo9qpn7UKQXT%2Fabfwt0V7pNW7xtYn8MOVuho5XkU56QupQNWrpcHYnoEIKcnuxvYPn8c0lthe06sD1XQBPgahdrf1T4Je1a1kc%2BMHBKmu0cEMaPmMHccXtYOiVcfEfjb6o3pzHst&X-Amz-Signature=cfa3d97b0af105a75ef3d70f9854edf87d63941e65ca83f35b8bfb759bd0e077&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YWQ4ACGQ%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T140659Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGYaCXVzLXdlc3QtMiJIMEYCIQCOlat1fAcWv35RVScl5qGrw2%2FWKAK2ncHRWkxnv4yYtwIhAO57fcas8pKtGYpefgxCaEBBcw2fOUQfUh1YjTcFTQXLKv8DCC8QABoMNjM3NDIzMTgzODA1IgwrpaGhcGlNBTE7Dqsq3AO4T01SKTZkUEsYT82b0NoJJ6pDDe8tRsGmtJGqDcp%2BXtok286HvG8RB%2BmWBJO5h7kjAjo0Ch8nRczn9K059JDxzpXtxLDMf39uM7TQxVwTsACE%2B1Mk7QldYHM1EdZiN1G0R8nr3gnw9z8Y8RrKWqZy5EVa4AYV3uoRoouZwNqrCu0p5rgH36XmCT0sx82ZWjRDsq8sYGSeiDKRhGIe3a1p55PBapJnoPcMQ%2BoHqoTy%2FDmwJ2G2aycvUCyNFUwz2s%2FYldZM%2FdIx6Ik2CDNaVJKdLtPjk6vWB4yNEMLLP07P9%2BruayV1r1fcHsqRTa00%2FEHE%2FFR91jPnIsnG9aDZYNKyqG2mCt02HpMA1km%2BwYBGWok6BbNtGEW82uBl6ELdxoIGvFym%2Bxxvs54i0Aq6BGMFxGrcLvUKtA5GeMnnya1rgkUqoOz3Gsv8WcPXjZbXn8Mo9MlobbD%2FFyriYnSVrbITNAXYSoAKaOPaTpFbdd%2FLgbI3ivBWfidcJ4toBb4hKyiIzGT%2BI2XRcgtPT3VfE531b4bM%2F9sMl0WVrqpKXdd%2FIfY2ESpRr89s8ojeN1BSyU5q%2BH%2FdakbIRrBRlH8cfPngzEWyG7J5sKuxp6P9%2BANWhzedy48%2FUIwC2m7kCzDf9uPOBjqkAdAJYN5BnaZmz6lRaTlp%2FumkZkCNji1cYeEFPNkBj1CBLQp2uNQgbwJvxmyG1DBfFeav5n2dSx1J7QC1Rg4Vv8Tw84SgmI%2B0BGlF66h2Dj%2BixW2M%2FbN5h1U4taASUedBXupsJBiHD6T8UAPBO2A5wb57D8YT1%2B7QNcyDojjZq%2BQYPGY7HDGp3bOL9G0BSgNJHGir9S%2Bij2vk7p04IOiiMvriu03d&X-Amz-Signature=3e46a4e3e4881d9e1774bfce3b4820c7df452d77ecacf4ac1ef903eb82e79093&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YWQ4ACGQ%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T140659Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGYaCXVzLXdlc3QtMiJIMEYCIQCOlat1fAcWv35RVScl5qGrw2%2FWKAK2ncHRWkxnv4yYtwIhAO57fcas8pKtGYpefgxCaEBBcw2fOUQfUh1YjTcFTQXLKv8DCC8QABoMNjM3NDIzMTgzODA1IgwrpaGhcGlNBTE7Dqsq3AO4T01SKTZkUEsYT82b0NoJJ6pDDe8tRsGmtJGqDcp%2BXtok286HvG8RB%2BmWBJO5h7kjAjo0Ch8nRczn9K059JDxzpXtxLDMf39uM7TQxVwTsACE%2B1Mk7QldYHM1EdZiN1G0R8nr3gnw9z8Y8RrKWqZy5EVa4AYV3uoRoouZwNqrCu0p5rgH36XmCT0sx82ZWjRDsq8sYGSeiDKRhGIe3a1p55PBapJnoPcMQ%2BoHqoTy%2FDmwJ2G2aycvUCyNFUwz2s%2FYldZM%2FdIx6Ik2CDNaVJKdLtPjk6vWB4yNEMLLP07P9%2BruayV1r1fcHsqRTa00%2FEHE%2FFR91jPnIsnG9aDZYNKyqG2mCt02HpMA1km%2BwYBGWok6BbNtGEW82uBl6ELdxoIGvFym%2Bxxvs54i0Aq6BGMFxGrcLvUKtA5GeMnnya1rgkUqoOz3Gsv8WcPXjZbXn8Mo9MlobbD%2FFyriYnSVrbITNAXYSoAKaOPaTpFbdd%2FLgbI3ivBWfidcJ4toBb4hKyiIzGT%2BI2XRcgtPT3VfE531b4bM%2F9sMl0WVrqpKXdd%2FIfY2ESpRr89s8ojeN1BSyU5q%2BH%2FdakbIRrBRlH8cfPngzEWyG7J5sKuxp6P9%2BANWhzedy48%2FUIwC2m7kCzDf9uPOBjqkAdAJYN5BnaZmz6lRaTlp%2FumkZkCNji1cYeEFPNkBj1CBLQp2uNQgbwJvxmyG1DBfFeav5n2dSx1J7QC1Rg4Vv8Tw84SgmI%2B0BGlF66h2Dj%2BixW2M%2FbN5h1U4taASUedBXupsJBiHD6T8UAPBO2A5wb57D8YT1%2B7QNcyDojjZq%2BQYPGY7HDGp3bOL9G0BSgNJHGir9S%2Bij2vk7p04IOiiMvriu03d&X-Amz-Signature=847888fd6bb160b9c8e0cdec61650fbdd0123a0e01296775e1e58f0602ed8559&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SHTSN3NY%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T140659Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGYaCXVzLXdlc3QtMiJHMEUCIQC%2F%2FqifgNfxM9vai6gfxDgppmoBvx4J5cSg3fCvgl3D3QIgWajWf6SeO0M67AYTIalihVGCHov020%2BjmYhRR0XzcBQq%2FwMILxAAGgw2Mzc0MjMxODM4MDUiDNSWlD6kE8%2Fr0V212SrcA2ajwHiHz7%2FpwKAgwMaa0DA3jcsn%2BJikQ2onT0pF4iWX%2FjQjAeey9DQIHaa7txB3JpJqIV2YkVHNRZgSolmHqIn8G5mme56DYjPgIseWHOBC8qr3Wzf7ZaRbPB58FJEqLBaX2qfp8zJlGQ%2BcOiarC4stQyO5jUhLnUc4OTlquIiQ%2BgHZnc%2FwxnPqedpG6llKbd6aGLZwHLnchKBvEqgb1oQdJQMdRtOGe%2FeSia61sDn3U8X9PjyQtGD2ijALdai7QKRn4A3eDKz2Tc9AZaLjIxUzrxKDxconluB%2BT7E%2BIHDvaBPoNpeSO8NxELB%2FOmZjTDLtFy%2F6Ra%2Fyr6vWU252epOsRwb2Mpz4pKAnMY2pUfC6rfJ2RCY%2FHRgcnuI%2FHZqhG7QjZ%2FwETmbiTFrekSS6n0wWjB6wuVgN25HytJbTedO7EmRGe5tCTWAFn38d4MVh%2BAHmJL9CeNl2%2BGMSACUWOagH4GPHEkMlsDWvSCy%2FpcvOuZx6aeMZm5PD0LmIiiycKjTlXbEiKu9I3%2FlsZIMmEifiL8cdbPxTj8vvSH81Mu3wboR%2FIhBfUn%2Bs3jJj5Mb18DkZxPNvlTG%2FBY%2FS5OgGlUIZqqe7eGEMGq1Ct5Ku%2BE41UEqbaVat%2BfyxsepFMNb3484GOqUBOwFDZvhao5%2FPDAtXYhNiyYKOWuV5XkHB1KXZwXi7fhBuZDk5nAxhkrRjYJCCPgdwgWV7HV3ygSTZ1P2U7%2BpIMFqXdcZ%2Fe22Q5%2BaNW1vL3J9dOU%2BNWuw5lTVsCPIng5d%2B2HMRbrZ2ndYB8%2Bzs05KazocnT1p6YvbeHjdP6DZjnaMK7Dg6TydMxVmRwi6NbebG2qwBAsd8kHBoEbkT%2Bu3LDahnUfOJ&X-Amz-Signature=359fe2d63e6cb61c70d742b3cc4b666de0ef82ff893661438949412fc4860aa8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SXZZIWYM%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T140659Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGYaCXVzLXdlc3QtMiJGMEQCIHQ4dxZd1kBhrTLBJE5sk08fZpMhXXYY0iqFaC%2FxTdQuAiAZrT4vPJ2fAMfJXaxp1IP4%2FLJ%2BkoQWdBYKqjB%2Bbg5XkCr%2FAwgvEAAaDDYzNzQyMzE4MzgwNSIMgXQR2TVXIZ5EMTaUKtwDFuUtuNNrn4IeyvkXQeOcNjn9JyY0l43odyNhN%2FqEGvEbZPpmu7Zdw3hijxA3MAIaKSFzrbV2%2BvV7sMAfX3T1HwYsTvjyGGcshBVPWUv0ei6UsN9zW8jlbWRUrzpxY9pTY%2B69W8Uhry0Y82J6gVKOXieJtiV0LitOOJtkugLT8lGhz88wmk6f5edEf7ZCB7lG5SB6vrO0FbRaHh2%2BOrzHhAq2Ts2eJdgiy6Zcdxd4b4gjz3ZSbGBzUqS3YtRsoWm0uxA1jtcbX9N5ZP3h7cqvmTVIplXSkCl4k%2FaMIrabuHtK%2B4%2FogFZIK0HSwCBvDbzjpO6Fy%2F90GrWS0%2FlRoLaatMTC7uzHXoQMj0Z6lrNuszdBAQjrf0fxB8JkeluZGpZ9E%2BBXjtcjFnOBpyBbuB%2FiKAQXZ0cjQ9t73iulpMY6bJyW5O7meQkvyVQMMb2R2JgAJ7kHp5ueTRiXH79BL3SANIHW65mkDt8O91tOQ2BFbdpic01cdSydPLchmYa%2Bu3iN6Y6DJxRmZdg%2FrIYl8A5179plNgoVVYMMyTwqTa2zq8iCSu1ovqQbnbKLBPenYZW%2Bn7duHqXB1XSnUWhN3x6iKJAzXh8atpuUYWxrMsdMSqKgsyBNctUutvz9onIwqfbjzgY6pgHBYVAKnlntQ2%2FLHjSQg5zI6L%2FABYfJv6K9rjO7ycsAvKOVgZu99PqmUEWlQFj8DU1aRIn9EVTU3yYfcKRjgmGHLjHash0lUGtZOmly%2BeWRmqpun0qqC60jJ6U%2B7EIDyVG%2BcZeCo1VAdSfaSso8nAUefuC7FB4Rz5kx15LWdZhErmTWljG%2F6Li4c64NOOUnNekLvQcPR156AFwb1h2zLlahXmRCMyU3&X-Amz-Signature=b10f8e1d9b2498d7e0ca536a7f37c5232e2f467b752b5cc90c0e96f0db27eb69&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RGB7EZXS%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T140700Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGYaCXVzLXdlc3QtMiJGMEQCIBbAIqOO6zyCLxi5KiAyF%2F%2FB9RrslJq1mbQKuZgFVGT3AiAsT2ILsdCwEydfcfn4T2wR4PYeJUKN%2FJeRj3TK1dyO0ir%2FAwgvEAAaDDYzNzQyMzE4MzgwNSIMKeuzbcYuhKsRNnjUKtwDXj5NlngZtFPyVikqDOj23BI8WzOn14QXEhVMdLWfnkuotKmr2CKL%2B5C0DTK6sX7krvzagZR4Too%2ByNsgRR2NcYvJN1iozwEfK7ZY2nlgyQfNEUNIsgPOuYMYix9gsyqhwurPJd99QSH5faWWmIWnLRwgn9wqFXnByDLFlSChdCuNBfcpZparr0030wy1ugvtJkTH25q2SsXMK%2F%2BpJaiIAP%2B%2F%2BfwiQeMsBMbUpBBw7Nk9F5k3279PYLR4FMSHlmbdGSM2NojmMqDvcqx9ckuEjfggTQC%2Bz86wqo0eGQCWU0Y2eF2XIK8wsbl0GmVjn9%2Bkb2RVO%2Fb4qXW9Rz6ODGcrATTtlSK2mcxW5mvNbdQ8PVntZHjQ7wBuwy71A8Lvv35tYa%2Fu7aj7jdi1gyQzHLsNhal3IbiENTnlh%2B6QhDcMqzjMmcJYFCjJ4PR6lZm9ds%2Br5oAaQY1h2jQ0M%2FDPqZDRppmvMQU0yZypcmt5ITk7hAjTuePZcITMSGsnkzZOFHxL3Grfv%2FrnqMK7KrdF2JkdSCdXVGCO4GULWjPNQA9%2Fsbb8tXigoE8cO3SZ5HEBO1eSY62MpnUCFQRn1UJZvY%2BtKWWZiiyigeYWuCXbky2rjaWLCH7spmHmx11HNAcwrvbjzgY6pgG788ts9SyVJaIwSJEtoUwD6XHbbljrG3etoE%2Bu0mLrncob%2F8u5COKyuK5fAbrF3MwxPZnKDdu%2F%2F4bUCIfGrbuhXyXQuzvjSw0I1MTGhfbU%2BKqfPmAu%2FMyCm%2BkrvFGnlf5ELUxrk6KfKOHmO%2BaTTQIGT4tM0zeLBjv8skdW6lgUTpWg%2B32evqWKQJRHP%2BQq4US5QEazmsaUZOeS0DZ4JoSA4lW%2FCbga&X-Amz-Signature=e7a22ad379d7b422fe5430ce38fce2f5876e55da5ab63d13795858444dc5754c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Y6SCLLZ6%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T140703Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGYaCXVzLXdlc3QtMiJGMEQCIE8fwRn%2FrdFplXLtc31HkMEDSuM5H9Z1EJqcCuk85vseAiAeqje6Nbr9%2FsUaDAXCi2bHdlsB1%2FLJYWPQF52%2FkrpbDir%2FAwgvEAAaDDYzNzQyMzE4MzgwNSIMe%2BjzTluUmXmvbwO%2FKtwDcY%2BNDHBFrSCbMpjGdiqNKLWSe1wAbsAdspSI%2FmHBUH2kUTR9fGyZJfLJT11%2Be9DTRdRBWchAzagajeIXGTbocvXMkpUC51EY1sQQo9aDg05YYNgVB4Dq0TdJFEH2sAaLjyLWtLuXPN3LpBwRBt%2FCnj%2FBF1oIgoy6BnAQT2nYOO%2BjCELezE6NQ2J7fo0iF2OTDU2xKzK1ZjSCZvazPBafVT2n%2FPubiR0fnkzYbLHDWP2V%2FPmHCFsv1%2B8vHTUeJyGsI1rugQ3kQRHZI7EngFWC%2Fel32FGDRMyWgU5o3s%2BhtO4dC8E57X%2BEEZjtiuiGEHKOykTmVDB1C%2F2YKZEmes1FiHvApvKP7BycwXOi9eLHgtz4qZCztPS7Z1jC6ZGobT70GnDd5FaXNlcJa3I4a%2FIPmHtGpmoEaglLrfAi2PPs7pEa7f%2B7Cgw0IWq62KZHWoJUCIVXqdlQwoOqH5Vb2YJZJT3pwuXvHZTSJYcBPJ0lA6sImvNdy1f%2BKDicv4YcQoPnPubWhFJwKwb75ZxL7smID78WHtuTVc4qQsqUmNDDDlkiixSIG9PXWQ%2FTwK1jOsX7OblPtpva6VymdmsVNEC%2Fh2cUPL3Td3qUTVIrkuTR7RSE70u%2FzpN%2BJ1Nn9uQw8ffjzgY6pgGMq6Hzix%2F4XuyHR%2B%2FL9FdUgJd1t4vistoyRpvInjvaZBsHUEGoaoCqsLKjyNO3ksZb08vgjLGu7FfcjC%2B91D%2FJj98Yvtu511UI8nI4CcJw6H3OXCl0FrD7jtsuEqkKFgkAIvzz5iTGQ7ztWQWVpVCai7DRHRCznjyL9ur34HN5q3D42fQVOhpnWcq4XtJ9D4ec9DypPbvbKVAfSpr%2FImXHjKKPcEIF&X-Amz-Signature=7236b11ff5d13f88a5a6f0905e40ae1fd62d96e6be8cc6538cdc16a8bd5364fb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Y6SCLLZ6%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T140703Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGYaCXVzLXdlc3QtMiJGMEQCIE8fwRn%2FrdFplXLtc31HkMEDSuM5H9Z1EJqcCuk85vseAiAeqje6Nbr9%2FsUaDAXCi2bHdlsB1%2FLJYWPQF52%2FkrpbDir%2FAwgvEAAaDDYzNzQyMzE4MzgwNSIMe%2BjzTluUmXmvbwO%2FKtwDcY%2BNDHBFrSCbMpjGdiqNKLWSe1wAbsAdspSI%2FmHBUH2kUTR9fGyZJfLJT11%2Be9DTRdRBWchAzagajeIXGTbocvXMkpUC51EY1sQQo9aDg05YYNgVB4Dq0TdJFEH2sAaLjyLWtLuXPN3LpBwRBt%2FCnj%2FBF1oIgoy6BnAQT2nYOO%2BjCELezE6NQ2J7fo0iF2OTDU2xKzK1ZjSCZvazPBafVT2n%2FPubiR0fnkzYbLHDWP2V%2FPmHCFsv1%2B8vHTUeJyGsI1rugQ3kQRHZI7EngFWC%2Fel32FGDRMyWgU5o3s%2BhtO4dC8E57X%2BEEZjtiuiGEHKOykTmVDB1C%2F2YKZEmes1FiHvApvKP7BycwXOi9eLHgtz4qZCztPS7Z1jC6ZGobT70GnDd5FaXNlcJa3I4a%2FIPmHtGpmoEaglLrfAi2PPs7pEa7f%2B7Cgw0IWq62KZHWoJUCIVXqdlQwoOqH5Vb2YJZJT3pwuXvHZTSJYcBPJ0lA6sImvNdy1f%2BKDicv4YcQoPnPubWhFJwKwb75ZxL7smID78WHtuTVc4qQsqUmNDDDlkiixSIG9PXWQ%2FTwK1jOsX7OblPtpva6VymdmsVNEC%2Fh2cUPL3Td3qUTVIrkuTR7RSE70u%2FzpN%2BJ1Nn9uQw8ffjzgY6pgGMq6Hzix%2F4XuyHR%2B%2FL9FdUgJd1t4vistoyRpvInjvaZBsHUEGoaoCqsLKjyNO3ksZb08vgjLGu7FfcjC%2B91D%2FJj98Yvtu511UI8nI4CcJw6H3OXCl0FrD7jtsuEqkKFgkAIvzz5iTGQ7ztWQWVpVCai7DRHRCznjyL9ur34HN5q3D42fQVOhpnWcq4XtJ9D4ec9DypPbvbKVAfSpr%2FImXHjKKPcEIF&X-Amz-Signature=b93372fac0539f9bc32f2bced683efe1676d8f7cd608dc097805f5d3c19adda3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QEHLK46J%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T140653Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGYaCXVzLXdlc3QtMiJHMEUCIEHnK0%2B%2FSVNVNwTa4rG81PfFWP5JErRd7meTE5KFFjMAAiEAkJKWu2GWMcabiu7RIwvxq%2F%2BAXwa79sHhcVyy8PN9Nb4q%2FwMILxAAGgw2Mzc0MjMxODM4MDUiDJXqcnTz%2BpE0AdePUircAy4uGjIfei0ce9hxZ5Rpbp82Hz5dk5OgpemHS5vmqxf2DhHHxC0C5qhNbHAgqKyslDXxZX%2FVgC9Ze0cLTTiBTcPMyziolpLTatTRPLnM3yooLN8m3EW6Jlkmpz35k46w8AJ6cr1X70ORwp%2FHe1zid7Aw0vjAidKPpYhfQa3YIErxI%2FA5nkf%2BgqKHU9p9Yd8JEfN2llO4jx1FOq9vrQjBCIZxx3RxU9CdhpUfsZCxtmLiLHoeViGyYM92C9sRmbGeo1Xva%2BGzAeTKgA2JuUOEH54gp5Tt%2BtIzMUQagaCo%2FxEpTTdOWvJH%2FI%2F2iZ7NsLSQOpnU5byO2vUoofyNYzZNWCbEaxtJsO9%2Fa743MAOBSZPW%2B6dzZlq5EQ%2BkoPEzctpYHkeLiqhkUUcpdxw17F3kzlQ9at8IjiwvZ2%2FXziT8JOAga98v5%2BYVLfIzWyd9boV3skPzoV2gBAB7TmcMDyvIIEEsFVr8jpCYqp6Lh2iaUdLjxP4xS1OKP71W3mwHWwdzPAUetKR78hpE7WzE%2BMQloGxga4YNo0L1fvg5z9BKglWSfz9Vxth9Udufvm6H5HSGpeSOj%2BYZXBndyQqMBaVQEb9Jh2xPevTYK1c%2BnOMd0ylOQVKDXnLwaBmLvtu3MLn4484GOqUB2G6jxLcqeaO7KRtGxq79M3MEZQfeuSaZCYftL%2FCJuTQKKN24EiaLUpg75PnzMheTwYzjY%2BsNCOL8gB46Hv64eOq99ORKJS72dC9IRfIdP%2F2EUVzaWeB%2FPdytIakk5Yget30Z8aP67Pytl3tmGx1wEhBP%2F2V%2BIjve0CUMSKt3OpVkNa1vxKvhtthWUA2Ft144OtEdEQ0EwptqTCqoH6AQaKxRnY1O&X-Amz-Signature=236ee08a391c5a2255f4692c97338ae1247aa98c016e00a940de2a479b25b2f9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XR5U2KO6%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T140707Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGYaCXVzLXdlc3QtMiJIMEYCIQDdrEiC0NyGY7zrs3JRH349IqIYfuXh4H1myWdwjVMwrQIhAJ6%2BlXLtmJCobpyyCdCBWAnjO%2Bn34tVfl8%2FK38h8sJtlKv8DCC8QABoMNjM3NDIzMTgzODA1Igw3NJZhfoeG3Q8g4H0q3AM9mK7JSaEDBiaEknxj%2BHYluVF5ESTzDb9FkUNEvAuqAFc0wHnhPAo4VK6xMDGZwBWK%2Bp%2BJWdmdff9bsXuagVs4TjWdLevyUZGx8p4ejznL007QFk0QiQTpyWaD1cpxwFv%2FGt1qJw3OQk6EiLxIgAumPUsJUbuu%2B%2FEWCecgPfvdbf3JwTXVu7VRP2gSYo75QAftk7H%2B%2FQ0kkuXBrBY4OFquGswk5n9i2nNtFtpe9GFpRsqc5iDby7TTpSqGpn7AUDtUrU05Szu03LXnoH7ShedsIX9uQKs0kQ8xp6Yjemesxz0lenbZJAJXiy88dfbN9lyqinE9KpQVzOLyfRf9jCQU%2BTh7S3f6bAFa54X7covY1f6YXnUTHFGOTOmEEjcJ95xqsNfkW92tdh8kqlHTyCe%2F0IMUiQ3vI0Vj2U7C%2B%2FpwDPCjxiRHUcfH2aYRjzXaK3I5%2B9ZYhgAEB2zDCU3dxh6PVotFPe6hCZN05BfxhQKLWwxCWpL8TuiaGNgGmqcfCgla12tffgzAMDYMWL84gdFeSWxAPAjp7p1jJA8EWMIvft5Tpb4W3X0FW5oSMM%2Bc66IMLsMd2dO84AhCojIFjOX77I%2FIAAgy5ClB1EygRuE71Ua2gp2cjtVPtAuC5jDz9uPOBjqkATzOLWeLisd%2B%2FDyVJMqOZyy85HAZ4QT6AA4ZvrRJd%2FP6GbMAkwkw%2BDURwSNeLmP%2BRxTPhVkk1XoJRnTjlLyijob7u%2FpnZSbGyx4bpjYZ6kpjc0Z6TKzmuqTMYBz8mZmNcFiH%2B7YFzPuFOdTKoHA%2BBxawazmMtgvVvhiPc1Z1EgysLdtwT1f44m3%2FJYbLVX%2BB%2BzfJ8KerOgCQUc7jFJV0Bvn40OVw&X-Amz-Signature=2d2aba47c22858a04ee68678c12898badc69e50edc6551345e2df169fa34b1a5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XR5U2KO6%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T140707Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGYaCXVzLXdlc3QtMiJIMEYCIQDdrEiC0NyGY7zrs3JRH349IqIYfuXh4H1myWdwjVMwrQIhAJ6%2BlXLtmJCobpyyCdCBWAnjO%2Bn34tVfl8%2FK38h8sJtlKv8DCC8QABoMNjM3NDIzMTgzODA1Igw3NJZhfoeG3Q8g4H0q3AM9mK7JSaEDBiaEknxj%2BHYluVF5ESTzDb9FkUNEvAuqAFc0wHnhPAo4VK6xMDGZwBWK%2Bp%2BJWdmdff9bsXuagVs4TjWdLevyUZGx8p4ejznL007QFk0QiQTpyWaD1cpxwFv%2FGt1qJw3OQk6EiLxIgAumPUsJUbuu%2B%2FEWCecgPfvdbf3JwTXVu7VRP2gSYo75QAftk7H%2B%2FQ0kkuXBrBY4OFquGswk5n9i2nNtFtpe9GFpRsqc5iDby7TTpSqGpn7AUDtUrU05Szu03LXnoH7ShedsIX9uQKs0kQ8xp6Yjemesxz0lenbZJAJXiy88dfbN9lyqinE9KpQVzOLyfRf9jCQU%2BTh7S3f6bAFa54X7covY1f6YXnUTHFGOTOmEEjcJ95xqsNfkW92tdh8kqlHTyCe%2F0IMUiQ3vI0Vj2U7C%2B%2FpwDPCjxiRHUcfH2aYRjzXaK3I5%2B9ZYhgAEB2zDCU3dxh6PVotFPe6hCZN05BfxhQKLWwxCWpL8TuiaGNgGmqcfCgla12tffgzAMDYMWL84gdFeSWxAPAjp7p1jJA8EWMIvft5Tpb4W3X0FW5oSMM%2Bc66IMLsMd2dO84AhCojIFjOX77I%2FIAAgy5ClB1EygRuE71Ua2gp2cjtVPtAuC5jDz9uPOBjqkATzOLWeLisd%2B%2FDyVJMqOZyy85HAZ4QT6AA4ZvrRJd%2FP6GbMAkwkw%2BDURwSNeLmP%2BRxTPhVkk1XoJRnTjlLyijob7u%2FpnZSbGyx4bpjYZ6kpjc0Z6TKzmuqTMYBz8mZmNcFiH%2B7YFzPuFOdTKoHA%2BBxawazmMtgvVvhiPc1Z1EgysLdtwT1f44m3%2FJYbLVX%2BB%2BzfJ8KerOgCQUc7jFJV0Bvn40OVw&X-Amz-Signature=2d2aba47c22858a04ee68678c12898badc69e50edc6551345e2df169fa34b1a5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RIYNZE66%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T140707Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGYaCXVzLXdlc3QtMiJHMEUCICGX4a6olHgqTt8U1tHK5aH65byuSEQ6jvCMFsbmD4MPAiEAqoU07CfCUGSTSO1ZKV%2FRSYt36AMVywyq88hOBYJQ8OIq%2FwMILxAAGgw2Mzc0MjMxODM4MDUiDD2841WmXmhPYveUESrcA5kEkKAxsT4mH6UKRuWGaBs%2Fwad4WvxUPLBdfrw060jw7Pkfjo6%2BMHLUU99MhdBGjd50xXAoPtZbhMSf0ldAs2tuU1YrszNcNc6SAT%2FTsFW103a2Zbi%2Bp7tIRX2%2FmgbxujlBkW7%2B3gpeBsq5VhaVG%2FTRZRWXNH%2FfnFf7UgpzHEfzN%2FKF8mbafu2XZB5HJzw4iLuQ6fv2MnrC3IZElDghXsAH7vUqmgP6ocr1v5nfPeTcXNSOJZs3gTxS6%2BOhDFoI4bhekHIlvmFYtXeUvllBLgIJtRLo2dsXdEk70EgyMI6fn17dzQtIcEu4CbMXnqzh0maQeQMbw8Wr18R4CYzXkj9hoSYYgxwYG560IHMcTNvj6mlXBNb6SeRm6FMkj%2BXwEEvp3hm00I6%2Fqd9AZ95gIEPMToJO0Jil%2FAHvrfalE%2B%2BqCtrrJwXcttlT%2BQ092Y1U8qH1auYpEQZM6CRaGUh4DeVnkH1I30GJpEs3hyie3FX5vkxTDjvbhGiasuF1YtQ85d2Ee4Jq1lQ9mdYH12RmgsCnIIcKlUD%2BgweJpzf7%2FutCn8GSFyHOV9HhZeaEIwajIx9%2BUObeLEeyJWwt1jS5tAtoNz7G8v0Y1jp28WID08JmQBXw0pF%2FJqYM%2B3M5MIX3484GOqUBDeBKXC6LuWV%2F4I27eP8EU3eM0xcbZCiVJkI6XzDDu6uV7pd3J0lLhoIETQBG8vMwghdJzxOmYfwFvKZa0UV8Gghocqt6QZNXI9Pf4M8SL%2BIjotLP5s%2FVmOZGsss4y1hAScbtKcPwkBU10EX6rsk2DjTaYGyhK%2BhRRkAt%2FAd8GRQxttplMSd6G8qhKf5NSGEr6hnD8jzw5jS2n%2FiTPYbGtIpS4H0%2F&X-Amz-Signature=c004ba09e95ac6a80e577f6401d0cc90f0666d6f6ed6d5e398e9a81c743cffd5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

