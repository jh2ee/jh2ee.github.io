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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46642D5CXVY%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T192246Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEsaCXVzLXdlc3QtMiJHMEUCIE1DYmQfMtJLPy4oWWyHDeaPYLO9zzuLW7uo3wwHx7SfAiEA5rtwOJ4eUCpaD7taHRzW6wgLYCtgnrDRIMlNtBpZTjsq%2FwMIFBAAGgw2Mzc0MjMxODM4MDUiDFOnEg5NzS%2BVKwEN8CrcAzCPoPIiQ5fwaSoVpB8IachF%2FkM%2BNFHVvJY3rx282Gz4ILaI72bg3fI1rvsV2DAR%2FYCnRkEE5GThLy%2Fs9NBCtldn9mzyTD2NBPo06FUrv%2FSMbAIv9kG3DoPARtKC7NWIj89BSUDV1ty01kbQmy21nPFXkvQ16lI0LlOdciFGKVKjNxCUpFfYSTrd2SrkixpuqUlEr05tJ0wPJJWwt8dJbLs5cDCsvVcUzWjUYX3kjjCS7aeiMNFU1Ijje4DkiSeGD%2B4krtKHC6YLakoXv9snePURgCY0vhSwgPcYqXhjaCaobK8pJbNbI%2BzKm6AB7J4G4YGuM87VEVGf09h2abkndd888LDZ%2FOIqMbc9C2xIt0BiC0whGu6V5wFxdq1GUh6mE7PJA%2BplfjJwFZOpSxFq7HZUzCat5ZSNicL0qwqjO54gVddk7E8FBrwu4u0DFaHPZnZRXfOwNXNMCUmU8wz%2Bpp61ApFcEgB0bgW5uKsQUVydf41lddevJr1v4TGCv26Cn7c1I%2B1BrEidUaXh7fGw64%2BLetgKMJwnz0UwS%2FN7ofJYBT1HbExFo6mYhxYchvwQ5V6OoqscXT%2BqSJnvI7duQ6UcROsjK9V9ZoReau6j2boPpof%2FFtBD5D4HvepDMIjlpc4GOqUBqhwRmscxv2PlCiyUSgjA4Ic63UrepnDbK7GFfwSdeEOYx8JHml%2BZkiPzLiXLMaXK4SSd8aqpG3x2wHS3OBoS0ZTmHlBfb%2BJsdRpz5Ci9JpFs9adYEItmwq0JMjE%2B3%2BREFFOb3LRrXWgfgKuIAMVbMThhinao6undtOGT%2BmbG1YnOxVgPdMq98sTQjJKtueoxWRDqNkygqcPeoILZ2va63W8EGbTQ&X-Amz-Signature=172b2c1558da9d4e2d157b74957c6b052059ac8987a6448b90804e9d5cd7c29b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46642D5CXVY%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T192246Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEsaCXVzLXdlc3QtMiJHMEUCIE1DYmQfMtJLPy4oWWyHDeaPYLO9zzuLW7uo3wwHx7SfAiEA5rtwOJ4eUCpaD7taHRzW6wgLYCtgnrDRIMlNtBpZTjsq%2FwMIFBAAGgw2Mzc0MjMxODM4MDUiDFOnEg5NzS%2BVKwEN8CrcAzCPoPIiQ5fwaSoVpB8IachF%2FkM%2BNFHVvJY3rx282Gz4ILaI72bg3fI1rvsV2DAR%2FYCnRkEE5GThLy%2Fs9NBCtldn9mzyTD2NBPo06FUrv%2FSMbAIv9kG3DoPARtKC7NWIj89BSUDV1ty01kbQmy21nPFXkvQ16lI0LlOdciFGKVKjNxCUpFfYSTrd2SrkixpuqUlEr05tJ0wPJJWwt8dJbLs5cDCsvVcUzWjUYX3kjjCS7aeiMNFU1Ijje4DkiSeGD%2B4krtKHC6YLakoXv9snePURgCY0vhSwgPcYqXhjaCaobK8pJbNbI%2BzKm6AB7J4G4YGuM87VEVGf09h2abkndd888LDZ%2FOIqMbc9C2xIt0BiC0whGu6V5wFxdq1GUh6mE7PJA%2BplfjJwFZOpSxFq7HZUzCat5ZSNicL0qwqjO54gVddk7E8FBrwu4u0DFaHPZnZRXfOwNXNMCUmU8wz%2Bpp61ApFcEgB0bgW5uKsQUVydf41lddevJr1v4TGCv26Cn7c1I%2B1BrEidUaXh7fGw64%2BLetgKMJwnz0UwS%2FN7ofJYBT1HbExFo6mYhxYchvwQ5V6OoqscXT%2BqSJnvI7duQ6UcROsjK9V9ZoReau6j2boPpof%2FFtBD5D4HvepDMIjlpc4GOqUBqhwRmscxv2PlCiyUSgjA4Ic63UrepnDbK7GFfwSdeEOYx8JHml%2BZkiPzLiXLMaXK4SSd8aqpG3x2wHS3OBoS0ZTmHlBfb%2BJsdRpz5Ci9JpFs9adYEItmwq0JMjE%2B3%2BREFFOb3LRrXWgfgKuIAMVbMThhinao6undtOGT%2BmbG1YnOxVgPdMq98sTQjJKtueoxWRDqNkygqcPeoILZ2va63W8EGbTQ&X-Amz-Signature=172b2c1558da9d4e2d157b74957c6b052059ac8987a6448b90804e9d5cd7c29b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46646CSSFP3%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T192247Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEsaCXVzLXdlc3QtMiJGMEQCIFQRGy6VdlQVJdVfgiGjvpLun7uA9jw0bsZjNi%2BY2jUOAiB6JtV0h1d7NNAcUxivYz9rwDLERJdyunkYXv4fGcy%2BNSr%2FAwgUEAAaDDYzNzQyMzE4MzgwNSIMg%2FX8Ns74jPJfWoSWKtwDs0y7e%2B8Fv5N7btWW%2BwEKqkQRgJfxraiHuizqwl3cQpCnRlgCkuGnEghx6Ixmm%2FlXmDkj91nbgF%2BiFEQOs3LCE72b19jZQWk6tcQzuLTLP%2FCi98W%2Bm4NRWbROLLyLd4AJ9LMP%2FCXkFaBzvMYdjG6CPn13IJcj%2FASfARCw3cxXDH5GFIwgAA1WrCxpgwRVDpjVzXFddXPD%2BSn6kLCwOSrFoPAAaz2JKXZb7IMkjFK%2BgAZ96RO6WhBhgd7kJAiaPnHSHzbY%2Bb1a%2BW%2BFwBzWzKgJ23X6YhB9s7nU8VntOZa%2B0xRG%2FsME3o4A5djdJkeJF38Dp4Fbi4O0fbn%2FUjXOVDgGdRhJPmmukDf2Zk8gQxr8ksSRqtqUrVLqyyQDQkAZmW%2FzJbtCL%2B7%2FaU%2BmUdyB%2FdaxVcku3I0YnhsXPVBZ9MnXj%2FH7H7BSfOdYKZfftvISO5UY6FTPvoRYhFfRO2%2B8JAPGsNAPhFWy%2Fz%2F1xTZeypCtkt4Y%2BYuAO15BR2SwtvsDieAU%2F07iYbQKf8eMCAogy2Mp7b%2Bn6EYhBEg8VAkKRbFyCDkXau%2FJ8zNYFPc6rlv6L28YChjorE9BBzuLdm6j7GfTVRJoIk8kLmXHzEKzEeCgdxChTOcbSN%2BazyQwgGQwieWlzgY6pgGM3iUBLUjxSRZoVjSu9%2FblHgnc8ozJLtz4sMp0EK2nY8Sj5v49Od0TMQrSV32xdRG0mWabC9yNIW%2FWVgu%2Fg2selZ7t80zEzecehy4vt2b2GVmFn71K2rQ6ioaDSpJDM3Gx7923zc2I4F%2FBpO6WGoxIHJb1exF20QxEgqEX3WKk6G5Y2GUtn%2B5t80mjYIExqfTldBUm7Kz9JvAgD%2B2OqiA%2BznpMKV8m&X-Amz-Signature=472337d934e44cea1581477ebb362049319dfc22491731b56541d90ec5a47e2a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46674FAZGHY%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T192249Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEsaCXVzLXdlc3QtMiJGMEQCIHFN0nxU9cp5PUw1f9rxrjaLI6CTF2hSOUyBG%2F2KfkW9AiB6YZhUGXlU0QbjD0yXW8oYevs1Cp87j1YEEj55u2DAbyr%2FAwgUEAAaDDYzNzQyMzE4MzgwNSIMGNjLHcyyDylq2QkTKtwDPSPG3WShC8X0tkj9WPilCq0QNfa6juJkB2DHTn8TtodPZr4Lrj2HC5zeah8zsvgYCOYAM%2FFcJcB5eu5pU03VrVo98RQ7ROi5aFG9sdcr6mxVMgm9dIA2sgy%2BcKKtyXcaUdWhBevFeIsjpSSKBGw3NCZK1BdwzUlV1Sy9OomdXD2SO6A6Euce%2Bq%2BfPJbPLcM6a1tUjTc1GVzsO%2BmJAdSSBzmS3s1%2Fef7mMbrkFjV1qsQ9%2FdnRs9dNQbHyemtIvrtIiKTgPcDNONVebtHIB0V96pP1SCFvCkIgmkmoEJLrjgAnUaJGtDgRAwb3i3VHCudzVl5nBy0u62Cm8nBbizVEEUawqY0JARiT2VqS%2FKpNSLZVqi%2BEb9IgjgcDgMUqm9GtKEc7%2FQ%2F9s9JQAbIlM26YoLS4nAmVR03eXyhMR%2B0LZrh6yFPzClN4KARweSbGml3dFH5ZMOw0tc6%2BIKQP1mKL9royS1k1PQAjotXavVkjE7D3ftxb%2BV%2Bz3rr1TOHn%2FGGIHOpZQRFlyEyjHtdlwHDjTHMqNlnZy7a%2BJO1RJ7bg40GrkczWvkHe5i81eKP6VtdaqS8bsLICXUo%2B38HLYOXJKStnfT%2FZlgrbiZ7aua%2FcSllsGrIMNliYQp6%2F2Kow4eWlzgY6pgFkuVcECLMn3EWHiT4PKedpQS2dEbbIoxQ78f5eMTT5SQXqPXIVpGL1cGrGP3QuJvh1%2BDWRrbrAnfnvvUhIxWiefe5Gm0lywj2T1l5fbtViWkiMbNftBy6xfbc1zrDoBWxUI2J5EQqQak5NDX2oo3VGwhwKaf%2FW7uByKiOXsGdBLT7b9O7uG%2Bl%2Fmo2E5RTzgXaxFjBNQ5E3iMLtbn6EIJTOSgq67tAm&X-Amz-Signature=56ff7f1051f0de0fa1f8df94552a80c040b17d4c8ad919809b483b3abb1f17e8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46674FAZGHY%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T192249Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEsaCXVzLXdlc3QtMiJGMEQCIHFN0nxU9cp5PUw1f9rxrjaLI6CTF2hSOUyBG%2F2KfkW9AiB6YZhUGXlU0QbjD0yXW8oYevs1Cp87j1YEEj55u2DAbyr%2FAwgUEAAaDDYzNzQyMzE4MzgwNSIMGNjLHcyyDylq2QkTKtwDPSPG3WShC8X0tkj9WPilCq0QNfa6juJkB2DHTn8TtodPZr4Lrj2HC5zeah8zsvgYCOYAM%2FFcJcB5eu5pU03VrVo98RQ7ROi5aFG9sdcr6mxVMgm9dIA2sgy%2BcKKtyXcaUdWhBevFeIsjpSSKBGw3NCZK1BdwzUlV1Sy9OomdXD2SO6A6Euce%2Bq%2BfPJbPLcM6a1tUjTc1GVzsO%2BmJAdSSBzmS3s1%2Fef7mMbrkFjV1qsQ9%2FdnRs9dNQbHyemtIvrtIiKTgPcDNONVebtHIB0V96pP1SCFvCkIgmkmoEJLrjgAnUaJGtDgRAwb3i3VHCudzVl5nBy0u62Cm8nBbizVEEUawqY0JARiT2VqS%2FKpNSLZVqi%2BEb9IgjgcDgMUqm9GtKEc7%2FQ%2F9s9JQAbIlM26YoLS4nAmVR03eXyhMR%2B0LZrh6yFPzClN4KARweSbGml3dFH5ZMOw0tc6%2BIKQP1mKL9royS1k1PQAjotXavVkjE7D3ftxb%2BV%2Bz3rr1TOHn%2FGGIHOpZQRFlyEyjHtdlwHDjTHMqNlnZy7a%2BJO1RJ7bg40GrkczWvkHe5i81eKP6VtdaqS8bsLICXUo%2B38HLYOXJKStnfT%2FZlgrbiZ7aua%2FcSllsGrIMNliYQp6%2F2Kow4eWlzgY6pgFkuVcECLMn3EWHiT4PKedpQS2dEbbIoxQ78f5eMTT5SQXqPXIVpGL1cGrGP3QuJvh1%2BDWRrbrAnfnvvUhIxWiefe5Gm0lywj2T1l5fbtViWkiMbNftBy6xfbc1zrDoBWxUI2J5EQqQak5NDX2oo3VGwhwKaf%2FW7uByKiOXsGdBLT7b9O7uG%2Bl%2Fmo2E5RTzgXaxFjBNQ5E3iMLtbn6EIJTOSgq67tAm&X-Amz-Signature=e59ac0320ed3f4700fce228811074d6c73a45a7b04bbcd7894304dc9ef21b59e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466USLZ3BD6%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T192249Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEsaCXVzLXdlc3QtMiJIMEYCIQCdxpLjv5O7sOTO7t%2BSJP0exkuJ0heikDlpJZ%2FZD9YP5wIhAPDL%2B6VA%2FQq7HfLLBhcrWRuchgOIXF%2BMPogkeo28%2B7zgKv8DCBQQABoMNjM3NDIzMTgzODA1IgxTGdwxEwvzkvOHDt4q3APiuk3P%2BV%2FYqf9%2FOyxkEtah7KLcnOxuD%2Fuq9JNi%2BlnD4Cuaf%2BPOxCfWUdfTN6om9D4vlSprEDVIdtRxjmkM5v6BHB%2FnuT3cEVO9YACbmt8IuxSgi8fPTVtyumpV6XKCqrIafAQTK1ZtKKTS4Kf%2FSMKnHRePf2rVluCekwfkMGVyGUeVBeSIJ4Tu3ZLaLHvvZErCgJG6oCVkqJV%2FBHHdqbK%2FXkM%2BwcxBjxrM5afkcRLZy%2BYkCJ4n6g1TrPLShHBbqqOMg1U8p0q3SZIUXolK%2Ff5vDYUSn9txSFb53Rz5Jbozy0Q%2FpPJxe%2FHcGmwXDorXhkuGDSHs5VTAa9StlEMN3N1LtEg66kgKXtaB9HoElKeEhJfMEfZtZB7SAYHz33fZKjRDPkysTmltPM7OSa87oHTEG2B%2BLg3qQU1KVT8WQvH6yijGVq0uYi8WQfR5xP18SD9LuBURfM9ApCoprlUj1OZZzri5l4RlQNFzCRmFcFc7YXLg1hO7JUVT7wbE8dJjy%2FrzT3loD8aOfQolItNTyzN1h9c84X9PLULubJ9%2FD%2F%2FtaDDmIilPo%2BJPA2sYuKJrLcQXnUO6akr%2FSsnTvj9NL9NeSIH%2FCEfSjFjgXJkFOBU5uVJpkjKCXr6fgmiQKjDD5aXOBjqkAd%2B307M4DvtB3wurCNR78HdbgkRDWhq9MYUQu0monmg2vGVDLpBej5IzX0wLTXOI9EHby2m3Iyiv24BDZQ6u9oBxmPZPvjbEeCPEkLPNJSMuHH14JbhoKfQYv%2BAfrtXFNnlV6U1XG%2BTwMdCbUXO341tDp0EBHkrgW3qIhRoWLQqmzY6ihISTVCjaA4XOa8AfHPZmwgFgEGTNz1Jt5MzkxbqeInJ2&X-Amz-Signature=143c2ebcdc6994c83abe440f2735ed4bf6b36b7907b939fd446244f2ed7752dd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QAQPZJPM%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T192249Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEsaCXVzLXdlc3QtMiJHMEUCIQDAjUiSxV9geLQu2s8Ug2wkIpskKq5JRIhcGbDI7w5z4AIgVIdEF4PklOuAe8nUSebqQONFTApFuDjfy4tgTGebMwkq%2FwMIFBAAGgw2Mzc0MjMxODM4MDUiDCuoRu5W%2BFtcDJRksCrcA22RaSx53Nvv9uniANezjPASs8KnPuNrQGY%2FedlnZBxp3BjEZgnc8WGe2NHbOvPLaNDwyIbZtnWPdJvQLt46ckyWhgQzS99WrNXoLjFxoDIUE%2BriJBlwjRNSWB1DWhp218Ky9lyrkKOayDiWk1sNb%2BYG4EQEJL5DkrFG2yG7ottlTbW8Y00HLkNuG%2FPV8fGk2EfwpGJ3czwIazX1uvNqflpuaJlLDXfvb40DsCr3kn0Ej2m15PC5LQfTcnSXLpYdSbb68HY1N4MbylGrtdL9F6MjKLer%2F8VifRJLySp9bjWZ%2BbD49R%2FOTv4lENfee98H3864D1ea6ZKtHP3ZYGTAAzHIHaETFc%2B0j7nWbcIOiGlUHkVL96UtH44vGOKh0LuZczL5emmCOnI8xLwzUKv8wmSQ7yPeIuGEWKtTSIP2lU9sSeX52emM0gH8Slam3nDaBlqan8Uu6F8zHSWxwUbGNRqLDIbb1bLrGw96yd9GjvEZLTdYjV4BHmsMdJ2KpWmttn%2F4hHmU5MTvIbvBscYKrKzHDCejo734BOLM02UjIcQ1bsjEAks5IQEAv%2FGVZu2rLWHR%2F2bw0RgwuH%2FB5K0hmiMD%2BjVa08M7TAoIOwTCMuIDwpIrOlxS7x%2B2CMt9MLDmpc4GOqUBsJRtThpsFnaYdZKrvVuBvS8NTaET849qFYTYqKQBbZVgbWPk%2FHNq4R9lHJ9PNbZPkuuGo22GKOSHmFfmm4nuYra529iPaWf5KORwF1KNcd8bAjKINkeQzW2wcneibeughDWafLgBNK6JE0n2nF1w6%2Fe0TjIWX1aW00zRCNoE5W%2FCdMZEE2EJdMSoxLrwozxkBm8%2BX8HEmvcAmZWnMJzhw3iFQD%2Bp&X-Amz-Signature=61689925e81da2326de4f1e21901551856a6adf8dcc66c0ad558d11f16ebec8c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VBAEMG3D%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T192250Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEsaCXVzLXdlc3QtMiJGMEQCIDaO3zrWNu9ecZkAkTcw8mY9GiXIIGaEslyIcMzjE%2FopAiBSEu9uW6k49EN2qYIbRrO4vlB%2FM6pwsfpSJfdydNuUtSr%2FAwgUEAAaDDYzNzQyMzE4MzgwNSIM%2BuxVTM6zrHZcGcBbKtwDSTHL50ZQcimePCs4GRj0woOABAqwXLDtUnQSVvn%2BdNT1PR%2BNPwv4FWC9Ecab4smwGwyHrMhGvg8uQ8wseQWheCzvHGb7HE9MMPbSwNsY6jWQnue1g2kh5Qnpttkylu%2BNw6Z4G0zEShr9amFKWOpWSJ6RgmCU4RZ1VES%2BABoK4YPjjxOUTxNWATSjkuszMHIIsWTPOXhf6hOTQ5uZpGVef0gtTrSdj2vRFDS2hqwXJ3G2tJw2uPqBqwG7iA48ilXU%2B2oQ%2BasRRcNzzTy210d%2Fen%2BOWxf2KfQhNXWq0raeiOPapQfQXMqiMOLR7Q65bl17k3fcLhe2SW4m0vT0B6Nw5OE9FHkj0rWjXroxMeHXcE4akXvUChkGRYuMLzHWjx0mbsN6lXaJiIzlJy7mm9Aajq4y8kAFu1h5Cy5cnsqAFgcy0UsE%2BAxjfXhFnn%2BhIfRdi8SSA1CSqwzd0niUDeZ5%2FnsK3Tp0wrk4jlKx2AJi9I1eXWGuEMATH1tbS8CamRr6Qmz%2BIFAkQWEsx4H5WDiKfvcceimBiNB9CPEv2rjasybizriTRU48t6QvW7jWx1QlNKP2qqQKN2OrSbQZ96r3Hq5b7k5siSOxkpxri3KKOeFtHeVcPxCtiLE0uqcwmuWlzgY6pgFKnxZJboIoNy5AXfT8mgYOTybK%2FOv1iTBTqwt7TsdEsLqXBTOupV1bTuQ8g1mi%2B%2B6jZYdGJ6a6nqie%2FqLmSmX8lykQD4bIL6d3XBPoqkrjRT53jAA%2BsLhlT6OOY1MQVUrdu8zbJDLP0k4nIuvjXnnU4FDAVo2aO2tvwyPjYnNFHDNFEFk9HjWj6xBSefJzPV4qownTpI%2FY3r69ASoHrDzswrqsFlmH&X-Amz-Signature=8ef868a175cd808889a4dbb80a9c83a8848c3b05b1b5056b8bd9a7cea30364e8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SYHWMEK5%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T192256Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEsaCXVzLXdlc3QtMiJIMEYCIQDg9uHVwSHBrld2q0%2Fx2QK4ns%2FGz%2Bqrw4Xg0ZEbHZCoTAIhANSekRqhU5KN1WcjdfTKeut32e3rSg2sbPUX26A%2BmEfAKv8DCBQQABoMNjM3NDIzMTgzODA1IgytlGTK1yX56ca9tEEq3AOafNCycpNCtNaGp0OtIubTTV3HutDW2dkG4k6eC2TOi1us4X9T34PrHscuqa%2BRy1rWfQBzLgNSC2yp%2B%2F1%2FBCWjvD3ujjDsxl9mNkte3JPYIUZAI2%2FyMbO%2BduwUk4sK7QhzFQeViFlpE2omUCmIcPbmwGsHH108U4W%2B3Q28c67xpn9ved2zuqVkYJ6G9wMd0nKBNdKIlzYshE2knEvJ4l73KKrNVAk%2F2fsFenME8q7axwWo3m5iu5sWq6mNl7BCnUjI1TJ0n8m0aulDwikv9Le8d0ZOjRxYo8aRVlpYu63TKLaz%2Byl%2F16fnJcYC97U2%2BorMxoISwIL7DX4c4UFtL16Xnq8Xgpd8mCQ4kLD9HPCpEnDF5OAQ8OIn7uBkgNKhzzgAkr4YVn9rIqXDiOXj%2BLQ39HtCxrfqMaBU5fVz1J1qxkDV%2FyqgjR%2BBe87fBMb9FgiDpAqti%2BZgV3%2B4ilHwxB9jpeEvVjy75V%2B%2FvW3JMkUkNKCc5PYHLXu%2BB7ATFJESzs4uKPQm%2Fwigbfe%2FuUIouR9YyC496AvsfqUEOEzWCw7auIFh2VbdAQ%2Fy4byLbD12aQs4mMUaAz5n0DKiEWL6i5dkxRHFMUav45sUSIQU5vmdVmeTZobtIiscfmFYPDCk5aXOBjqkAeGXVwRjYkeg0hMKWywyu0XofXKvi2AiR9oVHsEItjHdf7VnTqCx5HfILOAds1nB0PeEjj8YKBwwn8Q6GYH%2B%2FS40oG4GFyupA6IEh1F37w083Jfd%2FOFijLEv5%2B4s%2FShosLWfC7M%2FLlxs4vdLux3%2FQkc1PmPZ1MdPkGzgxzvR3hF7jZN7r1eCiTpmrShrVWK6TPM2zAQyUfpQ15Fj6n%2BLTFPb2i%2By&X-Amz-Signature=3de91b8fbdcae0bf61b37ec25907c3297373fc22f151c21048dd76c05d7698b6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SYHWMEK5%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T192256Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEsaCXVzLXdlc3QtMiJIMEYCIQDg9uHVwSHBrld2q0%2Fx2QK4ns%2FGz%2Bqrw4Xg0ZEbHZCoTAIhANSekRqhU5KN1WcjdfTKeut32e3rSg2sbPUX26A%2BmEfAKv8DCBQQABoMNjM3NDIzMTgzODA1IgytlGTK1yX56ca9tEEq3AOafNCycpNCtNaGp0OtIubTTV3HutDW2dkG4k6eC2TOi1us4X9T34PrHscuqa%2BRy1rWfQBzLgNSC2yp%2B%2F1%2FBCWjvD3ujjDsxl9mNkte3JPYIUZAI2%2FyMbO%2BduwUk4sK7QhzFQeViFlpE2omUCmIcPbmwGsHH108U4W%2B3Q28c67xpn9ved2zuqVkYJ6G9wMd0nKBNdKIlzYshE2knEvJ4l73KKrNVAk%2F2fsFenME8q7axwWo3m5iu5sWq6mNl7BCnUjI1TJ0n8m0aulDwikv9Le8d0ZOjRxYo8aRVlpYu63TKLaz%2Byl%2F16fnJcYC97U2%2BorMxoISwIL7DX4c4UFtL16Xnq8Xgpd8mCQ4kLD9HPCpEnDF5OAQ8OIn7uBkgNKhzzgAkr4YVn9rIqXDiOXj%2BLQ39HtCxrfqMaBU5fVz1J1qxkDV%2FyqgjR%2BBe87fBMb9FgiDpAqti%2BZgV3%2B4ilHwxB9jpeEvVjy75V%2B%2FvW3JMkUkNKCc5PYHLXu%2BB7ATFJESzs4uKPQm%2Fwigbfe%2FuUIouR9YyC496AvsfqUEOEzWCw7auIFh2VbdAQ%2Fy4byLbD12aQs4mMUaAz5n0DKiEWL6i5dkxRHFMUav45sUSIQU5vmdVmeTZobtIiscfmFYPDCk5aXOBjqkAeGXVwRjYkeg0hMKWywyu0XofXKvi2AiR9oVHsEItjHdf7VnTqCx5HfILOAds1nB0PeEjj8YKBwwn8Q6GYH%2B%2FS40oG4GFyupA6IEh1F37w083Jfd%2FOFijLEv5%2B4s%2FShosLWfC7M%2FLlxs4vdLux3%2FQkc1PmPZ1MdPkGzgxzvR3hF7jZN7r1eCiTpmrShrVWK6TPM2zAQyUfpQ15Fj6n%2BLTFPb2i%2By&X-Amz-Signature=25ed7d0f3f616d8c4fff1a696963f8a71217646038b828dca230d25119c50465&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TFUKJXIA%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T192244Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEsaCXVzLXdlc3QtMiJHMEUCIQC311T7VZkHmGCaYM2M8%2B8TfVM8wHrJiqolW%2BOJuxwOPgIgfQ6kNp2mMuF7l6DIkuRsWlSB0XQuAQdCx%2Fq3YyLk048q%2FwMIFBAAGgw2Mzc0MjMxODM4MDUiDEEr8YnEEXHYCkCuCyrcA1YcjJ2yW9q5A32WZr%2FyRAquYmpzREd5ehgHOc2HbaobiSzgtgQgbm%2BBjvrJ7ha3%2FWVqiPaXvLCvXp9QR4I9FGipraud%2BS9GJNg7B73ZVcb5eKRfbTZK%2FV9p4omTR%2Bb7lBnwl3xXlhLjKWdAsch6nmVMnytYiXfQ68uADOlP6LNo5yfOH7J%2FQXlmy1VvIRl8YN6l%2BcTUvAR60QTsoqZtXtvYIj%2BwZ29nVtsQCxTC3LwhfaAWwfT%2FHxyOEvAa4wCIzLwTvu7qDPMt6SAviALpndk1n7gd3VjNP0kVzaQxF3LXaXVBdt6fRVccv3o659%2ByPORyoYrFhT%2FcAxt6FcQS6bYD%2FZiNjn2xrfjjYCNG%2F4Ucq8MhWf7%2BveAxZ6QnolerWfDibvWv98LVOiC4X9BgTLJRWM7dkLek2lr2ZvhdrEGwqeR1j7k%2FVwJZ799tmZp%2BM6qGqF9g%2BTMbb8I9inbjf93Qif%2Fz2HSYWhhs4YVE40Qh%2FPIZFMMPIZMFe4wP6HPl3JVj0kb6kEGC0R4%2BrfcaHzIBoPXBEiVa18LeAguf7ePsHGQ6yzXBzc3%2FkzXam5pGHitzHdJUxgEzlV7jFYLMykM5IcrbSvlOaT7W%2FARmunicucUkiF2%2B9UahV%2BW3MNTlpc4GOqUBDTrHVx%2B8r9mHgSYMU94PY%2FlxBoC501q%2Fgq17CfAqROroPeGm2%2B3R4OTZA8VS40tBqscNGrjM%2F1O%2BkP2hYMS54A0WH%2BdXIg0OdXuLz8G8LhL5rTbKak93s7R99VcybJGhPcoebcD96qGGzsNHPdlZ5LuPgL4c%2FwOGxpUQV2NeGL%2FPtZab6hbLgxixjJOc6Eq2S16kDQ1JXlSwU0cxkxPvZJSb2WLP&X-Amz-Signature=4613d79fd843b14fa147cadf697d22f3c89b7ac3dd93257da5e396e63713d8fb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SOKGIF5O%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T192257Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEsaCXVzLXdlc3QtMiJHMEUCIG9FddR70xvkMStm1kbMO%2FW9tGXWIjom1ZNwumRGm6aMAiEAszVM6PHdkDNYkIB1yIHi2lvQMttdmRX0BRrKEeeR22Qq%2FwMIFBAAGgw2Mzc0MjMxODM4MDUiDIb%2BUWCPPJeJEJCmmCrcA8PYKudqLFa70R928mfZnf9zhZlIwnjgGmsZ25Gr6aUIBR%2B%2BKr4QiaVM3Edkvv5UiFNye2ELJIb%2FingXlm3Uknk14GTmCdljYboA1GGBPHhDW%2F3aY7GDPI5bMvDx%2B7%2BA%2FaPoLyt9rvdMXn522hj2U%2BkpFc9jLyFitDfrFq2Uw5xUTNVKduegC3zDaPT7qRLO5euILRz1jISzxQVezowvdIJ3op8M57tpEti0q%2Bv%2FWBnSB1jiFLps7tUbi6tyfDlfhI2V%2Fpi1wwPBBx3GnUd%2Bm%2BiqJmk9z6vC9AYihkxlpOUAqdiujQxZMz6taCuyYtKYTEdJhqLDPY7SipIu5q8PkYMBVuS6o6xZveYJVubCy0P65j3KLVCUpIOIy3H6v%2FckdDgBklHHnw7StuYJUHTT5L7uo7MnBmRsbUeCupjAVnUSXoqgHepTs%2FSJcCGLaZhMqFQzNO%2FGv1rj5xElP4Tw6XbzwuNbg1SuM8to6%2BW1ucsX98X%2BYfOoInJcCtDlHLjW5a57hl6NAgNTyhw68KhJUQaW404LfW68Fp9OtvXdA2Fyoq8B7BH6sKOv6zPnU4d%2Ba2fpKw5JkDR0rgd%2BFIcWsX%2B8Bga6nUDiE710fq%2B%2FA3CGR64l9sasz4FsXqTJMP3lpc4GOqUBF1eNA3eJGlK2uuHq5ShmpbQHoc60htcl6rbdDlRPBcSIwOaK6AyucE23zEPMYD7xSX0C2Kr4zfzFAuPEOhPv7cEi0UUCe6XSuDB83XuWiiQmIKr0Prg61FDifX0zXZ0lnGGPeiAk%2BrSDi4yGyBpa481m8j81liiGj32hnYjj5PuFEaUFlLUhTmxP7VX0QsxQy3m%2B9nFWUCtXISxiwFd1I0phUHr9&X-Amz-Signature=d38648285de8ba2b279a22a460b1315c116be4fea5316a4b5e0fa93b93fcd694&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SOKGIF5O%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T192257Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEsaCXVzLXdlc3QtMiJHMEUCIG9FddR70xvkMStm1kbMO%2FW9tGXWIjom1ZNwumRGm6aMAiEAszVM6PHdkDNYkIB1yIHi2lvQMttdmRX0BRrKEeeR22Qq%2FwMIFBAAGgw2Mzc0MjMxODM4MDUiDIb%2BUWCPPJeJEJCmmCrcA8PYKudqLFa70R928mfZnf9zhZlIwnjgGmsZ25Gr6aUIBR%2B%2BKr4QiaVM3Edkvv5UiFNye2ELJIb%2FingXlm3Uknk14GTmCdljYboA1GGBPHhDW%2F3aY7GDPI5bMvDx%2B7%2BA%2FaPoLyt9rvdMXn522hj2U%2BkpFc9jLyFitDfrFq2Uw5xUTNVKduegC3zDaPT7qRLO5euILRz1jISzxQVezowvdIJ3op8M57tpEti0q%2Bv%2FWBnSB1jiFLps7tUbi6tyfDlfhI2V%2Fpi1wwPBBx3GnUd%2Bm%2BiqJmk9z6vC9AYihkxlpOUAqdiujQxZMz6taCuyYtKYTEdJhqLDPY7SipIu5q8PkYMBVuS6o6xZveYJVubCy0P65j3KLVCUpIOIy3H6v%2FckdDgBklHHnw7StuYJUHTT5L7uo7MnBmRsbUeCupjAVnUSXoqgHepTs%2FSJcCGLaZhMqFQzNO%2FGv1rj5xElP4Tw6XbzwuNbg1SuM8to6%2BW1ucsX98X%2BYfOoInJcCtDlHLjW5a57hl6NAgNTyhw68KhJUQaW404LfW68Fp9OtvXdA2Fyoq8B7BH6sKOv6zPnU4d%2Ba2fpKw5JkDR0rgd%2BFIcWsX%2B8Bga6nUDiE710fq%2B%2FA3CGR64l9sasz4FsXqTJMP3lpc4GOqUBF1eNA3eJGlK2uuHq5ShmpbQHoc60htcl6rbdDlRPBcSIwOaK6AyucE23zEPMYD7xSX0C2Kr4zfzFAuPEOhPv7cEi0UUCe6XSuDB83XuWiiQmIKr0Prg61FDifX0zXZ0lnGGPeiAk%2BrSDi4yGyBpa481m8j81liiGj32hnYjj5PuFEaUFlLUhTmxP7VX0QsxQy3m%2B9nFWUCtXISxiwFd1I0phUHr9&X-Amz-Signature=d38648285de8ba2b279a22a460b1315c116be4fea5316a4b5e0fa93b93fcd694&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665JFPEDZZ%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T192257Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEsaCXVzLXdlc3QtMiJHMEUCIQDL2zRsD2E%2BZ1a8Ut1sammfEBfSYhFicfnW8tLMzzznswIgGhyj0wv2%2FlImz8g3C9DA5V2xWhM3YicSi%2BVOT4Dh5IEq%2FwMIFBAAGgw2Mzc0MjMxODM4MDUiDMoZ1%2BJX1BkOP7HT%2ByrcA2Mah5mmTJofDECOs9XDvezcag0FayD4dwm9DRjsyiPAYbL%2BdxZFPbu2LA1hspJXCoGeiN3S4K3pGGPZLPlXuf7bN4oMDq1lYQYHgqFmqTzwVy5MVrhjvhkkctu7dGWWhgju1EeLpsZGN1rMchZruN34F4X3Ooug0nDWJrYj17Iht612K9d5Xrx%2FMsEmkYlStTsKxHkChlqJWg00OKKO44L8ydwl8ERkrmq4KXeHc6%2FX4DLpj4An7gQhgEWvwFeFvkKHtL%2FWsbvhsiQHH8hkRSeFBKGVJ%2BcA83SU9VuzVGJqprPazaJwVOBJKKCCCZn914cc6bofweJROOlL6eJ7Sx%2F7wvvqUbVPe%2FcSprnJOxj3cNMz7wtfn9OHYPkf%2FUjAnwgRRLhQB%2FfM%2FoxLBrRTBrtcwGf4Itv0cWQHqCMQKAzzhNH374fuHfzgg04BRtUkScyk47Xeoild8QijLBy%2FtJdMz9ppz5fbadpu7A89kB0V6MqJuZuqG31l4Aqa%2Fu9VHGA3fm9RS9bsYkSN7l1Iq3m7WIqXt9cjvpP5BIsmnwAkba7gYrATBlqYuCRBtc5Pgzt%2FLoEZInTEW4KqOqGsKVoR%2FzzQ5FZkpHDTzM1YMIU9Rf5zdM700HKigqaFMI%2Flpc4GOqUBlJiek1JlGzhBzyyMfQiP%2BKPJ%2FHEzp8QZ3jkfpJiBIzBZwuY4edY4LdFt9icC8kJ2NMi0k0rbjbUj7XMbd1gIWLKlOg9Jc6iLanpQDQMFhzANXmEL2CRnzdPthiPB2EwFcUVHXV5XlXU46KjM9ybg2mTGuY5VkEd2uYVXXmAGmVSvpzJY6NxaHEsFeLnPuGR9Qd%2FmbnVBNGi0OhhN1UCTidrDtvOv&X-Amz-Signature=c6a924f8ee86c6562816fb485e10c760a4b7fecaa9652b3b2cf42547d7605f99&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

