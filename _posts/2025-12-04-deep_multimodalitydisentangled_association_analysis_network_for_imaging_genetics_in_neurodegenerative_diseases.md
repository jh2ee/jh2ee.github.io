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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665Y6V5EMW%2F20260114%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260114T111108Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFMaCXVzLXdlc3QtMiJGMEQCIDeCFsHmagOIoFk%2BcXC7cDB3oa8hi2BeJIxfUxu1QsyuAiBxWtVa8G3XRqQfX2kPEeZ1IX0yWmP5S0CPuweycsAWzyr%2FAwgbEAAaDDYzNzQyMzE4MzgwNSIMYYSbuicNNq%2FxRdT1KtwDFWJWtaRYO4CGzqyeUaABns2LpOPzK288U5aTke7m0IyUf%2F3UO3UtMGo%2FV2GNKhbVqAEMn7hhU0NSYgDgdkTHwXB3BbPzGL23xS9XVY894TcZj1zmkYSDN1DB5IWxb0mTgkEgc5JUM5juPdghsc8DiIqz77N8UjzUGGY2yeY7MsmCBNwn1UBb3cdZAbSE%2Br2%2B8p4EnJxx4Pk4OsV%2FzNZ%2FFd3%2BRDbstUgWr12lLFNb%2B5lfqFwVp%2FsUCcM%2FtUW2%2BGHFpr5AzUFX3%2FmwqecPieVHhzna7%2FOOla37SPqMDDjciFZqEJoeaH27SPKi6PZZUgCpX0S37huX5u7vIngta47Wpbgk1rjFNT7yUtitaV3qnk4k2Bp7GwYNVXcKaVjImAx0tkFnjFyWSBr%2BDmvytazNP%2F8ow%2Fy0yEtD54NilS%2FtaTnwHW0%2FZRXfiWmocAqZ5K8%2BwXQp7f6wdWDKunEZgy%2F8ZFKgfuvtKPI93sIuZthovF2i8KLsSsZE%2F96qbgEJ%2FAh8qc%2B7%2FQbWAgRiUGrV32HLPujonJfpLtDUtZvS7P2QZveWEV16nztGL9EWAopEO%2FreyvGVRI6PW0arGSEBUltE2vbggk3Yfq7805p7UkdVFxSauAwU6bz7y%2F72u3Aw39ydywY6pgGK3tR5BkJPq1AM7H%2BSLfJs19UL8bfT26tNoS9rfqTJw0ZzYi1Adoj6%2FtcQfxsoN3x5pOS0jTMKZxSdheuR%2B4yMaZcBBfAnMD5wiiNuCN6OagYQ%2FfpDkyMEYecuL0xmUiN%2Bc8hYIrZJR2NyXB6fxZJay0zP333ebSHsMIb54huAlBnUJQS3TT8uzeXIoGgif9r2RHF3Wsy%2FRufIAxMJ2JA9jzlcfvCR&X-Amz-Signature=5bb7a8ff21eaf0f164ca81c7dbdbea98d9e3e7de0a076e01107574d0fb0f82e4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665Y6V5EMW%2F20260114%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260114T111108Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFMaCXVzLXdlc3QtMiJGMEQCIDeCFsHmagOIoFk%2BcXC7cDB3oa8hi2BeJIxfUxu1QsyuAiBxWtVa8G3XRqQfX2kPEeZ1IX0yWmP5S0CPuweycsAWzyr%2FAwgbEAAaDDYzNzQyMzE4MzgwNSIMYYSbuicNNq%2FxRdT1KtwDFWJWtaRYO4CGzqyeUaABns2LpOPzK288U5aTke7m0IyUf%2F3UO3UtMGo%2FV2GNKhbVqAEMn7hhU0NSYgDgdkTHwXB3BbPzGL23xS9XVY894TcZj1zmkYSDN1DB5IWxb0mTgkEgc5JUM5juPdghsc8DiIqz77N8UjzUGGY2yeY7MsmCBNwn1UBb3cdZAbSE%2Br2%2B8p4EnJxx4Pk4OsV%2FzNZ%2FFd3%2BRDbstUgWr12lLFNb%2B5lfqFwVp%2FsUCcM%2FtUW2%2BGHFpr5AzUFX3%2FmwqecPieVHhzna7%2FOOla37SPqMDDjciFZqEJoeaH27SPKi6PZZUgCpX0S37huX5u7vIngta47Wpbgk1rjFNT7yUtitaV3qnk4k2Bp7GwYNVXcKaVjImAx0tkFnjFyWSBr%2BDmvytazNP%2F8ow%2Fy0yEtD54NilS%2FtaTnwHW0%2FZRXfiWmocAqZ5K8%2BwXQp7f6wdWDKunEZgy%2F8ZFKgfuvtKPI93sIuZthovF2i8KLsSsZE%2F96qbgEJ%2FAh8qc%2B7%2FQbWAgRiUGrV32HLPujonJfpLtDUtZvS7P2QZveWEV16nztGL9EWAopEO%2FreyvGVRI6PW0arGSEBUltE2vbggk3Yfq7805p7UkdVFxSauAwU6bz7y%2F72u3Aw39ydywY6pgGK3tR5BkJPq1AM7H%2BSLfJs19UL8bfT26tNoS9rfqTJw0ZzYi1Adoj6%2FtcQfxsoN3x5pOS0jTMKZxSdheuR%2B4yMaZcBBfAnMD5wiiNuCN6OagYQ%2FfpDkyMEYecuL0xmUiN%2Bc8hYIrZJR2NyXB6fxZJay0zP333ebSHsMIb54huAlBnUJQS3TT8uzeXIoGgif9r2RHF3Wsy%2FRufIAxMJ2JA9jzlcfvCR&X-Amz-Signature=5bb7a8ff21eaf0f164ca81c7dbdbea98d9e3e7de0a076e01107574d0fb0f82e4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Q3DHVXWM%2F20260114%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260114T111108Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFMaCXVzLXdlc3QtMiJGMEQCIBF4OeLQKQa3zfR%2F0NQ46FFmlulbGOthOC%2FVWZ2eUWiWAiB7T4qRBuuIEBnYxc7TmHPxDXu2TfJhFgGQ9bzPccZE2ir%2FAwgbEAAaDDYzNzQyMzE4MzgwNSIMywq53zqjvG%2BjdimHKtwDI9fOaHVaYmVFdbDXKOfW9rfwHdzGJEzWWRZxeqvO%2BM44f2DYNSpL3WhN6PviwIpW95lVpe%2BykW4i53vnrY5ODeNuhUbMLVPTP4SSU29dCsdGy5qtuyA9DYr1pzb3UuXPCJNc%2BppWDypbJk0Sx1KOVBRUbRWsLR77Hz6hw%2FSCnI%2BGO2SEh8cX1dUrw9XqeprC9pS6iBdUTO9sZxcCU%2FDb34pyf5Fb6jPdzbhslIevs3VkowfvfjvEN%2BFVk8JOFnZABwRKOqR2J458iO1VgCumDtPUQEKd3xHhfr1RrK2sxntyrDtyCzvZtHWqPOG2ddT8zOMtLHRk7f%2FwB%2BAxCgDgyJcyZJQVbncx3YPnElrUCkM9xibmMx0vEFUPfLh9slLruNsSZ1qlcgIy%2FP4x20Xm1HrWLTCX%2BTks9%2F9hFh1FJj2qWzo5Mqxg1A4YEkj8sYDnD671%2F7s3p3NePhblylSrrky8rtxGXbi8CyZuxapZSRzAUTRjEUOLULDnWIFzzHks6hKdOuhjg%2Bn3USWMrURAPmQMuVMNVYjeHzRhyMBEaxLFurnc3KHA2mZqagTzP5ffwGhqrJVUoJP9yPsZ0HHgHDUPLYbhguTdFYpnuGEPJC4zrMtBnNXPrBcg2G4wmNydywY6pgEY3Epfu5%2F8cAVNzULIOmPtvlxgxC2c4phEq2JBRqGadP0suy2ntEoJgNzcMpaUMG9vQMSFq3MD2m0l4qa82PkxZviQPF62AaBxp2xKmLtCrb8Hjpty2dPjjAw8Aejt9h5gOztWyvpn6WJ55T1yHcwA7%2B7u2mSo0rhCiRQGJ96L6pYG0tQh8eZnvzZfZ2NVJL5Gscn2CPSNiOquybXfe909%2BIm9pTmK&X-Amz-Signature=903cadbff3f1b39c40db09f1f53aaf3dd480471cdb11094f57e08239b852a465&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667I4GSQCC%2F20260114%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260114T111111Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFMaCXVzLXdlc3QtMiJHMEUCIQDdAv8qcI3NedaJlyNsKykTxs3gL59lTNIptvd4W9vweAIgP36dDF5fBJAK0dXsYINcEO%2BlJHhtFmNoIjWzxPsdcsIq%2FwMIGxAAGgw2Mzc0MjMxODM4MDUiDHMcugPP%2B%2F2h%2F56IXyrcA9JtIYP94nJIK61Hfs%2BdYsHqulQnz4eXD2g9cq1Fyh%2BCIo3wdOij5a5L0kGHKZ1HteGaT3Ah605pcVKZAUko5COOEgeiYowZNFKkoiT2%2F%2B5FvhgqK7iRiOrqSRQM%2BioCsQ5NZfHZFhYZNk3p0AukZB6BQCx74COQInkAO02HGLJxPBttEpftBi8xPR%2Fo1neWs2oI3Mj%2Fv3IwmWREjZ5JIz4tCOZOwNcIhIkFUlRTIoybCLAakHOkOWjYcO%2Fby2fqxBjcLWgTe1hfhY21Wt6VzY0QPeIIlC1uUBOlfLk57xn96dChOlZYt%2FojnCNq9AYBwXmtOqE0kHCgt%2Fy2hwQCn9wCTaUOZXA9lA3tmPI0PRRsT1Tvi%2FgoOJyCXTJ%2B5GRic9XrU5ZUTUcXHUVCJw8gFGt3Uc0AxOmkIxwhYZOoJnopg1FxTXSgQktfxbJJi6B4A3SwOPWyrx1pM8QVcRUTrmz4NzqTF9gjZriTgiH8kk7U%2BWJSgDq0CZftfGbE6HIHpPlNq2P8OjtLI%2Fr3uEk5F%2BINW1H3eT5JgMBZjuBtE554X3s6rkcjsJqRw5w1IdGs85StOTWkHTYCW8vi1BTKjAtCi%2F1HuGSmGvm0MAgZE2CX6fyhiBoyQnVbw8MbMLXcncsGOqUBD0iYvLjXgCQVu3CIBOATGOd1z%2Br7oaMwFVPkaqXMNjhiE2bxv0cs1el7TvMxlL7AwStuPLcHfFLGjLbWw%2FxTM7dWdwGoTlE25nyh41J7hhwcy%2BNtYAknGneX0tOIeHberXmKP%2F4bnF5zJIK9kjC%2FeLtETmjd9EYLbuNTw8AURn5ngrbtrGI4vCLHHk601p081YssRwzLnC9PUJJTkuYaj4CI1sVT&X-Amz-Signature=6230e0e0b4ce52b55439062320e64510f443f2fd375197c654a27ed06f278330&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667I4GSQCC%2F20260114%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260114T111111Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFMaCXVzLXdlc3QtMiJHMEUCIQDdAv8qcI3NedaJlyNsKykTxs3gL59lTNIptvd4W9vweAIgP36dDF5fBJAK0dXsYINcEO%2BlJHhtFmNoIjWzxPsdcsIq%2FwMIGxAAGgw2Mzc0MjMxODM4MDUiDHMcugPP%2B%2F2h%2F56IXyrcA9JtIYP94nJIK61Hfs%2BdYsHqulQnz4eXD2g9cq1Fyh%2BCIo3wdOij5a5L0kGHKZ1HteGaT3Ah605pcVKZAUko5COOEgeiYowZNFKkoiT2%2F%2B5FvhgqK7iRiOrqSRQM%2BioCsQ5NZfHZFhYZNk3p0AukZB6BQCx74COQInkAO02HGLJxPBttEpftBi8xPR%2Fo1neWs2oI3Mj%2Fv3IwmWREjZ5JIz4tCOZOwNcIhIkFUlRTIoybCLAakHOkOWjYcO%2Fby2fqxBjcLWgTe1hfhY21Wt6VzY0QPeIIlC1uUBOlfLk57xn96dChOlZYt%2FojnCNq9AYBwXmtOqE0kHCgt%2Fy2hwQCn9wCTaUOZXA9lA3tmPI0PRRsT1Tvi%2FgoOJyCXTJ%2B5GRic9XrU5ZUTUcXHUVCJw8gFGt3Uc0AxOmkIxwhYZOoJnopg1FxTXSgQktfxbJJi6B4A3SwOPWyrx1pM8QVcRUTrmz4NzqTF9gjZriTgiH8kk7U%2BWJSgDq0CZftfGbE6HIHpPlNq2P8OjtLI%2Fr3uEk5F%2BINW1H3eT5JgMBZjuBtE554X3s6rkcjsJqRw5w1IdGs85StOTWkHTYCW8vi1BTKjAtCi%2F1HuGSmGvm0MAgZE2CX6fyhiBoyQnVbw8MbMLXcncsGOqUBD0iYvLjXgCQVu3CIBOATGOd1z%2Br7oaMwFVPkaqXMNjhiE2bxv0cs1el7TvMxlL7AwStuPLcHfFLGjLbWw%2FxTM7dWdwGoTlE25nyh41J7hhwcy%2BNtYAknGneX0tOIeHberXmKP%2F4bnF5zJIK9kjC%2FeLtETmjd9EYLbuNTw8AURn5ngrbtrGI4vCLHHk601p081YssRwzLnC9PUJJTkuYaj4CI1sVT&X-Amz-Signature=f11d1d8cba6d1a63a8537ab8f0855239dc02a0436db715c175d6b94853a07a06&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662VRW4NXH%2F20260114%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260114T111111Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFMaCXVzLXdlc3QtMiJIMEYCIQCptay1SEyd01f1cycz3tyn2RCAaqEfmFFRidLCT5k0LAIhAJG46RIWtw4O5PXEz0DSGxoE5MDjBin06wofbVZm1dg9Kv8DCBsQABoMNjM3NDIzMTgzODA1IgzSR1tnG1ZeMYuBlEAq3APGNP6fz8gHWlVPvr%2FM5fWJzXgbZGrTnxKcJdyWTM5UJBxgWZqaXgvxDP7H8rHanOb8sp79Rqsol%2BGXlgETkVqBIlkqxgbVIOgmX6OFcXBd786lGW%2BRC5f6gjCHNIt%2BaDl3LiKyZeqdhY%2FJOZTwQxEn6E8YRhDqBSr3uLvWska9Y17Zxm8lzGo%2Fmyy%2FGbmX9I8xiIuR5QLdVc6dFq4deZYDUeTWvocxV9T0%2Bvzju%2BhILt%2FlQtCmIcjEXwHAKnOPdIJGSc1OAeIkRJke%2BilSb1gIL60XUUa605o7jPUx%2FdA6ehLOvFONDgFyRFJEONUef%2BXUydIarXXYI5LnPn3wyvmrQPoRzsEk%2Bp1GrqCqXr0E6DFPqweR96QTVsWatc3kunFlMNPAKtkzTqPa0%2FnET2wKKO3%2FbOMypyjTPElMrpVp8C118cHBiZha8PZOFB2uPwF2fTV31KWdU7CI5OXUV6dNlIVeK9bugD%2F9DeB58LineGlqMEvJaVX5qF0X2W2UvV%2Bi2LMnCoYHpmPXh7uR6f3DiOywNlgoiXUejYhN0%2BoDkxsZybgR%2FUUhvaKvon0DJCeX9d0dPMRozZlBgWBanGJB%2B%2BF1JNRFl2ePbLgk4MoCHhk33NTnqeKmigLYJzD%2F3J3LBjqkAUhOSAR9agmBVwK%2BydFTjqU%2BMGAXmfSGhbFYwJkb9rTNPJMTqjXQT5gUgbwX7RRIS0bOaI8cvE9AF7JGc8hmRz717AdnnHjya%2B9SWpI92o4K5qcKC7VH0Xj4%2BGsOtNJ30vqAp2cJCmZxS9fqbplp0HwleaybRM0ulLUH6kdN9m9nqDp4q%2Bs1F9nmGL%2B%2BTfSetO%2BrffQPw%2BhS4LogL0cEacnf%2FTON&X-Amz-Signature=bc964b0fec8772b583bdd468b444634fc325289004f196a77cbb9f6ed98a82ec&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667WE5AAK3%2F20260114%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260114T111111Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFMaCXVzLXdlc3QtMiJHMEUCIQC66KQ2598xC5GbD0qCsUi5Prwevp6rCcN860YfXRrKkgIgExvnL5RZw97Wyh4XvZT6oFXyPzIMjwd%2BhTqDit2c2Boq%2FwMIGxAAGgw2Mzc0MjMxODM4MDUiDGbCoU7vJGYHm%2BijrSrcA5ilvlqIKF7pWH%2B0iC5AlxST7nFxFNCDguRTRr8UmCZPxppaFm5utL9BbkJ%2BZCvW4OIcsQAQIQ3s1d2jV7rECBmisuQrq%2BnIHgnYqRZsAsY%2FpiPxnlRBwFPuFmJ4e66se%2FfRasxhZVMasEwusaN5GPmtsQnMvMr9yImjCKT%2F31JyWePUv0nhe4EH4mkSxujojGdrDUio37LMTwaR0Kv%2BaNPiazUA1F52YEZxcibpU3jlXYwWgkjBYxM79A%2FI2Ebgx6HaBAcI6VbkPQSivdIv0Bet8uhZcZFm%2BALCVZX8yENZcDvMKnEfS6TqCtbEFs%2BhLQ1uNdO%2FjUQjGT8Jdo0l2GDf14kgVDBSASLPmmZeZodEk5Wj0aSuQlrD6wEhgkVwP9cy8ijYheKKE1imE9Nrj42PR7%2FsYiYp5Y4GSWC1xa66t%2BAfZfMHknE8dzIoKlOrquRPPvmTdVK%2B7M52JePj5xaaH0YcqjwQXEyZoK8hLwxNjqBEQzDoJXnhITyVECcy2EePtJWPmOSUlSHiSpCUBiq3fyeoh24zYlfsmiUipdNCUaTlSk9i1%2FU3vrJo0uxqPKqUukCyJmimneHoQ9KR5SJk5ly9qpvYV7BMleFXVBucvaLN1zZM1VfpEO3yMKrcncsGOqUB2Fv%2BFdbwOarxKTtBIZrcADWhE5skm44OPxGineWODMZR1w0IqT57yxu18DCwseNdKi%2BjN56gZJsyKbY%2Fc4ohYNDg1%2FYvrhf390R7z7QCyIAJwOwCddq2jkQ6opY3xmWwOug8QhfxUDZ6mFeymr7XzDAMs3uGIGb4ZeUDl%2BcqWc07ykgam0rg%2Bnc%2F7c94yWZDPF36Q0N8Y8KPZmtLrJatRE%2BVocM4&X-Amz-Signature=72fd397b46c92886bd4937f47cb4a1066dc5c5659e7c778962e9baed2331372b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Y56L5JKB%2F20260114%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260114T111114Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFMaCXVzLXdlc3QtMiJIMEYCIQDKylvWiI%2Fc1Jj6I97YXUwj3AeaKtY7r9R0zHjm%2FvOvXAIhAPUlRZbtIiXaP3aS89U%2BSqq34EozIlxLiMDcdf7WIV1xKv8DCBsQABoMNjM3NDIzMTgzODA1IgyLY9rxhb7xI6qZrDYq3ANSHhhj3iTsNwMADs9OO2dZIHiLHWEOC6vduYi%2FLcGdr2%2BEGkJL6Dd%2BilgVatZT5iqNsP2Ce5Y1GosTxuvdpyv1KF7xhYeCMWc94SVKBESK1DXjNeFQXw3%2BKI4wQnk6j4b78B5DKjEcOqQe6QBiIkN48wDqTXDlZeqAANz5ehr0c8LAHSD6jrfF164rFCpUKyd1f1VB3BZ5BEvBLmgQVsmBOaje4Bunzyo3xUq%2BeDe%2B3LJSrxmKZcrE2pLTSF%2FHxBOKPQh7RouQ%2BQVc3cd2c8yPoPb2qgcUCnavmMctn2M%2B80vVxBsaUf5WHNjY9xL9%2FG9a2DrdaFRHFcsjxdY7xvH78kS6fE5X0nyvUr%2BGB79%2FjhXti3yd9HpJZNYngL83552c7u9tGW9qgvNybt1LVQv%2FrzhVlsEJ%2F3LNbieYwh2iBYTV4Hbbdujk1H3NR63X41LGlUPEJ9JvotRoz6F48UNfFwln6B%2FwPt1z%2FH%2FDfBbBraTASqKEA6XEqGlscLMgzgvIZqxf%2B4nB0AHKtEUq%2BfsvhRxfKiy%2BMhIvB0GhHi8Xswv%2BsOZVtpzxxI9PiI%2B9sXNy1VV72m3VoTzhfbLJzYHKpu6%2F%2FuvnSII37IhndLfzA2A3kefnAxXXDgMW%2BjDi3J3LBjqkAdwuBrLYXT2HMnw3LOMBIfIzHMtxG8lxvjX1e1UZMcIcCQoSX70akGrpjUa6D09FopLIUUfRqQVGp4wFFz4ItUby6ZiakMG2o8NDowvD%2BRnOqEs6ddm8UNb6%2F3lncI6CtKebBqAe1fGNu1%2FFLrXUqPoYwd%2Bpqf92E6Af6WBzi7duJ85S7Khc1QNEVhuPuKW5q3XY9S0S3ATqueHx9ED%2BmTmhlNux&X-Amz-Signature=9a94324910a434eda502cef4ee8e400bbbaed7384cf21bcb7772ca0947d6165f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YWHURH6H%2F20260114%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260114T111115Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFMaCXVzLXdlc3QtMiJHMEUCIF%2FEgDaW%2BYqmOTPHDnP3iBSYv8LnaIp1hNXQmdg3eeGUAiEAjU1CsKV5ZDt2dXAuRJSCLvh8KsWcRcIsMBY%2BNHCcbQIq%2FwMIGxAAGgw2Mzc0MjMxODM4MDUiDDUGNqFnQLL%2BHy3fpCrcA1mSUJ3IGh23fRlmz%2BX0FJGykqfzP%2FcbuMGXS8GtrbmD14L382X0RLAjPrsUlXTeWzOZ8W9DIWt7yaTCsCQLbjUN3KPDp%2Bp3p6wqcCqGoU0uwjubRTYuBHy3PtX4RrM%2B1t0javxbHnbsB%2Fvb%2FPd3mWw8ZG58f%2Bm9HXckAiAAT7iX27z9sxtuRlFWY2WKXdEDK%2FXX9VlaCr7RZxWWWQ%2BhgyV5Ygwj%2BN2cVrIZpLKLGayE6wMkx9OPqdCEAHQ56Qd1O3qoJUzTG81V3HzFjjkdg%2BtMMEfMFNSA6obNBGNzuxFtlsOE7TSzDhqHJNkR35h1OPN6GE1Nr9DD14OsbaK04VRTW%2BbNuTwYlKjLGrwdg1h%2FloywxMRRGImk1ZD1Y6OyJ6Jnm4sm9Aq9g5eeiUsXu%2BbxJJ8tDkhgBsIWn87uCOui%2FAaFnz6W448g2y2%2BJw3GqENE839tyJhhRUby4sRA7eb2mlJ81kQzyseQ58gWjpBP6zhv5oYyo7eWlIk%2BjGZy2VfV3SD5La0mCAeEIl5ecSjsvoHKJJir%2BP%2F2FXiyoirR%2FyNGIOZiEDT4XFNKctKgIkQ4Ylmlpa%2B2asd%2BB6VFKegULH1%2Bq20e4IEY5FYgN21VLK%2BlJJ868QBghfd0MMzcncsGOqUBzi8pm%2BWVnuHV8YmXPUPTpB2iq3cxnHplsvw8kRkmxje0lW1jALhUZu9D5xJFMoSQwskvzaEcymTeMWxQggP7Lq98G320mlHFJ6vcFCheZELcrjH25Y1qBb2sscMKQxqVZYeoKxZ851B%2BefNz6vnwzavpfIs1TPp3l%2BYF8LCl%2F0RL3YobuDLBOkH%2Fw99G%2F4f0AoHFfrDO7Gdrs0ipU1FqFeHoJVGc&X-Amz-Signature=44f9a14a369cc0c0ec39f047b3fa3771e2c23161c196e2d901106850d84402ee&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YWHURH6H%2F20260114%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260114T111115Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFMaCXVzLXdlc3QtMiJHMEUCIF%2FEgDaW%2BYqmOTPHDnP3iBSYv8LnaIp1hNXQmdg3eeGUAiEAjU1CsKV5ZDt2dXAuRJSCLvh8KsWcRcIsMBY%2BNHCcbQIq%2FwMIGxAAGgw2Mzc0MjMxODM4MDUiDDUGNqFnQLL%2BHy3fpCrcA1mSUJ3IGh23fRlmz%2BX0FJGykqfzP%2FcbuMGXS8GtrbmD14L382X0RLAjPrsUlXTeWzOZ8W9DIWt7yaTCsCQLbjUN3KPDp%2Bp3p6wqcCqGoU0uwjubRTYuBHy3PtX4RrM%2B1t0javxbHnbsB%2Fvb%2FPd3mWw8ZG58f%2Bm9HXckAiAAT7iX27z9sxtuRlFWY2WKXdEDK%2FXX9VlaCr7RZxWWWQ%2BhgyV5Ygwj%2BN2cVrIZpLKLGayE6wMkx9OPqdCEAHQ56Qd1O3qoJUzTG81V3HzFjjkdg%2BtMMEfMFNSA6obNBGNzuxFtlsOE7TSzDhqHJNkR35h1OPN6GE1Nr9DD14OsbaK04VRTW%2BbNuTwYlKjLGrwdg1h%2FloywxMRRGImk1ZD1Y6OyJ6Jnm4sm9Aq9g5eeiUsXu%2BbxJJ8tDkhgBsIWn87uCOui%2FAaFnz6W448g2y2%2BJw3GqENE839tyJhhRUby4sRA7eb2mlJ81kQzyseQ58gWjpBP6zhv5oYyo7eWlIk%2BjGZy2VfV3SD5La0mCAeEIl5ecSjsvoHKJJir%2BP%2F2FXiyoirR%2FyNGIOZiEDT4XFNKctKgIkQ4Ylmlpa%2B2asd%2BB6VFKegULH1%2Bq20e4IEY5FYgN21VLK%2BlJJ868QBghfd0MMzcncsGOqUBzi8pm%2BWVnuHV8YmXPUPTpB2iq3cxnHplsvw8kRkmxje0lW1jALhUZu9D5xJFMoSQwskvzaEcymTeMWxQggP7Lq98G320mlHFJ6vcFCheZELcrjH25Y1qBb2sscMKQxqVZYeoKxZ851B%2BefNz6vnwzavpfIs1TPp3l%2BYF8LCl%2F0RL3YobuDLBOkH%2Fw99G%2F4f0AoHFfrDO7Gdrs0ipU1FqFeHoJVGc&X-Amz-Signature=bb34613e841e62d67f013cf71aefd3861644b9b693ca12dba0b1d2c6e4087513&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466V574JTAQ%2F20260114%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260114T111107Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFMaCXVzLXdlc3QtMiJGMEQCIDHr%2Fxx%2Fr3%2Fvw2H4sEAMojcBq7cIRiz7OpWn8v%2Fly9plAiAdmVIeyRAcDAnqBYtg5nLhzuJ%2B2JUrRuoFMilm%2FO22hSr%2FAwgbEAAaDDYzNzQyMzE4MzgwNSIMFOYbZdYuq49a8UZPKtwDCxO1sVjdb9fSOVM8l1RyorK6NAgN626Ym4V%2FMcrnUKf7OBdDsElU88AReWPHMY4uRnqZxRhqb1P%2BpXaCfyL%2FSDttuIzDwfu5miho%2FQZ%2F12%2B4WZIsvNGWWKI9BK3t8abYB2CdtPVWeqjhA5jI8Hj9YJHLivCFkXuNo61OVOl6d%2BheuPJbQxKQxRI6S0UPY6RVTlAzHiTJSQUJ1o3Ml3vlzmmJx3mf%2B%2B6ClGQW42ReI7PZ9wVRWFtsI2P%2Fa%2BGfUehcRZGroc0eZQLWvafzBqcF3%2FnDRaboZjLvcTzDHb74N2xbRYC%2BThz4WMW5RL1Ag5V8%2B9nIE5F2Krpa%2FxEjN9%2B%2BgQfdSFE59bpgbca2t6PYUFruMyGc0x73RTMV%2F3EQA1hxovxlDGUIs46cwtev2maWa%2BaQL3XytQHkV7ef4kLXVdPfL8DQbWerolEod5DlRmAInABsJb4xHgXDEztof%2BKh4SkS3tDVj6EZYi6tXkEOoV%2F6%2BIM0n%2Fr2u9PR%2B9SJWFg%2Fb5OZAX3LB2utZ5VrJltoMfoVrFOLz7GoqWtYqXbtPPZ13zjyhDtQEnS59fKZhVVTKvE5Fa2PveIVvk5V9OLJQg4B7381DtSbB4XaQQbRm2cxQ3B6b4wjttFH7oow6tydywY6pgEfG7TaI%2BONIy4Ya54OYZ%2FrlP4h8G2jfl4uK4qiQBLJDbc0HXhorcun%2FcBlzHQwxJPrwArAgrMXLTaEI6HFPEzkCEyMAALnXrG0esD1wFdnCttsImU3NqGSe8H6GLXAa8xNPg2BKXuJOMjXp3KDAnzjd6kozExPGGH8FEvIBI7TlSHHneE5mO8FkVi4B%2FTS6FzeXJaIx5v305aK765OufPAfM0ctvB7&X-Amz-Signature=dd90beb3b89cc7be4612c8aaf06f3cbd8ebe603eec16c3e5c6fed32747e1b125&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663LT5HFKZ%2F20260114%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260114T111119Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFMaCXVzLXdlc3QtMiJGMEQCIFNJWKPivju8fp2KRo2m%2BkjacFUy5%2Fahw54hFOMVEWCtAiBz%2F25iIfxFniCy0xmAalefdyhpocxnzcWa9%2BC4bPP6CSr%2FAwgbEAAaDDYzNzQyMzE4MzgwNSIMzEL12MUDm4uimVh6KtwDHrSoMU3UkQsYUbKlB8%2BcEKI736F2lbvwOitMHfduAkKBKpRu8iIXPNuZwGUpo2Uqvn%2BZNIZRNcgKMGy06vY1CNH3T2PkH2P8jhH84VioSZzXeBq0W0I%2BGMwWAQaDRR%2BgJgjzveaPoWljGg5IBVZrudzcYPGOVzehnivZJa7BLRbsfDenW6cGY%2F9L24BGvBXDbz0Mao1V2rZuxrtKlw3%2FPsyK6yGBXWjGnEHFot7ea9adixlhFwTBATEXRgKDl1oVmks5rVrVLzWIqrjLe6x7iHZgIXDu6p4AHi4mbge7W%2BSQ0hYxFlYKMlnXqKxJvEB5pOS8zajrgDlFkSFkoOaZEGpmQlLju6FY0xjYcGVlIHS822PY8g2yOM%2FGEVI0ARfDBBDsNlwISsZpWingGthrUusIdunNRQ%2FzKLJOi7kYO9LNOTByRO9uGz2jVHROy2qTXQke7oVz83NWCr%2BbUgSPO0QXIryLBs1WIc7KrM78lTBXqPoUM%2FVaqR0xnxfgBL%2BKkqsynhdfT6s%2BhUF%2BPbcyZCZNdXLIfYHBVPgchE0Ib%2BRLZJHNkt2mVImWBjd6384bZ7XU3WkL8mAfikWZcijy74eW4nO2TC2E5YRks%2FiuO6zjjwKW%2BF4F3oLncpQw69ydywY6pgGWBaZY90pEM5r0kmNTCeFZtBn9VhjSaBxABljnFBvBOZkOr%2BO1CflKynuyPUpkvRsCMo0TDG3ga9HWE3PLk32CMjvBkFT8%2FTrUwq2d12wOHs%2FAW5hs1A2m3BZyKHHjcbS21nX48Tk%2Bfhzz%2FEu4sQ%2BmveuA%2B9xKjHNSpHHPH0QLhNJmidhQGDd%2FT%2F%2BO%2FLm1t9vt3UigDlI7XWCIB48l0ujT69UQUnc%2B&X-Amz-Signature=05b7484f76d88c2da3e90338e1a68f4548c9cec7464d9c5dbfd439c595b1e477&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663LT5HFKZ%2F20260114%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260114T111119Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFMaCXVzLXdlc3QtMiJGMEQCIFNJWKPivju8fp2KRo2m%2BkjacFUy5%2Fahw54hFOMVEWCtAiBz%2F25iIfxFniCy0xmAalefdyhpocxnzcWa9%2BC4bPP6CSr%2FAwgbEAAaDDYzNzQyMzE4MzgwNSIMzEL12MUDm4uimVh6KtwDHrSoMU3UkQsYUbKlB8%2BcEKI736F2lbvwOitMHfduAkKBKpRu8iIXPNuZwGUpo2Uqvn%2BZNIZRNcgKMGy06vY1CNH3T2PkH2P8jhH84VioSZzXeBq0W0I%2BGMwWAQaDRR%2BgJgjzveaPoWljGg5IBVZrudzcYPGOVzehnivZJa7BLRbsfDenW6cGY%2F9L24BGvBXDbz0Mao1V2rZuxrtKlw3%2FPsyK6yGBXWjGnEHFot7ea9adixlhFwTBATEXRgKDl1oVmks5rVrVLzWIqrjLe6x7iHZgIXDu6p4AHi4mbge7W%2BSQ0hYxFlYKMlnXqKxJvEB5pOS8zajrgDlFkSFkoOaZEGpmQlLju6FY0xjYcGVlIHS822PY8g2yOM%2FGEVI0ARfDBBDsNlwISsZpWingGthrUusIdunNRQ%2FzKLJOi7kYO9LNOTByRO9uGz2jVHROy2qTXQke7oVz83NWCr%2BbUgSPO0QXIryLBs1WIc7KrM78lTBXqPoUM%2FVaqR0xnxfgBL%2BKkqsynhdfT6s%2BhUF%2BPbcyZCZNdXLIfYHBVPgchE0Ib%2BRLZJHNkt2mVImWBjd6384bZ7XU3WkL8mAfikWZcijy74eW4nO2TC2E5YRks%2FiuO6zjjwKW%2BF4F3oLncpQw69ydywY6pgGWBaZY90pEM5r0kmNTCeFZtBn9VhjSaBxABljnFBvBOZkOr%2BO1CflKynuyPUpkvRsCMo0TDG3ga9HWE3PLk32CMjvBkFT8%2FTrUwq2d12wOHs%2FAW5hs1A2m3BZyKHHjcbS21nX48Tk%2Bfhzz%2FEu4sQ%2BmveuA%2B9xKjHNSpHHPH0QLhNJmidhQGDd%2FT%2F%2BO%2FLm1t9vt3UigDlI7XWCIB48l0ujT69UQUnc%2B&X-Amz-Signature=05b7484f76d88c2da3e90338e1a68f4548c9cec7464d9c5dbfd439c595b1e477&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UUJGEEKO%2F20260114%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260114T111120Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFMaCXVzLXdlc3QtMiJHMEUCIAYkJf5%2FZlNPkpyaOrRL2ttLDAlNOK6AUkA38Qz510VVAiEA3nzpDXliaXocv7yk2BQY6395JkmEEv6jphlCRQzasBgq%2FwMIGxAAGgw2Mzc0MjMxODM4MDUiDJ%2FUgQkUWBuOSmjQeircA2azGQ3U%2F85NEtkZGSIys0FCmUVZb1vofdawySDbOKDPkSEzBYmeR%2FXiqeUpsCvfomnXXzCx2H8Vuys%2BD2lklOF95dcbqwrcOkPcemlaOEHiWkLqrSq8VETqVahhGXhLIiA9YjQsFAT7gEjInHDpbSvVqqU4%2FNL6xp3JMqxFz4S9WL8zWRAE7tf0F5aorJeNKbmDqY1yE3quxB%2Faps5cs79UGF4mFr649jC%2B6Z1BQbn12lPnVV3LyUckxVuSgB0gmfbh4KugNIzprXNTQQTiB54OobouS9o4H6E5Qy2POZLgaAo2528IJ32YTh01N7kLy7gS3LcHi0gXjI4sAb9QfsTxxyqV4bdNVWZHKouqUJ6ilhucP0iALx6Pr%2FJx0maLlKC2OmxMn94IV2RpHB2YMV%2Bx%2BuE2P1LuxQ74eSE1sZ%2FgLdwcCS1hQmq2SdC33qTNYsHR3GqJGOnTu7UEdQIZyPdCBL4QFlsSSnYhCyJZrXRvF9pClVgxY7SgOxUg6fT6xLMCeXIdQA5EO3KF7M7%2B8cYpMsbfME5C3w6m3tgnihzBRa929WNL%2FaHYr%2BgGV7re6ceJxRTgoxGUZz6ZwUS4zGYP2Xc2zkB%2FCNiL%2BbPEEKuNTS7r7lcWGUGvLUY7ML7cncsGOqUBS6Mc9E3dvAMEHGHMiYpHz8lhVbElMG6QNic7lN50S7ccawJ9rYMJayPcvc6eEZuCWSQwgZj%2FtMjIbAiP3%2Bm3JpugtWO4oct3U7Lx7%2BaXsc%2BOSlI88wDhbmi5BP5RLm%2BnSlPbtPynNUKYCnxUV4qDUoIgk3SkjtvC4Z5CWbiZh1Oioi1mBmJ%2B6uU39aNsWK%2F07aXA1daY%2FVQdAdlfBoOiHYRZVa5A&X-Amz-Signature=264bd8cacc4a355fba9c7193e41857a496ad7286b9429552832f6df4715ba3fa&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

