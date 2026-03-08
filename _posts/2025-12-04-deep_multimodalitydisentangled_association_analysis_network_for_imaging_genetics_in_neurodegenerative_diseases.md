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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46665YPAUVX%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T111029Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEsaCXVzLXdlc3QtMiJGMEQCIHIJVeA32jpP%2B6XbfK90wryW5g3o60k3LDZWra7d62xpAiA83FRHEnqk1aRqsYGC0dCA7RQiNP81u5fs1Okq%2B0ej6Sr%2FAwgUEAAaDDYzNzQyMzE4MzgwNSIM9qFs6sYuxC4lUlJoKtwDTvZ%2BQz%2BSgRrzDb4o9tJizdSV5Pd5bMQDVkdwA4QYhlUWQSH3j3EC%2BrWcX%2FVZ09XRL5g1QHWkCETWRUgppow2GB5Ga7%2F%2F5nTH9BxsULEWkqvDZpE%2FeqFja1Qda2vEDyFfU2%2BW1t6wyU3W1A9%2BCtfHiR35n4oHJypdBgFVHnj7nVo2di2FrjOqq2Kme4iJ267YNUBPD02GeZyxXpnaR%2Fucybo6JdxM43SkLCn2ySDbOsJInw6P%2BtCpr0LDdLoQByzmf1udJNm77NBengMTqizGAHYFumOL9qXr8XJ3wc79kglDZW7PD8MK5LZIcGeDN%2FCgTh64OsJ9i2LbxQpKJOXODr8JmInoL6AlIdfD%2BUYokYtXpaZR6SmBUOOx7Jz2lyPOYyI9sLOq290CizHt6hvf0JbURVs0%2B1YiLwsNGnXaOHMO4ULCSwjziOQY6dw1vF7xe7l8y%2BVyV9AaP5bIkUpQSMxQZcXD%2BAExnUzauAZGinPXAdBrPIEY7l64TwxQtqWkUl0ZNXEqMTUA2yD4%2BEORMxU8R1V2%2BDpgjOSR8zAz4gAa1Iwz1sinWmjuSfDldLAafXIKxfMXsmTx%2BSSUYjuyhlh6limI%2B%2Fxxt%2BWq16Tv36tZyJ2yrr0X3xK0ic0w2aG1zQY6pgEKZvlDn%2BhSA4tC2%2BVWkunBAitiBOqYOfdYMijExzxPuxEqOwezGD5yq3B%2B2MS7YkxDeLetoEESNPaGUNp2lQ0F4fjNiT%2Bao7gbjMCvehA52gmMwhlp%2BgQz1UiLeZQkM0OJjjMKPdvKkpnrm7EcmytPoGBzCt%2BqJ7%2Fz9QhlNO66m5cXbNfifD%2BNx86TcdmDnVCkbb10NMtAENJoKYE5cWRbw8dSzat%2B&X-Amz-Signature=66f42ef916babe70da9d853222502cb2d5c9c9a9cdd53a168f728e00e90968d3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46665YPAUVX%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T111029Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEsaCXVzLXdlc3QtMiJGMEQCIHIJVeA32jpP%2B6XbfK90wryW5g3o60k3LDZWra7d62xpAiA83FRHEnqk1aRqsYGC0dCA7RQiNP81u5fs1Okq%2B0ej6Sr%2FAwgUEAAaDDYzNzQyMzE4MzgwNSIM9qFs6sYuxC4lUlJoKtwDTvZ%2BQz%2BSgRrzDb4o9tJizdSV5Pd5bMQDVkdwA4QYhlUWQSH3j3EC%2BrWcX%2FVZ09XRL5g1QHWkCETWRUgppow2GB5Ga7%2F%2F5nTH9BxsULEWkqvDZpE%2FeqFja1Qda2vEDyFfU2%2BW1t6wyU3W1A9%2BCtfHiR35n4oHJypdBgFVHnj7nVo2di2FrjOqq2Kme4iJ267YNUBPD02GeZyxXpnaR%2Fucybo6JdxM43SkLCn2ySDbOsJInw6P%2BtCpr0LDdLoQByzmf1udJNm77NBengMTqizGAHYFumOL9qXr8XJ3wc79kglDZW7PD8MK5LZIcGeDN%2FCgTh64OsJ9i2LbxQpKJOXODr8JmInoL6AlIdfD%2BUYokYtXpaZR6SmBUOOx7Jz2lyPOYyI9sLOq290CizHt6hvf0JbURVs0%2B1YiLwsNGnXaOHMO4ULCSwjziOQY6dw1vF7xe7l8y%2BVyV9AaP5bIkUpQSMxQZcXD%2BAExnUzauAZGinPXAdBrPIEY7l64TwxQtqWkUl0ZNXEqMTUA2yD4%2BEORMxU8R1V2%2BDpgjOSR8zAz4gAa1Iwz1sinWmjuSfDldLAafXIKxfMXsmTx%2BSSUYjuyhlh6limI%2B%2Fxxt%2BWq16Tv36tZyJ2yrr0X3xK0ic0w2aG1zQY6pgEKZvlDn%2BhSA4tC2%2BVWkunBAitiBOqYOfdYMijExzxPuxEqOwezGD5yq3B%2B2MS7YkxDeLetoEESNPaGUNp2lQ0F4fjNiT%2Bao7gbjMCvehA52gmMwhlp%2BgQz1UiLeZQkM0OJjjMKPdvKkpnrm7EcmytPoGBzCt%2BqJ7%2Fz9QhlNO66m5cXbNfifD%2BNx86TcdmDnVCkbb10NMtAENJoKYE5cWRbw8dSzat%2B&X-Amz-Signature=66f42ef916babe70da9d853222502cb2d5c9c9a9cdd53a168f728e00e90968d3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SBS4KDLP%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T111030Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEsaCXVzLXdlc3QtMiJHMEUCICozuCir%2FyBneDhwXz84qgRbmuB0OdAk2im8fXDcHt8CAiEA4iw1g8wUv7unyzhhCmr%2FmH8LABZdZBqRf%2B1fkoaGp9wq%2FwMIFBAAGgw2Mzc0MjMxODM4MDUiDBylND5ciV%2FZBuOf0ircA3NiRCb648hYDB7HzFFLrqbQTDTvyMHa77ke1wZPhTG1qQlmdcW3%2Fuw%2BQ7sK8nNHqR8gSBKZZDeIcGs3dAr3I0HbGKFcI1xYNkfDSLOsiWKYQONGXUzdcqpDvt4%2By5%2F56nP%2FAhhBqq3EScqE%2FNn0gDcOBFTy2tPwXxbgwy%2Bp%2BeG4JJAmmST7Ne879sYcQ91hrb4H8KFTerN7iM%2Fsj5JM5nXogA7s%2Fbjn1lFeU0zcxoMQ9QEsAAUOEgX33dnIzbmqZnfxo8hoy6sojxZI03pu9BKEoK%2Fv%2B3AOzg%2B85UE62Fdj%2FF9l9xEjYLK8tOQlrQmznFBhYuK%2FqzzYbxIziln%2FkSKoyEpKNF4xiDC091Kfa0yXJfq3LWFa8dX8%2B3jPymPQlB1bp3W4qaBEABA%2BnI1iU4yBz1AmP%2B6miLH7eFFT%2F8QRVsxQ5gLDtyXtDyxdiZ4GvkLFksGxcEHTs3B1o%2BL500igEOvBVRHZ%2FtB6jHg5mBBBQ6dH1g2qeQ0AZ2Y5%2BDxebOiAcrwRnEz8d6jEipdwcg00S2K7SruYSBKQ1jlVNIbKyE07wWkNMnGyGYW2x5nTxadeGjOA%2Bh%2FMHup5vL9f53i2%2BMNfWexEVHnPaU9Q5wGzDnEY5AcE72KV4xckMJ%2Bitc0GOqUBJfNtuSw56NX3F%2Fc4cvGaYTJfmQAy8QXpdayvpWw%2BfhAumTtuN9Vy90fS4r1M%2F0NCydvKn4CmGVWfmC1hWxMD3SP6XRtSyb8iPevf%2FRg1cnoX7RTOvJVOwbFxWdBmxUpY1ffeOd%2B4y2C%2FH1szCpiqcqQo3stUhkrpjnx6XrinMJiL13kUqfCU1CimS4oIbtm1C5CVIBwI6vgFWJJ8ERFuVdkEmwZn&X-Amz-Signature=85f5bb8a1ae50cd99a3932612536b38a85308e0184f09149b914bcfba1a7b887&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YV5CKKVB%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T111032Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEsaCXVzLXdlc3QtMiJIMEYCIQDO88d7MfmN0I%2FG%2FQN45dkUWDoeN7yKbwskj8KqBRwBVQIhAMZSIVEWI26AT%2BsiQQlV6DzTD2npY%2FCENPeAqYqEp%2FXsKv8DCBQQABoMNjM3NDIzMTgzODA1IgwmSIoSYmmUwryzxVkq3ANMdufbxQ8ouM0tWsqOnrfWlDcmq5e1ab9YLS0Q%2BnvhCpp%2BJ2v3T0BTgurlJiz36sbiZ6CLVsa7VI1HVv%2FoUuHqrGs1fMWB4tMBeqB%2BPX94%2BtnF%2Fz31PfM7yBsUlRKSRKnL0QYn4Or6yHRnhXr1TxCzr2xO%2BMuznAd%2BimdKsFTGPKgeEYNF4CwolgChD7IkUBcMewcf5DcNtJA5TcPl9Z19qGSTFv28NQogsCKFMlPk95FicOxxvCmJPEvl1w39glSqYpUwRpi2ZvtRK%2BvkO72SXCoZjayuo6X9SviH7AzqeupEte43zRxob%2FUgTpyZPSY%2FVxy5lorssu7P1oUOEMJFpmpxLSVfEuvqlec6hOCl6tk1buC%2FyzCBzdfggQa%2BzjGvDO5H4wEn9Bklfovu30vLxSgaco33V%2FjYg7oUARnjmMebot6Snip1pb0xEVBni8x9bwRiFM6xfL3O30LFbRqb7wzT%2BXvjGEK4hPI%2BKRzOBp2cZo5CpVMKmsbX8w1GGhmvdPMVp%2B1vIO3nQIZGdsPljVDffdCh3G3dRVKS1mtWXE5k0LzvH%2FkXHcxa%2F92QU7G%2Bep4bl5oCfmmJAGXX57o69jogSBvGL9MYDgvLdzDgKDJB0U88dkXJtKgf4zCDorXNBjqkAT5xMN5NLhzmahB6xk7MKGKzoCpVSPs6CRdGkBmetDaaxIMcHX7BJFJVBRTv9wk9x5Sf65Y8akpjivkdNhLmRq1WruiZxmWEms%2F1zVpg6AKbpR9Uh2R6EKD1DPh%2F7tRTm2EvsLXCDBnoGYs3s1qiCu21EIfk0YthWq8hawJ0wn0h83p1cXFqyktugRKCoM6SsKLIA6soKD%2BVNQOH2oZ47IxD%2BPES&X-Amz-Signature=6a8d5ff0bc56caabab35b563d862eec6eecd745076658eed9bc42a3934168f9d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YV5CKKVB%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T111032Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEsaCXVzLXdlc3QtMiJIMEYCIQDO88d7MfmN0I%2FG%2FQN45dkUWDoeN7yKbwskj8KqBRwBVQIhAMZSIVEWI26AT%2BsiQQlV6DzTD2npY%2FCENPeAqYqEp%2FXsKv8DCBQQABoMNjM3NDIzMTgzODA1IgwmSIoSYmmUwryzxVkq3ANMdufbxQ8ouM0tWsqOnrfWlDcmq5e1ab9YLS0Q%2BnvhCpp%2BJ2v3T0BTgurlJiz36sbiZ6CLVsa7VI1HVv%2FoUuHqrGs1fMWB4tMBeqB%2BPX94%2BtnF%2Fz31PfM7yBsUlRKSRKnL0QYn4Or6yHRnhXr1TxCzr2xO%2BMuznAd%2BimdKsFTGPKgeEYNF4CwolgChD7IkUBcMewcf5DcNtJA5TcPl9Z19qGSTFv28NQogsCKFMlPk95FicOxxvCmJPEvl1w39glSqYpUwRpi2ZvtRK%2BvkO72SXCoZjayuo6X9SviH7AzqeupEte43zRxob%2FUgTpyZPSY%2FVxy5lorssu7P1oUOEMJFpmpxLSVfEuvqlec6hOCl6tk1buC%2FyzCBzdfggQa%2BzjGvDO5H4wEn9Bklfovu30vLxSgaco33V%2FjYg7oUARnjmMebot6Snip1pb0xEVBni8x9bwRiFM6xfL3O30LFbRqb7wzT%2BXvjGEK4hPI%2BKRzOBp2cZo5CpVMKmsbX8w1GGhmvdPMVp%2B1vIO3nQIZGdsPljVDffdCh3G3dRVKS1mtWXE5k0LzvH%2FkXHcxa%2F92QU7G%2Bep4bl5oCfmmJAGXX57o69jogSBvGL9MYDgvLdzDgKDJB0U88dkXJtKgf4zCDorXNBjqkAT5xMN5NLhzmahB6xk7MKGKzoCpVSPs6CRdGkBmetDaaxIMcHX7BJFJVBRTv9wk9x5Sf65Y8akpjivkdNhLmRq1WruiZxmWEms%2F1zVpg6AKbpR9Uh2R6EKD1DPh%2F7tRTm2EvsLXCDBnoGYs3s1qiCu21EIfk0YthWq8hawJ0wn0h83p1cXFqyktugRKCoM6SsKLIA6soKD%2BVNQOH2oZ47IxD%2BPES&X-Amz-Signature=3c137fd4224b2fdf45cf1d30a91e9f8f6a3a479dfaeb76e0bd2e082d7a632d2d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QETEK2V7%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T111032Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEsaCXVzLXdlc3QtMiJIMEYCIQDI%2FSgZrggQRg48k7Oz9Kl2ZmuehACZC9FrOoOOEUNiQAIhAOqOfm3RKv%2BuDmAZnvyneL7E8vkKG9ClYznreBudBg8IKv8DCBQQABoMNjM3NDIzMTgzODA1Igx9KdCDXL5drtju9fEq3AM%2BxUdalYKjQ8rDUxhjJTOjKt34YAD2JQYiFs9K2sV6vGMN30KfNUx8B%2FSgThs6u8M%2BJCNSb5IzMHqvVs6wmuqhHwaCgxNsdCv5skjxQQCZCrW0QeC5rK1c4KYFMZm%2BKFTc2o64xXXf4GhSZlNBgMWlnN71TbKhX%2BlbL5LkBxpQPcvfK1m3KfGbaUK%2F%2BfE2SWj2gE5UwPmLTxQUBINXpxebofFdoM4SOcJDoF5JCyq5UsKro%2B9wZyMGjQ8XY8ivrtKsUC1sIJ%2F4%2BzN5EUDJprVtEINjlzcxCkR4fALlSKXZ30BRJpcuMUULVhmn7mzfNsu7lvVUipd84%2FZFhHO4nRXSnNOr3%2By5%2F2255GwjE0jhLXLwPvfIc8utrcNVrTd7rncuwtED8jxs3%2BwBhCmoHoT9qjbrimvU2Al1ViKLsjaMuKDEq2R%2B%2BZgoIHlW2v9Tbf%2BtMJCklMWH56h%2F%2BvEb8tfkv0pRJgt9%2BfnuukQbFJC64OVw3Mxd9sDmCXBjWwS7stfD74rw2OdydGWpAqMvtEBi7xwJwIn43F4nt8j1mgoOJoMXHaQRHYViX8xhVv%2FQ2TQPIHM6xvgS6fqkzfQ5LvSj3JEoM%2B72ugMzx1DbQl2KMBnRpeMvKJ1rmLMloTD1obXNBjqkAfq7ybog%2B%2B2KzjzmO27BDUJybLQGSmu8RLTC9olQ%2FIis%2Fr5nqkgN35BE4iR9DABNuO7HTR2IWDhTRYzDVLIVaZcvEVZFMOqL0QEK9ZhX5uD2lP10pBrIAn7V7E3rybEVUneJa%2BzBEe%2F7cotSYsE5%2BTOnWXQ%2BS84Z3K4lIGvd1L2%2BZhG7D2YPMVVKTFukAhDvYUM9cPG5DSrFqaUpBx%2BDAHeMDc93&X-Amz-Signature=120a845f70cd2b9f9fbb5b4b99a29020b854a13e1ece826cb2b7c5ececc21e5d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664RJBC42P%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T111033Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEsaCXVzLXdlc3QtMiJHMEUCIGSZloe9E462bAzDXbmaHOR8jBHqOJm0hqpUCVwpqYerAiEA3reORXs5oCvWbQcbOQ%2Fpz4q05enM9YsoX5E4f2V%2BQUsq%2FwMIFBAAGgw2Mzc0MjMxODM4MDUiDIxw3%2BBVd0e9KnHitSrcA6FxhfsVYG1oW3URl2r9XC%2F2V4Oz9G9NDQrrTA8g8VGtBFCWBn0tpNaoKWmIFd2753THaYILcpVToww%2Bcsgg%2FGqGEGnLkIZEosuiLG3HKH5gT4%2FkBXY9FUhXRE54A3Ml7SWdfW2qDYQK%2BtRX0x%2BO9e1E2VY%2BqyA9MGHlxuBwYWJ090QL4kl9IiTbTmn6tTkX3lFxUB6A1Qx5S3Va674YIY%2BNhGu8616UH6LkLjTRM%2BthcjCXWFvP2Ql1MoKsb%2BVw9WKIePEFGKKlAEf5TMRJpxwqdrL0i3hJEjjGr1gKi1bsTsaDRDvBuQL3I5wT89FSZ%2B3%2F42QjnRv0CSOewgaErNNXJXSa%2FrgSpN6jTVfazHu%2BtXz1aYTthgILI1VEm0hWLM0oDett1dkS0WkioF2uU2zsvsBvX95HJ%2F%2Fytm8sHY6PcrYu2ZqzULQ%2FUi9oTc89ZJe7yWUq6w%2FLm33XMqiUZyVmvqPFOKA%2BJtCigHrEmY4CovY7yK6MRCqq3GqRYPgXjsZy7Em6as9Fz4rqY%2F6e6XPOowCYyE5m1g%2B2IuIW8mYPI49Q5eDcaaEAcxVJa6yN9H%2B65IHrqAAE61qFsW54%2BLw9wNgYIBtUx03nM4Hg4dQAx2h4aL4kKJ1%2FCarzML6jtc0GOqUBSrnldcepLtksPInyyYRfm%2BuN6t%2BRsm1hXPe3JjzrnxD%2B1flMJLx3VEUVD1zhD0qDmK4v8xte6xRLL7dXWQYcPI3KUnEyNRaED5XMkVTH7%2BUbaLrh6%2FvlkDxJekbhn7nBlwwc0sVzkQmBj78OCqL19rXWo1GxMb6C%2FFefG1nwvzq5zZUL9l%2BOHh6LeD%2B6qckUg8mHMFU92FHC%2BTibimCk75nUZNtk&X-Amz-Signature=4cc6f4051f8a5d91f8d4cb825b0ca0d2bb8ad2f6590b573cbc45e860f16afa0f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZKBM2D6A%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T111039Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEsaCXVzLXdlc3QtMiJHMEUCIQDf%2F5kKqHnKt3OslfaVOpEjg4KIp%2F9zL62GcBEysSLr3AIgW09oSI4%2Fd0URBDXmowExM5%2BhK03hN%2BbIBMYuQYNUQ%2Fkq%2FwMIFBAAGgw2Mzc0MjMxODM4MDUiDGHhEAoCmqcwN09xMyrcAzviCucOCR7iZe8F3UK456W2J%2BRGnnNc8JgRvkPzS3F6%2FUi4CnVOcHEQm%2FHlIx4QOW11EXmiNM8DDtZ%2FTjD7KL2dUJVCf544645phCdsUWSt97jR8sBGRy5AJOqRufnmZXyu1yMkRh9qtO06SUUZna2DDpF5r8TxIUZRzkPE0I4qDq6DNAcNOlnhtOEQxMsYz0OavIIhvVCwhttTsr3Ns07f5vyYnjQdhYQdBA9HVm%2Fyoq6GkIUuXALRGRx%2BadAXL%2FecawGSB%2F8RjxHpQuiyTHn6dDLHEzjS4FSJ2bYJN7nyGoJH229Y4Bt9TMuX995CLg4jPM%2B2FdSc4BLEiHTrn1Sjp84K6dsXTXe1PRwkrytpILqvzHB2lnPPDakrbE9eUN9PSl8SKdd6qQxbO1HXGjtR4X1glJRAow2VAp7cSpObpupP9dJnA1dg7jufM5gSGVAx8NFGaDW2doipe6R5SUD37IOPOAM3ViaW9eaQyOH%2B6oi3xGumF5fC%2B5y7CCrxozvuTuPt6r7U2y5dRHfwR%2FP12ALRRsdHsqAobbPvvUsHbk7gl95T%2F9w3Wy3eYm9kGwWmvneVV7L7qYUmynIps9CZ2Z1R4%2B3FwajtM9%2Bud75o2yGDeA4E03v3qN8rMJOitc0GOqUBU5Efskc%2BtFywMPgLVoFK96efWWtIDyzGEW8ta3eO%2BDF1ZDG3%2FmtqNiYv%2Fr1zJB7qzM1efrTZUWvB1Bz6GuFfKJ8YOFJAnQrBRslz0ponL7LdkSdTJCCVLANXcSXrAZUhFkh07h1hhjUh8m1bJrWpckp4UA4%2FMqgQIesQNzi%2FGZD1%2B58P1%2BISN2%2BShoha3zwJqSKJmkAQpgJI4sR5NuAb%2BjADnBLz&X-Amz-Signature=80536126776e25ed93a8c64d99bc0011771beb2d990d068d3ea9b3a738c11e94&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S5SGPGUK%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T111041Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEsaCXVzLXdlc3QtMiJIMEYCIQCCS%2FDQeXkL9Vu0QmXafr1HEPfiN7CQ0CDCKcYX1J5%2BLAIhAKeCXcttS9nv9rFyCPOHnM7p8hSGttj2Wwgum5%2Byuq%2BPKv8DCBQQABoMNjM3NDIzMTgzODA1Igzo5Eu6CKol8EikuNoq3AOeIt%2BFXnq%2FXtaaG9awST5vWA3y6s6UhO8wpq20QjBWrL5ZTkkYo9xi0WWpX9nAwU7pGqnJpuzIjdEz5yd9%2FA%2BjTtHL%2B7XIZkjI3yOma025vw2N2zNqAp3kF%2BtuVXXekjKG1H1j2HEpYozeQBX9%2FhuZXVC%2B%2Bi3R%2FyuLNh6UT7SmOlkBPuVa0nj3rGmz5wm2Dkygs%2BTPad4QJMHHA3qtylVx8RJc%2Bne3CfKZawMiRfvsS7%2B8MCLsTPbEHZus%2B115hPayBxPudPfV9%2BSITCwAxUYEqk8K5RNqmgce687KYcTqSpMVORdFSt4glBIGECEIk9EctTNKwWjUS3oHV%2BPu9lOSmzO14tTdmaNAMQ4zofNqLp8OihpxQcs6JRqBuYP4M7rTKDK%2BK4luKkJK6JwK7ixWODltBUzD2jL5ZNf%2BmkW2wSkb%2FkOZAu6MsLEAdjp5uYTupHztw98J%2BsKTZpXASeWAWg4Lv9iHMpNhPg986CR59TyRdxDszVxtKEyPx2sd74Gl%2BIpQ5wnIrOESwab%2BePOxJe5CWdTQhv1KVxHqn7pK11KrCd9yqahQvNArs34X5kQs6wkUI4tBBoWj9WzmWbzsPxIp8%2Bog5%2FSMejMQNWeRN3yMCZdQVri1Rx9sFjCforXNBjqkAVlhydoDxjhBdCqfT%2ByzAH73bRoTQrgAqvdfGNloDVj2r7UFSN2oeDrCtFzBtdvro8BKtKZ79DjZgSjo%2FywZQdL%2F%2FfXaqFhUalCZupCjpFbjuT3NTqWFWdWPwJiW4LULVr7oMJBldjR9fOVLJLpZP8wvjFJC%2BYqcS28LevPbZGy%2Blj4h1k2za7HY1QD3dYqLLqBH3BzUTvGKRQrbJMOKrhQeG8qM&X-Amz-Signature=046ac81a11408d830fe7098cf088a45b92eeffc53bde9509e8fed147a3e79004&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S5SGPGUK%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T111041Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEsaCXVzLXdlc3QtMiJIMEYCIQCCS%2FDQeXkL9Vu0QmXafr1HEPfiN7CQ0CDCKcYX1J5%2BLAIhAKeCXcttS9nv9rFyCPOHnM7p8hSGttj2Wwgum5%2Byuq%2BPKv8DCBQQABoMNjM3NDIzMTgzODA1Igzo5Eu6CKol8EikuNoq3AOeIt%2BFXnq%2FXtaaG9awST5vWA3y6s6UhO8wpq20QjBWrL5ZTkkYo9xi0WWpX9nAwU7pGqnJpuzIjdEz5yd9%2FA%2BjTtHL%2B7XIZkjI3yOma025vw2N2zNqAp3kF%2BtuVXXekjKG1H1j2HEpYozeQBX9%2FhuZXVC%2B%2Bi3R%2FyuLNh6UT7SmOlkBPuVa0nj3rGmz5wm2Dkygs%2BTPad4QJMHHA3qtylVx8RJc%2Bne3CfKZawMiRfvsS7%2B8MCLsTPbEHZus%2B115hPayBxPudPfV9%2BSITCwAxUYEqk8K5RNqmgce687KYcTqSpMVORdFSt4glBIGECEIk9EctTNKwWjUS3oHV%2BPu9lOSmzO14tTdmaNAMQ4zofNqLp8OihpxQcs6JRqBuYP4M7rTKDK%2BK4luKkJK6JwK7ixWODltBUzD2jL5ZNf%2BmkW2wSkb%2FkOZAu6MsLEAdjp5uYTupHztw98J%2BsKTZpXASeWAWg4Lv9iHMpNhPg986CR59TyRdxDszVxtKEyPx2sd74Gl%2BIpQ5wnIrOESwab%2BePOxJe5CWdTQhv1KVxHqn7pK11KrCd9yqahQvNArs34X5kQs6wkUI4tBBoWj9WzmWbzsPxIp8%2Bog5%2FSMejMQNWeRN3yMCZdQVri1Rx9sFjCforXNBjqkAVlhydoDxjhBdCqfT%2ByzAH73bRoTQrgAqvdfGNloDVj2r7UFSN2oeDrCtFzBtdvro8BKtKZ79DjZgSjo%2FywZQdL%2F%2FfXaqFhUalCZupCjpFbjuT3NTqWFWdWPwJiW4LULVr7oMJBldjR9fOVLJLpZP8wvjFJC%2BYqcS28LevPbZGy%2Blj4h1k2za7HY1QD3dYqLLqBH3BzUTvGKRQrbJMOKrhQeG8qM&X-Amz-Signature=d8898af02affdff50dacf7dc167217d152c8e08ea51c113794b8822a0ba2c446&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46667FGGA3C%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T111022Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEsaCXVzLXdlc3QtMiJIMEYCIQDnsZ52XnqQ%2B%2FciOcbaIQyTq1JGjKGXnRRLpmfOkrAcVAIhAMqLbVkjYPcT0GKKb8r2wIwmfYNpIqmX6eLJRXgONmWHKv8DCBQQABoMNjM3NDIzMTgzODA1IgwFSL5hiNITohqV0Isq3APjOy2j3wPQRWzWJwAGd%2BPcttwzFcyH2kiW%2BM77ohUmqD1zrmcn4Hj%2B%2B4gj%2FTWxo%2BFVcOF57jYmmwWXDWxW59zOnuTCjGDg1KOT4nMt2XHBn3Au1h4DM1k7Dp2ZNYxRrH31CXxDReQMGAKZIN4n7gyXVbRXu2K4L3GLOmIW%2BJReMV2%2FjxcznNpN7mfej7ofMe8k%2BG6Zpx67Rd7iK4OjY2ziN4GGiWdpE0sLE8CUevFsLm1VNr2T%2FmF1QAnobSfwPaZKh3TJ8dhhrdYxj4WxWtQ5MkFMJE%2BFRYMa%2BkJP9Qu3kQlFAwZsofRtCYb4Cca98lD1EuUcpUN0PSKeuhnOrs6ujWO8lI5prGbfFmjLrC9TAOLTBcYiV1lq2ifhPobuijoMNRkk7M4%2FVFMTbwtrxKdifgpwWKBHAlmCxuC3TgHmNL7M1LGotUYL98vs0lhO0hx%2B1saRwglxGbYUckdBvIFpoFVwnQufbBtO1c4224WU%2B%2Fi%2B4DEhlh6g5ISjK%2BNKvi8wHxXniwq2eCxE9Z%2FVIKqaIdyuR0yXJIiRo6IxPA%2F5fiIZVvlK6YzKdC5TtEdFX6DdOorV3OruCbppXSqig22A44k0CGj0e7lwpYP1Bsg%2FXRrK9wWMEmu5kPRSMzCIo7XNBjqkAcmLQsnCdRQ1tIuswWAxop7h2kUwNdxHBeO3I3x4T4I5fjXVVh2oR1XnP53HmNZGXXY0Vc2I%2BwhhtUhPTIhnJAuQ583oeBECopLn04E2EFDzCRzfKPkGxPV24Di1iRys9Qm7Nwdp4ZFV8lCswNPYXiuAOMzdtEgMzu9Um8jZ8xImRPjXOUbXYoy2nbJa34b6dunfXVnbtr8TzS0oV5k7XFzSxkE6&X-Amz-Signature=2bc7e58f76d61369a2f143d60b0f2027847b3e16544598670c5b44a83fb58829&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662VOR4MZX%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T111042Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEsaCXVzLXdlc3QtMiJHMEUCIAJjFwV4S4OsKZVVeGSge%2Bx7V7iiVVkS6fzBnzJ11SKOAiEAvnQSK3KNrKbdfTZD64s%2FoP1e1th1%2FqzcIBx8XJDPGXEq%2FwMIFBAAGgw2Mzc0MjMxODM4MDUiDM%2B8ktYhWigOKd%2FB5yrcA9d2b%2B24F0ZnG2XnYYToCfiL%2BUrHQSmOxEyhWUwjVdyNTIMDc3GiIWamQYBsqzYwmf5TG%2BKXG93uulqTZnv%2FCH6RDqE4yBrwwJl6VR3MD%2FM8bmgh4a9FZb0vnAytt9wcQtg4rKl%2FTdlG1cdwH2qv6tF8rqxWMiR8PGYdoj1eLed7FWBJprgSU0gz%2BCnwOWLOEGO7UBsIWlAQvHY%2F%2BcAzfFat8qx%2FHPoELJwoBTLiBZ9Af9Rf%2FVPkPLFzuRYrF2lZONf62pj3Df4N4FxR%2FOIhLyxCmykR2zvEZmhm5Uy6qnXF1%2FLD5wrgEOnzviAC%2FbD8GhxojL9ugjlrx%2BUQGR%2FPmB2hM0PXhUx8no5zZWIirb4yuvXF9ZWiDj172y4VrKNkAKDAYkxHjJEluUCF8%2BB9pUyGq9h%2BprPT%2FDpnksUxgcvySjk0lyyAXGGtXt1%2F1lNQ2JT4M1k9nfwT6RJMFA4sMMNMD0uP8%2F4R5ybkIEK49CN79MxXfreIZN4O3eBjegS2OPDYWPSUQPNsJdq6ikZa8s9yZsxvlxSSHvzoS2LQ0LTZLp%2F9O4TB3LKV13nJOsHiXwuhe22ciBYTYgzIiu%2BSWs9xBr3JLJywY6BWS9YQidGjx7NksGcLET1yjVvrMPqitc0GOqUB6Iu5DejPN3O8xek3ryQWAuk74gU5hvzLWWEpFm46NRzGra7gsz6qnfH1JJoaylSDzTtC6EZOps%2B%2BhmTqYuz0fP0Nqrnn6qJmlzL%2BDl0H2GS7V9EkpXsWtt7tigeE6OwpMFl1VDTwA%2FCPsUCp13mkUa5uUz3t3V2SGuee%2BpxEH731%2FOZejNn2E4JeB1B%2BKOzICphizIWtgt0LKTYgEPmqvou0VnUE&X-Amz-Signature=48dd234d55bab4ed9d16f8e76d88cfa9e47839040e47edd74694e09da578367d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662VOR4MZX%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T111042Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEsaCXVzLXdlc3QtMiJHMEUCIAJjFwV4S4OsKZVVeGSge%2Bx7V7iiVVkS6fzBnzJ11SKOAiEAvnQSK3KNrKbdfTZD64s%2FoP1e1th1%2FqzcIBx8XJDPGXEq%2FwMIFBAAGgw2Mzc0MjMxODM4MDUiDM%2B8ktYhWigOKd%2FB5yrcA9d2b%2B24F0ZnG2XnYYToCfiL%2BUrHQSmOxEyhWUwjVdyNTIMDc3GiIWamQYBsqzYwmf5TG%2BKXG93uulqTZnv%2FCH6RDqE4yBrwwJl6VR3MD%2FM8bmgh4a9FZb0vnAytt9wcQtg4rKl%2FTdlG1cdwH2qv6tF8rqxWMiR8PGYdoj1eLed7FWBJprgSU0gz%2BCnwOWLOEGO7UBsIWlAQvHY%2F%2BcAzfFat8qx%2FHPoELJwoBTLiBZ9Af9Rf%2FVPkPLFzuRYrF2lZONf62pj3Df4N4FxR%2FOIhLyxCmykR2zvEZmhm5Uy6qnXF1%2FLD5wrgEOnzviAC%2FbD8GhxojL9ugjlrx%2BUQGR%2FPmB2hM0PXhUx8no5zZWIirb4yuvXF9ZWiDj172y4VrKNkAKDAYkxHjJEluUCF8%2BB9pUyGq9h%2BprPT%2FDpnksUxgcvySjk0lyyAXGGtXt1%2F1lNQ2JT4M1k9nfwT6RJMFA4sMMNMD0uP8%2F4R5ybkIEK49CN79MxXfreIZN4O3eBjegS2OPDYWPSUQPNsJdq6ikZa8s9yZsxvlxSSHvzoS2LQ0LTZLp%2F9O4TB3LKV13nJOsHiXwuhe22ciBYTYgzIiu%2BSWs9xBr3JLJywY6BWS9YQidGjx7NksGcLET1yjVvrMPqitc0GOqUB6Iu5DejPN3O8xek3ryQWAuk74gU5hvzLWWEpFm46NRzGra7gsz6qnfH1JJoaylSDzTtC6EZOps%2B%2BhmTqYuz0fP0Nqrnn6qJmlzL%2BDl0H2GS7V9EkpXsWtt7tigeE6OwpMFl1VDTwA%2FCPsUCp13mkUa5uUz3t3V2SGuee%2BpxEH731%2FOZejNn2E4JeB1B%2BKOzICphizIWtgt0LKTYgEPmqvou0VnUE&X-Amz-Signature=48dd234d55bab4ed9d16f8e76d88cfa9e47839040e47edd74694e09da578367d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SNYDQR7L%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T111044Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEsaCXVzLXdlc3QtMiJHMEUCIQDkTWHtMCYhxbJ3DFfNTYz%2FmYOdaA8MQyxq3KxotJFmQgIgMD8TtN%2FpYsOMK%2B4CZ5%2FuKBcbwWnM%2FCCJDQRXGDbD51Aq%2FwMIFBAAGgw2Mzc0MjMxODM4MDUiDDM0lTjpOfwyJ4w1lircA%2BnMP9jaMSU3wFvMi1NjWeuU7O0Q9I7NgvL62t7dSO3JxduPxcEEVj0%2Fq16VoczEnJG%2Bh4QbhPT5v%2FHAEvnwk91uCzu2RMeg6uv90OPvUkb%2F5cZmMGXXz8YSoMDndVU4xJcnvFDLZ5RmS4HAkBz4dduiqsO13aBT3laghUinF7PHRb%2FghOWJvdEoIIABQB96WbV8neJSsXZFS6abedqDSdEZ60NCduMHL5OmmDRIFeXZZ32n2%2BkKQIMgt3eHEqXByn7HqJ%2FQwOJyqPBLmqADaST%2BbxH2nYu0iUsMS9%2BvRYQswZlUlEf9kw%2BYdycKDLro1oDZLEIyKl%2FmoZW08YfJAiYszOvQLx%2FC5GR1S4BjA%2FcG49hCpYz%2FMJhqUpP%2Bpfjxs73%2FmMokCPQStctWsA5gWvrV5FC6L9DM6l08S5RBZlb38B2BMND2fYQ%2FWc2ez2PkuAgwYkjpmgIsAE%2F1uv1fEbBV8cRNgsgsvU7ZkbhVGDM0WjJbfb8Ij5G1H68zyNu6%2FA8Xa0gD5pI3mrhqqGVF899VMlAEM%2FxRlE7MvIEMvJIzBoV1Zapnobj4fuTMBsPYerbg9cDe7lZwLgycmIRckZUBdgy55UfOGd2p3fW19WmOxG5903Os1SSiyOYRMKeitc0GOqUBZYTW5O8jhiRhAhlaMD0UnynXueRlgHbFXkwODMOOIEirMx007y4HeMptpjMIWcB0Eh6q9hCCctx8Rl1r0NF1oZV45bv1q0WLA7TNinN2rPko43Xbh%2BgtqBXMlgInj3SXYKDwvGX%2FCVghJ9OLldMQH2K3hCZOagkoqD1QjENYxGgUhmwEJUUilr9h9e0VMb7go7pDt%2F4aW2GEA1%2BreqXkz49nFjyL&X-Amz-Signature=bd2bcfd8658d545d614d5966372d637b841ce5a3d019dd6372b66791576a7e7c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

