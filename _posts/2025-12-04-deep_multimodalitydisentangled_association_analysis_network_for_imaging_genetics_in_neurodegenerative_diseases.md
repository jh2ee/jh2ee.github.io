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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WCADGG2I%2F20260313%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260313T082435Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIG3yjyx1yPRnL2QpvmX4Kd0a9YFC7nQToD9BuI8TBt%2FHAiEAvn%2FsAGRQDBrh4%2FpIOayjR%2BnyLS9iMYHELhzFqOKuBBAqiAQIiP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDAVfwRuughnUUtaFDircAx3f0EfUNaZJfMCpLbpe5UWsfoBlseH%2FA%2FYkvmdpFWAn2Dtcz8vgNZ8UQK6ZCH88BPoPd0Y0iTUJP0qnysFkQOu30O7NS3chvfAlQup8WN2WoBMIIzoxfCudqdGMOnmdr7sm4vib%2BabibP%2BmJvGywDHoah%2B45XSvuAT78rvRzl5Llh4SruDFO0Q0h9rif2%2BE2fs4TsvjttKwjZwMaY1%2FTGG7TXq9ll07ZzeqgmLP0Papyzz2leNAA0p%2B%2Bc7XXDl6HcqRlk2PeFEg8J8yTmJXdu4SVyB6PsU8Au%2BZo6UgS50gpqkhIf3%2BmYPQ%2BZ%2FJbhHIEPHJzpYgRxgahy6hi3Hu75ND5Yu%2F8ZMzc0ZHcsuyZMoMcxLddk1HcfC71PgUAdxRCvEOMPwoDuzrGdEzIuShGFg%2B1YXt1Ct%2BkcX%2B%2F4RqwDFfdhGVMWU%2BHxZQEsxwmfAIWod2ePhfuu2jAFgYIzAd%2BpvkmWPSF7DKqdBfzc%2Bbcur%2B7bY0Yuhjx9MlX%2BOPEACrxj1QTmcIcj%2FMGVz0UQ7yST4c0IDB34jaR3ZgFjFimCetMmAWq2ovdMv71fdVfBbNfDXpi4DmPzSRz%2BfpXYnuSDbm%2BkhWUzLX%2BJQLQ4j1wJaurRiu%2FQ4SBb%2FZ9fXzMKvfzs0GOqUB9MAvooua9GdfCBnAOuwRyWjP%2BNUiKkmarwweI%2BT3wV%2BYsoKC%2FXuQJhvR1sO%2BRfJ4C0jdXcYr87Q8CEQkN1w0hU5xZ%2BVAnKnOg10hrNOTx5METtJnDkZZTZGspdsFmafgq%2BCBTM6oZabYMYf3XafzG1GhITs0ioKbHJHlrmkkWkxe%2F%2BUde%2BojaLGA2vnbRyDFSlsk1fg%2BUIhc3s8%2F4vz7p%2BdgWHXD&X-Amz-Signature=63cfd778fb3a375cd99d31c07bfa7312f5eac4a098bac16cb9dfe692075640ec&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WCADGG2I%2F20260313%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260313T082435Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIG3yjyx1yPRnL2QpvmX4Kd0a9YFC7nQToD9BuI8TBt%2FHAiEAvn%2FsAGRQDBrh4%2FpIOayjR%2BnyLS9iMYHELhzFqOKuBBAqiAQIiP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDAVfwRuughnUUtaFDircAx3f0EfUNaZJfMCpLbpe5UWsfoBlseH%2FA%2FYkvmdpFWAn2Dtcz8vgNZ8UQK6ZCH88BPoPd0Y0iTUJP0qnysFkQOu30O7NS3chvfAlQup8WN2WoBMIIzoxfCudqdGMOnmdr7sm4vib%2BabibP%2BmJvGywDHoah%2B45XSvuAT78rvRzl5Llh4SruDFO0Q0h9rif2%2BE2fs4TsvjttKwjZwMaY1%2FTGG7TXq9ll07ZzeqgmLP0Papyzz2leNAA0p%2B%2Bc7XXDl6HcqRlk2PeFEg8J8yTmJXdu4SVyB6PsU8Au%2BZo6UgS50gpqkhIf3%2BmYPQ%2BZ%2FJbhHIEPHJzpYgRxgahy6hi3Hu75ND5Yu%2F8ZMzc0ZHcsuyZMoMcxLddk1HcfC71PgUAdxRCvEOMPwoDuzrGdEzIuShGFg%2B1YXt1Ct%2BkcX%2B%2F4RqwDFfdhGVMWU%2BHxZQEsxwmfAIWod2ePhfuu2jAFgYIzAd%2BpvkmWPSF7DKqdBfzc%2Bbcur%2B7bY0Yuhjx9MlX%2BOPEACrxj1QTmcIcj%2FMGVz0UQ7yST4c0IDB34jaR3ZgFjFimCetMmAWq2ovdMv71fdVfBbNfDXpi4DmPzSRz%2BfpXYnuSDbm%2BkhWUzLX%2BJQLQ4j1wJaurRiu%2FQ4SBb%2FZ9fXzMKvfzs0GOqUB9MAvooua9GdfCBnAOuwRyWjP%2BNUiKkmarwweI%2BT3wV%2BYsoKC%2FXuQJhvR1sO%2BRfJ4C0jdXcYr87Q8CEQkN1w0hU5xZ%2BVAnKnOg10hrNOTx5METtJnDkZZTZGspdsFmafgq%2BCBTM6oZabYMYf3XafzG1GhITs0ioKbHJHlrmkkWkxe%2F%2BUde%2BojaLGA2vnbRyDFSlsk1fg%2BUIhc3s8%2F4vz7p%2BdgWHXD&X-Amz-Signature=63cfd778fb3a375cd99d31c07bfa7312f5eac4a098bac16cb9dfe692075640ec&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Z6UP2KHG%2F20260313%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260313T082435Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIDvGVI0KinukdBi4V1NhqdPJYvEPIQcRWzPHCdHrQkjrAiBTLboZRlboeQfNckR0VakeFcawJnL2L1UULmAV1vtZISqIBAiI%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMRxcbQ%2Fg6YEI9RvIsKtwDXq8%2FH4OfcmYhcWNbE7ioGCheUCHpFlgnyObVEDmMd1gQopaxxrxIf8jor9kh5oF5z0Wv%2B00vJRxnARbqhYfBUdmWgbJygAgVH7zI2kNSQZfEcyYa6ebDF5b0nxq93j49FTzmp1LcKEsroZ22UFTv58%2F8GgVoJ4POnoPncp7nYGv1NLBywnbRv2zG2uFJNBtt0qcniSuFLcsnZAjlde8hpd%2B5cERcr9IDoYM9MqJI%2FsWCJU18wwhbo2GqjaKRZxJjjFu1lNgMZrw14EvhCgowQc1WsbJVmK%2FJEHtyuE3rU991uqPX1y4VpCG735qsahE5rVt5781F4UhhuzruX58s%2BfhH6Bo%2BLKoz%2FWHlQYnM2unACkCRT9q7Zjl78nWnqu02uSaZa%2B%2BDE8%2BY5f5jBq4KZU1XGaVRI7CNAFDr7HWqxHf7GmEKS6R8U2cNThw8WMbeY8HSD8DDTIQ1qogMkbVxnGDfZPakza37VW5EhNCteUuS9%2FgEOUqMd5H47jRZ4GjH28dBUZ0JY1%2FBs3TSzqEtv24M%2FFcSyAsEKmmsM8agME2Nq3KPXEEVFXwESxbgMLgr20Ft%2FDdfd%2FG4hXF6QeF4yMuFTD28jZwOBy029t5sPxFAB31vhpIwV5bHvXswqd%2FOzQY6pgHiLeJ%2FVU2ZaJjTej05zMi3sjgSO%2FruomDrPJ45WZzzFUqFxE8EKZGPqY7dKZAJJHhy2kECSDuqU8E7k0RQJkPXD2Uuzq5JDyHYO0%2FPSGefhFl9SSCeJV32rPU2sUPKa50hQePIgzHg3PAyhop5PVDpVsZ1yyHozEKe7KX5dR1DUkivgBR%2BNBJz%2BU3HM31JBiHgPRQLur8G3BT4JNMacJLOjdyzJiN2&X-Amz-Signature=0a8f518c5b00d75462132e0b91449a82a05e3c3aed288f68951e487d52b61b2c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466U4WNTEPO%2F20260313%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260313T082436Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCbYGyQG8pR0zdhXITjB9WWjVziSlLuUEio6uJfgvigrQIgMrE03JK2ad26Q%2Fp54qk6%2F%2BCzE%2BEo%2FSKuPfKvSY%2FSqq0qiAQIiP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDIjAHo45e8jMHrePxyrcAxEn%2FiplLb1S%2BHNsJQOv%2B4lQTnJBg952hRf3h3GTqQuZWCLJHZlZTZILNbyrf7EWMmst0yYhebfzfd2tmhg%2F2VdAiJHTIzTsi6xkyK68BG5A28CbK9f7zi70RQFLBHfib0yvHGRc6%2F9pzJl8NqdyUcxQw%2BTzN34tPxf%2FA9QF0%2B5h6QYQccyylslvXARdhBPOupF%2BFGKFhzPp9PArTHzT8Qapyvt0sdnC2hP%2BLwyEnoN3u8f1FDcX9cvJunuJ6IFcJj3IrNeTC0M2X%2FAuczSRs2F%2BH2m%2BhBK8IPMYbB%2FRtxrvL21PdLeGRRjOwrASAdQnQr3toezu1wVWHBUk%2FHU8xUzbD5tHddVrtDl%2BIQjOn9iOwXDRBEtVjuGIMXsZ8PiN0UdfgyqTnOBgRvfvFkCzuDHBfeJOT1n5xq2HOq75AXu%2B0RZJuaaGtcZJ%2Fj27%2F17EZMZN8QljIHEiXsBhRFeDlYDECvyO9nG76eETkiiNAsq%2FWFWdQQRvkkYuSkZYX7a2vDaD4MVKA%2FfB1mFokLp9Txa27ZZ0mB9SGqxOYsjYIAuB5noyJYN%2FyaqIgi828ESzdbju%2FeobNr2lgvZ9zzc%2F4pRwvsmPiLMoHDId81QUxvE26miwcPJZQTcuFo58MOrezs0GOqUBz1jVtTp71Tk2zV0VlYrKsZfEcFQ4PBEYLEEKWZyPzQKF4jlCruGAaVRF7%2FtOfjcQGHITbtU7uccvmnloxoGxb4AAS91LcDA%2BEVjJLRbrSPn9GghoSjSVZ%2FcwDplQW%2BlPB7XAQcED5HaUhClTX0XqVskEngG6yCD4%2By%2F5yILdMNltGjCdo08VXZOTBNvz24eEJxCd%2F9tAjaxy0lxtNBq98WcnmZ%2BI&X-Amz-Signature=2944a48929c1407acb764f96f8dc9ca79e173ebedbdf93f982906649a9f7b4eb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466U4WNTEPO%2F20260313%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260313T082436Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCbYGyQG8pR0zdhXITjB9WWjVziSlLuUEio6uJfgvigrQIgMrE03JK2ad26Q%2Fp54qk6%2F%2BCzE%2BEo%2FSKuPfKvSY%2FSqq0qiAQIiP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDIjAHo45e8jMHrePxyrcAxEn%2FiplLb1S%2BHNsJQOv%2B4lQTnJBg952hRf3h3GTqQuZWCLJHZlZTZILNbyrf7EWMmst0yYhebfzfd2tmhg%2F2VdAiJHTIzTsi6xkyK68BG5A28CbK9f7zi70RQFLBHfib0yvHGRc6%2F9pzJl8NqdyUcxQw%2BTzN34tPxf%2FA9QF0%2B5h6QYQccyylslvXARdhBPOupF%2BFGKFhzPp9PArTHzT8Qapyvt0sdnC2hP%2BLwyEnoN3u8f1FDcX9cvJunuJ6IFcJj3IrNeTC0M2X%2FAuczSRs2F%2BH2m%2BhBK8IPMYbB%2FRtxrvL21PdLeGRRjOwrASAdQnQr3toezu1wVWHBUk%2FHU8xUzbD5tHddVrtDl%2BIQjOn9iOwXDRBEtVjuGIMXsZ8PiN0UdfgyqTnOBgRvfvFkCzuDHBfeJOT1n5xq2HOq75AXu%2B0RZJuaaGtcZJ%2Fj27%2F17EZMZN8QljIHEiXsBhRFeDlYDECvyO9nG76eETkiiNAsq%2FWFWdQQRvkkYuSkZYX7a2vDaD4MVKA%2FfB1mFokLp9Txa27ZZ0mB9SGqxOYsjYIAuB5noyJYN%2FyaqIgi828ESzdbju%2FeobNr2lgvZ9zzc%2F4pRwvsmPiLMoHDId81QUxvE26miwcPJZQTcuFo58MOrezs0GOqUBz1jVtTp71Tk2zV0VlYrKsZfEcFQ4PBEYLEEKWZyPzQKF4jlCruGAaVRF7%2FtOfjcQGHITbtU7uccvmnloxoGxb4AAS91LcDA%2BEVjJLRbrSPn9GghoSjSVZ%2FcwDplQW%2BlPB7XAQcED5HaUhClTX0XqVskEngG6yCD4%2By%2F5yILdMNltGjCdo08VXZOTBNvz24eEJxCd%2F9tAjaxy0lxtNBq98WcnmZ%2BI&X-Amz-Signature=1e9d25755a4d36b836399b81042310b2362fb91cc9595dfd815ba9c72921c126&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665W75O7V6%2F20260313%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260313T082441Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCrIuFGpngyn2dR4ryCfR5MUJJD3MSkiFSf6dRMkEDsKgIhAPzWIfKD5K%2BH9jQ5cmxrdo7YMjfDfTFsrckCXh%2FRu8MLKogECIj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxrrHZGIQJMuu%2BrZT4q3AN%2B%2BGS6mrz7kwVKLXNHMw8zHNs0tpzjcPEAY6l8LkHMpwysTl0haOOZ355xxSZdZozBIH9Cu3Qu1QC%2Byavp%2BMBRgXBu9LmeuLy6k58fPT64tt5DtcfUe9ACf0X97YEuZ9Vud19mFyByQ7hIVVhejmh0cskLMUcGpmds%2B7Bc9%2F5v54omaA3KF6buNFAoWWzjoNxynJXg0ju%2FcTn%2Fne3dFKn5eLfHqfhfzyvLcuLx6inP%2Bpo0lhOYVnz05KdfC2QPRYUs4Vj%2Ba7jvcJZPL0GihT%2FGbgExMVSVoP0yfQbARhldN2MvDKheDMrMIYhKJXY0%2BKIC1n7RmzfaRWhG%2FDBQMNSAjYtZb5USAzkooP7050H7451L55wIR7QAXvk3XYvt5eYszuumC9PKCpH8kmChDg2xLD2%2BE%2F6yyZoQqrB907jWDsTEd%2FVShZXWnfvW0KJUnnClXeVh8HV3GbLlYJN1Plh8n%2BXxK8kUfMnAhf1guUkSSZKQKMICuFieSYXebZRWJBYSRwZnzoaqrTAp2oucSATsL4H8xi0oDAcIlKl911ileaYt6QsJX0jv9axd%2FJJaUrn%2BiaUy54twl6KiR9jDS5vBPF6Jr%2FptTRE%2FyG2H%2FCpdUIzgvtDCEOKzISMPgzDS3s7NBjqkAS%2Fcw7p6Xe83wcAUsp6iyFJokoy5bu6YyG%2BQd8yHt7j5fKqDFzzPYjJ7pb1FIKAf9YvNk00eFvuNeuCWNkhs1VO7S87Kmq%2BwVOz%2FJ2ys%2FHqg68tzNxNe4ljaBtAnhHPZQvt4xL%2Fh0%2FCn4KCGnf0wj9a9A9PcnG3HFxlrvAPwRCaa1ycR4lgdzLClGMZ%2FFQDje8rrqXMvR%2BUYaIQ9Euki0526xcRU&X-Amz-Signature=5af079b332696064363cc2ba92a11095c949673ea6a2d97219544183035b21bb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SUVMK3AD%2F20260313%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260313T082442Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDnBiZ3GvUgHhR6o3BZsGQDed8phswkBBE6lVH%2FAKXV2AIhAIfD%2Fq0g0%2BDfDAl4KpghJRs6CbRwo%2BquZP7CsPu%2F7YHCKogECIj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igy9rT25ADE2dBYx4pIq3AOt9cidZmB9JKlTl0Ob5yOFxZbYN3TibiODFJ0IklroWMu3oo8Xa%2FzarWBiMdtxwc%2BrgwA3%2BsE0lvPmsxUHdtndgpalZNmWuDOdf494RUkSu%2Fv%2BGOog1RfAAM4VeFLkOaMvGG%2BtzmrdaAl9nma677DvCkIOMy1HZq1ELLkkUda%2BqBKVTEhsanoBtzVHWtqXX0qF8k1hj3sAHD%2FyCYpYGWp6SBlYlAQt7xSAwtygP%2Bgt2nAa3NyqDXI%2Fk9Bl7rCy%2FMSPE265f6J%2FmBzItE%2B4g2qPiMbK888P061MlMvgOuf1tO3%2F%2BJ2fsOZkps8cWOt8jn1ZYC7qN6FALlJSnEvA1WTeRpwbN0kwQ0acjA7B%2BMwDKVITSt2zL6xW3GxtBg4JY1ZvkaZnZpSpuyMgb9KJCwkoAmpYJQC1aCpdauq7NW7C9%2BSUlGuulqkbaxQXF9uZDz83R0AH1vwLPzb8ziIxVFsYolP%2BXTKNYZs9bjAQ7Hx%2B6Hffk7%2BQgX8buW1sMebspMpnmW5%2FpxgHQr8gS%2BvnTcu6bTkZTsz%2FuvT4kFKgIIy4wYG%2FZcCQICsS7fhdGKGZJkiWMzREMj06Tjf6HMfBvb62aAeZBpQwlHxI7%2B6kIi4OTmaV3BauCcZ7eRRc5zCO3s7NBjqkAWPd1Xhq2AQ6OlWyxkwOLMewSv3oIAFkpUbwtqinUODVDCsnUElzxrxuF8930PxGllpvjbofjI%2BGZ07Jf1cTjSaZ36JVbUz8POUfpxaWIvc3dzlzxrW%2BroCy%2BQHIEkI1AX0lDF%2Fsq7otiCu%2FRW%2FngcY%2BIxtTnrlXmHrvy4KsEP%2B39aks0ekWSBRE5c%2BJmjSnfwMMNmQFgGFrhY%2B8Hb2e%2BFIT8oOr&X-Amz-Signature=5b81e766fedb5582e9cfe76c9e0ca7018dd7172871250221f1024663880bc7b4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466T6CDXMCY%2F20260313%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260313T082443Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIB4nH25V0dsBJJUxI9Lx9FQpnusoEPSQpNxM07gooXqIAiA%2FKQ8mTN17pCNfk6UW7qaLZADmYtaB1aibVmN0r9fyBSqIBAiI%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMPqID76aJ1GMtmt%2B1KtwDnaoJ3U3KB%2B9aVPoQ9bxES47Bpsz7RgDRssIXjhCdcBW40yx8O2MM6rLtztjatvltB9hNy2%2FKMnQJ4fbDDxUkUr5VvJHlSWGRGkswEElXapT8d9seyCZtiXsUDrpj%2FMsUGJnRsQZC3LGFqH7J4bjHhoPGzEvFXxMP%2BA%2FRWzfDZgMAXwSktAhy9dw8oFy8E4R0y47M%2ByH%2BlPs4CVE8iMGZLttvmXombfdHVDOS0izp0Wth42XO4mQaIibzQIHCcbAlHa50aZVVpc0O4mZUN4ieiTdpZhbH6MekIRUGJhMDT9T%2FjRQ8GqKNelFkApQsRqY6%2FKo%2FJnTOBfIZ%2BDIy4taRd5fHT9PFpoxaQhzrBYnCJnpTos9UTIkg%2BgHYZSdu9J94s%2FalWn%2FX0JEdaBsEHo2k0yME24wX8oLUJ2X8ginFkTAD2c3TgwVark3%2F8XnhJv%2FxK2PJFBqpU3F7DLlEVpRZElnVNhOYCzvlLtcvtrNFVFOaqlJ38wtAF49JW6cTExqVAjyLf309ITKNBFGrHiFdbgQ5%2FnHxqgluHS789tt4ctzfvJ5WBZT%2BW4021k432OrafTzQeAFTaBHNEMQ7W%2Fm0Oxqn5kJCDo%2FMwaugmQ38ZbA8LipwppUdx9GqHxcwj97OzQY6pgGffvgzU573%2Bw%2FZj5UmoaoAJ2MRpe8%2B2ZY5uMnKMT%2BhydFHwdiQlOt9Nbp7qDDwiHB0mbd%2BIQIBp3ULnv78AeY%2FmXt%2BpuJAa1TvRhaQ4mP%2BMxUefxNcNNTwPxaNo1aOWqsRmfP5pExBBf1aCG%2FkCnrbrlCEjsp3zHgGrAH%2FRngr6nAI4dvgKcBJD7hD2hs%2BBRTB0B4z%2B5viboaFHdu70GP%2FYsh%2F3z6a&X-Amz-Signature=094b4d761dde3fa32603c9c02150f46fac923694672a13e9db6bcf8e2122de06&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UIGXK7RK%2F20260313%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260313T082444Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIHCpd8aTFg0YhtW8V%2B1Rt1qxb8136AyPj6z75qUQqmO3AiEAzLSP7xcVGLAv43Yd6NO2HKuO5H4RGuhj41K%2FWe5yCbkqiAQIiP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDEh2MZfeOZntY1fFgircA%2F6bcCztvu2o79upVTTZEZn2KEY6%2BLOf4Z4ydFlcEKf2pg6BlN2MfoFTjf3krJXQf9mCnIO0w%2F3YA2stIvGDxQMhGQVWiHJoPyduFWVpTfeIBMvd4xqLb92wwuLkDe9Q73VC0LD4SLJVsEZwEXYFUTtDrQ5X90xheIf0Ff%2FGHdYLhXwvQOqAIBFXPXvXENWT8EnRq6DCjYyhhKftU9eC3%2FneNS3ka0HuPjL3iRc%2FXzWljcBawvqAVVvEX7ZIsMgR8tZaNLvu8h4%2FRLZEJbFeQsFNVncCT6%2Fznx2Rd947LHaeHUWKGpqVLI1hQigUOVoTB%2FBPHKGspCStn6XYAUu9O0aK96TGeQxM4D7L%2FmaPbVGv4IlowwFtk2j4SIj6dF7TEMFEVqn27yFK%2FqF8B%2BugccHGZwiju2q88DB7dXR6tPorcGbCoBhm6PGZuHEa5doikjEtFy7KzR08SLnuaEVOugo6pzRIR5a8dBYtF4DZ%2Fetm1F0m2GDToLfdLFeOHx%2FzB6sBL3JAF%2FJbXo65iOIGX%2Fh%2FddNQ%2Fd1EQCJVhQehxyGVOjM6NlWSkto0xBNtHyjG%2FVpaynpXV9VpF3ANLrFssNWsMsEIOpk53TrmJB3jqdQi9Me6fI3Ux%2B9a4xEbMLjfzs0GOqUBl8F1MlcX6yFo6ENEYL5XQzK2RH0tn0ADAj28INiFDL8wHQOZ2BiXYtEr7skFZgL4rCZNkj%2BZ3FhVa0zcOQwHo8SgDFb2JPytPwKvU9gF4vJdtrMK1WvWMpo%2FSUPaCzbv9eNpyozCosm22eOhOwXDJknTiNnBBmOwuI3RQpFZ1avQ9H0%2B2I4yhw2raItPpAX1K17MynZsJo1uBhB1iEdFHKJWEQtI&X-Amz-Signature=dc55277e0c55577b72be5fe5cdce815b0288efcb1216d2aaf8196ff1dfaffe9e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UIGXK7RK%2F20260313%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260313T082444Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIHCpd8aTFg0YhtW8V%2B1Rt1qxb8136AyPj6z75qUQqmO3AiEAzLSP7xcVGLAv43Yd6NO2HKuO5H4RGuhj41K%2FWe5yCbkqiAQIiP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDEh2MZfeOZntY1fFgircA%2F6bcCztvu2o79upVTTZEZn2KEY6%2BLOf4Z4ydFlcEKf2pg6BlN2MfoFTjf3krJXQf9mCnIO0w%2F3YA2stIvGDxQMhGQVWiHJoPyduFWVpTfeIBMvd4xqLb92wwuLkDe9Q73VC0LD4SLJVsEZwEXYFUTtDrQ5X90xheIf0Ff%2FGHdYLhXwvQOqAIBFXPXvXENWT8EnRq6DCjYyhhKftU9eC3%2FneNS3ka0HuPjL3iRc%2FXzWljcBawvqAVVvEX7ZIsMgR8tZaNLvu8h4%2FRLZEJbFeQsFNVncCT6%2Fznx2Rd947LHaeHUWKGpqVLI1hQigUOVoTB%2FBPHKGspCStn6XYAUu9O0aK96TGeQxM4D7L%2FmaPbVGv4IlowwFtk2j4SIj6dF7TEMFEVqn27yFK%2FqF8B%2BugccHGZwiju2q88DB7dXR6tPorcGbCoBhm6PGZuHEa5doikjEtFy7KzR08SLnuaEVOugo6pzRIR5a8dBYtF4DZ%2Fetm1F0m2GDToLfdLFeOHx%2FzB6sBL3JAF%2FJbXo65iOIGX%2Fh%2FddNQ%2Fd1EQCJVhQehxyGVOjM6NlWSkto0xBNtHyjG%2FVpaynpXV9VpF3ANLrFssNWsMsEIOpk53TrmJB3jqdQi9Me6fI3Ux%2B9a4xEbMLjfzs0GOqUBl8F1MlcX6yFo6ENEYL5XQzK2RH0tn0ADAj28INiFDL8wHQOZ2BiXYtEr7skFZgL4rCZNkj%2BZ3FhVa0zcOQwHo8SgDFb2JPytPwKvU9gF4vJdtrMK1WvWMpo%2FSUPaCzbv9eNpyozCosm22eOhOwXDJknTiNnBBmOwuI3RQpFZ1avQ9H0%2B2I4yhw2raItPpAX1K17MynZsJo1uBhB1iEdFHKJWEQtI&X-Amz-Signature=184cc4fd20c81f187cc7ef0903369dd655feccafb5c510bf09abbef87103a4b7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Z6BJTOJW%2F20260313%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260313T082433Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIH2P7Uke3JbAjIgQGknf07RJfjolPjJPp33oqBxxHIwuAiAVkk%2FKJyXjz7wl5G7m24Xiw0%2FcjbbasLclOoEA0GnbSyqIBAiI%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM9BBwj81Z2Ezkery7KtwDOuEWLtTy9Mz8%2BAq%2Bld3Jh44rzXwZ6ERUD5qLljeiljZDKuNmIdaxcsVxr9%2BK6ooHCcHuU0gHz2rTizRsjJR%2FRIip6OfgvWq%2FWuQsvGLSRplTeBIpXfZ68e3rGghIs%2BvlOpGKj5jARW1xd5xR9eMqBdEytA9uMgn0XhKHD%2BNlm%2FLDLGQoDk8LXRjB%2FQrXdDDJ%2BtFS3%2BCDcXFWoQx1Q33Dc4MRbi4917nLXH9gIuY28qeb5pyvJB5aATefUsHTk383K9MtnWwX%2BoZ%2BCoK5cP%2BKJ4oZlbrtVm7JZ55iKHmM%2FvfPp7VVkqnW7p29U8wMnZ3R4R97VZHg8%2Fg5xHZLRZTIKLB69B7fS9Pvx5iyodBND4u0%2Fpa81Hl6%2F6K096rN1taXS1IVdNcHdFMmSW0D2dtm%2BNgwK2%2BaZCfSotL1ZMv97hN53E5Xhm3HmNKW6HzWDDIrCnelJNxuIJi3c%2Bh8p0YfK%2BjbsjhlfK1GjjIhwSkAcDaoeou5%2F6IIfEDKMPurdnO8U88RmQOSI4qA%2FMe%2BaWZLOvMCzDJw7lGTtdvlDiE08cVW267HpV6gKF5NWA%2B22T%2BCS3wEhy1ptTOczK7MuE%2B0Nv4qPhmN7atfWk2Jf46xp0HW74IiBThWLvqWE4Ew%2BN7OzQY6pgFYjl%2BIHf9RjUTZzbN5O4FhIiz2uHlZo9yoO7CR2jqlykmJ7F5wKozWssCZWDuFShCbIaa98zrQOxVdMKZK04p3IV1taQrkrLzZiX%2Fb3iDskw2ZIdG9ItD7ClckrhWtPeIPLDA89NY0bkIan5PXL5XfcXpqoBwK0vegGMzWMooPBq32Oy%2BsX23vtE8P%2BOue45QuhoFQS7HNVPqVlR1S05RHDI2GEF9%2B&X-Amz-Signature=1a35f1754c5a1dd794fc79963a19550b8893118d525ff9f7883eb7651007220e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YBOXEJQE%2F20260313%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260313T082446Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIDSyErYWeKVW3ta%2FSUW9hWx9R94UhGSz3unCaBdWhVDiAiAdHEkHKE%2F9eR2FDvMcn7INtq%2BUmdtyATBwkbJX99H2niqIBAiI%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMSX4UypWBursP3WtoKtwDAc32oyShBlLz%2F%2FATY1h5ajL1TzlceJLRqOHiFj0JYOFtYNPuQqYvn7qZnXVQqcETJb7COncyOKyY0Ox%2BXypm%2FRMQS%2FkOn0GZ9JyLAwlAXMIK9zdvZAshUEAwDOh1aRiVZvqMi24VWtJL9QNHkYFxL%2BMqDRK2SVz7F4M%2Fvv9EmjVCAaeCJzbsZv6aXrEIjJBHLpshvrOiGTKWO6K47Mrtp5URQ4Cyu9UL0aZjKgmOcHHZLXUSH0wn9iaSj0An1854I0ECSf1BCkIBzbyow2MhsoSB5jtW4gHjRxXbScepk2B9TmS5pi90kd5kxNHJUmgumvb5f1m8Tz5VDs3cqOgkiC8xGBETVnQOuGDGMPRHnn%2Bnk6qrrOxugH9UV2h9%2Fhmn0T4%2BvSX2ULFEFztyLLK1pFJVcCa%2FRbeuQllsKSJOIklOaAkJ7%2BaDU64dSNmY9zfNn%2BDRhATQDZQA%2F1ugdAuMmcwLqG8JafSQCjEHSjcx0NmwHnrqrSYJ7QZSsVQXOmT0HwPM9Ghvb0G6QB1IUItz2LxsYZZqXbyzgIo7SvESEgj58rPNRjWogGWMXfTb2KnbOI6QMFE3xgG9llRkv0nVBgq4B2fU9s2EVVh%2BbUPwEv3q2w3ynmltMA%2BOF8gwu9%2FOzQY6pgEmkLEAo2lALUKoU%2BJx%2FJmcnOnv9eWcUvj7xe5pLaZ2GAmeXitdaGywG4asVExUDLkgPZJg5L2ADK6jBQGuZ4YbpVlGY3dIY19nqVmcHtJesCfpjGEOLz7IL3XUpj97TXKvWsNt2011%2ByliOMeSbPHQCmPogvFIds%2FaPEIQrNC%2FMCBwBlBeQtrBy3fAg1ly8AB%2FZOqQQFqKTTUCr6FDupRxEKlXp%2FCH&X-Amz-Signature=6634c58c362c5a8603079804955bdfc3164d54b1ca260fae480cef2eff9822b9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YBOXEJQE%2F20260313%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260313T082446Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIDSyErYWeKVW3ta%2FSUW9hWx9R94UhGSz3unCaBdWhVDiAiAdHEkHKE%2F9eR2FDvMcn7INtq%2BUmdtyATBwkbJX99H2niqIBAiI%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMSX4UypWBursP3WtoKtwDAc32oyShBlLz%2F%2FATY1h5ajL1TzlceJLRqOHiFj0JYOFtYNPuQqYvn7qZnXVQqcETJb7COncyOKyY0Ox%2BXypm%2FRMQS%2FkOn0GZ9JyLAwlAXMIK9zdvZAshUEAwDOh1aRiVZvqMi24VWtJL9QNHkYFxL%2BMqDRK2SVz7F4M%2Fvv9EmjVCAaeCJzbsZv6aXrEIjJBHLpshvrOiGTKWO6K47Mrtp5URQ4Cyu9UL0aZjKgmOcHHZLXUSH0wn9iaSj0An1854I0ECSf1BCkIBzbyow2MhsoSB5jtW4gHjRxXbScepk2B9TmS5pi90kd5kxNHJUmgumvb5f1m8Tz5VDs3cqOgkiC8xGBETVnQOuGDGMPRHnn%2Bnk6qrrOxugH9UV2h9%2Fhmn0T4%2BvSX2ULFEFztyLLK1pFJVcCa%2FRbeuQllsKSJOIklOaAkJ7%2BaDU64dSNmY9zfNn%2BDRhATQDZQA%2F1ugdAuMmcwLqG8JafSQCjEHSjcx0NmwHnrqrSYJ7QZSsVQXOmT0HwPM9Ghvb0G6QB1IUItz2LxsYZZqXbyzgIo7SvESEgj58rPNRjWogGWMXfTb2KnbOI6QMFE3xgG9llRkv0nVBgq4B2fU9s2EVVh%2BbUPwEv3q2w3ynmltMA%2BOF8gwu9%2FOzQY6pgEmkLEAo2lALUKoU%2BJx%2FJmcnOnv9eWcUvj7xe5pLaZ2GAmeXitdaGywG4asVExUDLkgPZJg5L2ADK6jBQGuZ4YbpVlGY3dIY19nqVmcHtJesCfpjGEOLz7IL3XUpj97TXKvWsNt2011%2ByliOMeSbPHQCmPogvFIds%2FaPEIQrNC%2FMCBwBlBeQtrBy3fAg1ly8AB%2FZOqQQFqKTTUCr6FDupRxEKlXp%2FCH&X-Amz-Signature=6634c58c362c5a8603079804955bdfc3164d54b1ca260fae480cef2eff9822b9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666QQSCGR7%2F20260313%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260313T082446Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIBHo7x3ctZyJII8Y40tOgndIkAmDqkM5%2B2vS2bg%2BomlCAiEA4gHg2H8SbIzcGyFYgr%2BgczuGqfPxLDARdw4v%2BHlqb%2B8qiAQIiP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDIQMC9%2Fh4bjZTp8nSCrcA8wMEdoIY87%2BQgeDMY0vXI5ll0A%2FW2ii9E8Q1k6ql892OoBCItGC1URBV9vdIVSrlmvqF3hwpstqzT%2Fy0zEaNtkrK3YEU4OW9OCpCUCxoEKV9g0fAne7zw9VJbVQqPz1nSxX4xS%2BkmJO7k87WV348Xat%2FisZmLDhllJKLtGBtdX5VWLm2oFJ6MzcoB9ZcyGYMst6SBcwQOsdWZMVaZEI3MKcks0tZBcwsojr3sJdZEEk6JMW2b9ULG29oi4Wg1EaniLvn8bynfNLxI0K2DzAtsIhtWvPGemaPhmZ6YefTVQdQTMtFbYGFtCmQuKX13Ve38kSy6ARWLCoi5ybncc3aNSj1f30X6wJ%2FpvIHomE1T12BiUY0Ivp7KnqEHfuChszIo5cYoRCaDceG9EN%2FndduWisKtlpBDD6NBlfrTE7z2xuQabw3W6ECCv4gU7ZYJI2GTkU9OArLj3ALzmODdrJPWp4aiS2WQBJadHrbnSXm5ZkUfblOXl%2BwAENyiAYylmyQlN4UYC40wS8RRbSK%2FLPE9mlsX1wZ3XEg8kNj99PsBCieoFO0CfXTeZUO%2FA1BijPFry8zZaoYvZQS13CS9SgDI2f2yrvo2MAwBc5979rS6jaEZc8v82boNF7ZOqZMPbdzs0GOqUBhMJEUT%2FV8zOSUe8H8KSEf5JdsVJSzd3r9vJueDeOif%2BWtRuKj0YggqxmegjiQ5ZnhnXDVqWRanckdSlXQBu%2BdCVU9dSLfp3fVS5SQWlsNmuxKZLVQEBS6uWXxFI%2Ft9quUp43FuukIwsxUVS66XJ1kItF6J%2B7QFvbR0MrxMNtaMGJInlxzROI3gh4mm9KuiTtwzKl2hNR8BRZLPMvoBH6583grZ9%2F&X-Amz-Signature=0bdb6beb390c422e05fa39a2b99c49a1f852240894a303b3d28cf464460ca1d9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

