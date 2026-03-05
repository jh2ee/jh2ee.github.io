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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46653XNXD3L%2F20260305%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260305T032417Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCG24L56L1LesIJ3EhyPP2prWqLCw716EHh2FpSyX1YqgIhALT1n5qN7vxMBHH%2FnO86lEE%2BfFeJ%2FXZ0rlbrrknLXyMaKogECMP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwZ3Ly0bQwzcEsJMkQq3APidwfDuvit5zZO1Ybq%2FeM%2F9c3k6IWrzu%2BBTmQnsprbdIc99TR5puad%2BOliw0V5u0jKK6fqKjR34UVjdOSplw1GsC5LQ7jWuofQ%2F6JxiYnem2Ss3gqtqWWmNQ6LSatOPMJ01EcvSeKHFeqvrkviYtbR6I9TMW%2FvNmAZJpmquqMtXY3g527EYv72Aush8xmsupJpkX5lLmz4ZdT%2FCfFoe8u7bkZyITtsPrHuJj8V7T6IlaYPgEmXF39nXmu5A9DLZvicQ90d6uFz4TSMiChGrhWqKd91vQR9VUhxqaoioLjxfGSTNybrYrnVWLsE7v3EjiD%2Ba5a%2FFgODreKmj0ZvQbGAzMDXnzKtebjQMbe2GMTTJZrRni0mRCnllBJbxYJ5wMPipjFqrK9KrpnS7Ei96PSpbrDmc5GpHWd419KVgDXDrZIe4gJhktF%2FZhztPBIN3VckJPXros4SV2E8jG0tUIdxAiM9t3aVRgtoFGG30i9HsEPIn0cNC341OouJ0e%2FnGFWk88B0aH87tnFouleMlnW%2BDQiaYehyvEhi4ltEiO9z%2FNA0n1rX%2FDv%2Bw0HCovuhjB%2BooA7eB2Cc2%2BAJmqMHFrNASrapSHN0z%2BCswx2oj8jF5ABvdlYkv%2FEv71PyyTCIxqPNBjqkAVfTIVxQfRRlOVSKdo6JFQDmMS8DjvEXzvUPdrr%2BN5wy40E8Sf3xX3boWPpRjOnp4XFd%2BZwfWqG%2BWM96nlcffDUJEh%2FSwioPuluIktXKE%2BwvRta09PByU17l7mAT4jy8o5Q%2FK5HASt%2Fdk9TXZv2tql3%2FQvMknlz7cf0daxrHrqmQQun%2FFVOmoqkcx2jZy%2FL9vW%2BXzvRQDblTkmdb5en2E1wMVQ9%2F&X-Amz-Signature=a48809c64d705585db53b0381801c780816e0600f79fd0ae8c24064e67cced8f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46653XNXD3L%2F20260305%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260305T032417Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCG24L56L1LesIJ3EhyPP2prWqLCw716EHh2FpSyX1YqgIhALT1n5qN7vxMBHH%2FnO86lEE%2BfFeJ%2FXZ0rlbrrknLXyMaKogECMP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwZ3Ly0bQwzcEsJMkQq3APidwfDuvit5zZO1Ybq%2FeM%2F9c3k6IWrzu%2BBTmQnsprbdIc99TR5puad%2BOliw0V5u0jKK6fqKjR34UVjdOSplw1GsC5LQ7jWuofQ%2F6JxiYnem2Ss3gqtqWWmNQ6LSatOPMJ01EcvSeKHFeqvrkviYtbR6I9TMW%2FvNmAZJpmquqMtXY3g527EYv72Aush8xmsupJpkX5lLmz4ZdT%2FCfFoe8u7bkZyITtsPrHuJj8V7T6IlaYPgEmXF39nXmu5A9DLZvicQ90d6uFz4TSMiChGrhWqKd91vQR9VUhxqaoioLjxfGSTNybrYrnVWLsE7v3EjiD%2Ba5a%2FFgODreKmj0ZvQbGAzMDXnzKtebjQMbe2GMTTJZrRni0mRCnllBJbxYJ5wMPipjFqrK9KrpnS7Ei96PSpbrDmc5GpHWd419KVgDXDrZIe4gJhktF%2FZhztPBIN3VckJPXros4SV2E8jG0tUIdxAiM9t3aVRgtoFGG30i9HsEPIn0cNC341OouJ0e%2FnGFWk88B0aH87tnFouleMlnW%2BDQiaYehyvEhi4ltEiO9z%2FNA0n1rX%2FDv%2Bw0HCovuhjB%2BooA7eB2Cc2%2BAJmqMHFrNASrapSHN0z%2BCswx2oj8jF5ABvdlYkv%2FEv71PyyTCIxqPNBjqkAVfTIVxQfRRlOVSKdo6JFQDmMS8DjvEXzvUPdrr%2BN5wy40E8Sf3xX3boWPpRjOnp4XFd%2BZwfWqG%2BWM96nlcffDUJEh%2FSwioPuluIktXKE%2BwvRta09PByU17l7mAT4jy8o5Q%2FK5HASt%2Fdk9TXZv2tql3%2FQvMknlz7cf0daxrHrqmQQun%2FFVOmoqkcx2jZy%2FL9vW%2BXzvRQDblTkmdb5en2E1wMVQ9%2F&X-Amz-Signature=a48809c64d705585db53b0381801c780816e0600f79fd0ae8c24064e67cced8f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46623UNYGQY%2F20260305%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260305T032418Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIFaNVzRbEfefWUm%2BwWudlUVL61iHA00ObhVlDxWM0QO%2FAiB8%2FeycWRT55gUeEdra5xU6%2Fy1Tl7sG9NUJH2h6CVwzMyqIBAjD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMUCqIwOjBi6crY8uoKtwD2ljKfrIXYs7pm80dktUyM%2FN5wvmPqTjFcKfJ6IduGZ9X1Gq6jPeJkDOhFUsena0NNpwzHvz8p2vUaotI7HUjcszmYWSbcmS71RcW01S7qxcfORCrKUjpDdEUiraSqi6%2FTuketrk7hwPzZ%2FM4f7l92UU2USstB%2F63VCOdTE2t%2F0V4TVXDX0vjutTRz3rfYEjwdpnlbikxImlDJ6AZsUu71cA0FHve8XtGTdfnhbYDf26T0dsXkQM6E2u92GWpV54GeqqOOgIiZvsDdUL5s3hAsYBUTK4Ve6skM3JOOkdJq6rYIz8iwxM07PG2boU%2FWeOCjSmIoexzQz3oYiiSvNBuRVwEToR86wfBE6LkMnKuFv5vjXiD65PTQjHwtIJuHHT17YaB5FWwfgjWuMeCH%2B1vpTcOdx9mPVI1XvcFLi1or2FKXWoNtTmrJDfmjlQJzy2CYZs915SAa%2FZugQH0YCfHWGAi0UnLjPB4WIRcvM8xJ8%2B4bAtOTDiD1lxoviCWAbk5tLzd6qnzlvyXytu0lzyCArG%2BWMepNgKlZilkI3%2B63DpwJrryyfAYyvnqCo76LpBGgGcqBNG3ZQmN6lPN38qMCfHzy4mxGhvekA73qKyAuKPq4rcRH5r3Guhe3dYwiMWjzQY6pgFkb6EkrWh7KpYwq2hoJ7Igi6C3WL8vZLs6ZeNGpn9JhudT3ZVf6zh1xl8pJDh96%2Btyaox7e2IbZDJkiS5rnhKreuM52o21hrBL6IqAhDbaFH8y6ANKVgHq5kWVqAV%2BODPsNHffEc7t%2Bmh4cKyeEK0RQg3qfoYb1bzDYEoIlb8ub%2F%2FtuhTSlOPAxsbBpzL43mae0RV04cqzdXvEozhZnkUhclZ84Cjr&X-Amz-Signature=6dc1ac36441e8fb6fd7ae7222a8179f306ddec712c3525a6f3a4bf40d52dc073&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Z6ZI62IP%2F20260305%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260305T032422Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCRsU1WqpecnYA2Kh2gcJxdXFNh724H43p3p4C%2FBCrHBwIgeoJKbrS%2FFYNOmehQz5ebY1YUgtFarLFqoSHnMgjgApQqiAQIw%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDKiuSPkX4ok2WkL97SrcA%2FERUXKdVE1oeqox1BJxQE2DzGdKJ7jjo5NnhhC%2B1SapGgnNTgrZHJnPOo2%2BuVXwSj97vEdpY4MUvxSUix%2FFfBeYcVic1FIqCQx72IE7kf9oSPqCrbjvceYyS3O9PcxpErjPF4t7lOsnRhEj9D%2FPhDrdenp09VutB45oe7aJgpuiCEHajK1U4pwzgOsMagJ9%2F%2FIwaWsR6U717mmi6S69WeaNAG4Wct14nsWiOCcDP5ylMjb8a92UJ9F6JhttOf%2FpnKHedm4OSwN2NYprzp6mfzA5mb8gXYtkjnmCItQLbKObmYgHBS2uNrHl7MEFTun6hValAPB2g6SOgfDrqDQIbb9NtDYBlVfvereJjCnLm%2BGnFccIxLtxsc1Hw5RtcYbwnT%2F0YNwtnH7nwwbdBtL33Ga%2BLrMIC9lkP%2F1q02FmrYvwhdNYgI3JZSjr4QBFdAk4tQej74HTrr5S%2FLPkWcApn4lF77aQF5g0WJINv3FU5NjAta0gkkJQC0yXUmStL6Butpx5KWRyHNnxh6qslCMMK151SMeqxcpSPcGAQbO%2B1mhmuyLHcrKoFBbjZPHwwSyOAcUmYy4rEttFXgyc46i6HAhi8vNrhxEEi1XnKtHRv1519B8vUy4oAwqboGZ9MNTEo80GOqUBNSbTAerGwwwcyX4JqYiXe6MO6Kwv1ldhju7tGTYjh90L6tmptvAivnOj4Q3FPd2r5LFjAH7vdh0lqcRr3x3i697DNV77X5%2BlEJLgF7GF6Wz%2FEi1U6kwjubo7dUsoPo5JSw%2BzUiZmEklowHzidTZbqqpNOMD97T380WBxLgxGN0eERvNdosVtgNYHLaP%2FXw8DyjbPO4Lk9dgQjEhvc15qEGDyRCE4&X-Amz-Signature=5d94aa0774e561bdc6ba3f73b538be4201d4a497f75327a3e6d7dc6e29b669d6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Z6ZI62IP%2F20260305%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260305T032422Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCRsU1WqpecnYA2Kh2gcJxdXFNh724H43p3p4C%2FBCrHBwIgeoJKbrS%2FFYNOmehQz5ebY1YUgtFarLFqoSHnMgjgApQqiAQIw%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDKiuSPkX4ok2WkL97SrcA%2FERUXKdVE1oeqox1BJxQE2DzGdKJ7jjo5NnhhC%2B1SapGgnNTgrZHJnPOo2%2BuVXwSj97vEdpY4MUvxSUix%2FFfBeYcVic1FIqCQx72IE7kf9oSPqCrbjvceYyS3O9PcxpErjPF4t7lOsnRhEj9D%2FPhDrdenp09VutB45oe7aJgpuiCEHajK1U4pwzgOsMagJ9%2F%2FIwaWsR6U717mmi6S69WeaNAG4Wct14nsWiOCcDP5ylMjb8a92UJ9F6JhttOf%2FpnKHedm4OSwN2NYprzp6mfzA5mb8gXYtkjnmCItQLbKObmYgHBS2uNrHl7MEFTun6hValAPB2g6SOgfDrqDQIbb9NtDYBlVfvereJjCnLm%2BGnFccIxLtxsc1Hw5RtcYbwnT%2F0YNwtnH7nwwbdBtL33Ga%2BLrMIC9lkP%2F1q02FmrYvwhdNYgI3JZSjr4QBFdAk4tQej74HTrr5S%2FLPkWcApn4lF77aQF5g0WJINv3FU5NjAta0gkkJQC0yXUmStL6Butpx5KWRyHNnxh6qslCMMK151SMeqxcpSPcGAQbO%2B1mhmuyLHcrKoFBbjZPHwwSyOAcUmYy4rEttFXgyc46i6HAhi8vNrhxEEi1XnKtHRv1519B8vUy4oAwqboGZ9MNTEo80GOqUBNSbTAerGwwwcyX4JqYiXe6MO6Kwv1ldhju7tGTYjh90L6tmptvAivnOj4Q3FPd2r5LFjAH7vdh0lqcRr3x3i697DNV77X5%2BlEJLgF7GF6Wz%2FEi1U6kwjubo7dUsoPo5JSw%2BzUiZmEklowHzidTZbqqpNOMD97T380WBxLgxGN0eERvNdosVtgNYHLaP%2FXw8DyjbPO4Lk9dgQjEhvc15qEGDyRCE4&X-Amz-Signature=ebb650b5f28b6747212b001a5fd49624f7817917aa9b9552f0ae28e3b897d959&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662ZTMYVVO%2F20260305%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260305T032423Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIHjkO39FaKhr2qTBWeoZ7wXNs3QRNV3PS%2FH46G%2FWxHPNAiA2sBMGLxGiXFAUUMaoCGaYfxzSAv9U45vtUCLtlw2ZgSqIBAjD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM6z0H68g%2FBx88uFCiKtwDutfOFBcKyMd4quLR%2FvxaYARZSV3kR3Mt4Mn3JrjzphI8YS6c2FWIj4GgBI5unuv2dh58yJ4eZ0eobUIPi1I5cLXY6mm9Vmj9XGBPkc1wj1tV4Qaa%2FpjkPUaEKNoNjvYVELScKNJKpRpYzKGZsRBNlPxZ3yKVLPYR1tktwZeZuVIAJ%2F4kIc9ugRmWPJbNt9ss8QROHP%2BOumpR%2B56%2FQlVJweY341HRyLalTZMfxOU%2BLqXVN9jC1t4woFTa4Y9J2TLRUSsoxXOLTtzm2zZqjmCdkryr7Uksed%2FK3ZBqH8uKcnfPck4kQBjoDLr7bqQejfo9HP3x72uHenxQx%2FU1kVXOD2GlxvB5HnKwY1w1PBmPyV1uU3NrM9TxFx3oATq8gmTEwsf%2FuJZSmIVGPLMNH6xbWPLUC%2FBUcuaj9rEBnGCmnuew2KcwWeT5OcCeNAzsNKqQWsRi55enMkvtMyg0QwBxnJ3eWlW71uoSUvQkJoPFaAtZfaCMPag4P%2B43t2OGivErrv0E4t3PZDb5DWcQNbidm0GlzKaxq0mtoG1QvRvBWELAqvoJ4Ez%2Bdbhkp2APuxwfIHbAjASXcUbY7k9vy8XD%2BxaESow852aNBcIDajKjAP8rK0gCl9S%2FJ%2Fiy7XEw4MSjzQY6pgHIIh19mcFRJFP%2BrXeoaPplhIOoqQjuamijcH6B3Kz%2B7WkWfch2DT6ZD%2BFAjjHiK6he24Cy6hdPhg%2FRk28i58HojIbmfQZ7wNj%2Bfg74TRRz1kYVoK%2FdmC5%2F%2BOOnGy9456LmuJvwdDO0I%2FH4vRM%2FMZ3DSQjxHbuc1xYmlBAEZQ2sQQt77V2J%2BHRD0k%2FcxKtQ0xEHfJVmyVNumHdl9D3i3yiVdhmux2zT&X-Amz-Signature=750450775f836a0a504f04c085cbffc6b08f4390598876060135370f42c68b73&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZGXRAYOQ%2F20260305%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260305T032424Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQC3Nd%2BtN76sINjnxcr%2Bn855jigLMoLkFIk%2B7BdBFxtezAIgB720CFi5kDuoHbEj8xmQS0Cmp7ESSjYoQuRUnPWPLQIqiAQIw%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDGUR0m31G86w2E5H9yrcA6P08miVJD1NMYL3qBpSGf5PDBzUFAX9bAOXtCdPvXObVxgTgEt1KnovX80jQwcVx5MgbsEkgq8zs5OR8PADIlK%2BdQcBzOK2%2F%2BnFZqktKaAmkcHtqQNglw%2FSd4wjZxZVd2BBwKF0v7weenZCPxPjIV25qrVIpAuM%2Bo%2Ft38%2FGjPllmZvjbE9fmrvEqF8n6G6qtpdtUER1ndgwqEBVTJxqarFHixx%2BkxYNme7b%2FO2qxpZeitgAq5cacL1jRNP6MFyOgCusNc7NNy1u6e6tgM1NUeZmaOVRBeq1ThHnp9FS5OMDIu%2F8Uv91j41v%2BjFXVeJOcyqBxWf7C2kuP16eCHJ64sesIk18Pqc%2BtPcaCCxtyJWGm2iXLfK6YywP%2BO3FieFIizTc08wpK0UJMVZw4yidq0eToF2QBeViCCTnpw1OmRVl770zn4IBf%2FjssBr8FSbwcqdmLXwYdRz47hsscxwPrRy6p7ll1HUksFZR8vMiMb5534VCgnZuVSflo703ryHfcImcH%2BxSs93K0C3SmKn%2FNVUBkENAt5sj%2B5%2FN5tSSTxCpgJgPT2xFSbekBlYOfxEiPHg4FM%2BTN571L68KFSwDeerRptWY%2BToVx%2BIqK4AgQtrCCimk4bhdsmAR49u5MPfFo80GOqUB8BLkYHVZiIDSbqhmK2sNIRmUnFtk6DgJr3LZ0Ip6l5aZbZdGluGT8ojnbeVvF2oj4jRuIxqK3uBcxI5unwv2pTZhwoJE%2F43Ux7GS2%2BQhUlktogQzJnSEQ1Gqst3xQDDBLEmSSNRT9L3uZ1XLm3HYXYcM%2FESiozzrDRGI%2FrKSEwEDE%2BCRjrtheQnrbj3mieTayN4n0G4bM%2Ffi33TsnRXe1L74Ttif&X-Amz-Signature=852e8c520e2e76995ef52f78446ea8ca3081096e88e2bad46dd6e30d811963d2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663OV7KAAQ%2F20260305%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260305T032425Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCPSHvh9E2a0xbGSYB9GIwGGZzmTiHMa2pDpgiqRhbDeAIgS3tLtqKHffsdxLe5Uq0xhEtpvatMi0Sa7UX0Cd6cFU0qiAQIxP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDGCfcc8EYpAV6sbfBircA9pi%2Fdo3iZ4aYKsKDTZ5DIM4cMnV7sTSnowwbFGdgR1xidnyeS72HU%2BfMJY6%2FpwDamqvGaDgv%2FRefjBUUcTkeeFfGtwEylddGk4WZqQk4q9YhqP0IAg0RKcuwVBlrepGVJW8pnsQEp%2BALzI6WJrpYuIluWpLXe1BIBO8OkBo57Z8u6OdT37%2BUc50C1UVu9w6g55EeFryZP4%2FUE%2Bo8e5c3gRXtHes6%2FjXWcBG2qvhSLNQ2KD1aCvemt7SVBVSEUIy7tVyNcwnkn5XQ8k7ZjyHFqiPL%2FIeYEjdKHopaIutF2HevycUtgDVoLNdyox3NK74HsjHlgB12QzIjT3kKTbRNFuqfwZnQ6jYytbHUSpWBhh8Dw41Iejjl4usziSoH24rqz7R1OQEdrnEPDlw%2FwxIq5jVYDjbdvHGZB%2BL5VfS1iONo4OKduG62AZoj5P5%2FhKnAqyj7zCmCjXeyxJ3RfcYBUTjiRlV7gO%2Fln0Aeqd1LKF7Bd8luAYzFesQK0iO5ei2hjKnArAXd9upK39SXq98PVmBWzSD%2FpJA7J2USB5NxoUEjqXouFOdJiPoce%2FLxIAY5xTsqoPDfCBd4NbNAuNIF6fMsigncQ8XzcW2Fj8e1IClhNm4JLi0juyLdG%2BtMK7uo80GOqUBemjW1ckocqILARmQ3xP1rTEahPWfN4bKrIeuxfLdWSoCj%2BTDU98mf1%2B%2FwOqQQ7FDlt9mFpXEJPGz5fEZbf9GRsvlyaQoTBOygLXJv0sOkyP9JBA%2FKvtTHL2dOXcGUrKM4IB%2FbVxzeXFe2dhTZl6swNOnUO086IUWiIduQVohQ7pePK4Lhrj0QGEel1Xdpn8iE3GrGTaS%2BzG4U5djkJeqN1DxkF3e&X-Amz-Signature=63e7d99c507653ef26008e5b946d77c68750f1ee7b0c7e9a98d3f8c0e97a0878&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UM36QUF6%2F20260305%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260305T032425Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCQyGmiC%2Bb4bU7dP3%2F0OoVYBtFb3c5K0qgRwGBTu7JIHgIhAKIVcomj5MFv%2FM2gO%2FN%2Btq%2F1F9odtwP%2FeGLjhNpvB7iIKogECMT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgyTFfGUjJAumaUJx08q3AOYjuNtCgy2WHrZq6rdpTOtyEtYE500voCE816oy7zh%2BJeXHpkKJkvdJHFiTTU7qnaznyjPLOLWEs56zHLae2N7sgda%2FjeQ%2FR5NhqByuyA2KJZ%2BKKDZfW5qDcvxryzsG5YIFtVKtruQVEEzjsltP3cfJkZhdHjwCJjKFgoEsjGQuIxCwsKI5x3G3B%2BLpAZjOHAHpCmeqRltcLryFgQ3t2mDzJQRBHMkP%2FcJdeftOVDUeQ4zhGAX0%2FZbLMK13xJJbrtRkXES4bRxihzAtFW7OYrUkUrzUbSVtdfX547N%2Fcs%2FzvLTOeChFVAOCLXzPZT4OzCcRn%2Fzlt1jV1SD90MF7pWQQ2ueEq6VlvI8U72TZVsJNy6VZ0Mqmylh5JckDMxyeorCXcvWqsAablD5Dd0FLdEfBKo6l%2BLYYXw2CdH9%2BDKiWXBWc5hyXg%2Fbhv%2F6Q2FACI7BhDryIYx4wF29zIQwvdX66jiibGpW1lTsZod%2FZXKI9KWf%2BBXX0WnvJ5IQCvAQuq2KhL%2FlTqQ8nuvFaqTnqzOSorzmV4iZwByLBfolw7JoFtIsGDC2R%2FvRt1QJHuV9%2FaLNcIrvWaqMgaLeAYDO8%2BwZ45NGoD53ftCBG3Gj3VdagX5xok1cyHncuLZO5TCt7KPNBjqkAU2W72cMBWdfghqsDVKzUx059PWIdom1XWAZKo3z41DqDh%2FCAr%2BDmgIzyr1F7dJE9FrKuoVRuQU91a%2FFNg5VAQm8B3WnD8rxjA3CJJ%2FhrjsLg5dsS2n%2FsKaJCqgz%2F0HQIVyKK2ZqmktuH5V%2BH4LiOunTChopfaRA7TcZ2ETt9CY%2BL%2BnKURgC3CYu0gtn2m%2BYrxroj9zr5XIMFI02YxR7WhRVXnl0&X-Amz-Signature=bd7f0f5bcccb295276aa92b6665635b27ac08c26b5332ad8c1588f86bb91d4fc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UM36QUF6%2F20260305%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260305T032425Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCQyGmiC%2Bb4bU7dP3%2F0OoVYBtFb3c5K0qgRwGBTu7JIHgIhAKIVcomj5MFv%2FM2gO%2FN%2Btq%2F1F9odtwP%2FeGLjhNpvB7iIKogECMT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgyTFfGUjJAumaUJx08q3AOYjuNtCgy2WHrZq6rdpTOtyEtYE500voCE816oy7zh%2BJeXHpkKJkvdJHFiTTU7qnaznyjPLOLWEs56zHLae2N7sgda%2FjeQ%2FR5NhqByuyA2KJZ%2BKKDZfW5qDcvxryzsG5YIFtVKtruQVEEzjsltP3cfJkZhdHjwCJjKFgoEsjGQuIxCwsKI5x3G3B%2BLpAZjOHAHpCmeqRltcLryFgQ3t2mDzJQRBHMkP%2FcJdeftOVDUeQ4zhGAX0%2FZbLMK13xJJbrtRkXES4bRxihzAtFW7OYrUkUrzUbSVtdfX547N%2Fcs%2FzvLTOeChFVAOCLXzPZT4OzCcRn%2Fzlt1jV1SD90MF7pWQQ2ueEq6VlvI8U72TZVsJNy6VZ0Mqmylh5JckDMxyeorCXcvWqsAablD5Dd0FLdEfBKo6l%2BLYYXw2CdH9%2BDKiWXBWc5hyXg%2Fbhv%2F6Q2FACI7BhDryIYx4wF29zIQwvdX66jiibGpW1lTsZod%2FZXKI9KWf%2BBXX0WnvJ5IQCvAQuq2KhL%2FlTqQ8nuvFaqTnqzOSorzmV4iZwByLBfolw7JoFtIsGDC2R%2FvRt1QJHuV9%2FaLNcIrvWaqMgaLeAYDO8%2BwZ45NGoD53ftCBG3Gj3VdagX5xok1cyHncuLZO5TCt7KPNBjqkAU2W72cMBWdfghqsDVKzUx059PWIdom1XWAZKo3z41DqDh%2FCAr%2BDmgIzyr1F7dJE9FrKuoVRuQU91a%2FFNg5VAQm8B3WnD8rxjA3CJJ%2FhrjsLg5dsS2n%2FsKaJCqgz%2F0HQIVyKK2ZqmktuH5V%2BH4LiOunTChopfaRA7TcZ2ETt9CY%2BL%2BnKURgC3CYu0gtn2m%2BYrxroj9zr5XIMFI02YxR7WhRVXnl0&X-Amz-Signature=8e632f3638e698e4fd4b922d6f4c478e3e7aae81ad4da332ca0d91f55c64abcb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664NRHOC7I%2F20260305%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260305T032414Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIB62qO5p9na9VXpqh0WGbuyg7UlDYCrLh2DWPgzEGg4NAiEAkMmNWLgsa2IimG6ePYFjbjTbEayvITAa3BaU%2BlyIDXkqiAQIw%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDBpZq1Py6aWpW4CSbSrcA18AE6pNPhUPO06LCg0gZqgVDDxU3mUkvo7qyYj1UR8vL9BOvLmbIo5GjZRWXKYsZnLa9sfrKqs9ea7%2B5F%2Bb9QIWUEbHyk1Bmp8GifhN5KD%2FgCrOD1OTsMWuEczAq4DHuS2OMxi4%2B7O2HsH0drw42fYBuqRfBWqoav6B6SbrFEXQQc8DQ2vxaDChQrfLY44j3oookuc2lsXbs26pC%2F3yNNpg2fWrKEPk1Pxy3dxLXkIWGKHScJ3hP97tbIIzMomE8ciksL1ogseWGhRc4uhk6c6gdw19jvZ7tlNRObiA8LitKlzYyqYNQBAncdQQPK04wpBF3VnaMWuvvorniMF%2F%2FWjODb78nYHINeFc4cdB35C6K3F%2F9fxRO7zuB99eAFBE1JKOKtUUaF2E3%2BKW6hSu9D4oIwyyRCxZ2zlO9bMak8dYhFBPS1nqN25ZuEuqdPnMO9fDhjv1pZr8XiVi0Hl5dpjf%2FdnctlgDPTbDrg6jtPchm7hRu2yTXc%2Bkp9HF%2FJWF%2FbZdrU%2FlRWI9jPkCmAG%2BE8cDGGKGedu7G9D%2BZV%2FTgE8um4AhBFFrc13tZo%2B%2BtgDVsLw5TSjek4R5OfOBmb0JZg1B6JTYqCtnDBcPDd2fRhyZV6p9UWDg5wT2S49rMLjFo80GOqUB5XY0GrQd6XZexSsCjEXodmzr5X0BfKfg8A6Sr54Jq84zmwRvDt67tMI%2B4%2BrEtNXOpiP3aNTmlecq9RYy%2BHrwPNA25jgScXvR3EGDxbSEDcHQZtoO%2Bv7GXhSOSoO6f3BiM9id1Ow%2FRUjdDPgnpenS6kgMi7APjgrgm7ROOGbpgOeO3xqlWru0rP5f1m2gFUF%2BjTrCOAZLtmYrhQflDoOn1BDhJ68h&X-Amz-Signature=bbf057f504a4e6f7242c7218e307e2160fee5168de93308088c7398f39b5cdb7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46636RUCNOC%2F20260305%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260305T032428Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQD20NgpbTPrbcp%2BRtkQDIPxxDXvpDUUfknANMCVGFnwmwIhAOxKRuJ7BzzP6tVnP6bMvPbAcLDmkFql4lXT%2FaNKJIlnKogECMP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgyYR5tkMMhOhxL%2FpXwq3AOgFNHc5p4nHnv7DX5Jh3WPBvTtePks4RIeKcfDejOLpFB%2FRDh%2FimR5Rwncz%2BICKjz4AjcV3TMeFrWG1w29ct1cRoOdL3apCaqQoRyOtX3IePm8zfaoEkyKnSlnoF%2B27ruYCP4htnQ8StfyEKdodiluYDWLH%2BMU51lVbICFQcnmmEgZjeh8hbaSlJ9lbFDhtM8on99T%2FKt6uEY0KEGrYvdrvQ8XRQhkjGu%2BNev2nuEcbKBM%2BAgrJggVy1UFB04tk3xqDOdEIM9uUCCunAgysBsvrHtPbhEtoc98%2B7A7EyEAMeEYeKzJnDZqcnGx%2BwjM0j0bcoA3dHmcDFjZ9dJT3vG%2FJXR8%2FyMRCnJrduiiA2D3Eywr8yJECRIFB%2FnJulMTK55EeOJmy5Ic8YgIOqc0nKFRsa%2BD4unayHDF6GBiJ7zlS1Jja3X747Yb4w0s3tbkO4TGhUHZ6iSagdsaDQS8fR%2BW1pr199RUmz4z9d6H0zV6e06tWkMOr7BHBsy7OZ6s4QeUDEauQZ9J9HZUtkUWSCkGB43f0CzXxJ2Je0tuBb5S15Us5iyuTVcJkG1X9vKLIjDruK1e6I6beLBmaVKmHQMTA2KB7rtmwq0QD9eAAINFUZ4TrgHHzJN5KvnzSDC4xKPNBjqkAaS8RegmBDbMGhVElQzRfMmBspOz4ngV6K6OirI4P4BYwRf%2Ftfrxy4C%2BDUiZCIXfmYtlOMllFrdemTxA4%2BHSvETKGgbID9JT4MTwUYzcYH2oE3ERGkdc8EM29myTa1bMjb2TwxhEyu4N%2BAvmsw6AmXExcbovdp3GdtSRrM2snUm1%2Bbo3BUlvbf3XxDsVDWPFWqN3LpgoTAAnGi0heXL9VsZ1xBeQ&X-Amz-Signature=b86c5e8c2d7da2a9df1a6ac9a53553b6138282dcffb32f20594b1e71df0d45a7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46636RUCNOC%2F20260305%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260305T032428Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQD20NgpbTPrbcp%2BRtkQDIPxxDXvpDUUfknANMCVGFnwmwIhAOxKRuJ7BzzP6tVnP6bMvPbAcLDmkFql4lXT%2FaNKJIlnKogECMP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgyYR5tkMMhOhxL%2FpXwq3AOgFNHc5p4nHnv7DX5Jh3WPBvTtePks4RIeKcfDejOLpFB%2FRDh%2FimR5Rwncz%2BICKjz4AjcV3TMeFrWG1w29ct1cRoOdL3apCaqQoRyOtX3IePm8zfaoEkyKnSlnoF%2B27ruYCP4htnQ8StfyEKdodiluYDWLH%2BMU51lVbICFQcnmmEgZjeh8hbaSlJ9lbFDhtM8on99T%2FKt6uEY0KEGrYvdrvQ8XRQhkjGu%2BNev2nuEcbKBM%2BAgrJggVy1UFB04tk3xqDOdEIM9uUCCunAgysBsvrHtPbhEtoc98%2B7A7EyEAMeEYeKzJnDZqcnGx%2BwjM0j0bcoA3dHmcDFjZ9dJT3vG%2FJXR8%2FyMRCnJrduiiA2D3Eywr8yJECRIFB%2FnJulMTK55EeOJmy5Ic8YgIOqc0nKFRsa%2BD4unayHDF6GBiJ7zlS1Jja3X747Yb4w0s3tbkO4TGhUHZ6iSagdsaDQS8fR%2BW1pr199RUmz4z9d6H0zV6e06tWkMOr7BHBsy7OZ6s4QeUDEauQZ9J9HZUtkUWSCkGB43f0CzXxJ2Je0tuBb5S15Us5iyuTVcJkG1X9vKLIjDruK1e6I6beLBmaVKmHQMTA2KB7rtmwq0QD9eAAINFUZ4TrgHHzJN5KvnzSDC4xKPNBjqkAaS8RegmBDbMGhVElQzRfMmBspOz4ngV6K6OirI4P4BYwRf%2Ftfrxy4C%2BDUiZCIXfmYtlOMllFrdemTxA4%2BHSvETKGgbID9JT4MTwUYzcYH2oE3ERGkdc8EM29myTa1bMjb2TwxhEyu4N%2BAvmsw6AmXExcbovdp3GdtSRrM2snUm1%2Bbo3BUlvbf3XxDsVDWPFWqN3LpgoTAAnGi0heXL9VsZ1xBeQ&X-Amz-Signature=b86c5e8c2d7da2a9df1a6ac9a53553b6138282dcffb32f20594b1e71df0d45a7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XLFJRMLH%2F20260305%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260305T032428Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIC9GM1un2PFALRUDWtP5HC9FSHWOWYJP7KH0s9UFbZ%2BFAiB6Q2NXr7Qymz41n6PeccLJmWwh6kO%2Bon0In%2Bvwo5nl5yqIBAjD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM73uuxlQSZUagt3LXKtwDytCf6ydVBvqld%2BDIy%2ForL0E9f8VQ3LtjfyaUFsvhwT1JiwCM%2F1nj8ODkuFukGOe8yaCmihXGnvupjOBldDBPJGOVuP3MBCtjOZL2q6ClZJ7OcEyY7FTESC%2F11mI0Vk%2FYqccyNDVy5BdH3l4BmqGi4HVDileQreCNXUpXTkEA490nHz%2FxYGwVwsA5AYUrJhMKQ0ZiHMhABPBH0tdMZ8rfuCyG%2BjgwfHA39P%2FdPDUKG8XnqM2gdjzWZz9SeGFCaDZwPqLReh9Hfjp%2FbQpqt%2FN6bg6goUbfBUeBJ93rqDjjpg6v30whTo81tSiO%2FYhZoDM%2B7gQWMqp%2BvpRnF1VNeYl47t3nDukFyXKsKv5ivMU4faGkS%2F6jf3QB%2BviLO6MunqApJJ7yHJFh4CwuOhJyVJFznx0VHKl%2F5zwYJKGlxwLAWD18ATmNg33FZ93hd3U4CtcmaEC2SUKm48LJzjk2%2B%2BeS9SHnLBror%2Fo76%2B8vkrlded%2Ft9jDksG%2B%2FY73LCZCmQF288zRFZ0qXq7S1oT8u%2B1m42VabVuyVPOIAjYKMe9ofD0tjXgjGD5ATQqMbnRm2wa2sA9HlTCDs1ZhZaX1Bml9phtNSU4m49R7EMzwr4LA%2FxNxXVGu7AO1BCWB06ygwkcWjzQY6pgEr4hPwcuKJkUw07S9DrVikXYFGp9nwjezCev8VQoLytuVUg1NbMsQA6dwUu%2FkzW2yl%2FrFKPS%2B3eYyDqYNnyRA3HK0%2BEjNzncxQlgrmUleSZmra8gEzmWOOOgYKaiHsMxY5Ep6hj6M0%2B00ZZtyrXfGgIJMRJvGsndyjVWSDJvT4zzQ3OTpWm424JaBrdQENanv9CXBDdYlq4oBF1ZuClIMWNrz9cFrH&X-Amz-Signature=48e13f94bf8331913097a7738c4f3d99b9668c5b1c541175cd71d67a659f6889&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

