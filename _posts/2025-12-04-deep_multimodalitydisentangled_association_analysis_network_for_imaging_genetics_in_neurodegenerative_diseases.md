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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667G6Y6T4I%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T060400Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED0aCXVzLXdlc3QtMiJHMEUCIQDlT5EI%2B4HymRXwOLWOLuR8jGdVszvsKAS07SP%2FjvOe3QIgAj1tSCbnS2IAo5dOoF9ttdwM7nsQL%2Fg6ZNIT0Yxwcp4q%2FwMIBhAAGgw2Mzc0MjMxODM4MDUiDImoMv30mpDTrsNHyCrcA%2Bxvlhg9AKdqOG%2Fv2kScnCCLNqV%2BlKzBHz9%2BLW4qoQtLlDqQtLzLcfACDQCGW1NGq9vbCIJK0Hh0vDGfCd368HBRnyvHmwngS1EE60LpYnoh%2Fb76LxaUgd3s%2FaHiprje%2FV2LVDzvF9V9JXtlr259sQ5IY0xsXYrZz%2BhfV827fQcXwSGn7wXzXCB6tRz9fQLwpSEjE7B9fTJbLY3UBulQaUcGYShdS4iytR3GJNYQlTobuhsjbFBOtO4dPUxCn2dKyRvRsRoolERfHUyHO5Ko2HVPw%2FOmSCSjq3%2B7aI%2FBV2%2BFal9Vo04c1q22B3bdG%2F2xjp3ZkOiiTjuX9kp7Px1Ys2QGyoAJf26IGwgkNndto7Uv8S0NDVQmDeIQCRaWfUHJgDIz9NQzgujWQXpmB3HULj34NFw2wQg6uSRKq9JjpflLSoinxDdhY9JJv2LXtAImgVwCWMG8gw21YKI9lr6vAqPVsJQAC%2Fe2QmkDyy8Ey%2FOayuNjQa2j8yeVUaoJcsUp566VydQ5PLOfyjb9jKUaf69oys%2Fv%2FKLBoy21Lj4lstc25o5dVpASKRY1NkDMRMxcAIsCPtnaGUJgNpa0L0LxCM6k1S3cLglfl1XedgHbHBebkwLctdjAFqZHnLEVMIfmos4GOqUBsfpzQJHMZdAIofywbEpgnd7aSoX5fY0fc8IFr%2FC1u2dQkpcANmcp3%2FTRbuCOqnNLGFq74gKcDSjjZUE6P4ae7xP5iOUGuAVeaQXA%2FT67O4y2rmc0qcShsPq4lT0gVZUKNI3Is0f7rwZAyQl5f9w5xl6BQ4yzHlmmA%2F0692c8WsqwXmLKk4VCkOYsJSR1GjbIexe4XchPS9STz82zvDOX3b09GV4o&X-Amz-Signature=f2f4d5ba626fc13e454df3f942c735364c8b659356f4ba10ba13174e6201675a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667G6Y6T4I%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T060400Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED0aCXVzLXdlc3QtMiJHMEUCIQDlT5EI%2B4HymRXwOLWOLuR8jGdVszvsKAS07SP%2FjvOe3QIgAj1tSCbnS2IAo5dOoF9ttdwM7nsQL%2Fg6ZNIT0Yxwcp4q%2FwMIBhAAGgw2Mzc0MjMxODM4MDUiDImoMv30mpDTrsNHyCrcA%2Bxvlhg9AKdqOG%2Fv2kScnCCLNqV%2BlKzBHz9%2BLW4qoQtLlDqQtLzLcfACDQCGW1NGq9vbCIJK0Hh0vDGfCd368HBRnyvHmwngS1EE60LpYnoh%2Fb76LxaUgd3s%2FaHiprje%2FV2LVDzvF9V9JXtlr259sQ5IY0xsXYrZz%2BhfV827fQcXwSGn7wXzXCB6tRz9fQLwpSEjE7B9fTJbLY3UBulQaUcGYShdS4iytR3GJNYQlTobuhsjbFBOtO4dPUxCn2dKyRvRsRoolERfHUyHO5Ko2HVPw%2FOmSCSjq3%2B7aI%2FBV2%2BFal9Vo04c1q22B3bdG%2F2xjp3ZkOiiTjuX9kp7Px1Ys2QGyoAJf26IGwgkNndto7Uv8S0NDVQmDeIQCRaWfUHJgDIz9NQzgujWQXpmB3HULj34NFw2wQg6uSRKq9JjpflLSoinxDdhY9JJv2LXtAImgVwCWMG8gw21YKI9lr6vAqPVsJQAC%2Fe2QmkDyy8Ey%2FOayuNjQa2j8yeVUaoJcsUp566VydQ5PLOfyjb9jKUaf69oys%2Fv%2FKLBoy21Lj4lstc25o5dVpASKRY1NkDMRMxcAIsCPtnaGUJgNpa0L0LxCM6k1S3cLglfl1XedgHbHBebkwLctdjAFqZHnLEVMIfmos4GOqUBsfpzQJHMZdAIofywbEpgnd7aSoX5fY0fc8IFr%2FC1u2dQkpcANmcp3%2FTRbuCOqnNLGFq74gKcDSjjZUE6P4ae7xP5iOUGuAVeaQXA%2FT67O4y2rmc0qcShsPq4lT0gVZUKNI3Is0f7rwZAyQl5f9w5xl6BQ4yzHlmmA%2F0692c8WsqwXmLKk4VCkOYsJSR1GjbIexe4XchPS9STz82zvDOX3b09GV4o&X-Amz-Signature=f2f4d5ba626fc13e454df3f942c735364c8b659356f4ba10ba13174e6201675a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TR7VTV5Z%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T060401Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCXVzLXdlc3QtMiJHMEUCIGKqkNZV9TemsOCRxCgCtAjJLmx%2BWEErjdzE5T07%2FQuSAiEAxYHkIlDpH5zYFJHLJcZBY1VUa8IG7RNunVTpXyGepNYq%2FwMIBRAAGgw2Mzc0MjMxODM4MDUiDERSYgfsfiEc2hRcJSrcA9N1FfCo6XupVBquNnetdg75hXCsDHgtdvEsh2vmpsljhwlPTA6Ms6QQnsImYA7BStdZWmJNgXY45FctFWDE8GaXoF0pn2CrBRJHvSKV4CG1%2BFBmMw1g7tI%2FeyQkUfU%2F3tzQFMOVAVWGSJeen1Edncu69l4l728wVYIHeydtTlPv0hsEJnLgieWX%2Fzx8VG8mobtGA3DIO2E%2FVhbj0FuWdW4t%2BfP8u0hfvVGp2wS5RFqC8ZL%2F%2FWRaFJ%2BqJYXr28rMi7cw%2BOLC1RxKZufnet7z%2Bz9czCaoMUob1qJ6s8grydBTOULkZTm9BDaDO7%2Fn%2FxAM9c9ePAbMD6MgAEeMz%2Bd26LrblZCh0Jy%2BTvdSYHadIgKDyiYysSk0GoRn64ihnp2J%2Bqck%2B%2FLpme0Kl4pKFPK9ztYZOf6uC29FotIIMqMrnfUFkfoNjYa3%2BJ%2B0VGPpUHzt%2BQU8XY%2BD2%2F3pmcU4S5rr2XBrRkLrKbw5MCiWV6lwDjIMjWdsPETyvG3nnB%2FmLGedaRPGC8AXkMtGOpYHC7BaVd55qawXslFebrncP98TWc2uvHCI6bUCXQF1JOj2yrhCo4e2rG87mlxAdeM53ta1nU1YTwWu9xX1m9e3mWY%2BxFm%2Fv0HtdJ%2FoD8A%2B%2FzteMOrHos4GOqUB6%2Brnc%2BFqn65JTLeIFXbJ9PNrLC7rWp4fIpZiCj%2FHjIJKpv4ISEOKvPoDYVEHvXuCYCOdhx0n2pKPHen7USOEOuWa03jveNfZ1C8y27AAei75%2BIg7c7Ig77jUhKN0I5ZrfPjlbrK4nLvs7xzrOhLo8b5dRPjX2utAGKxp9PBybAZzV4n0xJhkYt7s72eOKOiLu3jZUw%2FIkBb0BTxqxnXUtCb9L5M1&X-Amz-Signature=a20d2f0bf9a758b7ef4583a691125829d66df1cbcab22c68dc8089cc83ce863c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QVNHNSPS%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T060402Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCXVzLXdlc3QtMiJGMEQCIEFaCGVvBrdhp7sOlORDdR478zq04Kc%2FroNL%2FZizN%2F7bAiA4SwGRD%2FoeP5c2CRtvbNARtDMHW%2FkBTyK2qJEb7ZB99Sr%2FAwgFEAAaDDYzNzQyMzE4MzgwNSIMN7%2FGk5XNAAKROVTKKtwD%2FCDXOZBlK0Z3g%2BvK2zt2PYa2Ak3uYv5wlio%2BlXHRYFtLZp2lW%2FyBad8V5baXAKrhMh97Zh3pL5s7Wti0hHM5c4ru0mcl%2B%2B6p%2FSYkozWM1NQbTspeWr7R3Qkv1oZYP2AN%2FDjIewB8sQ6sn%2BIqOpb%2FRAxC7ZN9%2FA6oNW6RV4cv7TUJqSY4uKj%2B50IL4fWsaaiv8zS3d3SB0%2FOtvE6Z7gQMXwrEf7HJhngz%2BotB1Q5oTVMsjBIDQFDfdLpuOQXQgXP1nv%2BA%2FYJK9Ugm5lxpE01tHVCYzRM4fO9WpB4tLZV08tAPvbdgdsjqEOrQjvLgWGMZ8foepqWBe%2F%2Ft7opWKd2rTNBHtX5oeDLKWjfxuDYeySF0yZ5qvhDoUitr5PvMgITEFs%2B681%2FuHuZU7kwFTwX%2ByXmDQRDnCXONbJrfskFaTke1ef46OJl75mLAvALq%2Bs4GZwCSu9pZ6LqGASr2iUrl1Uf48SiMAkcisNlztW1WQlAld3L4qBq2eN9dR%2Bn%2F03WDAjPiTxuN%2B0hYSFVGPq2QdWqVo2gwKaMTQRT%2F1GhWoYP5eCNP1OWAdVGUu6n4McBCuAHGVy8GWe%2F5LvKqD%2F1JvrhNZqgrfWlkzBqOotrSYxxr7D1mKI8JvkGPdPMwy8eizgY6pgHqPcqUXI%2FGZULvtQHQC55i4MS1f4Cktk3V77%2FyJIGz2Gfb8F4S02SLAXzNovS3%2FQk%2BcsOJkviw6czuJjrTXbIqSfTPHXCCcUORRaoPXCfj4cHR0mMDgz4fsztHJyxJlPSCalQFd0elUcSoDBChlUCDQcJ%2FBIzECj6mVDpcDulqI3Okb0O%2FkLPlQL9vFyBreqK2bj%2B%2BjZEDpVwxkRZObpp%2BcZpqqZmW&X-Amz-Signature=b4b6bd5bad691cce14f87a9888b2d53a8f37dddf6a292dcc33509fe678ba048a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QVNHNSPS%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T060402Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCXVzLXdlc3QtMiJGMEQCIEFaCGVvBrdhp7sOlORDdR478zq04Kc%2FroNL%2FZizN%2F7bAiA4SwGRD%2FoeP5c2CRtvbNARtDMHW%2FkBTyK2qJEb7ZB99Sr%2FAwgFEAAaDDYzNzQyMzE4MzgwNSIMN7%2FGk5XNAAKROVTKKtwD%2FCDXOZBlK0Z3g%2BvK2zt2PYa2Ak3uYv5wlio%2BlXHRYFtLZp2lW%2FyBad8V5baXAKrhMh97Zh3pL5s7Wti0hHM5c4ru0mcl%2B%2B6p%2FSYkozWM1NQbTspeWr7R3Qkv1oZYP2AN%2FDjIewB8sQ6sn%2BIqOpb%2FRAxC7ZN9%2FA6oNW6RV4cv7TUJqSY4uKj%2B50IL4fWsaaiv8zS3d3SB0%2FOtvE6Z7gQMXwrEf7HJhngz%2BotB1Q5oTVMsjBIDQFDfdLpuOQXQgXP1nv%2BA%2FYJK9Ugm5lxpE01tHVCYzRM4fO9WpB4tLZV08tAPvbdgdsjqEOrQjvLgWGMZ8foepqWBe%2F%2Ft7opWKd2rTNBHtX5oeDLKWjfxuDYeySF0yZ5qvhDoUitr5PvMgITEFs%2B681%2FuHuZU7kwFTwX%2ByXmDQRDnCXONbJrfskFaTke1ef46OJl75mLAvALq%2Bs4GZwCSu9pZ6LqGASr2iUrl1Uf48SiMAkcisNlztW1WQlAld3L4qBq2eN9dR%2Bn%2F03WDAjPiTxuN%2B0hYSFVGPq2QdWqVo2gwKaMTQRT%2F1GhWoYP5eCNP1OWAdVGUu6n4McBCuAHGVy8GWe%2F5LvKqD%2F1JvrhNZqgrfWlkzBqOotrSYxxr7D1mKI8JvkGPdPMwy8eizgY6pgHqPcqUXI%2FGZULvtQHQC55i4MS1f4Cktk3V77%2FyJIGz2Gfb8F4S02SLAXzNovS3%2FQk%2BcsOJkviw6czuJjrTXbIqSfTPHXCCcUORRaoPXCfj4cHR0mMDgz4fsztHJyxJlPSCalQFd0elUcSoDBChlUCDQcJ%2FBIzECj6mVDpcDulqI3Okb0O%2FkLPlQL9vFyBreqK2bj%2B%2BjZEDpVwxkRZObpp%2BcZpqqZmW&X-Amz-Signature=c1da8ef4f5f651d3c1ada752927066ff9e6f9f2122ba637b9207802702be06aa&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RODWXLPA%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T060406Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCXVzLXdlc3QtMiJHMEUCIHKbdNPGHmlMgb1EheLhEGUSz4nz%2FkEuJQWI6ANO53BRAiEAjSuU46a0erTifBnWNHdFMlwJqsPnuHgwkrAc9uIICY0q%2FwMIBRAAGgw2Mzc0MjMxODM4MDUiDOXz57v6i0uy3EQfrCrcA1SegEdcuoc6PWgCikaqv0%2B0uKxPpmjgtxuXhfxgXuxkjESBmyUHGOruZgVFvwhb5nB4qM%2BqlFIk2NeyR85aaC4fSQzrYh11PmDA3Sl8sftigYUQf0kpK4vgeCfl14BS7JQCVGrZ%2F%2B5FfrB371HjYT5YWaWJvgksNnNwa5cu%2FmmKbbn%2F2xEKlOjW1anT8suyRImIip6zK%2Fkn19s7x%2BeNRn3MYx8yBGApNFHI3gkehxp4mfkEBYEqh7HDgIcQrKbxEKxK3i0WtBQTxru48uvTnh3FKJxQz7e3kWUBhsqaaWNYA6GoJpYAiQgaoCII0Mxt9ODivLb4I%2F9gUiV9iQEKbqTDFFpK1W2zXT6PH71zqJZWVIhlESf5MJq7zVpastphkGCWQgPQTfCPCNKDjiRBhl6T8Do2ZqLPNcVhn5nTqRg2osSaMUlXhIEWqNjkcHnBGVWO9towKViLhwdRVsh1Vm3uCfrqUGvQGQZ2mNCG%2FKmmeoOHGI%2BLInj1tfQRQCFenZ%2FCUl2WTRgaQWmTJvv0nZx888BmwRLWUXrbWB1eAeUlfpZwLDN3FPOgF9kMvZc5TATYOPu9n1%2FZJMgQi1UTiBPguw0aHZuHOJSqj9Hy5oBebzflJbFnVgfgETlUMJvHos4GOqUBfKG0eT24aETepZ9eVmKJfUlPWTtzo286%2BriinQzJmtGxOJ5vHEL909d02tGw1Wz24PoGa0C8KXXwBu7ZLhNvlwhDBRpYXd99LeC82Y8T%2FXTWEVPZjXmnTk9Uq7lLEfmmgvQ0c7ppFk8Cr509cZtIof0nmaKm7dqqmBh0B4wvzFpR%2BFjoEfyq1%2F3GAkbfDsGinVirO6hJ1tuIuS%2Fhap6wn57csOgg&X-Amz-Signature=f989e31d406dbe2d37379f7ee3c11ea70c580a60d329013e802fcd07154ff8a3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466V3QCLLN2%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T060406Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED4aCXVzLXdlc3QtMiJIMEYCIQCPcKkQG%2BwrmAamy6IUVfMHzIC8iOUXn9aZ%2B6VmgqZVrwIhAN94l4qX1RH1BmxbuM5HE%2BUeHW0Jn8sxI9gqMLnJrcZXKv8DCAcQABoMNjM3NDIzMTgzODA1IgwiKLMI3oOJ%2FTCSwhsq3AME%2FBW4Qg82qdPMcsppW8fWh%2BB8l53nZ%2BzpFanLROdUvGoeQphaD5AycxFNkqyUhMYb7VlL%2FUNcPy%2BjKqp4FSLAhivjI3Qo%2BSmNaR1wuGGacFwNWgKt9Hz8B7sdRVkFOU0c39LA5CVFmw%2F6Daft%2FaNDX9cAz%2BMo4jwF0azBFMvodWP%2FevWW%2BUUY%2FYlROpxBGO%2F%2BrN1sH%2FO38RSHo3o%2B9Py4XzGQj7XNOw1S0sIF5eacpj%2F7J3kqKcp4vbWvgG7e1%2BnouHFtS%2FKj0mOEl78kzZT4zvpA%2FDfrWFuc3Akop6BDAWs0mDNj4MpJreU5S8AtDEXjQZEirczP4A352diqOtnW9L8Fy3GJuF4af3bQJLJOxlMYTxdm9aZW4vZWqDE2EP5cJGmytVN%2FDHMkdAAVXqU8Un%2FRlLxLdks7cXtBqGlYSVnASEUuZ4QArOhIue0NRLeXLMB2hV7PoUYEBF2v5XPEyR6WDqeIki36B9NHpZTJna9nsDnuudKF2eRc0b%2FcBomtTGnPPVnjA7AiPeQTDuvx%2BTlz59PQPeW%2FmfG01fswJbdoM7u1%2Bc5jkgby22JkuVqKI1O%2FxoPzLH5msnJLdlj60AwtBIb%2BeNRY0nmr9QJXyE5mxoDbceSyT5XLIzCm9qLOBjqkAaTu2IoSWkoGSzLJCrb1WLzp5f0ENxXXlQStN%2FRv4a5IYxBR8Hk0mo6UK50uVdBnViMVI2HlaDXdwYVc5lpBR8eReKY6uFGfJVddAKwUQxCZ4uYevAtYdW8hBoFkUjc59omQsNhzbdybPIsOyex9iNLeKwSh7MmiotI8DIlop2Xuvin%2B2h8ZQQQp%2Bo3tUXr4PPVP%2BDRJFMQ%2FSOK6nf9lcPTd5hdT&X-Amz-Signature=dfccdd57db0607cee870e3be4ebbce6edfecef95ccc1fcd8a4e95697350cd4d3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WJFMYUTK%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T060409Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCXVzLXdlc3QtMiJIMEYCIQDpj0AaeR47pqv0Ln7cc5rez4WJAyNWu4PhMd1H%2FVMmugIhALhmYLLKV5hVrFAlG1zm684ib%2FGXGk0IypOoimioih7cKv8DCAUQABoMNjM3NDIzMTgzODA1IgyPlnx68eHz5uSq9SUq3AOpKH4B%2FWGwv3D7RfGCWfxVhvC9StxU2vqfn0Dd37srWjVWJtzVbn8oo9kS22z9M6erirIU09Te7pVXg4jlwnBTyHphVTNA19PYmkwt0OrqLlwHo2nYSNEo2V%2FVrXaZxl4FdJUOk%2BKnF%2BmS%2B4%2FmWXfCytik6x9AkstF%2FSVfX4%2B4VfOjzf%2FM%2BIcXJnyzizwEHkqKvrMCrJObjWsUvl%2BgEIEvPAZcr6n8IozpHKNmn8YduF8SYEOAtO39zwRnFmwFQN7MMVvasssib%2B05t9CqF6QAJos6i4uStF2Xl9ZcVuf0OAxiVwycjAOq0fgWdTQcPFGvTKvAo1EMUKGBdAJLpUp7VYaLIKfmdFX57J43QoHJVw2748Dw5rfPQZ%2FgI6OgpgD9oUgDordGsMW8DBkUTKwBAtI1CATVW%2FUXRb59qNXnOF4RHmSNPp7TMmU%2B6umEZboouhPZcrurxYnULQdKcnvoUEtz%2FjJ2X9rpnfwmM1%2B9kg2Mg%2FP5G75ULNsR%2B%2FZGcdKpJqlcvHloGgUQ1%2BhgfEnq6jslhqtG9CyzG%2BwbIjDwIrmbOKbM906xpcSS4zwLrR1EBRr5NovPosYkRp783050tadnJY14%2FIHLAIxl%2BeaBmYfRkpo4l5MpxKsaHDDux6LOBjqkAY00twF5Ypmxi1JF5JrmIupbp81W%2By1yjwWjoEd%2FA6PO82vOwqPtdPX8Umh94EEjCapSI9bzCJ0204MSHGPT2cOuWcRuEUeJgBOsedkoLmjreeVJdSR4tgCk9pTXIXUFQl3mETJbXkKCggoG6cqn2H40TWONvNcENNyo%2Bf9TV9R%2BtN4vCdvKLFyDV4HKEWl0hr1OJfXcPpCcE08A4y8UclfVOHhJ&X-Amz-Signature=4191f3e3c204166ccc427a0c1929736a098a26acd31ac17485f14c7e1c6aea6b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QNWLTZUI%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T060410Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCXVzLXdlc3QtMiJGMEQCIHUGHPLU4jAbufxEdL9kTcDI1PJBauRr%2FeopBS4Hhv4tAiBSGeCX5SOFwLsVH%2FUuhMMj3f%2BbhXb39nV%2BUYfrfm%2BqkSr%2FAwgFEAAaDDYzNzQyMzE4MzgwNSIMOOkBfGhQeusvsOOLKtwDd6SPWsN3uoM8fPKmRWgu7GlKFTew3eZtL34YGpWV3pfjhccXXqWkSKpI4p1r1H0At61T4GPsqggAuZJ%2FVtSJPgs6XE2157MQH3H3OG1enZUjBIMezcV1h8FveOxZxz%2BaWCAEmM6QrAWFLpC6wWrbp%2FDDj7LXlDcX0hyI5Zka0GTqHBaOnct3%2FbbaQ8KW2sMdOzaM7u%2FhMsJeHegxXmmErJ89IlbFcIlLOgS5iSXvb4TiixTvlAmk4aWqTof7ciTCDhGgMGDP8RCqF%2BJdcBUJWqTzc3Kjjfupv1treWqOSEOuLFj7%2FNzY0%2FitL3r%2BFMQ6AqcSJc3lXMVhwcHnIbsUpjHdBVYT06inGuE%2FN%2FPL3otfkswXbkFM0BAIIGwI5XzKgvznZGwF6NN18t34WQq8UU209bBD00lbO2glv1LaWeQ5l86ILXjkIaXrHlBCtPV6%2BHj1xaEOHT815IOqbZVf4qsIQnxD6lfRc6uJrQ1TIC7iPkdhVUvl6eCmUojynbsLChVg9%2BhINA6iwUgXfRyHk5XnrupgFXjb86Gpbylp85VwY1El9zdsiUUbgO6ivXt4YYbEiiwRvERp0kOPmSB6ha%2FzsyMMIQ3bDgrUu7zywwoEsjrf%2FhIJx%2B8l0oAwp8eizgY6pgFoy%2F7I%2BiXKm6bAgpXLhCwUOryy7erpsKju7qhncq9MPpgYBz9fFvyHIjAfayJgGsBig5Er4g8CQne256pH6QVIe%2FCda%2B4shVZsjkgjlFLElvz4P5LqgQqmucj%2FyHDBKVcvbvYs4s2ud%2BcjieV20GmuZbZadSjsosLRUpjWWfWudK96s63bEcuZzEiRu5O3hofYvJjEbniQRG0J1NNXKMY3g8Gy6VPS&X-Amz-Signature=4582e602d68447a8aa8b2dbb47b993feeadb9014e947a955f926718ce58f37b0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QNWLTZUI%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T060410Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCXVzLXdlc3QtMiJGMEQCIHUGHPLU4jAbufxEdL9kTcDI1PJBauRr%2FeopBS4Hhv4tAiBSGeCX5SOFwLsVH%2FUuhMMj3f%2BbhXb39nV%2BUYfrfm%2BqkSr%2FAwgFEAAaDDYzNzQyMzE4MzgwNSIMOOkBfGhQeusvsOOLKtwDd6SPWsN3uoM8fPKmRWgu7GlKFTew3eZtL34YGpWV3pfjhccXXqWkSKpI4p1r1H0At61T4GPsqggAuZJ%2FVtSJPgs6XE2157MQH3H3OG1enZUjBIMezcV1h8FveOxZxz%2BaWCAEmM6QrAWFLpC6wWrbp%2FDDj7LXlDcX0hyI5Zka0GTqHBaOnct3%2FbbaQ8KW2sMdOzaM7u%2FhMsJeHegxXmmErJ89IlbFcIlLOgS5iSXvb4TiixTvlAmk4aWqTof7ciTCDhGgMGDP8RCqF%2BJdcBUJWqTzc3Kjjfupv1treWqOSEOuLFj7%2FNzY0%2FitL3r%2BFMQ6AqcSJc3lXMVhwcHnIbsUpjHdBVYT06inGuE%2FN%2FPL3otfkswXbkFM0BAIIGwI5XzKgvznZGwF6NN18t34WQq8UU209bBD00lbO2glv1LaWeQ5l86ILXjkIaXrHlBCtPV6%2BHj1xaEOHT815IOqbZVf4qsIQnxD6lfRc6uJrQ1TIC7iPkdhVUvl6eCmUojynbsLChVg9%2BhINA6iwUgXfRyHk5XnrupgFXjb86Gpbylp85VwY1El9zdsiUUbgO6ivXt4YYbEiiwRvERp0kOPmSB6ha%2FzsyMMIQ3bDgrUu7zywwoEsjrf%2FhIJx%2B8l0oAwp8eizgY6pgFoy%2F7I%2BiXKm6bAgpXLhCwUOryy7erpsKju7qhncq9MPpgYBz9fFvyHIjAfayJgGsBig5Er4g8CQne256pH6QVIe%2FCda%2B4shVZsjkgjlFLElvz4P5LqgQqmucj%2FyHDBKVcvbvYs4s2ud%2BcjieV20GmuZbZadSjsosLRUpjWWfWudK96s63bEcuZzEiRu5O3hofYvJjEbniQRG0J1NNXKMY3g8Gy6VPS&X-Amz-Signature=68e63bdc847f7fdaba4d8903367a46ae0f9d80ccbe9dab88f7f3fe1f2c3eee1d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664MHTH7PK%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T060358Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED4aCXVzLXdlc3QtMiJHMEUCIQCuQ38OUSml4QnCJbL1XtCJuv1ldmwqQH7jmqolyorjlwIgNV0tmKsG6JTbA7KeZbGKxUbKuVbJwzOcJl5Fcs73EQQq%2FwMIBxAAGgw2Mzc0MjMxODM4MDUiDEFUX6rEgjlICFLsTCrcAy%2Ba%2Bj1lbSqrBg%2Bu3dpzRqYKufw5rBnB8A%2B2k2gNJiM2HxjzSKLXcdIrqj7dXTPehvMQtavGHfx1%2FdpHSipW2AI3IPqgPsMldrFas%2BQxXkIuGw2tcPFC5TaEsAX%2FCf2HxJYvTEqEAAB%2BmkMMJyoFL6lvSOVtaAjXZ3IOz0xMEa%2BrjQbxmgxtBjC8mK1LW4ShobX9cNE2qPV15ganJfqez%2B01GEhTX4E4UC3iRdas%2BwDO87sRjXWbeOrAFkC7wiEegILhorDFYC04moG4LDk70f9lJPIm6HRnRebu%2BnN%2FZKHF4n3ml3RSsvJWh7f29ZzIV4VJLzu5EfqbwfceQ%2BU0O0DOVs%2FIRRniET4DbX4jDSIjo5JPUr7uRNmVKPrjE59LMkD6VJJU6Mz1akIihvWhFOmzU%2B5nzivqS%2F5JGrVIa1PDrP2t4idZcUyTKrm9MQk8jrKX5D2aJH7MsmgR0yNVpY9m%2FEDBD%2BK2o2XXpoDMlgqvD2xne9BfqL7UlDFqhESa39nI1H7rtsSdR7jKNB44amShaVzZ%2BI7RyDQJoLfCgDoy8b7qM5H%2BVTHUfpzt78ECWoDOVYq09lehycnBRDrIvD7%2FflkgRr%2BX2OPj82Dw4LdGJUolH46U0J%2Br9aORMLD4os4GOqUBHi2q%2BER1vAwkmtEYHGWHlFjEv7LtYhyM61pCQdbXSZBlUNeL9LGlrFD5IY1kEX6xm8JqpGdYDOVe2%2FBsH1%2BVzc%2FbDutvUJf36EzVhZEBAYjBvhqS8i3REh26vc0Tb72pIUXPgHUCRx%2BZtdwn%2FGceYMh83WIq8ts28jmDGIFII94wi5dYJ8LBJxBZbpvqQVMR1dZo2FKsP0LQtTDbxqpFRHWWAyyh&X-Amz-Signature=2b8d95326186e9233fe73ba9cba3f2c8000fcec29b6b2fe17d2331583f653e53&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WNWH2QZ4%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T060412Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCXVzLXdlc3QtMiJIMEYCIQCW%2FhaHxi49XHxh9S2pOj9yWD9aD574x61cPHRsYWojOwIhALh3ga5WBmiyRD3Z2BlupinDNCzOtKu26wCb4zu0Djw3Kv8DCAUQABoMNjM3NDIzMTgzODA1Igw2%2B%2BPNgRoqrATNOaIq3AMYYOfVPLpjxadqLXIbTkqpGUTTPCaFCdWAZxjtBEnYnBbXoyFV4BvvO0Gu2kiwdCr4F0gqSqRDtdcpdTEudS5o%2F2mNwNhwQYExB5nWR4bFIzW%2Fexxa24mvR6iTtrVyGJrDt4KZjRmWOfKOlcZQWvl%2Bd3gsuutaWZ29rs9V%2BUKpAQibFBBPvMExzV5EPM%2F4hxG1b%2BwGfhmz09PPpXCNVQ2eoIcIubSS0OaRPgLryJ98vqrcP2OlPjJYfHVQts9IKZKKi5Y86%2BWcJKNqpdxnvxeQ3dD5AqMBSv4Rom%2BzpWe3dPHzjEhmvtNHULxGsVAl1WWq7UdXBBa7PoyyWAmaqQUEKX7QrMaECbA1zgLYTb0PBqMxgrugu00TT6Qx62ld9ri3AeBkemTBB9nZRIcppn2IqhfFfSHUdWWkpomeKbB2xGKO%2FRKMUOoQyYrsmIrV3hSAWw4TrnJj4YZnGaiPKBpW8c0HGvrZBm%2BvmvZsqWsO3lJzac4kf3teg15vwDwq1BuKkia7t3ixsPZKuk1k6ZGiw%2Fdpz2w2jejzM0s5kQrEE%2FAxmzhY%2FuL7%2B6qJWdIx7kx%2FK0dCMY4cHh5yWooIAfkSKWTtLSYxmdFF%2FWBPo0x89jdUKb%2FRHaScnnNDrTDqx6LOBjqkAY8bhj6eTvIh190UD3jlG74cExtnN8c3VQ9TI1yQR5YxccIufxhHjhlc7FX9VXKBPXtwko%2FK%2FH%2FKMgo1IJB9ns5AbJzQayPLZXoU45DZqwlxqwt4EASjzViQOcyq21CnZW6AEGv7M8h7o5iZw5enr9grdBYqBVStDtLbD52ZoEAL83odbQ2w7UAvfbKWT%2BWzxiAoAlcnmEIx%2FB3P%2FqLz8FIHnebs&X-Amz-Signature=26d86f4341087f834084ce3009793bbc5d5266c5bc7d131f622fafae2ddce4fc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WNWH2QZ4%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T060412Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCXVzLXdlc3QtMiJIMEYCIQCW%2FhaHxi49XHxh9S2pOj9yWD9aD574x61cPHRsYWojOwIhALh3ga5WBmiyRD3Z2BlupinDNCzOtKu26wCb4zu0Djw3Kv8DCAUQABoMNjM3NDIzMTgzODA1Igw2%2B%2BPNgRoqrATNOaIq3AMYYOfVPLpjxadqLXIbTkqpGUTTPCaFCdWAZxjtBEnYnBbXoyFV4BvvO0Gu2kiwdCr4F0gqSqRDtdcpdTEudS5o%2F2mNwNhwQYExB5nWR4bFIzW%2Fexxa24mvR6iTtrVyGJrDt4KZjRmWOfKOlcZQWvl%2Bd3gsuutaWZ29rs9V%2BUKpAQibFBBPvMExzV5EPM%2F4hxG1b%2BwGfhmz09PPpXCNVQ2eoIcIubSS0OaRPgLryJ98vqrcP2OlPjJYfHVQts9IKZKKi5Y86%2BWcJKNqpdxnvxeQ3dD5AqMBSv4Rom%2BzpWe3dPHzjEhmvtNHULxGsVAl1WWq7UdXBBa7PoyyWAmaqQUEKX7QrMaECbA1zgLYTb0PBqMxgrugu00TT6Qx62ld9ri3AeBkemTBB9nZRIcppn2IqhfFfSHUdWWkpomeKbB2xGKO%2FRKMUOoQyYrsmIrV3hSAWw4TrnJj4YZnGaiPKBpW8c0HGvrZBm%2BvmvZsqWsO3lJzac4kf3teg15vwDwq1BuKkia7t3ixsPZKuk1k6ZGiw%2Fdpz2w2jejzM0s5kQrEE%2FAxmzhY%2FuL7%2B6qJWdIx7kx%2FK0dCMY4cHh5yWooIAfkSKWTtLSYxmdFF%2FWBPo0x89jdUKb%2FRHaScnnNDrTDqx6LOBjqkAY8bhj6eTvIh190UD3jlG74cExtnN8c3VQ9TI1yQR5YxccIufxhHjhlc7FX9VXKBPXtwko%2FK%2FH%2FKMgo1IJB9ns5AbJzQayPLZXoU45DZqwlxqwt4EASjzViQOcyq21CnZW6AEGv7M8h7o5iZw5enr9grdBYqBVStDtLbD52ZoEAL83odbQ2w7UAvfbKWT%2BWzxiAoAlcnmEIx%2FB3P%2FqLz8FIHnebs&X-Amz-Signature=26d86f4341087f834084ce3009793bbc5d5266c5bc7d131f622fafae2ddce4fc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466W3K23HSZ%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T060412Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCXVzLXdlc3QtMiJHMEUCIQCV3c7HEFSNB0Vh1A4yRWzVx5LwcUY4RR5fv%2Bzn0gAnSgIgfG63eZu%2BLBQxj75%2FQ0VTJtX683SGN7hn6%2FUfClXVyHwq%2FwMIBRAAGgw2Mzc0MjMxODM4MDUiDPe9%2FYXxjt4j9j%2FrGyrcAzLDfxup61NmbYgmvpdE74i4kznwGsqCg5om3fQT1RR7uJpBiN60eO3p9NJtjFpao9X4lvIB5nFi5xaBCb8xxU0o0%2F%2FAdVZg0wt5RF2w%2F8ftmYs2U%2BagUcC6W0VOSpUGupay23fguEer2PaMBjmYicz%2BzhFFtdwecP2vr%2BMMKtiH9pQFW%2FZPUwEk2EK1e1FE%2F0iV3HS3%2F86h9XlMDxk6XGBFf3qgbb%2F%2FNLPzj1Jf49lxLmqfGExcNkQg1brviIJDvArECgB630MiGeJDMLR5VEI6vy%2FGl2rK%2FeVLPmBXPDCtygqe3JjVorAlKeeyTI0YYR2CRMx%2Fy%2FD%2B%2FBdNLvYxbYiUUxanjGSzgcWAO%2FtGnf%2BqMWR2Dd6QiIb%2FrUdk%2B84NAc%2Bl4jLvFepZYRMvY8%2BlFWafVJ9K2xlMDO8g1a40AVLUK1pjXi%2F1BNhD6ozS3UvhIE2V2GAlHp39Hhs%2FGhBLO%2BbBrUUAGSVnVc0B40NRyC6GGv1Rx%2FaMDuDOu1EFgwPGoxqVt%2FzEwlqpiKAnkCa0aA9RINX3Yhvh8CjDib7aiUJpdTKUvHHIbKXjmH3jnbaAseV0uyQM4PKahKk%2BtGdA9gsM0wNmx1u2fOSQABOaxBkBg9XpAQWsWoahm8gwMN3Hos4GOqUBhojGRJ%2FdSoGjZrC5gICs9%2Be5HRfLqIZrz%2FjOdDc7HPhIfPgZmp6R3mVh1KDeXbPbalpJfdktT5dMs5zbaoCOZOqu9EMzXDwFPXdrCODpNXB8KJdHxgjcvjsX05TORih8xZ4Q4YQ99lFTtm0kZkxfwcq4THEvKsV0MrvDOkUuTfVoNJUojCn2peEOOiY2aGiY3S3Z4i5DABQrX%2F0w3mzF6Gj%2BA6T%2F&X-Amz-Signature=1fa607f7097853d350e203390edde3a66013b131c938ac6948e4a7371d42c442&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

