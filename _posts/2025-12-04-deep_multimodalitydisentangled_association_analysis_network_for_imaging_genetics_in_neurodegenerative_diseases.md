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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665TES67LS%2F20260313%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260313T092652Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCJYZGj6uQ%2BG8TeLsr4JB0zdQUK1ygAUcm8Sw5BpZv9GwIgMKtSadnUIp63wNIUKuMXFDMtuM94omOqohOI46MOzpgqiAQIiv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDGYeCFGCQaTEg9Ix7CrcA8GHoF28ylIOzSY4AbCiPlquOlFq%2BjtpM%2F3gZZ8LW4AVQerJ5mSwsA%2FozxXvf%2BR6zBA5YpDtYuQqLSVIJnLj1E3IBoDWG%2Brzcb%2F1IySMsjMBxidZq2EyvUkTPuYu90vKOGbXgDLCLlHvdEJW7iA1oGeUFhDRPFEkKlD%2BX5%2By39iq%2FHY78yp9UrmvXjE7Sw9jRZQ4eI%2F%2Bgf%2F7%2B1pbDjEg74voZQuNT22dVMfDh1OLR9AasiVTSO6LWLnTHnLsg0t%2FmtjDc53oe%2FtGFm50kgfQ%2BgkNnu2SEnN2GGDNsiy6V3y%2FspF%2BY0ggkI7TbbMfWkRRrGU%2BCG53SPgDinDnviDgybWI8SROji2oGBe9fwboZZ0xhxYBZPRQ9%2B%2FHk3GJoDOQIYO5mwwM7ND8op2ajmF5JPR6%2F7F7XegNrjIMhxAa4DoRMupwpYvvLf%2BirogyrBi11g5zgffMdvxHItCB%2FwEeAugbRALyfNO25DxlZcIXxd6kAyEaj22CRgU%2Bt%2Fn1g4wBQDVQq47KVNAIo6ACs5SmsdST3uOOu3FvAhdaJ5IUdoSY6nWjlD0svmg4fik4k9aIoQH67uPmFVE%2FThcPmUpt9ygdCFDn4deo1HHIrJ1G2kYyS8GftEVBjH17JhemMNWhz80GOqUBYhi49C4xshIDhPy7YvlsZpu3GPH%2FPtXNTbaGR2vawZSS72X3qnVxw0dZfhx1KOzt%2FVroRijt6zUYUQJOovoO49dybLSJGtjTN4xwTRF09MdBFmbmoExd184aW7kN1RbhqeIewjYMOlCa7ZTfWV32ybQb5VcIXkGAYP5lRtU68TwGDtWwYoKSHYvosCI109ENl063zuhy0sm91CfLP5vqdLxGRfWW&X-Amz-Signature=76b3daa886ae27caade3dffb559527065512abe8319fd0a63d862520ab2274ce&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665TES67LS%2F20260313%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260313T092652Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCJYZGj6uQ%2BG8TeLsr4JB0zdQUK1ygAUcm8Sw5BpZv9GwIgMKtSadnUIp63wNIUKuMXFDMtuM94omOqohOI46MOzpgqiAQIiv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDGYeCFGCQaTEg9Ix7CrcA8GHoF28ylIOzSY4AbCiPlquOlFq%2BjtpM%2F3gZZ8LW4AVQerJ5mSwsA%2FozxXvf%2BR6zBA5YpDtYuQqLSVIJnLj1E3IBoDWG%2Brzcb%2F1IySMsjMBxidZq2EyvUkTPuYu90vKOGbXgDLCLlHvdEJW7iA1oGeUFhDRPFEkKlD%2BX5%2By39iq%2FHY78yp9UrmvXjE7Sw9jRZQ4eI%2F%2Bgf%2F7%2B1pbDjEg74voZQuNT22dVMfDh1OLR9AasiVTSO6LWLnTHnLsg0t%2FmtjDc53oe%2FtGFm50kgfQ%2BgkNnu2SEnN2GGDNsiy6V3y%2FspF%2BY0ggkI7TbbMfWkRRrGU%2BCG53SPgDinDnviDgybWI8SROji2oGBe9fwboZZ0xhxYBZPRQ9%2B%2FHk3GJoDOQIYO5mwwM7ND8op2ajmF5JPR6%2F7F7XegNrjIMhxAa4DoRMupwpYvvLf%2BirogyrBi11g5zgffMdvxHItCB%2FwEeAugbRALyfNO25DxlZcIXxd6kAyEaj22CRgU%2Bt%2Fn1g4wBQDVQq47KVNAIo6ACs5SmsdST3uOOu3FvAhdaJ5IUdoSY6nWjlD0svmg4fik4k9aIoQH67uPmFVE%2FThcPmUpt9ygdCFDn4deo1HHIrJ1G2kYyS8GftEVBjH17JhemMNWhz80GOqUBYhi49C4xshIDhPy7YvlsZpu3GPH%2FPtXNTbaGR2vawZSS72X3qnVxw0dZfhx1KOzt%2FVroRijt6zUYUQJOovoO49dybLSJGtjTN4xwTRF09MdBFmbmoExd184aW7kN1RbhqeIewjYMOlCa7ZTfWV32ybQb5VcIXkGAYP5lRtU68TwGDtWwYoKSHYvosCI109ENl063zuhy0sm91CfLP5vqdLxGRfWW&X-Amz-Signature=76b3daa886ae27caade3dffb559527065512abe8319fd0a63d862520ab2274ce&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QNZCAFSV%2F20260313%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260313T092652Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCIPjWizvs3yJKVoLyS%2FNpZryAY5IjyPHtYHI%2B9QNQG5AIhAIgcS%2F14nyoNn%2FonuTgff2UIfai9XTuodyfQg1eNhxOdKogECIr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwA8iqX5%2Fx8pzg8njsq3AOm9Zm2QON6R0wm8m0JfiMW%2BnGsvy198FlCyyZpYCpPTEfAai69xyMH9ofXxoP80NF09VNgDRO034rRpYAy7NkVWnHgrRwzT7s4PMzDqCdy42cd7bSMDBhytjhe4XIEHs%2Fot7yJRheM0CS%2BaTutNxLhHtoGCv5NuVNCxgVpYpE3QcM8DwHuBm8CivahEFnum%2B0ELIx9vXn6yuXSRz2r2inSkzx56iA5EDauESJG6ec7Q%2BqYkDGTTqrrwphzt2fSGkrC0Rp1qtPrZFegkInmYTAW5ZnMlFnXpJ8PCL9nIxJzhCgkNbAPdzu4pk7N4sETb1%2BBhyCwlejZU2qhhz1rYagUuWykkPBvwbowGXVzOJevRSW%2Ff8PalojPSTEnTj25kDky4KDhv%2B07tdqY3I%2FDgKE0xwV3aZiHwgCSPNIxhHfa2TPq62ekf4Dozy5akBMBYd%2BnOi5RGb0zWDBAwgGMgEi5GZU35LGsIfee1Tk84bPlpqWKgKVryTX5SSxE9WdzgzZzZH5yulKWXir9x1K7I%2BVAzNdxR%2FgUAYu4zdy4Di89sonvtxU6DRWS6GBRcUmstRVOF%2F8G1lsYVy3gHYNky729ShGaK6ffGUrrW%2FXGW5TNNFfO3jll%2FkyKcvlWBjCGo8%2FNBjqkAd1uw3NoOj6zIV0f1g3Nsz0tQEJ6MrBG%2BYqbsl%2FpX6vdlonbWP3tgSGxrG0QTwtHuUxq1q2LC5J3TcjZD02VgOTus3BdbOQ4U6YsfesKpTbmv%2BvUtR2L1uE6473oSXpoiMS0lbthPFe6WapxByYoMUnNLFHQ2Hy%2FYVJFHFxt4aYc2X8XS0oAc8uRMn4JdRrD4KrS0oxB1XvFtdFet2FZDEpPVoWT&X-Amz-Signature=daa5db2d7f03e320f28a7533300fa6a40d89752400707030203a4072c76f6acd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666Q25EOP3%2F20260313%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260313T092654Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIHS3hfRNJZxdjGuWb4IvxiTh%2FZ7SfKCsSuP2dS%2B%2BfL%2F%2BAiALdCZBRJ9LPypbLm41dMqEe8p8EwkXQYPhlZ1sbEqzMCqIBAiK%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMuktevtRM7gwMaww3KtwDbFXXeZQygFflXMI%2BlPsBgHiPlyl696V%2FuW5eAC62ZwPtcQsfUF%2Bhq%2Fav9vdDq8yOnE3VoY2Qw%2Bb4Etkn7wqYYi4gxCnvjRv5JrTJDcN6l0FSvttInTWfVrgAGcdsFxDTCo7moNt19okWyHiJcUlhFIDdqTt5Tr0uBA1yGeFhhmOYi4o0zPanBdWzcsKSzLqnSypyFes3f8Heo4iSYMb5oTX4IWMPUALsPhIkrUW86MOair0vdaDrKyM41LlhVa%2FxHaLQgOAGy%2BxpftCLEJdXTaTbid8u1%2FIDVOmGWZOFbhH8NhneIYsoZlmJ550N7OtsVqJ7zXjIndT8eUvJP8qhFmzopBsOsqj7IG0gc%2BvPdA6gcdLEsmFU1Y%2FxF%2Ft%2FThWt%2FLyQEM3x8FsoIdWtrc11eovp4NsXpBkg%2F%2FRktdvfpfj2WxbVKr7%2BAuNsr%2BhafmZFJOFdv2zFyRpA2lSaZwS0dyZhHszO4Z%2FmzEq5bPtc%2B1u38myWLYJUWjaTiwvTUhaaSAau%2F0B8%2F8ECPr88mSa3s7xA5EM5Gj3Qp%2FS2RSrz4xUnoWC8YV%2F%2FTYm1lX5YB39DAxtekIZUlnx0Fz5yt7ppIZygWI%2Fi8qyYpEvxJcW03yPoUY0kiV57MZaaCFowrKLPzQY6pgHtLXv5gw5lsIbUD0fc9ScJGSO4YHITuVIcM0WM9X8poxrV1fca5ZLiFJn70n0jLatbj10TdMR6uieZ3wkgu9OZywBsHRcMh4zGSLWKTiPrU9vSX%2FK73KUiukj6IDQXAlmvVkfntEFwSL2VdngVQMC6AAhM4rnnmndU3gBzssBk78rHjlxoh3TeIjTsoiNEiva9%2BoHwoSf4DayfvF2P9xYOqyZ2xeRH&X-Amz-Signature=80edf61f2d3379d7bc1a6ca97b3bde17ee690317bfd6df513bf3a16958b97d24&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666Q25EOP3%2F20260313%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260313T092654Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIHS3hfRNJZxdjGuWb4IvxiTh%2FZ7SfKCsSuP2dS%2B%2BfL%2F%2BAiALdCZBRJ9LPypbLm41dMqEe8p8EwkXQYPhlZ1sbEqzMCqIBAiK%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMuktevtRM7gwMaww3KtwDbFXXeZQygFflXMI%2BlPsBgHiPlyl696V%2FuW5eAC62ZwPtcQsfUF%2Bhq%2Fav9vdDq8yOnE3VoY2Qw%2Bb4Etkn7wqYYi4gxCnvjRv5JrTJDcN6l0FSvttInTWfVrgAGcdsFxDTCo7moNt19okWyHiJcUlhFIDdqTt5Tr0uBA1yGeFhhmOYi4o0zPanBdWzcsKSzLqnSypyFes3f8Heo4iSYMb5oTX4IWMPUALsPhIkrUW86MOair0vdaDrKyM41LlhVa%2FxHaLQgOAGy%2BxpftCLEJdXTaTbid8u1%2FIDVOmGWZOFbhH8NhneIYsoZlmJ550N7OtsVqJ7zXjIndT8eUvJP8qhFmzopBsOsqj7IG0gc%2BvPdA6gcdLEsmFU1Y%2FxF%2Ft%2FThWt%2FLyQEM3x8FsoIdWtrc11eovp4NsXpBkg%2F%2FRktdvfpfj2WxbVKr7%2BAuNsr%2BhafmZFJOFdv2zFyRpA2lSaZwS0dyZhHszO4Z%2FmzEq5bPtc%2B1u38myWLYJUWjaTiwvTUhaaSAau%2F0B8%2F8ECPr88mSa3s7xA5EM5Gj3Qp%2FS2RSrz4xUnoWC8YV%2F%2FTYm1lX5YB39DAxtekIZUlnx0Fz5yt7ppIZygWI%2Fi8qyYpEvxJcW03yPoUY0kiV57MZaaCFowrKLPzQY6pgHtLXv5gw5lsIbUD0fc9ScJGSO4YHITuVIcM0WM9X8poxrV1fca5ZLiFJn70n0jLatbj10TdMR6uieZ3wkgu9OZywBsHRcMh4zGSLWKTiPrU9vSX%2FK73KUiukj6IDQXAlmvVkfntEFwSL2VdngVQMC6AAhM4rnnmndU3gBzssBk78rHjlxoh3TeIjTsoiNEiva9%2BoHwoSf4DayfvF2P9xYOqyZ2xeRH&X-Amz-Signature=9fde99196bf9902a42f8dc582b5712ec5dc11df5291738fc3833c8300b00e773&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667JUCVUP7%2F20260313%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260313T092654Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQC8WhyPfGfFLRdD5MOyKUeW99ggTbwGS3MD01iSvRIWAgIgE4TLBFCONLjZ7zkH0hRpPwLiZ%2BYu3MObcB3Z7IgdD1IqiAQIiv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDG9VyxzXbx8oLlCFZircA86JK9efD8lunZfRUKwafyPSYQ%2FVIokzEoAyIVKJmcMpe4IeEBS3xN1Zev6ii9fqs53uAQw2nzyQnOFnWGNjw8%2B63ehogvKMXTXgnvXWSEw7DWxV%2FuuzJjDEYCNg6qOaycSjxvQjtBxrteSVFxBFwLu8c9r9sfJInLVyCCLVdnHN8sgYmAFwlf4bu7nu6vDKdP4GCfPkRPLcyihzFUIO70ixGjBM29uQTMpCJscdBch5NbFPnmTl5bZ%2B%2BVkX%2BhrQLIBFDG%2BvOZ0QnB0P5j%2BbXp0AfgzfrXfeo8RDITEXtHzi%2FonpKYQ7%2FawITAMfnXsf%2Ft645ALTg8ahCrdd%2BXw869impzWQvL2lUxMpkD8IjbBftQQIhqTFcvr4JwY%2FM5LZloUGSMAOzZjUd9mF3NIT%2BAWK6Qfh%2FhenmMhyyiRBezuOhzgH7crj4LAucjtloqG1x%2BoJtNDn2sUXOJiaWCPk%2Bjx2SXH84S%2FwoYv%2Bqbp18hUhDLJfKDiuJ%2Bd1%2BHRFCDMprjD%2FyoOiro09%2F%2B7PbgSVLHo4K3rXUjgwMSqMp%2F%2FhlcLdoOjBcywaKZvE4gl%2BJBWs8pu5EzbZ65bTiU7lvpCfDoRCE4tiDVGuKN0e9nozOCXHkL7QF0U7u7%2Fr1itOMJmjz80GOqUB4D56WKj0l%2FATmLLUVWnO%2FONY7iwpEkOuHhTt1GxjFyVxO1CsAarKE4Jv%2BkEzibp8unccC%2F4zC4TC6sX2IsAr4joFZKiwlyGtd5ln44gfmr2qQU4JiE4CHXv6v%2FI5INuIUYfNeHgxZLWL7JJT7o%2B4jE1iWH2RXBFMvDDuxz2mhqidNMK63iLy6%2BiBihY4hA277uC7p8fZJsNh0GFxbZvuJbC2Bjer&X-Amz-Signature=a500f8683fa8a627be463cb1e802053b31b5f404441de777e64618ce052294ca&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UA7ZCUYL%2F20260313%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260313T092654Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIDly0UuBF%2BqPsDPJxEa2iS4oR0CMZ8NDjXPehAavBsP5AiEA0F1p30MMrPhk015pOJ46LKv0fSOftVkTrdnjG4q8R%2BAqiAQIiv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDPkcZ6BQavm7mqyHTSrcAzQjyhQIeLw5SzMa8XkSV9ffRwsyOKVlByhE%2BvJ4jJxPeudfO62JyHqBTwN4u5cLJXqmVDOYhIN0wHFkiqPHBb8Oxir0QkOPCRcOUdcQOtV56yZ%2F03Imy%2B7nlgkLYeF9DJxc%2BR3fwoHjGTf1QV8ZQRExPeiFOrBbCtPmFfUGb4EyiFxVTJpglcqWF9PARTLE6kEpvNLE9SjYf18bGyV1AM8%2BoMzAgpGpGBsJfu3lFptCYmysILTWR5%2BujdMNmI7oY3oLbhWwLHQwOOgopCGpYVWlF3Gxj45jdIyG2PAzpLL30fq4IeNtdN5iAi%2FTsVmgWJf53ybNV%2FcdPWDpbrAYEzmjZqOw0ub7L6uY6vx7WfLc9cN9SOUH9R4ofyAM5YlLKJPdOEpzpXFCnnxc%2BQ3Ra26bOQ8ntPyFmOwBIyPRtsb%2BFV%2FDdCAkHAdgQO%2BNwBpSRLKf8K6zwIQGlV7VgxBnUmWoUDGMiWcXyoGGEkcXsEiTp3kYKjoNGeOtrvODDIR8hEFslY1GGAnCTX5%2FDe0CQksMUcr57LonzWxv6MLPkcC8zpmdlxOOsgdEV7SfIQJVxnJF9BQJk7tF3IyJNVxTR8pbKcvYOAlc5x4JAOn3DxmbxGG4iTXYdL5rVPI3MN%2Bhz80GOqUBlETYOhMrj9ySfqcrDQcVuAov2q2iJyYuD3WJZ6NIpFMtvV2BsYROvXQznoT%2FgI2Q0mtBO7qVCLVZG4BJpc7nLIdkeXp4n%2BVF2FXFWXSGzr1UDSwkrzGjs5hHMyLCGnZQpz77UFuLOs2NmKtzIC%2BWUYdvcYDEhvbcXBqKhUfd6PH0Es7bFprOeCUM45NgwzX7h7PjHJuCE9Xk1uI8ArxjFX848AtQ&X-Amz-Signature=5a5b774285556c9e934edf9aa030a8e035a0e87518eb0cf20c02a77c734d7f9e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466X64UYJAT%2F20260313%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260313T092657Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQC0bRyRj87qvmFFFF28NdQMaS98Nl8v%2FIJoEJaNIIazNQIgTXP%2BZYciXJBB0fNHKmB5aheH0XVKs0w6lY6kRWRbp2YqiAQIiv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDH%2FYbHqU2WKavD54oSrcAyOEWaDr48yi1ptzdIR8lC5ArnVh3Tl8BZVBjoTQ5C8MLRHbJ%2B4z5MFKqLZv61bdtTCJ0mZQmzZEFzXf1IqUNsuPHlQAQTwAtDJ0vMgfNem1%2Fjbhs%2Bg9O%2FNgUFDTV2%2F3MSFReQFQ03eBmXEZfifSXq1XqJr%2F%2F6LmfuBfgoJBVWeqdUFDNGFt1ZF61l2kNMrPxRT%2F5k0CB9p1YslAJU3uZM81vvXprlcehaMJOlXS1uYiEQkYUHWVBj7%2BLre7v35XRxnDv3FK8xX5MLkXWwvveCxOE4W9asmeBWhy2FTBW2u5TmOxcoXp0bu4r2UWs10NDKjaKkNefjuxnWW%2B3XBhxl9LajJOGNa8FKjRmiAMd%2B2PIZjnJvfHzjg%2BffBJkXYytYUOgznVU7SibovVsrD%2BsR8%2B6aBY3iWSWTskOo%2BTlO2%2Bs0Y%2BFxNr1uXMyhNeCy4jHRqypnSA4JMQhaOv1Dn3mN75vX6UOw%2BFJPh7RZiQXqDRdYaeQ23%2BZ8bcY9eMdWnCG7u4BPgwGbYKKq1cLm7o7pMK31zEHfxI60nWq616JekehA3XG61o%2BMqobintmrdUBK%2FGDG5Z96gO3OYlbpWHy3lPxlapezahHLGkDmGF8LRpjdUCVxQ8%2BFJhGil6MI2iz80GOqUBSJPUfRVgysj1urhzA85gSzuLt35b8qa5ENl%2Fcujl61kGe9oDUzfM%2B5jI7Zf9tnLdXNmRk5eVpScLkCO3TKY2eBdyaNESV%2Fp7os9AxmblUhNbVkds1bbMlsME5SZF%2FFY5Es1%2B%2BxW0J%2B104tl1NZ6Te3TFfAnMqnWOtco4iU2hsUwJKa7EOiZOnBZC7x1NJ%2B57dUuTuriKJIZDgMV3rXIZq4zYYvVK&X-Amz-Signature=1399bbe80dd95e22366e9f03ba67b5d3141a33b7c431052f17ba5a86240e39f6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XGW6QBMZ%2F20260313%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260313T092658Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQD2GKaTAlCuHYtASE6Y2xfs45BjXwqSOxKNNkFfYvFofAIhAPRhmwR2Cg1hkan1lQQ4pMGi%2FhteAmFCq0y99BXksI15KogECIr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igw3zR6BDZUmzO3SqtMq3AMX9VIYtCo2TTLXSCbk1%2FUuQ7651HAzGtQcR6nvHowZbteRmTa%2Fdp%2FZNZ3f3kuRTeVlMHXp%2BQhN9XHo2hFi6Bl8H6y8aGPu%2FG%2BcuHwWd00focQJrind6nzTBf6%2BD0o2LgwqYvnr8mJdQpkpZoo9M3AIdAA%2BTEfQne0Mhs6V9l%2B6n%2BFH2eE0zz0f8YHRdL2GzpsqROUYWSKSooNkMOKlFzYX3rOXpTK%2BMPqiy4YHxiG%2BAdX0hbiZ0ARLkJ%2F4AagUkkTczfJvtZ46IMFMT4e28NFiJ%2B66PwV%2BqhzpqF5yg8it%2FkC6Pa2e%2FAa5T9bzyuw6wIVH7dDovftKAKCojRYj2AsOgxsLJjNFwmz4mjVGQllJab5AGXn4rHlh8RG1LyXILvArJrLbdpgv84dr83JVY2Vtm9T2pKRQKF5HzdgkEXCbRnzrElSta2RbG6FxWWpmqRIlEEE8KA4PY4O6qCt4YmcnPC%2FYlcMLmIn0nfk8f3YMKJawp5CUoSR5fHf2LybdMM7i9MpbhS7VCUYQ%2FjedNlwxhYqmVmU99gcK9hKEQ8NqmfqWyRRImvre3leQCaS7jFf1WpwORtec9ah9a74f2TTVrGL6Wfkubde9p6fsz9CFR4ogzt1i7%2BZhQ0AGlTDUoc%2FNBjqkAe8BtL%2FaeBFhI67coz7kndtGbcfsr49IWdaz4NV5UyVzPgB6OLweje90Bhswun39P0nDu%2FbhbPtPk8jJMfIxIb5jVIuocv9ec8iom2g%2BS3u0wmx%2FO8ekAoqYkpTfLK0O8l5xJP7JvpGvIglsZ7jQsb3MwPwyGE2NK0JuQAtSA878UmF9D42dvmLmf9vFuUOJSb%2BoJrhLN%2Bc9On0%2B2OnFt9t4%2BzEw&X-Amz-Signature=b2648e86e631dade71f3c8615be680b4dbf48a73c15143eae14216d14108d039&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XGW6QBMZ%2F20260313%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260313T092658Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQD2GKaTAlCuHYtASE6Y2xfs45BjXwqSOxKNNkFfYvFofAIhAPRhmwR2Cg1hkan1lQQ4pMGi%2FhteAmFCq0y99BXksI15KogECIr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igw3zR6BDZUmzO3SqtMq3AMX9VIYtCo2TTLXSCbk1%2FUuQ7651HAzGtQcR6nvHowZbteRmTa%2Fdp%2FZNZ3f3kuRTeVlMHXp%2BQhN9XHo2hFi6Bl8H6y8aGPu%2FG%2BcuHwWd00focQJrind6nzTBf6%2BD0o2LgwqYvnr8mJdQpkpZoo9M3AIdAA%2BTEfQne0Mhs6V9l%2B6n%2BFH2eE0zz0f8YHRdL2GzpsqROUYWSKSooNkMOKlFzYX3rOXpTK%2BMPqiy4YHxiG%2BAdX0hbiZ0ARLkJ%2F4AagUkkTczfJvtZ46IMFMT4e28NFiJ%2B66PwV%2BqhzpqF5yg8it%2FkC6Pa2e%2FAa5T9bzyuw6wIVH7dDovftKAKCojRYj2AsOgxsLJjNFwmz4mjVGQllJab5AGXn4rHlh8RG1LyXILvArJrLbdpgv84dr83JVY2Vtm9T2pKRQKF5HzdgkEXCbRnzrElSta2RbG6FxWWpmqRIlEEE8KA4PY4O6qCt4YmcnPC%2FYlcMLmIn0nfk8f3YMKJawp5CUoSR5fHf2LybdMM7i9MpbhS7VCUYQ%2FjedNlwxhYqmVmU99gcK9hKEQ8NqmfqWyRRImvre3leQCaS7jFf1WpwORtec9ah9a74f2TTVrGL6Wfkubde9p6fsz9CFR4ogzt1i7%2BZhQ0AGlTDUoc%2FNBjqkAe8BtL%2FaeBFhI67coz7kndtGbcfsr49IWdaz4NV5UyVzPgB6OLweje90Bhswun39P0nDu%2FbhbPtPk8jJMfIxIb5jVIuocv9ec8iom2g%2BS3u0wmx%2FO8ekAoqYkpTfLK0O8l5xJP7JvpGvIglsZ7jQsb3MwPwyGE2NK0JuQAtSA878UmF9D42dvmLmf9vFuUOJSb%2BoJrhLN%2Bc9On0%2B2OnFt9t4%2BzEw&X-Amz-Signature=103e5b135035166877e8786782180d7dd71879eeda465d19974874be0c80ecff&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666DZSEBI3%2F20260313%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260313T092649Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQChCsOWe%2FMA6fXd7bdIwAJzRrSwbDUVC3dabcKL%2FO8CvwIga8pDQOfr4Vf00CH5n2PEVlJFZynJm5%2FjF2NJv90BAssqiAQIiv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDJSLeX%2FBL%2Bm%2FQcVoCyrcAy3GVbzSYWoY2sCoL%2BMAhcjgeQZ5eAPj25UFjgQYEqdpg6pdyYPXdSwhixuWX%2BKwg80CTDyQbJ5bQuRUVwq4vVUumIh2yG%2FKXaYgkfgOex7cUJ0emqXOuBU6kS0gu1zGigYkPyKT1Po4GyrHffp6wdaJfoxsDZ1H8MfpEbZ0dTjork4BigUh%2F6wgxrXkKFskDStCJkL3UQV2qsBBRs72quRu3w8vmBo2kHchCSgOQceZr%2BOfuKK69uyS0MaSL62UGQ0QUcfKwNNuD5JGrYndmfvuTLcpzUP36YeoncgBxhTuR0abnv5xhl0BFH%2B5Bpwuv0%2FsFUDE5ieKr%2BQx9Wmk%2B2vL0%2FRxT3RHtUEkQ9ZiXfdVFVtmJzRiQOa6OMujbBLcfNgdA8btUS15G72zO%2Bsn0Fq9M%2BhItSSvt%2Fc5izxk3xUEYpVd2V%2FW7Kkl60Vdw3CKMvkXFwwpcibJmcvoJEkYYE%2BWh9slcKlJSZM7S3B%2FHM7hN6VrFsucWhgbA7y3G7CkskGVNCVUeGxfUd3XBNdvotjelKkouUViD6mrG1LNnbK10s0yk5eMmjgE75QGxOdkfTCfKIPslnNKB5zx4vk8T128BG%2FFPmA5GpUq%2BJF1Cpsomb4ylBd2PR07o8BaMOahz80GOqUBGy3veOkHmoo5EJhqdkDRaka0%2F0nNv%2BuoyGjB8%2BbaIDRsrI8viOSlHDfUdbbxBLxtDoLycLF%2Bxw3feRC0olMYqwQsNRh4o0I4LCl0ON1au8Bhk9lnFlTRfkDsc2ed2IW2chhb%2BKIBccQV0xYLI1aZcJoFcVEyxVNJJta1RIWB15h7JGLX8x50ZPaalteFk1b5E4ThBArkNwxkaV1%2ByHUEsZWVwc%2F3&X-Amz-Signature=80b09c5744659d3fabb3b52a7a5ae241195efca5c566c6a84c0410dec8c6e3b3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UVQPTBPS%2F20260313%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260313T092659Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQC%2Fszw%2BLiIMGFWxAPJVVLPTGQ2Lslpm8kOA4BTWj48ZngIgOzx%2FPm9MoYhz2spBPYmPewydCxaR9q1%2FgRxrS%2B5DmG0qiAQIiv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDEo2tCzwnAPqby8HhCrcA8GtWw0dQPAddJeVXLei17E7A4QW4GRONq9W%2FrNLirn60oxAkF%2BMfpUvsahI%2FiaoFgz2cGCrbY74AhRu6Uqc1VpG5PRibDi4DiljGIJpslmRNXysCAZPa%2BgmPSgyaDo9edelmM2Z0K0Qio%2Fqmp91o6I8nZUKBBqJlwwgsdc%2B4APZRBWo6li%2BCyeX8k7fIoRIB9Lsk0y2MZ1yAvlmApG0hrHAPZ4cfc13ahyxeluCCPlKwFm8wZ9pRh%2BKI1B6aO%2FowlZ71z8bmVUOEAK0azPtoJpAb0bmogrA7s30GBLF%2BfR5TBXoofPGn79%2FOsbFscYov7Wv2xr0DRsl31HyDq1UiyCXc8%2BSpDq7DKlXdIeL39x6YBV9w6t8r49CYx4OFqtZqxH14tYcsM4PXR%2B9R2UHwkts8gaAVlf0%2BiuLZTW%2Fp%2F87HrOZqivxyKqITOqteTaoYWuH8ojQICLben5bOfOuDfsgtQixvaJV7%2BoI%2FA%2F3DnOwxue7mf4S0URVCknRNzNSgSwJ%2BdalEFCrEHPxdgh06wUAKj5TsUxG9xjOs%2B%2F0LcXXGLqaRy2bYbXbL7nuuehvSrdYsZZ5SZsOIcX5%2FM%2FJem7te65TKpJS5ug1dMaOz3%2BMJy%2BbywLtFcx%2FXRqMMM6iz80GOqUBJOO7bfS%2BOTjOGLzOO7LwV76WXFw%2BzbJVWwY4D%2BI6uCw2Gt8bogKFFLF8tVGPpup5JqfJQ7BYiLR9hd00rPQrJ0QOEVmSmrEk5iA7WjXyX3lku1o1%2FvUVFI9SzNZ%2FWpgs85ZCl5uRZ260BBg9DZweCOG64wguTJzqQjwc7y4KhnPCSHfDmLQkLmUEPr0C4NirtB3jEqfcbwScsGrWQc4csf4e9jbV&X-Amz-Signature=a7ac7ac9688b749ccb47e7a82ec718e53da5f44ccd054dd6768f56ec201ae419&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UVQPTBPS%2F20260313%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260313T092659Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQC%2Fszw%2BLiIMGFWxAPJVVLPTGQ2Lslpm8kOA4BTWj48ZngIgOzx%2FPm9MoYhz2spBPYmPewydCxaR9q1%2FgRxrS%2B5DmG0qiAQIiv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDEo2tCzwnAPqby8HhCrcA8GtWw0dQPAddJeVXLei17E7A4QW4GRONq9W%2FrNLirn60oxAkF%2BMfpUvsahI%2FiaoFgz2cGCrbY74AhRu6Uqc1VpG5PRibDi4DiljGIJpslmRNXysCAZPa%2BgmPSgyaDo9edelmM2Z0K0Qio%2Fqmp91o6I8nZUKBBqJlwwgsdc%2B4APZRBWo6li%2BCyeX8k7fIoRIB9Lsk0y2MZ1yAvlmApG0hrHAPZ4cfc13ahyxeluCCPlKwFm8wZ9pRh%2BKI1B6aO%2FowlZ71z8bmVUOEAK0azPtoJpAb0bmogrA7s30GBLF%2BfR5TBXoofPGn79%2FOsbFscYov7Wv2xr0DRsl31HyDq1UiyCXc8%2BSpDq7DKlXdIeL39x6YBV9w6t8r49CYx4OFqtZqxH14tYcsM4PXR%2B9R2UHwkts8gaAVlf0%2BiuLZTW%2Fp%2F87HrOZqivxyKqITOqteTaoYWuH8ojQICLben5bOfOuDfsgtQixvaJV7%2BoI%2FA%2F3DnOwxue7mf4S0URVCknRNzNSgSwJ%2BdalEFCrEHPxdgh06wUAKj5TsUxG9xjOs%2B%2F0LcXXGLqaRy2bYbXbL7nuuehvSrdYsZZ5SZsOIcX5%2FM%2FJem7te65TKpJS5ug1dMaOz3%2BMJy%2BbywLtFcx%2FXRqMMM6iz80GOqUBJOO7bfS%2BOTjOGLzOO7LwV76WXFw%2BzbJVWwY4D%2BI6uCw2Gt8bogKFFLF8tVGPpup5JqfJQ7BYiLR9hd00rPQrJ0QOEVmSmrEk5iA7WjXyX3lku1o1%2FvUVFI9SzNZ%2FWpgs85ZCl5uRZ260BBg9DZweCOG64wguTJzqQjwc7y4KhnPCSHfDmLQkLmUEPr0C4NirtB3jEqfcbwScsGrWQc4csf4e9jbV&X-Amz-Signature=a7ac7ac9688b749ccb47e7a82ec718e53da5f44ccd054dd6768f56ec201ae419&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QISGQGZM%2F20260313%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260313T092659Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIFiEr4I1F20u7EnDyX1P4bGprv0%2FoM9TYtkxbVn1TEldAiAQQU0miizF%2BES1z7bD04PnzwR0%2FWaPs%2FAJS%2BN90sCDAyqIBAiK%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMC0d0MJXvlMUTV6IAKtwDQUkAzQZJk06J9Xx0DrsrjkpXXestRlJXJQJD3hCd4p70jfvDbUpgbPh7zUfkWLATolTL6vjJSQaQOaiAP%2BVE6ZvRp61eh5tUWZD02U%2FOqk6pPQIL7WiyYxnBqUjPOIB0a2o64E103RD1NHpkYUDWqBH1Q%2B%2BkssIGsBwDT4rX61JJ9U%2B6jwpeyYe5xRb16xXrVrop0SUiFff34IczWZ%2FZigFyVqS06dduW5cDs6ASmLHWTPCkCGn3H3erM7Y5k6ifcIb5YaJSGgPynuNlorddlTTNFsVhSLyhjDcko8mX0L0Nr2i9BSRu2gt6gGzLnXR65EfRO9umS6pDUNJrodT1ZUIyYx8KfDroGDJenRWgMPNlDWiTgllNKmFQEg2MACDLDSFMGr9zzV7SeSzNB1gdtqrOqY7IsNqN76ghgHZfqH6FzcLzkK2xI2JWH63tvlEk3wkhM0fzM%2FApK8b6fFIG4DzqNJISciAPmmufKz6FzqiN%2BfQEENnqreJU7%2F37pHsB8B6vmmsCYLKpcHFmxw9ko0gpNi2qrDM5ViWODnVVkKBau7JWpU%2FmfP%2F5s9g13Gvn1A7ka7GkIyNclBOrpI2UJFfzhXJSY8VssyKYDSYUtMUP3B2bj0Z3y0uwUfcwnKPPzQY6pgFme1h1BpGadw%2BiZW650cwm6ZyAly41kG5K4RtBWNa3cAxLqm7sfLTFn0fRpC17HjXt9WAZghoZCTfVXB%2FARWKLqkgXVUROVKlDdDIuQGh8ZrB9r61sk1FoWJuFvUHQ6FP6cMajxvu4I4qcfj8YO3yELEUGMwdDXwMXX8LZA8QkaqgdPCBv6mR0wZ5njsdB2yjLPJiQJUI6y4WgzmlZor0ZF1LmXsUS&X-Amz-Signature=c11596b551c515b673c63bf42325eda36c04f684fc6f64555b71a3d4a2746abb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

