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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VIOB7TSH%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T184115Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGIaCXVzLXdlc3QtMiJGMEQCIHeO1qW47GrP0GP2cpGgqrWQu6%2Bu7p6OXXPx8gZkzyMMAiBLQYNyfFAyoxazJ1DsAIbr3q68U2%2BOgAn%2BrZB44SBjvyr%2FAwgrEAAaDDYzNzQyMzE4MzgwNSIM1%2BuysyQPxSL7EkTQKtwDjs0X3MW6F78mwo16FDF1QQSs%2Fnxbnf2qP5N%2BsFWtO%2BxDeFRnfzUZzBNVDZuGl%2FAuYZJ3dBxfyEjDzYVKLu95rgnStvHhdDaYJ5emqJkdbqMsvY0JaGYl8T0qovAbdrOZ0yM8uEBExWOs9E0e5pc70Pj733YC8smXTzL4otawoDKJvOvymb5VYyIg4nftsrs%2FayBXjJkfR8T5YSqhqUGZpS2pFbWn4BhQpoQaSgF0zeHuu2uOh%2FjikGdjS1AjBGabQHY4yER2CAXVE129vGCs6LLgPBiujAE6banchV7eVb9ofVc%2FIbTylDe50Vs4GPGYi3Idk54OrIrobWJdHN6gSUGMR%2BzSqIPPbD753eFBkcOLknXMgzSWXzg5ug7DyYFlwp7RPpDz05Iy6SXsljLyPN3jcaYu6nn0sTSTLe3iqNBBNP8UiwbW9g22EQDyVdsPmPcEs5dT0T7K9jiKA%2FgjFb%2BtljTjCpSLzsDUnkFNqhbzYD44X5eq11EO%2FZgp9getEGszk9c5lqW59R5UpBbjKZhneNB0Mtl735DwVLO%2FDngc6THKP4ijpv6qeDjSHJlddmzKV08EfvUWAsOu8t1dVSc5qS2MVo0xazRVjFQe1gf1xniWLjXp1prj5cAw9uqqzgY6pgEwjcXbp0DpNjjdSHZ%2B6Kymvos3I6QrozBXkujq%2BCwszIXT3KVIjFBieHPBZ8wRopEBC1%2FbEr3DBQDQ41avhnfI1Ly%2F1FOh9HVJ3w%2BbjGJRUt%2F9q%2FljV4l%2B9lO%2BOIzE5rDNCTIdqTwAlRE8ro0kCnzkxMniaN02CvsjlufLkkSiyWMjKO0PEqeC6iX6VfpySqxVWYf6S8p0PQR61RIt0Djf2SrW42zL&X-Amz-Signature=22faf5b083a8455c95c890b56a9477bcae6a1169b6ead930fcaf640f7d816203&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VIOB7TSH%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T184115Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGIaCXVzLXdlc3QtMiJGMEQCIHeO1qW47GrP0GP2cpGgqrWQu6%2Bu7p6OXXPx8gZkzyMMAiBLQYNyfFAyoxazJ1DsAIbr3q68U2%2BOgAn%2BrZB44SBjvyr%2FAwgrEAAaDDYzNzQyMzE4MzgwNSIM1%2BuysyQPxSL7EkTQKtwDjs0X3MW6F78mwo16FDF1QQSs%2Fnxbnf2qP5N%2BsFWtO%2BxDeFRnfzUZzBNVDZuGl%2FAuYZJ3dBxfyEjDzYVKLu95rgnStvHhdDaYJ5emqJkdbqMsvY0JaGYl8T0qovAbdrOZ0yM8uEBExWOs9E0e5pc70Pj733YC8smXTzL4otawoDKJvOvymb5VYyIg4nftsrs%2FayBXjJkfR8T5YSqhqUGZpS2pFbWn4BhQpoQaSgF0zeHuu2uOh%2FjikGdjS1AjBGabQHY4yER2CAXVE129vGCs6LLgPBiujAE6banchV7eVb9ofVc%2FIbTylDe50Vs4GPGYi3Idk54OrIrobWJdHN6gSUGMR%2BzSqIPPbD753eFBkcOLknXMgzSWXzg5ug7DyYFlwp7RPpDz05Iy6SXsljLyPN3jcaYu6nn0sTSTLe3iqNBBNP8UiwbW9g22EQDyVdsPmPcEs5dT0T7K9jiKA%2FgjFb%2BtljTjCpSLzsDUnkFNqhbzYD44X5eq11EO%2FZgp9getEGszk9c5lqW59R5UpBbjKZhneNB0Mtl735DwVLO%2FDngc6THKP4ijpv6qeDjSHJlddmzKV08EfvUWAsOu8t1dVSc5qS2MVo0xazRVjFQe1gf1xniWLjXp1prj5cAw9uqqzgY6pgEwjcXbp0DpNjjdSHZ%2B6Kymvos3I6QrozBXkujq%2BCwszIXT3KVIjFBieHPBZ8wRopEBC1%2FbEr3DBQDQ41avhnfI1Ly%2F1FOh9HVJ3w%2BbjGJRUt%2F9q%2FljV4l%2B9lO%2BOIzE5rDNCTIdqTwAlRE8ro0kCnzkxMniaN02CvsjlufLkkSiyWMjKO0PEqeC6iX6VfpySqxVWYf6S8p0PQR61RIt0Djf2SrW42zL&X-Amz-Signature=22faf5b083a8455c95c890b56a9477bcae6a1169b6ead930fcaf640f7d816203&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667RNGH6MZ%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T184115Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGIaCXVzLXdlc3QtMiJIMEYCIQCj%2F0uP17H60PplyURN5zoduUxSSf0x8u%2BcfaEF9B%2BmYwIhAImfIcDCrMXR49Add0Vbks1FlqlO2WZCI8lm4LmU8vwdKv8DCCsQABoMNjM3NDIzMTgzODA1IgzjdbohxXMWVFGLS7sq3ANkZkR4CRM7uHwUiggD1ISCuWeb901v9k9JsFo4UlXX7YmX8VQm9QBDgpQvEbWJ9Dj3i6rTHbjrpyLSHFNjDqNhC74EP4SW%2F05YlIh0OpMBN2m7%2Fy84qUihBmWuu6m%2BxWzlPpVO76Uy6BnoLdRq9OClr7KKb7nxCu%2BFF3YX4Z6N8VxRyU%2Fx2F4Y%2FDiG%2BPoq4ZXshQ%2FOvdnHb4AVh4rJAdIG5qK8o%2FZPQwZs2bDViEXVCvcU%2FuDjwWrX%2BrTtbL7vxJrRb5ZO5gBMCsSiOH4Ni26lhIh29kXyws4gCjcipOqiuFFXKoaszBmgdSbP1gzW7pu%2B4Hkq%2Fhna6K%2BGbPs05xR3soeMFjJh1Lz19zRSJEi9SDAl6oaz66t58do0F9jJiWI5bGXcSnfIOrk87SAe3%2B9jlK5KfoJ0ufw7oWwfLFCS0UpB6vD%2FHJFq30Gs9kHxXhNyZb3THKQN7yKJybDmedSbdIecsKc0h%2BOuiqxqCdB87CQasiCpxuC7%2BjzyPI2BgD4InGoBNmYpi553kABCKQC6s0KUolwvEBqCek2uyeSv%2BlyUbNEHEe79llkfOnOPEGo1xrKCZIojH%2Bs9HD1gFt13dgCBuoO6so8Wf6%2BtHEtxK1SK9uNB3%2Fd7BdpnYDDu6qrOBjqkAdROZk4XBT86i21ExXkV55zoo8mknm1GVavyOEWgLHyEI4eMRVnZKPwhmotxCkTXLt9e3zgELAZNzuwNFs3eWC6KZic0OQ%2FqUQOf%2FP7RAmb3rFgSbVimIOW4Na2UTP%2Bz0iiXdfYOd3VqGHoC%2B%2FsqweLKj8iPB41xscMh%2BmikgpqaOy9mR0S5SC3MKLsiPArH%2Fgz%2B3pvBa0g7Uv4Pen0PNTrxwy%2BF&X-Amz-Signature=32166c3563202053eeb293b8d23ee57b38a3ac86da0a219efbe3ea21f1358bb9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QCOK5DOR%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T184119Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGIaCXVzLXdlc3QtMiJHMEUCIQCe8QIw%2BaSmM6rlaQhF1IZ%2FhE3evm2mxd0gViEf8JRsOQIgZ4a24eWmZhcysvMZspjF5FqUpTmztWrMt5C4tEho1Cgq%2FwMIKxAAGgw2Mzc0MjMxODM4MDUiDAh0xILSQ4V2g%2BlMRSrcA3rnL3MLVYU%2Fg1E7ROhPekwSa9%2FbRwBK5QjIqmD05cvTASxjPeR9CXmI8gsBWx4MQW66VimQcKLjFqi97gVtcrTgpDu7s7T%2BpRoVB%2BKvmzbG45LPkKn8nAle08dJtLaPLGIrfl%2BX5PbsUzsVmRctN7DFiADIcVli0YJPmhMmStBPtn%2BaKHI33vzNQ0v1KfIzyXtNtRfdD4stj8Wwd7EfymEPMWCqh0QOyixbVxnbmgt0azXUeW2lJ2rQYuyJ9urBqBCXbxQQs5pO8cOSnTy%2FdrEhDV2OE6SCQPERJ52xh21PCIDcpjJ%2BcGs%2B1CPSLaZs2P9ireKXfLr90451yI9uN%2Bh5F7HEXr6s8RAlquB84uQBYipsCn2NYqEwTeGOFPF944BX%2BXNSOrCaaZ9wqE5Vlec9%2FlujsZATRLntpw3ULHhvLHisLmV6SRsdWwdgQY2hi6LP%2BGzw9nevsS9MCy%2FdxD8bv8QGj90yHtJxtxLBWqr2erJNbabQU1YE4%2Bk3oguDxp6kNZBRWDGsFDgbfux%2BRov2UvQoIaGH995Fl5A1dgNEX%2B2W9Soyce7df0O%2F6%2BbVwvAMNmXzmC63X0RRehT%2F02sJ9UBMHyGoAElqPoAMU7b8U0ISempxqAzP2XAIMM7sqs4GOqUBa7bxaMKCpazKAZmGsU0kLxT3M9nThFA8o13wmaR8Cn24J1PVSc1%2FGhPVpK1CSLmGfYjiDW80goECjwA0X6zoCHH5cdr681W9NZbrLsVHJkyMNRYezvtPnRWSdoReCJb1kAYslgjeV2ZCcrKHzibxqaLtwkOFZNJEd%2Ftvs8GobUvtWuKGIWlv3VqH8aFu1nlSRrEiu94gEQLRBRmKSr%2FKXw%2FgD9zN&X-Amz-Signature=2c90d1ce5bbfda6654ca437cf80add2065bf5f34dee39a41b71189722b72dbc3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QCOK5DOR%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T184119Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGIaCXVzLXdlc3QtMiJHMEUCIQCe8QIw%2BaSmM6rlaQhF1IZ%2FhE3evm2mxd0gViEf8JRsOQIgZ4a24eWmZhcysvMZspjF5FqUpTmztWrMt5C4tEho1Cgq%2FwMIKxAAGgw2Mzc0MjMxODM4MDUiDAh0xILSQ4V2g%2BlMRSrcA3rnL3MLVYU%2Fg1E7ROhPekwSa9%2FbRwBK5QjIqmD05cvTASxjPeR9CXmI8gsBWx4MQW66VimQcKLjFqi97gVtcrTgpDu7s7T%2BpRoVB%2BKvmzbG45LPkKn8nAle08dJtLaPLGIrfl%2BX5PbsUzsVmRctN7DFiADIcVli0YJPmhMmStBPtn%2BaKHI33vzNQ0v1KfIzyXtNtRfdD4stj8Wwd7EfymEPMWCqh0QOyixbVxnbmgt0azXUeW2lJ2rQYuyJ9urBqBCXbxQQs5pO8cOSnTy%2FdrEhDV2OE6SCQPERJ52xh21PCIDcpjJ%2BcGs%2B1CPSLaZs2P9ireKXfLr90451yI9uN%2Bh5F7HEXr6s8RAlquB84uQBYipsCn2NYqEwTeGOFPF944BX%2BXNSOrCaaZ9wqE5Vlec9%2FlujsZATRLntpw3ULHhvLHisLmV6SRsdWwdgQY2hi6LP%2BGzw9nevsS9MCy%2FdxD8bv8QGj90yHtJxtxLBWqr2erJNbabQU1YE4%2Bk3oguDxp6kNZBRWDGsFDgbfux%2BRov2UvQoIaGH995Fl5A1dgNEX%2B2W9Soyce7df0O%2F6%2BbVwvAMNmXzmC63X0RRehT%2F02sJ9UBMHyGoAElqPoAMU7b8U0ISempxqAzP2XAIMM7sqs4GOqUBa7bxaMKCpazKAZmGsU0kLxT3M9nThFA8o13wmaR8Cn24J1PVSc1%2FGhPVpK1CSLmGfYjiDW80goECjwA0X6zoCHH5cdr681W9NZbrLsVHJkyMNRYezvtPnRWSdoReCJb1kAYslgjeV2ZCcrKHzibxqaLtwkOFZNJEd%2Ftvs8GobUvtWuKGIWlv3VqH8aFu1nlSRrEiu94gEQLRBRmKSr%2FKXw%2FgD9zN&X-Amz-Signature=55495583b64e31fe372b08ef2ca8f38c78df7d04a9ea49ff061204e843733410&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VQCVUZDP%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T184120Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGIaCXVzLXdlc3QtMiJIMEYCIQC0hs2zHVKXh%2FX4yyQ8K7%2BO2tFsX9KxdXWmtq%2BzMNIYJAIhAMi8K38esxmwW7ePSEzcQttMVULwxj8%2BMtt5NHZApFZyKv8DCCsQABoMNjM3NDIzMTgzODA1Igxo7LmVCwlstNc%2BRZsq3AM%2FWRG1vVDobxOIocm0qEWwZbiWj6k5bOCXjVAOehTypcxOVEkTmGUX6GqcVrKqLoHUi%2F3E93qNX%2Fu39mwCgDmm9cahel3lraxT8ARdYyO8QXW1eG%2Bl5ZbeHtg0pPbfOOgDxBroKl6g7dhCtJZLL%2Fv26c94YBSp277MF7T5id50HjsgckRDP77yXPfLHH9WnYrr%2FQJCLxHRgvZlcrd6C6yn0hZCokFkMufPR3zZUVhGzsgAw78L5Ycc9rKk1kpUDJea%2B6vR5iGElG%2FeUDJU9Hm0hpBUaimV5f%2FTYY9ox7Q3WpCyPdCsSUSTATxHvXjmLdn0RaK8%2B1f2hbORf7DfKMBkGwpLE0rr6Cl5Yn9L8lvWbAj7Fn8kbcEYZ9M3j5ehaCkKQDkChUWEgyOieTNYEgOzHuCYPZldk%2BqVGkbTGBLcoKRowazOOB7p43IMYMwmckfnmn6A%2FBVw%2B6xdaBRInERNttBJ9dpAk7G3YsHD2RIlHFfOZFjM6oHbSpwcZtbKxx4tOMeRWF5cKQBclkIz4bGEJxBJMGU7o9gMXcYjYl0JMNcqJ7UM%2BP7ZVAmC1Dggt7sIbM19A064JbD36ptdMUln52C2doBU2c2kAY6GWpDWjand8%2BNHnkwlpA4nTTDK6qrOBjqkAcTEuxj%2BHlDFogMSSwBJXymu9xtLBMrNPYRJvfuUEqCkUEjeqJ0KZWi09tAMwdHp5Oqx0ZwwnCz0J37ETdTJJRJddAfUDFo0mW7sRt2ItJ0x0y%2B8orMz%2FpYpDtXciGNpHzj1bBbHgB%2FauZwXFoRC2p3aNKEp%2BcEOSWa7t%2BGzXV80%2BFwhO5aEGr3fAN8yd4ZPBpnKf8%2BbnUv8zcbYDFtF7b4p84tF&X-Amz-Signature=a29b4908ff7cdc6c81087e03f301f55e21a6ffde2d8754411e294bde106fb1f8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665RR5ER75%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T184120Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGIaCXVzLXdlc3QtMiJGMEQCICzhgX%2BGkKfZFNh1FCazoSsLwZK%2BLe23jcCcuGCe32ilAiAk85fWtIt5X%2BxpHQXDoT9FsV5WX5uwZ8u2frflRxrRPir%2FAwgrEAAaDDYzNzQyMzE4MzgwNSIMOToEgFZAFgJHT3dBKtwDFm7qOkMaaM3GauEWaQhboKbfrIGDQNT9QD0lyhvHAIQQesNncOM%2Fhm5sTfTXuRkak3NdvzoRicwJ61P9BUr7fzEnq%2FgsHw1CzbCInDXbTLjvONFver3OyI9M4XipAdkVyNUa%2FfrGp0KjGDIh8XFOOV%2F7wXO0Px2dU%2FQHigcZD5g%2FK4t0Xd3Fvm%2FhjJfqfhQUab%2BwCEnIub41Tap76QJi5qRBNnDYHb4K3un9aJisC9UfiE0uN%2BH4GZkj78%2B1KVqD4sMs8ENO4l63szzOTclyPlnqp%2Fxm3fR5zVCiCTspIMyg8puwWt6aDfZO%2BqzpvqxfUdFafOsE6ZVRjLsEnhS%2Feqw94PrgEvecyLcjx73N76WxQ6qdCy1ndeFEY5EYr5T8X5%2BK%2Fey0GnCT4uH82ghnLUiAny6sBxKI1uF5wjncs9EOfuFc39kT4WxwQsZoRCjXQv%2FQA67WzBwqSQLZd%2FoeQE9rTCcLqVXO0dpLQYcOe6lolvasoIs%2BQtAhyiNuIUP7i58OuxtKH9ZMTNVcrYaj4TUXcjSIb0kgwTEWgXRvxM0GowOsPa6oumBsRPGRr8y2PcWeSrGm%2FlEoC8J9Z%2FcORzxYlZ6thc2wN3rZ0G%2BuA0WmPRM4VgobcjhW46owq%2BuqzgY6pgGgtxKknsWy4HrtfFk%2FANkmXYtjOwmfLuEZoUW5SKvKmf433WqlXvis%2BjS2y6%2FryWH5xIPykZPQTWIT9o582hitgxNKgD6bvIOcqwLRhcbLVvA1f4r9kcUUVSjAncCrXsoloa%2Bcm1MykSnNeE2ffgmg%2FI2w0JUJ0GCc2ETBiCbvFIhcYm8bbTehM3%2FQhPqNRgCFZs3uhgw0N83rVVJgnrhDS5LIrzuy&X-Amz-Signature=9cf37680e1e72282413a948bef6cdb6838572c23bad289d87ec1bc21dffc8ac1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662ZAOYIDT%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T184124Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGIaCXVzLXdlc3QtMiJHMEUCIHUphzSdsmngAm69D0eeM51fuE2g90x8PoBDA0bN1oyKAiEA17ew7WvoccPt%2Bqt8HMVR6XB6xsFzQwJlhTgokaX%2BOnQq%2FwMIKxAAGgw2Mzc0MjMxODM4MDUiDOM1LoZyl1jfoDpkSircA4Amhz2gC1PN3tjxcNYb87XxlRpE17raT%2B7XqTFMPHNoqbIBSL%2Fj2Gtw7Oz4FfJnn%2FA8eiC91I1hrDgVmCKa5lBn5RB6uKpXM0Y1tCO6oC5sHsBZelsVzo2h7D308j%2FDtPkNqIWyf6EOFPZOdDKGuwU91fxduIggFeM3DoNCs3tqNPGgFGZJJbksgfspW69hXNpw7oxehVy6EuuABZJTOgSVafbBxeHSIqlKdm8gfXWHw22vKyyCDgS70fNPeYkLctvXsRCkM0l%2FMszN%2Bw2GDfwXkYkGNQlKOa%2FYe%2BIP6ZOTZOlNWeli7yTJs9%2BR%2FWrsE13aNQ5PNUAblyHZBdma7Cccp2BvBh1bQoImJ0AjvLRthqSoi3fhZuAcrjFoe232TCdJCNa8xXnxMqWikLqrPWLyoqTp%2FGapCJxKK9U8Jtyplk2b%2FgFPhovTkxNGBcNNiNkjuZ9hw3dwCwnXHmONaSetRvtVf%2B4q9qKXBoXNtOcB7ukyj2Fr%2BRKAj4esY%2B0bBlliQjHugQXXGjnPcfXRph%2BsgpxpoxLD4uwtd0ZvbOFrjVh58F5ik2iUrOjPgSQoKaEIul0cBNwVdWvWQUvwBfWSqOTEVfoO0PdVzTKCVG5SV6tk71%2FMXaltbxKyMOfqqs4GOqUBJAE6ZczEprFDhByiKhWaRSmW5bJfoUqCfdURitsbENKEnOHJWwCahH4fnmcIValf8ZtapkfnLbRuzJEs1FmguQXwJxF8WATARXyNiG2NcKtl8Sv6%2FayOS6Ca%2FWhTs6%2BZNUES9LsiAd5swF%2B1W2IR4zZ75z2lYfpVP9%2BnQmre%2BtWZRnl94lL4SOG6LOlXpMHgHoWHCoxag7PDOi0lAmQLf5p0W3Rv&X-Amz-Signature=44453f0c3fff84f1b909d2c740160ec3aeac6602f37d863574b43a30cf7d51ed&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZIABX3MV%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T184126Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGIaCXVzLXdlc3QtMiJIMEYCIQCdd%2FzAF4Wr5FPLSnDkOSzCSF7Yc5%2B3H8o0nJvSthC2%2FAIhAO6iKY6sIy%2F2dhLDRLu3970d5m%2FGu4dvu421a2PyndOtKv8DCCsQABoMNjM3NDIzMTgzODA1IgwCi%2BHPk5jUXZyq200q3AM%2BTQmckzAWHCRs%2FxusezauSKNrEulVuEXgF3ZqAo0GbUGStUrhGVcsAwwpdb5X2ACoNe6OGxvKC2KQimFKH%2BESwole8L12%2BAmFZinl6SCDwuB1XSx8M2R8XJUtpCoBs2qpkKnHChwsW9Bw9aYGuvrEbsAWGFnu1gY1f7jPG2NbIm%2F%2FvXj239J9qtZESv79jdiyc4ma8SS3QMT2zxwsg8zah%2Fw%2Fnjj2r3AtS%2BUkMFrOb30L5i1UYawmbqzlorbHxw8ILDLWxwe%2FqTgVHgeD2sLAbousvdlKvVt2Psl8TFKwk8hOuzhWrT%2Ft8wCWhB554dk2744jgWynvKExn0QfO2jHwLMV%2FTnVc4hnOCzl9UF207oczw0UVwO3nN6BgDZN%2F%2BlV5d6oVH74coUQWXDcCZd4GQ7zM9o1sosqLfbnN14YuhGwDzVU%2FCPSxWjNt%2BVf3xBh01y13%2FYZSm53VP4116EaZMCI6KioT2KsH7Jvs0ZmN8RtEPt6I77dEePJnr5%2BQ05e6VXF4YuKJz7N57IMIfns3kJnkYcKBSXHLe7aN3fqFwA%2Fb06KhHTJT8BN1vh2hx8TUuyOFTMvn2AJQVGtmcHx1LCwK67SA4jDnt1NvuAUrBUXk0%2FrnIxWjn5B7zD766rOBjqkAQuMhUyrRI8FjiLR%2FcdlXK2T44UVDaed%2BCTlcznGfpEbzzRC8eaLwk9uxZE45%2FZQyIlrzVb7Qut5vyiHnmd90CTzusVLuMzLDiV01gGPhpccyCjITE1%2FU2ui5P33RPSg6ccmw6aiBgAvQ0NW9PuJvYbnvnR9xiqXj5j27B4bpNud9C4LfMyip6lYs1xwm2UiLGpTSyPDnsNiuT0nURBhTiXQ8RDB&X-Amz-Signature=340ea64c1ca73baadd368c9ee0acaad052aa2f10838f7123b3ba15220eaf9b43&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZIABX3MV%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T184126Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGIaCXVzLXdlc3QtMiJIMEYCIQCdd%2FzAF4Wr5FPLSnDkOSzCSF7Yc5%2B3H8o0nJvSthC2%2FAIhAO6iKY6sIy%2F2dhLDRLu3970d5m%2FGu4dvu421a2PyndOtKv8DCCsQABoMNjM3NDIzMTgzODA1IgwCi%2BHPk5jUXZyq200q3AM%2BTQmckzAWHCRs%2FxusezauSKNrEulVuEXgF3ZqAo0GbUGStUrhGVcsAwwpdb5X2ACoNe6OGxvKC2KQimFKH%2BESwole8L12%2BAmFZinl6SCDwuB1XSx8M2R8XJUtpCoBs2qpkKnHChwsW9Bw9aYGuvrEbsAWGFnu1gY1f7jPG2NbIm%2F%2FvXj239J9qtZESv79jdiyc4ma8SS3QMT2zxwsg8zah%2Fw%2Fnjj2r3AtS%2BUkMFrOb30L5i1UYawmbqzlorbHxw8ILDLWxwe%2FqTgVHgeD2sLAbousvdlKvVt2Psl8TFKwk8hOuzhWrT%2Ft8wCWhB554dk2744jgWynvKExn0QfO2jHwLMV%2FTnVc4hnOCzl9UF207oczw0UVwO3nN6BgDZN%2F%2BlV5d6oVH74coUQWXDcCZd4GQ7zM9o1sosqLfbnN14YuhGwDzVU%2FCPSxWjNt%2BVf3xBh01y13%2FYZSm53VP4116EaZMCI6KioT2KsH7Jvs0ZmN8RtEPt6I77dEePJnr5%2BQ05e6VXF4YuKJz7N57IMIfns3kJnkYcKBSXHLe7aN3fqFwA%2Fb06KhHTJT8BN1vh2hx8TUuyOFTMvn2AJQVGtmcHx1LCwK67SA4jDnt1NvuAUrBUXk0%2FrnIxWjn5B7zD766rOBjqkAQuMhUyrRI8FjiLR%2FcdlXK2T44UVDaed%2BCTlcznGfpEbzzRC8eaLwk9uxZE45%2FZQyIlrzVb7Qut5vyiHnmd90CTzusVLuMzLDiV01gGPhpccyCjITE1%2FU2ui5P33RPSg6ccmw6aiBgAvQ0NW9PuJvYbnvnR9xiqXj5j27B4bpNud9C4LfMyip6lYs1xwm2UiLGpTSyPDnsNiuT0nURBhTiXQ8RDB&X-Amz-Signature=02b6666f29a1c4b1c418f09a52b2e404bb5e12abc57cb0548d05105ab3fd82c9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WZVVBGKY%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T184113Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGIaCXVzLXdlc3QtMiJGMEQCIBoaQJOQL%2B6eLIfm5Hq%2Fual4pr8wQAuE2whXLndCdaIKAiBNNtdv0d5HvbI8%2BdQdfToJ%2FLeRJKa0a1tor9bBIJel8Sr%2FAwgrEAAaDDYzNzQyMzE4MzgwNSIMry3NaPeviqHG6szzKtwDBTs2DFpmkal8SiyDcnCcxLFAMJHRwHGbIpn%2BafXCqrRc8UpBpemUwLGc3NeL1plnv%2FquCjuuer3K%2Fj9%2F9KiGhwdNNrZMsO9ML7GWwQF%2FTRnk7TeD2VUb6XwCMKnFAjMUtN0PVE46hefSykxJ62R01SFGjtQEEk9i30PFvqEZvjaAu4Pkj4mSJejv2pIe%2BP%2F0p53PwMTF%2FkWIB8RGCs34OLxcri5tIK0jZrXt7gA%2FEoHy61AoJCj%2BspQ8T1KPqKCCfD9eP3ZmyLIcWMK4Ovu5NxpXdCXxFML9DImzfJ0YEkcvw%2BluL4qQLzPMB8VncjFMrHOlrFzN3z3UNfejDRuDNVCmaTsyrcZoVbnLCAqtpdU6HxOGQf%2FI4Yl7QzLwNOY9Xh2kasDr8j4WYrbhdV8roRaXaO8x4qCtA1GywkfOMfot2c1ycOpMYvKNOOtjMOIZwYf8C%2FMcnvjrg%2FNCoOVzPh6J9CYRf42Sw86IPYHR%2FoE%2BYASrU9sO9z8nM3QEBPq7tsxD8cxT%2FuBSjdtWLlkX%2Bj4J7oT%2F8m6DYPz1kwrS3bLoYo8GBXmVKaks9rfxHhzSY7Rf0HvJO9jA3u9%2BhGxbt6tYPlPbkLtS67AX6%2B7ogPEEbL1ZLLIKHrMxd8MwmeyqzgY6pgGX6yhmYy7hMGMfBEBQVRqlWm%2BCTyxfEutgvFZLmtqteaC3ACKpcoh1C8o7wI6NgTREmEb1wdQ1483BqCEk%2Fp%2BJ6BWphCCzc1oYdzkp55EDjiWoZHDau543%2Bjb%2FhzUdNfZyeFjDu7CV9kkaujWVtfVltiRiX2g408nT%2BabtRzrNumaeh6Jc4jwldmT4fH7ZODZo06atlQFD4zoL%2F586FdF%2FJMNhXPbM&X-Amz-Signature=12d65c40498e7fd86b93eb0e7ff6426e33d06c3603196bee357b79600a227e2e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667UEPJ2UQ%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T184128Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGIaCXVzLXdlc3QtMiJIMEYCIQD7f%2BuFiMvIS8XootzpFCE0gLgRhck2wRy3rMmdLRYNBwIhAPSd99BudoBdOVIp0%2FpsvEO08vPbwUpXDu6pLcKzbHy6Kv8DCCsQABoMNjM3NDIzMTgzODA1IgxtmlCdZ0gl9qu1caIq3AMTQprqXCdpMfK%2B1YtOGPXXNxZgeLgD8MI%2BMhANXgj6AhvyozjfXJslpDEIk1nqjJ0lJmDY3qkGJND8BEKzqeIDiH0FivedSWyPWg4JUqvwpp3gGnvljNtcrjljGjFXjs5V2DBcUfXINLkIJLSVoturplh4V%2BvzczLg92LwukyoC1aud3fbdhAhDl%2BluLB0DK7aJYazDiWNzPcsgN%2BYTASBKplXo5QnsR7IDZQwFQ3d%2FqjjaRiq4QPqNcJWy8bYRJS1CS1CyI6mWOM%2BKpTrVB32uBgaQVVVw2Pn8bvqfDnmgdgmpJLl%2FtkxJHnCkHUkEgO3%2BRy%2FONcelE8nP5T%2BwvTxJ0XAQR%2FZsCNqReynfCoG8qFNFd%2FuN26SrN8N1Q1UTsm2OZeB0gzdelSFW3ABoUN8dAA0E98VaVp%2B004O9QduCAoifK06pekabM58E47XRvWOhWPk37gsqKmg6%2FVgDWbc3V3pJ8jM6woXlLvh6UafgvIHfAKvR47nF39vL9WGa524cT7gi7mS%2BFUdwRdLZV8Dc68HYPDdnmGsBZRi6stxfsx6hXFHuw2bn3wrsXqS2cIb5vEUcs5n8lDQwoAwR98yQWHHcuJmzLR%2Bpu4PzQuvO2fdXGYAEKyQaeuw%2BTDm6qrOBjqkAScI2QCbQpWBUarNs9PlSjnGU73%2Fp%2FzvnC67Xe4%2FpVQKpbh6qymJGnqOr5%2Bnl5978%2B6oCzxZ3VE8ki3VkDr9TyLlrmQHmekuHFFOjpu6g6iNXBxiVMomF3BIqGAkgW%2BrT%2BU4uex11yhD%2FFo4ksrlopOP3OhCTFurHx3G18s9%2BzB%2FNAVzUj9srLzDk8x6G%2BSJ1vWDzXWW%2BO6zJywDRE9i%2BNZYv6ow&X-Amz-Signature=557f678037002c7fb053d353c242ce5346e72995b98f76fd69ff12a0923404b4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667UEPJ2UQ%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T184128Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGIaCXVzLXdlc3QtMiJIMEYCIQD7f%2BuFiMvIS8XootzpFCE0gLgRhck2wRy3rMmdLRYNBwIhAPSd99BudoBdOVIp0%2FpsvEO08vPbwUpXDu6pLcKzbHy6Kv8DCCsQABoMNjM3NDIzMTgzODA1IgxtmlCdZ0gl9qu1caIq3AMTQprqXCdpMfK%2B1YtOGPXXNxZgeLgD8MI%2BMhANXgj6AhvyozjfXJslpDEIk1nqjJ0lJmDY3qkGJND8BEKzqeIDiH0FivedSWyPWg4JUqvwpp3gGnvljNtcrjljGjFXjs5V2DBcUfXINLkIJLSVoturplh4V%2BvzczLg92LwukyoC1aud3fbdhAhDl%2BluLB0DK7aJYazDiWNzPcsgN%2BYTASBKplXo5QnsR7IDZQwFQ3d%2FqjjaRiq4QPqNcJWy8bYRJS1CS1CyI6mWOM%2BKpTrVB32uBgaQVVVw2Pn8bvqfDnmgdgmpJLl%2FtkxJHnCkHUkEgO3%2BRy%2FONcelE8nP5T%2BwvTxJ0XAQR%2FZsCNqReynfCoG8qFNFd%2FuN26SrN8N1Q1UTsm2OZeB0gzdelSFW3ABoUN8dAA0E98VaVp%2B004O9QduCAoifK06pekabM58E47XRvWOhWPk37gsqKmg6%2FVgDWbc3V3pJ8jM6woXlLvh6UafgvIHfAKvR47nF39vL9WGa524cT7gi7mS%2BFUdwRdLZV8Dc68HYPDdnmGsBZRi6stxfsx6hXFHuw2bn3wrsXqS2cIb5vEUcs5n8lDQwoAwR98yQWHHcuJmzLR%2Bpu4PzQuvO2fdXGYAEKyQaeuw%2BTDm6qrOBjqkAScI2QCbQpWBUarNs9PlSjnGU73%2Fp%2FzvnC67Xe4%2FpVQKpbh6qymJGnqOr5%2Bnl5978%2B6oCzxZ3VE8ki3VkDr9TyLlrmQHmekuHFFOjpu6g6iNXBxiVMomF3BIqGAkgW%2BrT%2BU4uex11yhD%2FFo4ksrlopOP3OhCTFurHx3G18s9%2BzB%2FNAVzUj9srLzDk8x6G%2BSJ1vWDzXWW%2BO6zJywDRE9i%2BNZYv6ow&X-Amz-Signature=557f678037002c7fb053d353c242ce5346e72995b98f76fd69ff12a0923404b4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TPCWTGTU%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T184128Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGIaCXVzLXdlc3QtMiJGMEQCIEqOAisVVOzzCVX6rdGpW6LoFYDSdxpQFXxf2NoXh1bVAiBDSyin%2BF8zUHDhCQc8bs0Re3PFomiJ2FqNm1suGLkqpCr%2FAwgrEAAaDDYzNzQyMzE4MzgwNSIMwZo9fuRWNYEbMkeAKtwDTh0a%2B0KwKFTr%2BHec8NKQy6GDhhEG0V0zRHpKXyuERUjrcbquRA9HUAqJIYtPQt3yroTntW%2B5LLRJOfo588wc4i7zQMZTtTfDA1nRbP7ZjSgdeObRkS5ZxV4%2FwMyBzBsuJ6CVf28L60Ty7mgxBLI5n%2BCwDI095ipamGgrvVXIdmWcXKHGPdOrJ8jrtgKR3eUkjgeT%2Bc0d3UOMd6tZAArVg7%2F432lnfd3ulPN2j4hZDhDblRJ62EUTQb5hHkan8XIfHsgaxsz7qA4cRYnEdHySewlbWZineXOVacCqVMVWKQ7%2Bt5pqmlSODY2%2FgoAuMk1IxMY9ZcV4gXh8uwxAiD0LJ8GrEEUswtEbcwZtcveClKN2QCl84weD7W8HPltrC1xV%2Fv4a5fwVI9Wh%2F2a1T27nU5jV8rBwnaBYwE9K9U%2B0Yj2pyrTvyPtoYEmugKvYUKYq3cqQMCje8NCVxId8dz6TWUC8BBeaCVRcR1lOTPWxBNY6XSSeuB0PXnL5Geo4J4JFPgKjt3www6qAny8agpWHRH3oJJ5pFS%2FZunFmnPwvcqfc9FuiOmFGyYA1350wwU2rfXSUwuSHdzqvuGoqsxLanARfGLL3AF3yPdN0VjWhL7UGXQHibFEqNjJ7da8w2uuqzgY6pgFd9EgrlPuhKwzmH6T4l7n0NUbrPPoYdja1J2sD8g3eG%2FlfDMFiakIoR0D7sVbfZI2SNTCENlgVjprLi9BlP4ARBmRby2D037Bj3obsJSm%2FgFYvyrkfkSZAtamlyqR9RJxgbJAByD4M2%2BwJeOOEtIbonN3AMBesx9VuOPYWiiVG2pj107LylugmOYAbaaZz%2FZqq4HDWzhWXcSiAZm0ABFu9uk%2FErg7x&X-Amz-Signature=1560794a7dc2a8b9031c05318f4d94e7a2087fe980d8561b48f6a82308f5463b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

