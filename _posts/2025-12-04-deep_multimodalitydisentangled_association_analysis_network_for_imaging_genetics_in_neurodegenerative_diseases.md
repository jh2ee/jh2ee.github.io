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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662TYWWC67%2F20260311%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260311T153447Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDR5Iss2%2FBsxRiGcbhzY%2BH0kVj9g%2BVGKU3Kax2lsjQBmAIhANQ8Prh%2BcJT91tqH6nWB8k131sHczTugEu3QNoysEaTcKv8DCGAQABoMNjM3NDIzMTgzODA1Igz1AGhiy3Bc8HkLVjQq3AOzczSHVazJYu5vZwZeVk2BAqWcF%2BmeeYU0bDE0%2Ft81AQvgcM0veMa20CsydWc%2B%2BaUahAX%2FPqDoSCJD3CyRqG3w6cq0KPN8COBgA8v5TQfwh%2FhvFLPtR90OmT72yjkEx4rpeFaX7zqQnz7WGRU72PbaLWkHngEQw%2BUO13MlFS%2F91ya9YqLZivML0bGgGpaJFRX%2Bo3RhNvatMqX2nXhKGfnM68WY%2BfKLwnH%2Bl8MNYS39KeaCfvyNHVU3nRlCGumdS1yx8hlhJKniJD2BrjbD5jnmcnwPw1WjgfN%2BgZQryMFM0VndtZBR6utRrfNU3hOsd4Y51zMhZDcISn3lAB9u3HN1jXGJDA7StXCoDYtXHTKpgUEJaCe0ZwQUMYfMs%2FzKObH6hjfoFUxQiEx3kYHqGg4Ba5w8GOguTEU88P%2F4GExKNVJudckyblkSET%2Fx39T17WADv0rRTcjw9bxiT1gC5Fr93TyZjfV86h%2BAKvJ5xYBsl0w45ViLa5ErMDxJyfmSNd6ak2bWwY8Zac5SadOMNTpEEmmdcN5q%2FbmvkvK4mK2gWqECczy0iViiFKGlL4iOxdEZ7zAqoXfBUXpgRz0JeWO6Z3NZHxXk55EDeLKzSWolVVXk976w%2B7NHZ6Dt5zC5jcbNBjqkATmbfBhfdVuLB8s0Ain7%2FW3t2D6mSlmEGk2AZsqadUim4eUtu7IxInri5AElhp1OHSEKsL8IqRG4r0R3Q%2Fqu86BWssv%2FbYym23jrW2xkJffFjAjxw4rSRRcoVOeTP2ez4LTQE0rsgXRZgh9GgQvSmzr7SOBXe3EikALJCKcL6575pfr8EFShzMsqdlz2VJzbNRjl4CRdzIS05OFF5fOTjRYwlH0r&X-Amz-Signature=d7f1ad257484a0d61f6a74fd5b8e58532bc8239583a3c35ddfc0764f35d6f3eb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662TYWWC67%2F20260311%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260311T153447Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDR5Iss2%2FBsxRiGcbhzY%2BH0kVj9g%2BVGKU3Kax2lsjQBmAIhANQ8Prh%2BcJT91tqH6nWB8k131sHczTugEu3QNoysEaTcKv8DCGAQABoMNjM3NDIzMTgzODA1Igz1AGhiy3Bc8HkLVjQq3AOzczSHVazJYu5vZwZeVk2BAqWcF%2BmeeYU0bDE0%2Ft81AQvgcM0veMa20CsydWc%2B%2BaUahAX%2FPqDoSCJD3CyRqG3w6cq0KPN8COBgA8v5TQfwh%2FhvFLPtR90OmT72yjkEx4rpeFaX7zqQnz7WGRU72PbaLWkHngEQw%2BUO13MlFS%2F91ya9YqLZivML0bGgGpaJFRX%2Bo3RhNvatMqX2nXhKGfnM68WY%2BfKLwnH%2Bl8MNYS39KeaCfvyNHVU3nRlCGumdS1yx8hlhJKniJD2BrjbD5jnmcnwPw1WjgfN%2BgZQryMFM0VndtZBR6utRrfNU3hOsd4Y51zMhZDcISn3lAB9u3HN1jXGJDA7StXCoDYtXHTKpgUEJaCe0ZwQUMYfMs%2FzKObH6hjfoFUxQiEx3kYHqGg4Ba5w8GOguTEU88P%2F4GExKNVJudckyblkSET%2Fx39T17WADv0rRTcjw9bxiT1gC5Fr93TyZjfV86h%2BAKvJ5xYBsl0w45ViLa5ErMDxJyfmSNd6ak2bWwY8Zac5SadOMNTpEEmmdcN5q%2FbmvkvK4mK2gWqECczy0iViiFKGlL4iOxdEZ7zAqoXfBUXpgRz0JeWO6Z3NZHxXk55EDeLKzSWolVVXk976w%2B7NHZ6Dt5zC5jcbNBjqkATmbfBhfdVuLB8s0Ain7%2FW3t2D6mSlmEGk2AZsqadUim4eUtu7IxInri5AElhp1OHSEKsL8IqRG4r0R3Q%2Fqu86BWssv%2FbYym23jrW2xkJffFjAjxw4rSRRcoVOeTP2ez4LTQE0rsgXRZgh9GgQvSmzr7SOBXe3EikALJCKcL6575pfr8EFShzMsqdlz2VJzbNRjl4CRdzIS05OFF5fOTjRYwlH0r&X-Amz-Signature=d7f1ad257484a0d61f6a74fd5b8e58532bc8239583a3c35ddfc0764f35d6f3eb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667MO4MEN4%2F20260311%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260311T153447Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCdAANVRNK4Q6Y3V5xBfHG3a8YvwJeaqm20HzeNYD5g%2FAIhAO4hwPtvUraCnLMulErLbo6MQ%2FdvSTge4FYZGysHqM1iKv8DCGAQABoMNjM3NDIzMTgzODA1IgwvTWVocIrs5iiR0w8q3AMD7N7IrUxn1RI%2BZJTEwHz4D5vuxPY3xXyKrDjfwbv%2BRt4%2FiNIyAU2Thp7mjOl61PIb50YOQJVi42OTZjUmQdCP2BYWa1tKn03ZMXgghb3wLr3V9bQuHtUjFUvNOLFMibtkLo7DubIs5m7NBScZmS5es2LELR875AlUvF3Da8tcT%2Fj3J0yZzlJKeiV3HJxVcCyx7oCsov1nCoPbBjrpO6aDDry6xlXhyussNq04IhTK2u5blVSbRodK5QGC6zL7XfRFKQXqkXKwok5w5OnXVlCFZRbbPBC46qfTCN3rkSRg%2Fg08%2FPN5BIJ31g8kCdtkEulf532OPn5%2FkWqEhk4zkL3j1JuxkVlsF5JeRt7j9o%2F7jv%2BPmmzpDJIsKWDRDF%2FOSkPN5K%2BPbcfi9TCKDWLVSgtcWy%2BSGSFligH%2FD9fW6klyjAHUXMBUi%2FLvie0o%2Bv1g4nYuDk6HFVsk3LlqcLqgtcyeg663X2jR%2BzjNfn4C6UcwJUctO2UFVf2nrVcn50XNlUIbjowGaWuUh1tRo%2Fq9hO%2BlC0zGUmuBV9S0NnX1ZJa0BsW1umjCz6XbqGHgElqZ6FtHQogIN%2B61cH9th%2BlePWdmyq6mPiozHuFgiY2GEp8xjZUznpdV9Zoi63VaPDCR%2B8XNBjqkAT6EvYPvf%2FKWcp%2FWsYmXF9sQnKi2%2BElZfafuWNZ3NrE2UHTt0lOWiHGVbzT2AUb9oB0dt4chnSQKMEpjh9sCjIEwHmoG4%2BkETGSxhsgduOPiW6WtZKzSAmVMI2pjKSYZHStL1xlQ171D2U%2FRBPxxoczho2q%2FJ%2FsI8Le2xmXhrqhyNRce0I5JZgBMyP%2BcHec6mPO3WWBLj8Ke8D0vkSgNe5Dug5vR&X-Amz-Signature=04c330bd08eeae723c6c2813c1876ea39e3d15f523c050442a131b96e39113a6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666L4YJMJ4%2F20260311%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260311T153449Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQC1S53dyNPQ%2BslrDCucK31Sj6ADFdrCepCcRSvRmNa8bAIhAOyeWdRTWgw7qqYULWOo5TYOAsB3qsQa1EEW0o%2FA5r%2BeKv8DCGAQABoMNjM3NDIzMTgzODA1IgxBfh8bE4Nsa2v%2BRk8q3APto8Vt3DApbaI87prdAvW7Z9DvSRwCeylMwruQ7iLK%2FUSLDkfuWd%2BmR6kVMKF4Utm8dOIKT0WDdPgq3rPjNRBDIJ934%2BwBkiigIgAm3DB%2BrNsTFeT7EYXHdOI9tz18ydzAbrWAioCfh%2BHUPYdB83H7mNOR2eICc4WshiH3fC%2BharTXsGcbWOBp0UgJeaqNMbqiiHA%2BDHeXYBXVtLJprKW%2Bv2WH5xKQbqxFtqgVjmJk5h2TlrzPVv4OreOC%2FKubx%2Bu0Lpd9faZKKPEYh6jOQ5DLLY9pwZROgCZqIWq3QZG4pHy2AeN7QBuHsqfJEq3aePiK5eKpnpxPY6iO%2Fmb1LcEqk16wMWQEV4RkR0AMWXuSso1e9PXWBsdtt1U9oG6UyQgaIdD9bTQOWFk3Q%2BoA1SwswwVjBLsgWAlnFfnSsZdrHXcqhmrOmVjS%2FQxfaeYAaDcui9Xc8G5ycy42pIQsotTiEe37uIMW6LFqJo%2FQHXOp4H4F4Yd2bdXM9SJgipRgDMCoqtXn7jlpkSuIokYlw8EzzvNAL9y668iBsB%2B8hC1hkmuTFryBEzVkY98XonOtnYyCOk44mWX6WqGNULyj3nopwW0icKNoG9cb4M08ofDD1c12WI%2FguHJiUg%2FgMDDo%2FMXNBjqkAbK3zbanWN4eEDqDacMFD%2BS4bavjbvMO2TYn2ge6X9umu0S8w%2FTQgclg3yKuyDPA0HcunpH2NP9WLLYn37iOS68cQ8nfhhyv6mt1dNdnke9ZqkwKhM9Mn0rNESFhZQaIOja8Q0a8Pb%2BmIzcMzfKWlC6VaIqZkS%2BbwEfMpJWWM04d8F%2FeLrdKR1TVdpgfIpwY2nGm7ijb7N18t%2B5dcwniPvw5hIW5&X-Amz-Signature=3863cc1c024bed9f7f470a7ad28fea38e8f44e150426559ffeb59c64dd4fcf44&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666L4YJMJ4%2F20260311%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260311T153449Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQC1S53dyNPQ%2BslrDCucK31Sj6ADFdrCepCcRSvRmNa8bAIhAOyeWdRTWgw7qqYULWOo5TYOAsB3qsQa1EEW0o%2FA5r%2BeKv8DCGAQABoMNjM3NDIzMTgzODA1IgxBfh8bE4Nsa2v%2BRk8q3APto8Vt3DApbaI87prdAvW7Z9DvSRwCeylMwruQ7iLK%2FUSLDkfuWd%2BmR6kVMKF4Utm8dOIKT0WDdPgq3rPjNRBDIJ934%2BwBkiigIgAm3DB%2BrNsTFeT7EYXHdOI9tz18ydzAbrWAioCfh%2BHUPYdB83H7mNOR2eICc4WshiH3fC%2BharTXsGcbWOBp0UgJeaqNMbqiiHA%2BDHeXYBXVtLJprKW%2Bv2WH5xKQbqxFtqgVjmJk5h2TlrzPVv4OreOC%2FKubx%2Bu0Lpd9faZKKPEYh6jOQ5DLLY9pwZROgCZqIWq3QZG4pHy2AeN7QBuHsqfJEq3aePiK5eKpnpxPY6iO%2Fmb1LcEqk16wMWQEV4RkR0AMWXuSso1e9PXWBsdtt1U9oG6UyQgaIdD9bTQOWFk3Q%2BoA1SwswwVjBLsgWAlnFfnSsZdrHXcqhmrOmVjS%2FQxfaeYAaDcui9Xc8G5ycy42pIQsotTiEe37uIMW6LFqJo%2FQHXOp4H4F4Yd2bdXM9SJgipRgDMCoqtXn7jlpkSuIokYlw8EzzvNAL9y668iBsB%2B8hC1hkmuTFryBEzVkY98XonOtnYyCOk44mWX6WqGNULyj3nopwW0icKNoG9cb4M08ofDD1c12WI%2FguHJiUg%2FgMDDo%2FMXNBjqkAbK3zbanWN4eEDqDacMFD%2BS4bavjbvMO2TYn2ge6X9umu0S8w%2FTQgclg3yKuyDPA0HcunpH2NP9WLLYn37iOS68cQ8nfhhyv6mt1dNdnke9ZqkwKhM9Mn0rNESFhZQaIOja8Q0a8Pb%2BmIzcMzfKWlC6VaIqZkS%2BbwEfMpJWWM04d8F%2FeLrdKR1TVdpgfIpwY2nGm7ijb7N18t%2B5dcwniPvw5hIW5&X-Amz-Signature=08e5aeaa207ec922819182a5f59e88e58d7fcaf1d3fded9800888ba329e15874&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Q3TZKXHA%2F20260311%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260311T153450Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIE4aJp9d09ne7yjvdjG0TrXFGFxn8Iifh5to8jDoYULkAiEAgi6h3JCrE4raS%2B0bVdhfpO9SryqEys14jSvCUx%2FXZScq%2FwMIYBAAGgw2Mzc0MjMxODM4MDUiDGyoWthKch1hb9ajbSrcAz8KlqtBbc9L%2FKhCcObQuDzQV1Az8SJ9e%2FHNZVsStyrq3n1YNmLZ3lV22aN7o2Yt%2FOTHF0k2ZJoqFNq%2BaLputFNmHup4x45nGif1Bp%2Bz%2Fz7ifjWWa%2FrwXZtQLX35Fq3d7K44QIVBTSHDWjZ16YS42obZmbfoE534ZQ6ze93mTRzqVMOE96Xa2rC9g6XYriHqW0VnPjmLtP8Ab8wSf2POiovsut1lAZeOqbMp4%2FVKuX63Isw%2FjpdHt9z7j7IdRaQwbg%2F5iYq75nkpw8O9j42wDCr0qieqx2ErY2YB0tV%2FwZm7xbrRNsKugRYIXn0rE0p3UvqcAmxspfQWv%2FnMFTytkSZAGg9sjFvYfHjtlO0LQa8RKKrnqpxZzq6OMCmIDQqCRmQl8yvtbOVrOCPEr5I4bRmehiLOTAiRjLPqMuLJ%2Bo8lf0e9MFYQezbjuTe3zxjHXAGy6L0l4UlNddVCa25qxvtn6tYFfnA2XfuFXReofiB5u1YbJKi7vmp59ByWR6lktOtgIt5mG88C6hXWOh%2BvfXiRgJ2YujQn7IS6MM4Jl0bn%2BM3jMZnXMN74oQwOI56MkxSgjHXcFRUDEJI4ix6Pr6QGTcMjldVuWyMQCx1DlQCidl63M9qU03fZqrVVMOb6xc0GOqUBb9JSL4cNh8%2BqXa1bBk5leo%2FzgLAAyTTSDgxbg%2FT08bFN2kaWL85OKDXuutzxIXOCaoyLnHns%2Fm2NZA8%2Bp5InV7cwl5M2xcC0utHAwJtg1fXYdM%2FQwWRtl5e5lgqY4RgxnJBlT%2FyaMELc1IB26c%2FjEVDO%2BgPZbFcmm5tOomABTnZotFjkb6GzBzeVhrrU7M%2BQkfPp14xJM464PNF1wBaWx3KKuSxq&X-Amz-Signature=ab1fa531944ef8dcccc70a7a8509aae9abeaddf3242e65eadb8caf8143268b04&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RVHSJZD5%2F20260311%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260311T153450Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDXNeRi0bCqUEX2Zo4AXi27GNgyzxGd3C755YSugPSN4wIgcfXx2EBiBIiPsVX3P5J8wy6ryuhjbwbMRepmaKdK67sq%2FwMIYBAAGgw2Mzc0MjMxODM4MDUiDOVpfJ3%2FP4FGLxwZgyrcA8yPrbMYc27%2BMc6rPe4JUMbhMMgIHEBjOutHYjQfK1hfTzJ5YYTjbf0t7y0e54swx3OULyL7yC%2FcjmPwUf94QzaDN8euy8%2BcAGxkNQHJ5q2rwsGiYERwkV31fVSd2l0PgASUV4XOZIjm8FqdpsLKTRDNYvdYUDZRV8NiQiddib1DQCPwcHY3%2BJfuxHG1z7If3lWxjLx86oD29DMhF7gw92930w2MvSM0GtFZLMwzsbM2M8kuDcZvlwWh5sqwMvoB9%2FVQPqWvGyQwK8tsLa05WuLnRV4x415A1HQ5FU5lE29kjRA5vmZf9CweyI9qpSwUnOfRGkIu%2FgAKPcfDCBPYvbYB8Avvw%2FHCdpq1oIx7m5hFOLg5OsBIbYdv8pmiY5tb%2FBsryeUgqP%2BAdRmZd6voDsPGz3ajMzdyT9JN7ulKbG%2FPesNgsgf5DVNkrPepktkxwapELLmU0dZ7B%2BPfAqZeZcC3A24rRMku0UCRAlUy8YtZvddidYGqB2qVfK6m7ZnWMcb8zKnJ11N8GiRl7VTFT7SWEvXNaz%2F%2BZbJb0kdKusiQVvmRWk92UikGqq%2BTYHVbbJ3Z%2BGOjo1AMyro3sJvC%2Fmcf2Di%2BmCItw7qOrgVhWxnEggMPRfy62YpNhHEqMPb6xc0GOqUBH%2F%2BMJkFPyp4nSfHaFuZVlH9R4T9QPxme6fyLsU8%2BYaSJEJp6dpWH0qQpaMa1guUXBAjBcuwAA%2B5sp4iweHwFWAFP4vWb7REkYimuT5%2BufVoFMMhsllEejUvmR7JF68vCyvJc%2Fot%2FzQAA4zZQ4dz3riLDGlwFdL4EPVnUNkBmVUuJLmnISKqHqtnYldd7W5M5aX7YqO6jemqU%2BYjy%2Bfoxx6pfKjRn&X-Amz-Signature=0f97f7b80cb8832f95d877f66c039f4c5ea6ff0a2c49443c3f945e54970aff91&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RWULRLED%2F20260311%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260311T153456Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCEpcp6oiOEmDG4V79S7y6UM43URowRt0GxgvXZdinDlQIhAMOuAUbB%2FywY8lzfoWr9HP2T6tPH9XJA%2BWwTY8EVVoEHKv8DCGAQABoMNjM3NDIzMTgzODA1IgwmwJMOJnvfgs126Ncq3AM4Hq49%2F285UzSM7u4PXGifDnJ4XUBTZch1f2mY4txWiZQ6E09KA1IXezauG8aQT5ayiW9GRhndaMb9FOUaGmKx0EuTN%2BQ2b5cS3WkaWJ45795ROolyolR%2F2LkmGpAz52mHb9E7xdHn8K6OfVnlN0CgXCGdXjqRj7jtotDiSeLL9A9r%2Bc6pghIk4BJG5HiIa8C1hqzXkbKSlPE4Mi8qkYkqhCi2pFm2NXMStX09SaY3QQ2pKlzykgH12R0Iz32obowApyAn6rr6lJIg3fL0HOVMlS5%2FeAtcweZbtMBl0%2B5zNxcjVSb%2BbfLNSL8FHdu%2B%2Bhesjgcf4KP%2FAWMJ3XJ1OsmypxnDxLjAsRJAVNX9UvnfBflC5xYlAajGWGMa9Gr5fhZiNe%2BfIXKWrMPNd9MwN3B0%2BPW4Tx9x6iTPo1whNHPfgd2XwxZ6%2BdmpLxJ6QO6BgUqs1PjYzPFXk5D855yR7nRzF38xurdI6sxOqmFl0xNNyVxWpdhVmTLEcFbFjQC5HsOoAk%2F75uiPx%2FqVy37pO7HKSpsdqZZuTCNnggXiw8C0NlCxA28rQp6E0f2LgHSmSa%2BcjCDDZFgUZp0GK6hqwhstAT5RMeGaSuCDS0GEiFmRYCTeY8EcoeiwYJ5%2BljDE%2FMXNBjqkAXnUk2UrgxAFNxlIs2Hicf6aMJWP9NiCBuHho0VQKWIjoF32McKd8izIxthUiSJ%2BClJuHZVgcAi5mMscJ3qZr%2BWX784z4F81nPXaY5%2B3oSYPRE4ypHUFeRBnnoLucf7M8GRzGLtPv4I1oNXEIEHxrANqtuj9kjAFqPx1FvOHd0Dqvqu%2F2EoKg6Ckp%2FSHZthxJFXy2BKCmZWKA7l8QHqScDvtMP3P&X-Amz-Signature=0a71ceededb503f5189798cee72bf38dfd4ac7765609448ec7a224a51a6b0b54&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46632R46I4X%2F20260311%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260311T153457Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIBGm3AwQtDspFkbRNBJkqxHqycva%2BftHxVTu56x%2FR3VyAiEArpFhpPc61lrRr5NX53hU176rU3YTCBQO3PCDnegSI9Yq%2FwMIYBAAGgw2Mzc0MjMxODM4MDUiDDEPTuiLBRBE4bs60CrcA5gKXLvhp9lKGii6lS%2Fgm5idO1MLLohngKEH6Sb0%2BG7YTdIzGc9yrbFHzXawdvuS6awtYB84EgifWLLjC1jrmEeSS05O3iDAivwC%2FJSsYkTMApZ%2FjHFhgl6KBAdRBYVH8cZNbGhc9V7x2DXoexPyQuptjQ5h2vfhjAYxnFhUn9KSqhnjf%2BMDX54QQWRZ8FW9LhVD7AhOOSNaHufXxmpSHi4Ndp%2BcP2pbzSYa1RtZs%2B8GjfcCNaguk48Z%2F7oRZYlDPXhf02dotoFQazO5NNQ2QDa2546%2Bow8NSJfF4B2vk34xQH7GreAxC8f67vxYcRS5DhQCHoHbG7TpMDqD2ebmACNiPJcdqR%2Fdu7kWnrVDZ4J0qEGDCOilVulrxb0grgdO0UdZQzTbwfXzt9X9PV7JXmp6W%2Bw2XgiUENhzJhrjCU12XoRnrn9IFMu%2BXCPPZqHwsd5Gkmhv%2FZ5ckuUf2lfXyuepMPD1a%2Fox6KNwJCSBMfMkqv3WFLaCxRWLhdDC8fLM6D92dBIGMHym7ZtDNENMDW4Qe25mxQ6bOT%2BuVQSuyZXVnXhNTg7ZFhNnYq9zKsyOiPtPdkHUzBcUgVWf6T854ylHw1nDjJYd6%2FqAss8t5BYhh8JY6VZBd2YtmuSQMJr7xc0GOqUBJbTywcrCGgxgMRKcRMmK4MkHopxAyn9ikCUFYaz3PtsvjIxWE1LnQGRp9QJ4s4Tqm67ma%2FgZ7wB9MtWK%2B8O9qzYqHZ3m6buFQ4Hm6jmjzdCWhuuHnbqvrjO1v1ufDXPw8DcpoE4Gh4bmFgPneyfxYvQvdV9g9o3r7fob9P60Al08GHoelFKNvdaAKbY%2BS4wHqvkZd68GX7k%2BYxf614Yg0rN%2BSvPk&X-Amz-Signature=98a9070c0e95b27abaaa22b4fa1ca0197fdad4816d32845da8385a56a146066d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46632R46I4X%2F20260311%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260311T153457Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIBGm3AwQtDspFkbRNBJkqxHqycva%2BftHxVTu56x%2FR3VyAiEArpFhpPc61lrRr5NX53hU176rU3YTCBQO3PCDnegSI9Yq%2FwMIYBAAGgw2Mzc0MjMxODM4MDUiDDEPTuiLBRBE4bs60CrcA5gKXLvhp9lKGii6lS%2Fgm5idO1MLLohngKEH6Sb0%2BG7YTdIzGc9yrbFHzXawdvuS6awtYB84EgifWLLjC1jrmEeSS05O3iDAivwC%2FJSsYkTMApZ%2FjHFhgl6KBAdRBYVH8cZNbGhc9V7x2DXoexPyQuptjQ5h2vfhjAYxnFhUn9KSqhnjf%2BMDX54QQWRZ8FW9LhVD7AhOOSNaHufXxmpSHi4Ndp%2BcP2pbzSYa1RtZs%2B8GjfcCNaguk48Z%2F7oRZYlDPXhf02dotoFQazO5NNQ2QDa2546%2Bow8NSJfF4B2vk34xQH7GreAxC8f67vxYcRS5DhQCHoHbG7TpMDqD2ebmACNiPJcdqR%2Fdu7kWnrVDZ4J0qEGDCOilVulrxb0grgdO0UdZQzTbwfXzt9X9PV7JXmp6W%2Bw2XgiUENhzJhrjCU12XoRnrn9IFMu%2BXCPPZqHwsd5Gkmhv%2FZ5ckuUf2lfXyuepMPD1a%2Fox6KNwJCSBMfMkqv3WFLaCxRWLhdDC8fLM6D92dBIGMHym7ZtDNENMDW4Qe25mxQ6bOT%2BuVQSuyZXVnXhNTg7ZFhNnYq9zKsyOiPtPdkHUzBcUgVWf6T854ylHw1nDjJYd6%2FqAss8t5BYhh8JY6VZBd2YtmuSQMJr7xc0GOqUBJbTywcrCGgxgMRKcRMmK4MkHopxAyn9ikCUFYaz3PtsvjIxWE1LnQGRp9QJ4s4Tqm67ma%2FgZ7wB9MtWK%2B8O9qzYqHZ3m6buFQ4Hm6jmjzdCWhuuHnbqvrjO1v1ufDXPw8DcpoE4Gh4bmFgPneyfxYvQvdV9g9o3r7fob9P60Al08GHoelFKNvdaAKbY%2BS4wHqvkZd68GX7k%2BYxf614Yg0rN%2BSvPk&X-Amz-Signature=1bcfc4570d00f56ceb3b49dbf640d74070cf762963b7800ec13b8667308f2be7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VEG2GRDB%2F20260311%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260311T153444Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIC4y37XaHKRRn6sIkzuiFG3NQ62u19yv5TG18rVeDyF4AiAWRoh32%2BzYiYK2PWeSfC2rdysc5%2B3Gn0nS91jVYUdH1Cr%2FAwhgEAAaDDYzNzQyMzE4MzgwNSIMJW%2BuYPW1V319eSpBKtwDH7KSNUWt%2BEICtPe3dqs0JdtGBQypLvrLF%2FJixuhICQoQvNv4DldFelQBmW%2F6L4Wx5Nwm9ykDwGIdZxDkqVsIL%2FbY9nqZUz%2B3L3sXENMLoWm6Z%2BSsLm%2FlSiPhGUx3Q9iVbkaYD7Je9%2BBKrdogJO1N21kkAHr%2BhdIp1jXVYI5lpj%2FXpFyr18iEEIpHgQKwFZozWLiC8Zsd39hBFN3kpES0DzbUlOfc%2BXv35fjB%2BHpflhZJpGQn4N480Gs%2FMFl%2FDdRpHjbvDt37FZzob75uvosw7F%2B2jHkIJmcJRS4uNcy5dfP48Fef5q7rxnbHelPYVU8YydL2baxrRNb2gYEX3M0EgaAYlifXQY0mnuU3oEO0BqmMzbFFljuQBsjxTcrCEc%2FwoKIGnPsZWmZV1A3ihHQJjWsO67hUh5NDhWo7jyQXI8uuBvQnn%2FP2JlFTk7BxT3k58VNrO7jpet0uikoj%2Bq8jGVcsZKDsI7aquqAvSR7PO3EDN8pCKiCP85iK7KCoz6NIkxeUZqR0uZZ26fQ4YkNG%2FLHRWjYPOyiUI%2FtEDIMO%2B197U6LVoapiFW4ltvbtoEMai3ZS2tbV43qBO3VDQqBOOcecjbb%2FLIXx28QRHelo2u4JGd4Zpss6mfw%2B3OkwxfzFzQY6pgFukIJdQq2%2FEAIPxh3CJlKx6DwI0Z%2F%2FcABeuw6Ci8fs%2BFG5p1G5wBNYjXzC8%2BKRg5KUXjWFIHiwLUXkxh6yZaHHrP1TzSmQ1l1QSdf5Tdxi%2Fr7M518vaKoOghHK1j0RgliskJt7%2FkdzSw1aIhxDgXbiSs6%2Blr%2BYAoKKlYoAq7Y3Y%2BlYNlUYrPthXtJ9toRCD%2FvbrrGCnurEmsla%2FyeD2l3b%2BPExeW%2FT&X-Amz-Signature=7536408f3afa35124423756adecd6e99cadbfa581820818dd22910b472e8ba24&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UNEXE2RW%2F20260311%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260311T153500Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCOKOFTS9tSVbI1Qg7N44XLn6inuiymK7nPcgI9KoW2GgIgYoJ%2Bw198tWS7K6RwY%2B3Y8lPMozKF%2BLovS08jv2THqkYq%2FwMIYBAAGgw2Mzc0MjMxODM4MDUiDFXQ75%2BosgoEyMt12SrcA1xNm1UgKKELQ78WyZTtoUduc3Z54DKqpDTUEH4KnCEd7r2Z0eit7VOZzLfoLC74O1lVdPmIB4%2BALrgXyqDfbjVkAB1jwPyKQ%2BoVKjsW%2BOpQeg0bKdFyK7FfdgetvUEuRougj9CRMbR5MTnC1MQth8WhGGXHFwJ8iRYoXLYYxbfftXYEHOuJDI9A4Dm6xYTEo%2B3gbaWUZ5VpN9Nz%2FFJ1Yslx2tM%2BNiyJQvV4jFj%2FuNhEWkxFXiQhZpFQhH6%2B2sL0vO4G5p%2B5ZxloxoaQgo9CU%2FVy1uX1lGM%2FJLXh%2FEY5x94k6VUx0YjCEv7tv%2BKFkteLFBBxVRd4%2FtTysdY8D5vdrTIxo4dMwi30fP0w0xyG6W%2FDzHKToBwW5NFlogIK7QGLyjCjYhcKZZ168O98%2BVlP9x80mCjaxz0nsP8qxVAk0KiSiGdGXHd%2B0UtFTI3zUoW5F4rfENZ9w22Z2wtIXWU2W62NlWTqfOrJ%2BwrnQL8OMRkwxwJM9ITUoFouMExOdKDJjxAXmRye8ZNgIiDzEmp1le5Pah%2FUjF4XP9xeTqXMO9T3IxommNqqTPNaCKlLoCxi7%2B3O2ZlSSlkBkvp71B0UXVY1o6o%2BIVJXdSID9NCkpje3mMODzFD%2F%2BW4PIIQ6MOn7xc0GOqUBV8jC4wD%2B%2FkIgEU%2FpNFHDUBRzFeMVlrOebUM%2F4gp69fwZSOAsdl8hN7av1vycLZz09gLSXAzwZJUf1%2FR8w1pzepB0ykW%2Bz6E4kbCQAC8JF9%2F3nManoaUMHVp8YFiex%2BpUuwwpn99O6nocsq7fHtpH1pQ%2FUGGfefmtOcwiLRrq16T1C2KHK01lbs%2FZBVFCNujGxMg7NLqfumU7X8shdP207JHvAmGa&X-Amz-Signature=56659e5b26203b0d564153b4602034a152e71c28dd5412f06ac9c7b39a9a329c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UNEXE2RW%2F20260311%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260311T153500Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCOKOFTS9tSVbI1Qg7N44XLn6inuiymK7nPcgI9KoW2GgIgYoJ%2Bw198tWS7K6RwY%2B3Y8lPMozKF%2BLovS08jv2THqkYq%2FwMIYBAAGgw2Mzc0MjMxODM4MDUiDFXQ75%2BosgoEyMt12SrcA1xNm1UgKKELQ78WyZTtoUduc3Z54DKqpDTUEH4KnCEd7r2Z0eit7VOZzLfoLC74O1lVdPmIB4%2BALrgXyqDfbjVkAB1jwPyKQ%2BoVKjsW%2BOpQeg0bKdFyK7FfdgetvUEuRougj9CRMbR5MTnC1MQth8WhGGXHFwJ8iRYoXLYYxbfftXYEHOuJDI9A4Dm6xYTEo%2B3gbaWUZ5VpN9Nz%2FFJ1Yslx2tM%2BNiyJQvV4jFj%2FuNhEWkxFXiQhZpFQhH6%2B2sL0vO4G5p%2B5ZxloxoaQgo9CU%2FVy1uX1lGM%2FJLXh%2FEY5x94k6VUx0YjCEv7tv%2BKFkteLFBBxVRd4%2FtTysdY8D5vdrTIxo4dMwi30fP0w0xyG6W%2FDzHKToBwW5NFlogIK7QGLyjCjYhcKZZ168O98%2BVlP9x80mCjaxz0nsP8qxVAk0KiSiGdGXHd%2B0UtFTI3zUoW5F4rfENZ9w22Z2wtIXWU2W62NlWTqfOrJ%2BwrnQL8OMRkwxwJM9ITUoFouMExOdKDJjxAXmRye8ZNgIiDzEmp1le5Pah%2FUjF4XP9xeTqXMO9T3IxommNqqTPNaCKlLoCxi7%2B3O2ZlSSlkBkvp71B0UXVY1o6o%2BIVJXdSID9NCkpje3mMODzFD%2F%2BW4PIIQ6MOn7xc0GOqUBV8jC4wD%2B%2FkIgEU%2FpNFHDUBRzFeMVlrOebUM%2F4gp69fwZSOAsdl8hN7av1vycLZz09gLSXAzwZJUf1%2FR8w1pzepB0ykW%2Bz6E4kbCQAC8JF9%2F3nManoaUMHVp8YFiex%2BpUuwwpn99O6nocsq7fHtpH1pQ%2FUGGfefmtOcwiLRrq16T1C2KHK01lbs%2FZBVFCNujGxMg7NLqfumU7X8shdP207JHvAmGa&X-Amz-Signature=56659e5b26203b0d564153b4602034a152e71c28dd5412f06ac9c7b39a9a329c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZLQYOZE4%2F20260311%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260311T153500Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIEzN22RiOcsappNWLFsOsSVHvxiVKE1lPwjnWE7OigIwAiEAjWpjFpa9p%2FV4AtC%2FJmzlKGu4g6M%2Br8jq7tlRRN4Bblgq%2FwMIYBAAGgw2Mzc0MjMxODM4MDUiDM8I7s58qFTb%2Fr8oFircA0CMPEl8q4JYyPgY01RJ7iQRHIRPQtr2XPLVqlY%2F6TS6t%2BnTD2L2fgQMqYPdL%2BFTN4I64MruRr%2BP7kDph86%2FlcX13%2FgZV90IAysSgbmWhOrNA8IBa2IvVA%2Blxv5HWNSWMv1Ai%2BbZqFUZpUBDi%2BlPV1bGA0ReA0QC6x%2BeR7nHjIpqLrBhp0ckrEDiFEI4WtR7PgIBehmahbDsS9UimkUA0FeQGe7%2FK3CYrcZv4Jx5MkXOTxvPp%2F8SIocxOlQHjO%2BdTFIJThjxJcZUMPYLhUvo2raO4qb3dbby3iMadrdAJy3pKk844Nbu20B7SRG9YehHvgzw%2FXBu%2Basx07h%2BroK6PMbK3axPKbqK3VlNDhjWlxLXvP4%2FqDybEvof0soCGK8CBLmDKEpXO3h%2FP8EHTI%2FdZzEadS5iaVCYCh7mnmN8n1aLlzMeCR10EpBDorc0qUMTNulwV8Q6QJ3Euh7T8hnLzXKEskvb1P7B4anEs29f0jd4I28aHtSla%2FzlMee%2BV%2FaUg3O6Fzgz1be%2FKWTDywJxfn3z9ItZac51r0WhIr2%2BORtiGpf1tEeASVcDOyCijFR5bT4N6mEEEa6zL2ZdJ1nxvABxV%2BpWGWXVfL0doRNqJ%2FHrE0d8nFrksJsio0m4MMGNxs0GOqUBpZanhjdk0Is67tOL5JuFId1dOW3yuC2itzS70iNT7YZBHC8vwJE9U3ji3iVbh7YDJu8cKD%2FdPPVsV9qlYrYYZr9s0%2FQSgAdyobcOigoBjrm6DB3JESwQklcHqGGtgZYQcSdd6%2FfA0%2BjDMmr1%2Fvr8pfCHK%2FoehKx0%2FxX8CpgrBjqHYnzHbTF0A2JaNwVUNJJnwUo1zaZOUzITAKz96pO7xz9aZY9v&X-Amz-Signature=0bf23319ed81d83929b97434a8aea2f52a460db3913a2b4044aac642338e7625&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

