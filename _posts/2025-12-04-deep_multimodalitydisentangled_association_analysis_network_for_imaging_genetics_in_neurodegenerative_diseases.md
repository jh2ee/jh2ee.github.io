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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YZRNMDWY%2F20260302%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260302T050906Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCZDe%2Fh%2B1Q4IVznXx9h5Ml%2Bxo75IpaYdmKIjgwInY77DQIgL6oego4glwBNl3GnQXTdoea31iL6Y2Vz2SwP%2Bw0tZ5wq%2FwMIfhAAGgw2Mzc0MjMxODM4MDUiDGVbe0hKAtBmqHypkSrcA7n04c%2BnWFN49irbZEmw6SzwpVbBnqn6n0Tx%2FvNiKJtH5StqzUu4iD5Z2idfCUuO%2FuCGHnxkWCes8Tv8YZaRInMT6anIjakE0l7V29AtKV61KIXSc%2BO8qib4VH%2FbCDZ%2BOYlTIuIqBpNzRYDJq92xPlL%2BOJ%2Fqfh9N19Mld1r1TzQtP9ICn6bD4YOtnMWvJF07UqiK%2Fr2OL7dKThy7mV2eujmFtXkc80Ul6qeeFdCbFhoYm5mhzIa3fNuaIU9rgtO%2BOkQ79fuejwPeuO6A2YIf1DhSakNdWt66%2BC7KkY0vpV4D19Sa9vsO7taxjGH%2F7C03gDZ33oNbplrWrBNhWNKVgM3BDOlyOo%2ByAZXRPML3RELCFjo%2BvI4KLffZkLrK5D1u%2Fmdmkc%2Bk%2FY0sb36d5TyL95K1AO5FniXZEvPqY0dEIoXHAkLiFSPrAd7IQWL5HKUFN0UqHXDrIQVobQd0nLaSV9Xv8kFGtUyYf82KeH8rL25fLl6SkcuYl8FtUG6GFYmnwEdfHeaqLo9A7FnAGKJgnDBLWLWtXug6Xh5wwof1myrWEH54xLXx%2B36ICvRVYFi1uBD2XImSZhk6u98xihcYLdc45sTZESI%2BkjnfV%2FbFdlq%2BRFiOVLnXwZfagszvMOaslM0GOqUBBp8dRwT4mkI94DLM48dDn%2Fhe%2F4bxnDQz4uF2vUOXTi6QA9S0fqrO6UQKxSZGZAJ%2BqyIS7HkucxS8H%2FRr4snCWWk6rAN1WQ46%2FVlf7Y84rxCaaGsp5XLVz5biPHRZ%2F%2F0Dav9TVeHBxnGLe5FcceaVYS1fl3lAtrrFQu2anKg0m6j2JNc5eKWJQhy4Jg%2Fty5siAk7E6UVGoF8LbI%2FR01jWaJL%2FD%2FJX&X-Amz-Signature=af00d63aded3f665278e7d8128261921292f2811f861b8784b1983e90ee7bd1f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YZRNMDWY%2F20260302%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260302T050906Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCZDe%2Fh%2B1Q4IVznXx9h5Ml%2Bxo75IpaYdmKIjgwInY77DQIgL6oego4glwBNl3GnQXTdoea31iL6Y2Vz2SwP%2Bw0tZ5wq%2FwMIfhAAGgw2Mzc0MjMxODM4MDUiDGVbe0hKAtBmqHypkSrcA7n04c%2BnWFN49irbZEmw6SzwpVbBnqn6n0Tx%2FvNiKJtH5StqzUu4iD5Z2idfCUuO%2FuCGHnxkWCes8Tv8YZaRInMT6anIjakE0l7V29AtKV61KIXSc%2BO8qib4VH%2FbCDZ%2BOYlTIuIqBpNzRYDJq92xPlL%2BOJ%2Fqfh9N19Mld1r1TzQtP9ICn6bD4YOtnMWvJF07UqiK%2Fr2OL7dKThy7mV2eujmFtXkc80Ul6qeeFdCbFhoYm5mhzIa3fNuaIU9rgtO%2BOkQ79fuejwPeuO6A2YIf1DhSakNdWt66%2BC7KkY0vpV4D19Sa9vsO7taxjGH%2F7C03gDZ33oNbplrWrBNhWNKVgM3BDOlyOo%2ByAZXRPML3RELCFjo%2BvI4KLffZkLrK5D1u%2Fmdmkc%2Bk%2FY0sb36d5TyL95K1AO5FniXZEvPqY0dEIoXHAkLiFSPrAd7IQWL5HKUFN0UqHXDrIQVobQd0nLaSV9Xv8kFGtUyYf82KeH8rL25fLl6SkcuYl8FtUG6GFYmnwEdfHeaqLo9A7FnAGKJgnDBLWLWtXug6Xh5wwof1myrWEH54xLXx%2B36ICvRVYFi1uBD2XImSZhk6u98xihcYLdc45sTZESI%2BkjnfV%2FbFdlq%2BRFiOVLnXwZfagszvMOaslM0GOqUBBp8dRwT4mkI94DLM48dDn%2Fhe%2F4bxnDQz4uF2vUOXTi6QA9S0fqrO6UQKxSZGZAJ%2BqyIS7HkucxS8H%2FRr4snCWWk6rAN1WQ46%2FVlf7Y84rxCaaGsp5XLVz5biPHRZ%2F%2F0Dav9TVeHBxnGLe5FcceaVYS1fl3lAtrrFQu2anKg0m6j2JNc5eKWJQhy4Jg%2Fty5siAk7E6UVGoF8LbI%2FR01jWaJL%2FD%2FJX&X-Amz-Signature=af00d63aded3f665278e7d8128261921292f2811f861b8784b1983e90ee7bd1f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UODCKGUQ%2F20260302%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260302T050907Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCQoyOxZVa0%2F%2B%2FeoaQpQ%2BjK89GtNT6QRVWgvJZiLFG2gQIgGTV9tYVaxD5dId5KpIwQO%2Fj2gTcjraxO6mFCuBVyCt8q%2FwMIfhAAGgw2Mzc0MjMxODM4MDUiDA5AgITuSzOJNpGsDCrcAy6qOhsz8F0M7iMKJQKM5ZPbcNU3TZOJIOe%2BXKs%2B9wecdIczsdy33KK56Kxi3ycYqQaHmLoB%2Fe4w63ZoQiXSMJtGWQT4GMaLJx%2B6mZAdqKpbjkDm4Xfxeau2QB0Fl7KbVmgfYvMF4up9Hk2Pn3vfcBicFsNTvtSQOR1IGa3uMrMP5eXT%2BjeKovTv0%2F6GrMYgYGLNcnOl0aQBsPHXE%2FNK9lmY8EFeZCRITc4GUkwKag3cY7ehDlC6SOmrO9VbjN6V8m9hVLO%2FI3t%2BJeQ%2FojouU60h%2BObhKDnkkQSkqri%2FrTis08Lxj%2BWAkZSh%2FPkPbo8vv9UtqrM5sNrCNajKzY8SARhdD3HeNLY1HdHPLT5NQGg3uy2lvTOBIVOo1H4wzISkkqpmmc7Z87HwUftTW5A26Glutm2Vd5c6DKrCVrAisf2MHJ2foBpXXGKvZECUfBQMDkRY%2Fw0eHS2HbVJ4hY4ZLRq4W74vYrcrb5%2F2Su4Z9PsAwaB4M4yNrOtDTKlSZl7dxgwPmWnPlOrLe0bKrt7Xd1NaMEYQr17B2jPu%2F4hnm3j7ZNc3Q6Jj3Aaj4fgma1UNWzlwx0tk5ZIUrdL8kA5mYDo8DcUVTLn7HTowZkxfYjtJ87ZUXGN7CFOJ%2BO6NMNatlM0GOqUBcuhcPAXZomqqhh4Mnb989RXgw7GbE7HkeBv9TB0qaGXm5vcvDq8PZCgYRAQbM2l%2FZI6hzdqZjCTVheKqQW9dxj2TjxgLUF000GoPj%2BfYWmXNhXWmlAF7pfUEmu7w7WyrxmZtjT5K%2F%2FSFWXo14DZwlMnAWpoB514Fe4D7hbNXvyW7jUhOTKLVDowFZI7bKY36OsoXWdqnScaI2SxjlfI73aSbOAmO&X-Amz-Signature=8bc4cf670d35200000f934ad63481ce126504e3eefc1c2ad71c932e3c60229c8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SXLD6KOU%2F20260302%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260302T050908Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCoUK%2FwdI3TJn5ek6f6UXHwMD2nUz8RLm0nFM7F3z4I8QIgQ2f6JsFTc1Kilrpzh2WfCtfKcZ0%2Bzrwg%2F3u5Pw3VwkIq%2FwMIfhAAGgw2Mzc0MjMxODM4MDUiDBJgEeS868SdWHV%2BsyrcAzOLmigeTDtwdsuo%2FbQrKbVAQLt7ckCLfzCOvkFKK%2BDdt4bftfCrnuAQwPZRZTiwRhii3yzQDNEsg3ejsejORnE%2BJ8MpIlNwtVvSRGJG0n2zBioXmkEmzt5xBlpxqSH8aFA4CbizntpJccf%2FsIvcaWatWOv0x1k%2BGgv%2F%2FGMJ7XJAmQS7eop0h9UXO4m%2F%2BckBZU2ESvpjBoAVWVq9Tseg2mpR85stjypnsL%2F6mp2%2Be36ARGd4hA2DioP1qCflhvrKvbLi81Y5b%2Bgt0XO%2Fu2NDb4UsGJ5ptZlB7tk0mifynJ66iAQEzjeEO9OOyyPTB1YJlbuT1O3Bc9s7h%2Bw0oex%2BJHH3hdY8rhFEYeZdj3ayi%2FbQC8%2FReOo4BEi0BleimP2lBmmkSfeWlJthWx73E2zvMb22n0FeJLgmwaW35BsRPyQFrwbWgEIP5FCXbdvA7OS1U%2BywjJXiN3ldMaKsnivVUGFMDf4vlTEkJHyzzZhre8N4dOn4CvhgSQ1Pmm1ArnTx5dh%2FYlerfRun%2B6BBCjO79fmwfn5VS4aJecGHGgm3rC8SD6YY1Vvrq23Vh3X6TDUfpqrB10Wc1Wz9mSgCNEzsmgbVFcbMv92WRfMztD4UyLucT38F4F0BEntkmSNhMLWtlM0GOqUBJVr1mJZwOeMYTSCHe13qlhTsgZMDhT4MyySle4GGMwb9mVGTe7DYMKxwLZogT2XEFgqZ0Mt7dYCEeq5mFu15wJJuKX8HHTbdmvLMAB8mkOkKjJgwMA3wIr2jgCojm56Scp2RsEdMxMpvzf9vHqDWRE%2BO2U%2BWtU6hUaToMiue0xjf4AOYuA3dvhD4yR1pib4XZHE6xdgNGrzM1DVzCsoT0ks7piCu&X-Amz-Signature=9b47d096ace1a8464152593fb45a00eab97135ead76a3f229610d993a7168237&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SXLD6KOU%2F20260302%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260302T050908Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCoUK%2FwdI3TJn5ek6f6UXHwMD2nUz8RLm0nFM7F3z4I8QIgQ2f6JsFTc1Kilrpzh2WfCtfKcZ0%2Bzrwg%2F3u5Pw3VwkIq%2FwMIfhAAGgw2Mzc0MjMxODM4MDUiDBJgEeS868SdWHV%2BsyrcAzOLmigeTDtwdsuo%2FbQrKbVAQLt7ckCLfzCOvkFKK%2BDdt4bftfCrnuAQwPZRZTiwRhii3yzQDNEsg3ejsejORnE%2BJ8MpIlNwtVvSRGJG0n2zBioXmkEmzt5xBlpxqSH8aFA4CbizntpJccf%2FsIvcaWatWOv0x1k%2BGgv%2F%2FGMJ7XJAmQS7eop0h9UXO4m%2F%2BckBZU2ESvpjBoAVWVq9Tseg2mpR85stjypnsL%2F6mp2%2Be36ARGd4hA2DioP1qCflhvrKvbLi81Y5b%2Bgt0XO%2Fu2NDb4UsGJ5ptZlB7tk0mifynJ66iAQEzjeEO9OOyyPTB1YJlbuT1O3Bc9s7h%2Bw0oex%2BJHH3hdY8rhFEYeZdj3ayi%2FbQC8%2FReOo4BEi0BleimP2lBmmkSfeWlJthWx73E2zvMb22n0FeJLgmwaW35BsRPyQFrwbWgEIP5FCXbdvA7OS1U%2BywjJXiN3ldMaKsnivVUGFMDf4vlTEkJHyzzZhre8N4dOn4CvhgSQ1Pmm1ArnTx5dh%2FYlerfRun%2B6BBCjO79fmwfn5VS4aJecGHGgm3rC8SD6YY1Vvrq23Vh3X6TDUfpqrB10Wc1Wz9mSgCNEzsmgbVFcbMv92WRfMztD4UyLucT38F4F0BEntkmSNhMLWtlM0GOqUBJVr1mJZwOeMYTSCHe13qlhTsgZMDhT4MyySle4GGMwb9mVGTe7DYMKxwLZogT2XEFgqZ0Mt7dYCEeq5mFu15wJJuKX8HHTbdmvLMAB8mkOkKjJgwMA3wIr2jgCojm56Scp2RsEdMxMpvzf9vHqDWRE%2BO2U%2BWtU6hUaToMiue0xjf4AOYuA3dvhD4yR1pib4XZHE6xdgNGrzM1DVzCsoT0ks7piCu&X-Amz-Signature=86c3d717938c99b10302293de98f2758a24042e6a9af2916b83005c81f435b62&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WDBNN46W%2F20260302%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260302T050909Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCfjSJTmyX2aagyjo9x18I8LaMFC1TGbvwQGJ29MAPl1AIhALHyJ%2FAC2k0aKD0RfzTSgpLw8Scg91LfJK1WtsivmCMNKv8DCH4QABoMNjM3NDIzMTgzODA1Igxg5pxMIx7Sc9lX8Jcq3AMA9zzlJF%2F24RP0la7iWoPOKtfenAs4B2mQ6YJMxs7EVysY9F%2B4eEfAkQ1YBTadsl194ge1qUxUGcbI2gfewzFlHFzCNYTKJvxHjH0vAQ4jQGEwl6%2Fz59twhOsnD1mnGELooT00Al67Zs0jKy5FdtMp4j%2FQAWfpdOCgNKFN56IG7dj7g0ceDQspFM74h088Oj%2Br1Vnbj7Hm5j2NYrC%2BUXjhWNwQreb0EYpG7PvVbV2EVqBvUtRpTRGn95SFtrEHAncHmPyacx7WMAWYRt7baGxuOWq0F08wcgivNYOlQg2PXuJrxBnheDXFI9jU%2Fn%2BDUFcFgUSaQRXqoNBc4w0VYbf229j0wRgs4jYTtz%2FmwsWapnQjeLpl7VKq3rH%2BKZSFmSIoVxV%2BAGMpV1EizTc1JuhwosOIqfDx%2FP6AvIe2joJ6prFwiEL5BBHpt2P5sE7mgS1KyTEeuoVkg1lugRFa1MOSu3oDVEg6p2Wp%2BoeF2jTtF2NMmFKDNTwvKG09oXquc1vmYQn%2BFdHHTqDFihjbSxh6gNaloaHTzlndFwKL4OSmPm2KUl03VgAIodB%2BqK0Mdbgn43%2BhroYudBOS0CpD6lXS7U1WqdL1gJMg0JtyJA%2FQOA9QqnJv6KgXrjQDHDD1rJTNBjqkAVfGrg3QoQjTsnABCN9f9JnTRPLsJLX1JXh0S7o%2BuYOScEolS93SM%2Br1JchC7ygS6%2FLuoTJaGmIYKV7q3KOtxCXHUYhRr7amkW%2Bm5dnujfWAizxvqlO%2FjZWOlqlrStg0xrOx%2FDYvawr6n%2B5qcqFFoY4DP%2Bivccl9e%2Bp8Bz3Acyg%2BUdZDyTdp1o%2BzrPvQL1%2FTes5nGm3DqHhxgA6g3RWsvwmMvwt3&X-Amz-Signature=411c3725fcd6850dad417cf500e7df91701bf64fea765ceb6b5aaaa0f4c8e2c3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZOGWVYOF%2F20260302%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260302T050909Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCfU3mjrFwin0gI0%2B6toPETuxE%2FCq9VNrjSMzKfnu9TOgIgJND5aNGZ1VTtcpgJjP01YCNQeCjiu4BSY23EVwkmXwwq%2FwMIfhAAGgw2Mzc0MjMxODM4MDUiDHFcxF11n%2BLVH1zk8yrcAy90c%2Bo1wco%2FQZkm3tWJ7WpDCkt9lUesa71FobZZUOHFgE39AIL4zY3hSM6iCCUjECzq6ZXCsISA5gcd4txJLlDGLDLUJw%2FN3BTEv1pNO3kPCYfa6f6QoO9vL3OWMRNMkdK5P84k%2F7dVNR4YManhOV0uWh3jc9DLjAjtgTzX1M2XeeUgpctVAXyLGJ1onP86iMzT3RQeKeCQsBqpbWYjSxQqbPTEzhOFKjBmE%2BGQB%2FkizQVMQxZWtR%2FtRysAKI86JkJHNdOtBg6D0SIPYGiUq93tXdpRVrv%2FIjNGow3UyPgdYEkoga2CpFBK6Gyu9lBM3P5rDD5ejwtxMDqsBFt6hLYOqQA5Fk%2Fq1gyZse6IFQQIsIieIAEdr2fHKoYGGE1dLJvf4Gpg3jxHqSpwXg9LAq37Om8lFb83M59Rvls4NVh7vEHgYDilB%2FgyN%2BNAzrRqTa2e4kDGZikB5D777WVLocDr%2BycfyjLAUPBcjPaUdSPxMTY2t3VWLwczfmEIhM%2FVa%2B72Vo99NOZh%2Bm8Hyszm%2BINk5nwNmY4wUqyr8MY7qgdDM2Innyg49KDovAU712H3qNumDINuKVHb%2F%2Fhas9WXSIz0beoXhygtDcArHSBPOaD69zKwjToxoSYj%2FEXYMIStlM0GOqUBYae8XnZ8qFSxkS4zmNVr7lEGz%2FaAlyOXuHWnf1C1jnM3MNE%2FkXU6I64UdkJQt1P1GWS9XYLXcoSa13WNqg9BDosKqsfK7JJZArHyx2pK0rp2sCBzYR1spfuBrm%2BIPC3jBbT%2FHd61exg8Y%2Fxlhr41uSTq1ATgxqAYEhtX86CqkNWhAlSTGTFi%2BOZjG738x0mWU822qFsHfWgt9QzcFZz2ZPWTaXdR&X-Amz-Signature=f319d33eb05a426b4657b5d440b8a2134ecd64670bc00f2ee72636652c5e449c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663BDIWFSD%2F20260302%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260302T050910Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDNTbCSMuMMi6PGY1Nl3vQQJY0owyGdsixDoUDtD4NmqgIgeowPkXk3fDNZUPKcjuvPlQTlDWwY388Zt4ApmVNtQMsq%2FwMIfhAAGgw2Mzc0MjMxODM4MDUiDP%2FFRCok60G9yXlvEyrcA4VNq9NGtynxB10ZBzZlOVUAnHJoGjjmyoE2OzRczoR%2BXod93b%2FsApDP0svPKhfi8NS9az529KsGiK8XnOLDtBcXsNiLOTHfUduipE0EsWgyyM0nGwvVtwC2U6wkLTDddYjV14cG0vfgB%2BfWbZuXjYJ30NJP%2BiOlKUDfwqysg%2Fo3HfgOySGrm8pmrpMcMRrXcr5%2BO8uxWMlXFad%2FZIDmDt98jJUXrf6zClrz41lLtHRwhGUAUvMSLyXJqm7Eb482FpDQ%2Br4scT1xoKTMgQMueAcsDzKXq8tp2WWxlVddnK%2BeA5aqrXkzirMCy48RN%2B5dw6RoBlmJ5RXpWd3rekLZYI%2F6LI3CBN56RYaKsv15ZhXbFVTXUGZ8wIfC91j2imcI8JAD99qjVJsEUVBLFv7qpyaFoDblU3sWtzCZNVLTP6eEgVHh0p79VnSI9dyqVvSvKWH6ttRxupLp9xV%2FOR%2FrKplacWeTStyNHUs1ALU5%2FYhlhMhBQ7hhV8emn0xijul1O1skA32c74nuSpDc48jYOgzKMBw0GO6K8IXnl%2B7PEzOGnX%2FURP8PtWffwNwyJAbZg5n92mDD7aixRWXryz%2F0%2FSXeZInXjVgsz6AmDjf8xgbBINqmVUrtSPhurq5yMIqtlM0GOqUBfyzPA6pJ11Fs14r3RIoy%2B9xD3ESN4SUlDlj1Qyzq7yyAmwz8qewXRpcYqEw2CiVVHst%2FwRVHtm5kBKVBr5nRGhPoupsQbYWOE%2Btf8bSOU4VT5lrdKbotokGdJ%2BVgZmp1FNzETQR2fDf2moryXPOMQRqUXH5qhHjj4gpfdrVYsaMkdl9mbCg4GKOcZzu9D70WWF8%2FWAlCx4awMM9m0i8M5RwPxprB&X-Amz-Signature=0bbe27317c7528d3303327b1afe087585ff7bf6a41579a8bdd600dcbb98e2aac&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XOE7IHZL%2F20260302%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260302T050911Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIDqVd4SGE15yuEwLqUMXis4xzz87I2cRGB3Hz4Bse0eiAiEAwIAjkQj%2BvWjMey0fUFA7gnMcN8zkoEdu8npmlNqi4UMq%2FwMIfhAAGgw2Mzc0MjMxODM4MDUiDO1ZnW5HzOxWPGWXESrcA7GkDa4k4h0IPB7A4SIeKZjj8mOvog7LRbhj3%2Fn%2FAIFmVv4sGMi2tKUeBWOUHUTKDstq%2FWHno6gI4yH57xzfV9pG5fyk8%2BU2kgXkCi7cvbla85ZR52Oz%2FJEifUygvyGqKTOiRvmW5tEsjHSibXcbA4uQrrlIvI5W2Jr5saGun%2FMc%2BWDKzr6dG63zWK%2BwEQlC7lMIXZTlv4xdqq3s3r0sTJqcIvgdni3dqPKmHt28m4NysImYSoJrt5%2FSJbCYINYhud50Ui6j9XzVbQj0R4pGB84iNIeNOX%2B36XCnwVZBGOH%2FdWDWCI%2BbCrMRxZn2NbrarNdSQPIlpEwkqUkcbLuEpzgpFB809IQ%2B8C7lraLn6PeHB4j%2FsVI5SEQQ6HEAC2FEsLT8mRHpfi9HvEeo3VC1fjsSbSp1%2BkA8ZEk%2F1AcD%2B7CZGFvwOl4HTzUykN2pbaeVGEqeq%2FMFBEGXZvy6X2c1QM8zaqHy1QYKkorRPXY%2FzmF3K26t0QjCtjGv0a9kV4gv3PnputmDzlsGKiRSTuT%2F%2F6Xg%2FqixOLkpZgr9aFwq9d49Ao7MqT9vXWLxCUdQHjQYaU8PKqmyTrKSwrVXZ2oa9obfV8nXzNniNI4OpzQzYwFBPBLNDoSDQ2KjYLIWMIaulM0GOqUBItJdD4uNTB%2BPXewI5RkhuYiVznqQE0tfSKiZDXIIJVk5KlZRtJHBg94jPs7MyK2EZVQ%2FdWa0E4M5cAz1mLLRfSmANmAMQAUfL09t%2FipmexgIKCK9H7Xuv7A4YyOFmulr5Vcv3FTtdyZQpk6GDhGJfg2oGWS6vC2Mu3IYJkMNMtFOK9ddhOUhYRMdBTuEWEesC5cvLEy6wdu2Uzj0YHwBegnnV16C&X-Amz-Signature=0d436a67c5c6ac6e62a41143284a0e2959c7ea47bb2a06e51d2c0afb5d87508d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XOE7IHZL%2F20260302%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260302T050911Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIDqVd4SGE15yuEwLqUMXis4xzz87I2cRGB3Hz4Bse0eiAiEAwIAjkQj%2BvWjMey0fUFA7gnMcN8zkoEdu8npmlNqi4UMq%2FwMIfhAAGgw2Mzc0MjMxODM4MDUiDO1ZnW5HzOxWPGWXESrcA7GkDa4k4h0IPB7A4SIeKZjj8mOvog7LRbhj3%2Fn%2FAIFmVv4sGMi2tKUeBWOUHUTKDstq%2FWHno6gI4yH57xzfV9pG5fyk8%2BU2kgXkCi7cvbla85ZR52Oz%2FJEifUygvyGqKTOiRvmW5tEsjHSibXcbA4uQrrlIvI5W2Jr5saGun%2FMc%2BWDKzr6dG63zWK%2BwEQlC7lMIXZTlv4xdqq3s3r0sTJqcIvgdni3dqPKmHt28m4NysImYSoJrt5%2FSJbCYINYhud50Ui6j9XzVbQj0R4pGB84iNIeNOX%2B36XCnwVZBGOH%2FdWDWCI%2BbCrMRxZn2NbrarNdSQPIlpEwkqUkcbLuEpzgpFB809IQ%2B8C7lraLn6PeHB4j%2FsVI5SEQQ6HEAC2FEsLT8mRHpfi9HvEeo3VC1fjsSbSp1%2BkA8ZEk%2F1AcD%2B7CZGFvwOl4HTzUykN2pbaeVGEqeq%2FMFBEGXZvy6X2c1QM8zaqHy1QYKkorRPXY%2FzmF3K26t0QjCtjGv0a9kV4gv3PnputmDzlsGKiRSTuT%2F%2F6Xg%2FqixOLkpZgr9aFwq9d49Ao7MqT9vXWLxCUdQHjQYaU8PKqmyTrKSwrVXZ2oa9obfV8nXzNniNI4OpzQzYwFBPBLNDoSDQ2KjYLIWMIaulM0GOqUBItJdD4uNTB%2BPXewI5RkhuYiVznqQE0tfSKiZDXIIJVk5KlZRtJHBg94jPs7MyK2EZVQ%2FdWa0E4M5cAz1mLLRfSmANmAMQAUfL09t%2FipmexgIKCK9H7Xuv7A4YyOFmulr5Vcv3FTtdyZQpk6GDhGJfg2oGWS6vC2Mu3IYJkMNMtFOK9ddhOUhYRMdBTuEWEesC5cvLEy6wdu2Uzj0YHwBegnnV16C&X-Amz-Signature=5bf57c5974b74d764a79c04a377b6854852fa62d9135b413ece9bc591a97db91&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667TYQYKOX%2F20260302%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260302T050856Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDeznGwB8cTb1GuQKZrN9AScHANjDYjmtRojTt8n%2FF5VAIhALir2OSXb%2FZ6d9kkuSGHtYx6%2FHOXoI5sRFnWiAh6h5%2F6Kv8DCH4QABoMNjM3NDIzMTgzODA1Igylo93VfKlreWJs3xsq3ANWr0HQ8hNY46re037fZ2KL3rb1UxaQly52rFtRkCgV3UWz%2BK2OLx5ngcB80nFKdwnH5mF5wKjDauVwzasAX3yRcjrCs8hhkdljuZrbCj0YHKNr%2FMqV8BPWwVh1onSitsL0W0VUl%2BuwwCzGjnqkjupcWJh%2FDWWje3t7ip9JK6S4aYWVohAUsPkIgU2cywTN8UQiyIcOIAIeSK2FmZ9ITHyGXA6gMd%2B0NxCEXGBBl2oMzy9eiRJpkdk2qMGPXfqbwM3o9bDAHyAI9Zmz0KtkW53ar4SDhl%2F%2FZ%2BpczHrp2bEYr0gB5w30tvWTaOGDdgK5%2F3BOs5TRr1KrzLiDWVad1fZ%2FHhqbG%2FQRID3GAPlkGcRjjZ%2BWywpOrKbUwyLH0S%2F4TfP0POS%2Fvb8c4Dmja%2FHuoz7bu8%2BbADGWZsmztNYa5LSM9m%2FUTaYtoX0jvw%2Bdy1n7gl7sWZ%2FORaSfnhO2eJW1SwJdOC0o8ivoAFaJlv55hqZdwKGZqNx4auU8qRMO1JmNfsY7jIyIIHN13GDKngZpZmgG4KgCeUWnQ%2BobOmP%2BhBytn2Mo0OIKiSCQDaWmswXTcULlYEBmsP3cB%2F%2FU80jocgDF%2BufK1PUWE1%2FpMf7saYjkWKPGF%2B6oeGPq%2BhOYaTDRrZTNBjqkAemWKI%2BZGdgDHFJ%2FGHBaHQTkRl3Kg53VUQ0dTKOGmsBn8%2BOVl8bgoIu9pCxToAcjHZGnaRniH6SADej5d1ix95yvYwhinL2ZJ3LM68I73jS1O8ZVnSmQJCdoDiFZFXiHeNtCQp7OqBIzRIZ44OmsFrUVO1HALNmvQ%2BWVNmKl%2Fk4mTwwjV09FRMAZz6AsmL4khBVnETy2nFBKYnd7IV7cLlNJm8Dh&X-Amz-Signature=d160fac47adcb8fb2f56015b12f48bbd7a2d21bc93e4b6f43e8e3828165b2360&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QEM6QE5A%2F20260302%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260302T050913Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCzLbZIXfrnNnJrkMSYm4FAu56eg10LkatYd5meVrd46QIgJwDqIUwgNaFC8ujrsUPpBbiYWzT7vICt4GoT0nltkLsq%2FwMIfhAAGgw2Mzc0MjMxODM4MDUiDHJtu2X%2FAnYDux8lgSrcA9s9lN2UD2Zgb9hbrX%2B%2B%2FywcaYn88tW6Wxiknmi2Ip4NPwHUWFqPIGLzGMOIuA%2BUvwUuC6d%2FvNaVufqqLlopMAm6xN2we4vTzsFdndIiDbpZJoMYNRRmsY%2B36daFShrOw%2Fmt7jrl5Y4Oifaym5dRLgABZvQEDzrRrIkcQ5Lf3Q11N3BKMlV%2F8FMLk5llRvEvVoCUJpOxtkzIf%2BMNTtIb4lCnArXbuvL1N2hoRSUJUs9b6Yh67nf09pMiDZyEOiYxOuaNCHOh2IlHsxEHA0NW7qfCaVjAVgo%2FRWkqn4nVlvE96Hia38iQHRCOcJFhJnQmxWeC5EWqKwTW1cTHedDGCO866vo3hBpTwoeM7DrqhWTdqxLweMVeOqZR3hOvRNtUcQlDT3gtIVbpaNM%2F00nl17hFsBfKavv%2FBZzXXBKWr2nPyBZX1tLcI1lz34uAZEP9cPKRIVxgdccT%2Fblqr%2FWU99LYEpLxj27%2FE%2FyTEvj8Iro7nR1VrIRfDIecYgZta1FcNKZ4UYWIEJ14ZxRvBurf0MNLfKQk5NHFpfu93%2BX6REe1cZYIiQuAPTWqNUIEDRw0DLnEOECYwTTFyWOsodkFJTq4tjDiJShmtM%2BOJhHBQcMNsjfLot1UoMPzqnrzMMStlM0GOqUBiJ8WHoXz2krwRSi%2FoZLHxmkCVsK0ASro6r%2Fka47AYIdJ1xxL6oj8rA7tCeCR6BDDVnSndUYxnETkzhwO8MuAknhxbznINPrI626wIeIrGrLggbaIryCnWNb%2BmpS4SOG9Avo39FRm%2FqK4HME2aF8MmgXN9tEJNUdTPin1parlZtFGP3v5FbOYK6aglzvaqK78mo%2FgH4G6LvM5kOGXZ22K0uUbiYPj&X-Amz-Signature=461999018a002408aa645582213ff7bb7e965890cf04f90361acad8f84344cd4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QEM6QE5A%2F20260302%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260302T050913Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCzLbZIXfrnNnJrkMSYm4FAu56eg10LkatYd5meVrd46QIgJwDqIUwgNaFC8ujrsUPpBbiYWzT7vICt4GoT0nltkLsq%2FwMIfhAAGgw2Mzc0MjMxODM4MDUiDHJtu2X%2FAnYDux8lgSrcA9s9lN2UD2Zgb9hbrX%2B%2B%2FywcaYn88tW6Wxiknmi2Ip4NPwHUWFqPIGLzGMOIuA%2BUvwUuC6d%2FvNaVufqqLlopMAm6xN2we4vTzsFdndIiDbpZJoMYNRRmsY%2B36daFShrOw%2Fmt7jrl5Y4Oifaym5dRLgABZvQEDzrRrIkcQ5Lf3Q11N3BKMlV%2F8FMLk5llRvEvVoCUJpOxtkzIf%2BMNTtIb4lCnArXbuvL1N2hoRSUJUs9b6Yh67nf09pMiDZyEOiYxOuaNCHOh2IlHsxEHA0NW7qfCaVjAVgo%2FRWkqn4nVlvE96Hia38iQHRCOcJFhJnQmxWeC5EWqKwTW1cTHedDGCO866vo3hBpTwoeM7DrqhWTdqxLweMVeOqZR3hOvRNtUcQlDT3gtIVbpaNM%2F00nl17hFsBfKavv%2FBZzXXBKWr2nPyBZX1tLcI1lz34uAZEP9cPKRIVxgdccT%2Fblqr%2FWU99LYEpLxj27%2FE%2FyTEvj8Iro7nR1VrIRfDIecYgZta1FcNKZ4UYWIEJ14ZxRvBurf0MNLfKQk5NHFpfu93%2BX6REe1cZYIiQuAPTWqNUIEDRw0DLnEOECYwTTFyWOsodkFJTq4tjDiJShmtM%2BOJhHBQcMNsjfLot1UoMPzqnrzMMStlM0GOqUBiJ8WHoXz2krwRSi%2FoZLHxmkCVsK0ASro6r%2Fka47AYIdJ1xxL6oj8rA7tCeCR6BDDVnSndUYxnETkzhwO8MuAknhxbznINPrI626wIeIrGrLggbaIryCnWNb%2BmpS4SOG9Avo39FRm%2FqK4HME2aF8MmgXN9tEJNUdTPin1parlZtFGP3v5FbOYK6aglzvaqK78mo%2FgH4G6LvM5kOGXZ22K0uUbiYPj&X-Amz-Signature=461999018a002408aa645582213ff7bb7e965890cf04f90361acad8f84344cd4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466R6OL74F7%2F20260302%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260302T050913Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIGO%2FUSzr8UTZscmkgz8UEAjuBffXVu0PX9Kobi7mE07nAiBGBLP86%2FBhu7O6m7pMVcEymagUv9d%2FupSmRJChZq%2B53yr%2FAwh%2BEAAaDDYzNzQyMzE4MzgwNSIMoyHmByyg%2F7tyqabJKtwDUm6wBGWVWC4UIYHNO2QxDdtlsrxmzUAj4AsIsVkW4Os0w2ppbwl4eeUyEZ%2FZQsVIDPgkhRTzyPSZaF62K23LP9BcULRYyIr1ksfKzG4808Il8EdCE4mnBHyjHFvzpkM%2BxRbOVDGnqZ0R0eIZyNbx557gTFAJb%2Fh3w%2B5NNCfoamNQqxkV87x4krIFfnKO0%2FzFZVfJv2n%2FdiH7hoyGB0dpldhAx7UOdZg03Tp%2BrrPGIQg32el06V6K5NSnvY6W7IP8p8M1V1%2FL0daFtWFIJ7Bo8rnRmPFYOOo4LB7HgUkVLcIgGNGyG7i83i%2F%2FDgsZmgkvDe9ISwopHmBluRfFv%2FLDg2aRqj36AzDHdAED9wWM7mei95dY1T5DKxvV09JBCvsZ3tPfOiK6JN0XRyiFJi9T0VYL%2B8BydtniR3gSx0fkLzCSNrB3q5y9nWuimlKIS0bnZjgdjvgpXvYRr0D6WVwr3Sqq%2FxCo85MIeZMMOjqGjmgFGawqdvDjNc61KI0WeQWt6XyeQwjf3B4BKulW1KvvDLYLCTGsrpCv7HAjRZMGHTzFatqqfmCyGwif%2BfG7HzmfDt%2BSp9LnhfIUa8eYFqx8TcLlU9899AfFmGwLd1%2FUHaN42zBzrOaDwieF0M8wrq2UzQY6pgGTX%2FMoxvTLSFY7gsKlSlHNk6EFIzNjDUFHvFY00Bcx9u%2ByAoo0ESHLAs7Y1K2S1Eo0H5LWKJsfdujjywEI%2FW9Bvr%2B3K3dqr7puZ%2FGJytCkeY8vI6uGZ%2F2w0f8i6Q3ewcUYaepzd1tLEc51jzCX65O5p6jM28RMt5dVpg9dQEFQG4pkkozAGw50hRjgfTRNp4mnpMyGFCEHPCyej671%2FcCcF9chViBx&X-Amz-Signature=4b8226eef9ffc09736a1c3236ff8adcc72838e8f9069c4e1bb4bb6494d19ee50&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

