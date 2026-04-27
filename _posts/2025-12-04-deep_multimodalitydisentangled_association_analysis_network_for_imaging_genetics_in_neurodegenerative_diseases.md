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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XNSXUHBH%2F20260427%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260427T011752Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCZFpWl9ZDOyEA5waPbZ%2BfOI59nUa53W%2FQrSgVX7lzxMgIhAMpNLZuB9Gg4sRdk4LO1ZHct%2F3eYJfuAA396B1JagfCEKogECLr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igxyx7MHZ6FAPL%2Fh6DQq3ANlD%2B3nmc9FO5OZ3aEZ1I0Q6MRMt7XBV6mvJ1PLpAfamRVtD7496vX7mWb0OJbzRNgPjZV%2FVBjGS8JxiBw9yP5L%2FmfHPR8geHFC%2FkNmcpQcRGnu4PHARjVws%2FAA4cpJcaL0O0VdQPfb3fo633VtKIhx%2FoG0A0wV7p5AmWqOwT%2Fcqvqi7SWFpFHg9Cv1o%2FwaDRq3kV1z8g6mMQcDqpigeNyfQ4irbqYBerqErcocNYa2fYBMTrWU1iOGMMvn9r4IY07Suc9n0xQ%2BT1fsIqxOdWPCA3GwhEf1R7%2BKmT%2FarKqfUq%2BMjhEKxvNncvxTXDUcgb6zhEnPyi%2Fc8FzJL%2Bno9eYT0kY7ggf3%2Bwr31fboA5WWgLRMzlHmF63IHrx15N1JiGtowhcEDCx%2BZlfb8KmWcIguICx3vwJ3Wun%2Fz%2B45v7ijkbgScYVmRWtYQDnSu1ADDz7mLkDxdncT9M5JkcHtjl1C4lS24%2F%2F2bKtUhpnnDVBZbAvsKQGbvyF9INTCT6laE43o%2Bu7t6gD0Q43Jiw5y7J3%2BhBu%2B2HO702Xh3zvtK0KUg6Ber%2BseuyQHMwpvPLYFZxKaMllUVty%2BqXodTlr9uaYqtuWCwz3hU7V5Jh1Ohiv4PEDJTXrdC8o4FRrFsDCf8LrPBjqkAUrFl%2FPcajKCGhEu6fz%2FFvsfBh0ttZnDtPhWFUDv2ide9s%2Brwz0ADKLD4DfEdusT0pmt1bBmd1llvVrQpTLINfm2USe5u27prVXoyFJ%2BtZWFIQaovOPOfCHhDloR6fv1zwsH8WtJLKaqmdxMgICJdN%2BW%2Fk3PqsJXwY%2BK6sqH0OS0Ipv3W5lE7kF%2Bh4sIwMonVD4GEoUBfUfcJJKbF6SUIy0dKvY7&X-Amz-Signature=281d473277f420b23f1bd7dca1ab86ec63a41573104cfcd5271fd196eb32c172&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XNSXUHBH%2F20260427%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260427T011752Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCZFpWl9ZDOyEA5waPbZ%2BfOI59nUa53W%2FQrSgVX7lzxMgIhAMpNLZuB9Gg4sRdk4LO1ZHct%2F3eYJfuAA396B1JagfCEKogECLr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igxyx7MHZ6FAPL%2Fh6DQq3ANlD%2B3nmc9FO5OZ3aEZ1I0Q6MRMt7XBV6mvJ1PLpAfamRVtD7496vX7mWb0OJbzRNgPjZV%2FVBjGS8JxiBw9yP5L%2FmfHPR8geHFC%2FkNmcpQcRGnu4PHARjVws%2FAA4cpJcaL0O0VdQPfb3fo633VtKIhx%2FoG0A0wV7p5AmWqOwT%2Fcqvqi7SWFpFHg9Cv1o%2FwaDRq3kV1z8g6mMQcDqpigeNyfQ4irbqYBerqErcocNYa2fYBMTrWU1iOGMMvn9r4IY07Suc9n0xQ%2BT1fsIqxOdWPCA3GwhEf1R7%2BKmT%2FarKqfUq%2BMjhEKxvNncvxTXDUcgb6zhEnPyi%2Fc8FzJL%2Bno9eYT0kY7ggf3%2Bwr31fboA5WWgLRMzlHmF63IHrx15N1JiGtowhcEDCx%2BZlfb8KmWcIguICx3vwJ3Wun%2Fz%2B45v7ijkbgScYVmRWtYQDnSu1ADDz7mLkDxdncT9M5JkcHtjl1C4lS24%2F%2F2bKtUhpnnDVBZbAvsKQGbvyF9INTCT6laE43o%2Bu7t6gD0Q43Jiw5y7J3%2BhBu%2B2HO702Xh3zvtK0KUg6Ber%2BseuyQHMwpvPLYFZxKaMllUVty%2BqXodTlr9uaYqtuWCwz3hU7V5Jh1Ohiv4PEDJTXrdC8o4FRrFsDCf8LrPBjqkAUrFl%2FPcajKCGhEu6fz%2FFvsfBh0ttZnDtPhWFUDv2ide9s%2Brwz0ADKLD4DfEdusT0pmt1bBmd1llvVrQpTLINfm2USe5u27prVXoyFJ%2BtZWFIQaovOPOfCHhDloR6fv1zwsH8WtJLKaqmdxMgICJdN%2BW%2Fk3PqsJXwY%2BK6sqH0OS0Ipv3W5lE7kF%2Bh4sIwMonVD4GEoUBfUfcJJKbF6SUIy0dKvY7&X-Amz-Signature=281d473277f420b23f1bd7dca1ab86ec63a41573104cfcd5271fd196eb32c172&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VGB4OU4R%2F20260427%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260427T011752Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQC9jfVlQ7EiShDaG8Hp5LUa8dBKYlqsX9efmrfSTH99RAIgPGHuaFISiEQyrqI%2BmTQOibe4kXHz3R8IJbF0pyAUDFIqiAQIuv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDHMbWz4aKx6RU0nsTCrcA649JcI0zHe1f6vyg8mFxdrX%2FXSMtokGbCxu0ik%2FPdI8FmMmKnrkU8%2FiyAJn6KfIfiMhMdLuCcoyCO0kKEJNbUAJqT4jR3a4lx0w2IfC4elzsBJ1tjT%2BCYsf4HSBz5kjON6zo%2FR%2FYr70YX5i5Asr2amBhI4hjNIIXIIUSP3xFKgLz7Pi3hPVeWTIzuNXVggXu0XOARRe0zQu4lbMIGnuqZKrnTMr%2F27dE1xbc6dwgRgCjelBktRGqQHnOl9Ssw%2BGR%2FQgmlkSx%2B89tNeLTS9tE6OpOF7qQdK9qoZ7ka2mmOLX8856wxog5aZxnIETt9%2F247f%2BvJaiU2G2Fbyp0%2BmB0rRwwDs0foFwUxLHC8UFDdDTyUFV0eLyPPmpWq8%2FYCbX4LZ3BpDmk3Hjc2FhKRFvNS3e7ZCzcvUgcJGPYNpMFpLcAxYkuFN7Nha8r%2BNKKWfoZgJB2Xn0Qk0hX8KVKy3cvGPJvLdhAtaVMvuel62h69CCbBje6RwApr5blDbIcnmNktEWaeKIQNlV15obbL5kyzHpJlnndH4Vl%2F2UPGTQUWH4r0MxJkXag7d%2Fer8fDXsHxbJCaUpdNNWGi%2FPROkZT%2B2dfvKn8DRAdyHvGayYLSelhxqptbbRySnzANipxMLLxus8GOqUBQtUgBzfgPqTNfqyvPMYqHSNCcmkgPqvmjM3nGwjql0QIwzLeksf%2FQjLkCrYR8f1wITFGwNuVSYEPBmfuvMEYSRSGh2AHi0M0phsq5cQUewPkEoTen35yY7C5a%2BSsHGsgwt90raEHPebsjqQz6R0%2BlT4%2BeMYwdYt6A971A2VihSybcu%2BKfrf%2FiUHjr0cPvIxX24VsIKg990DrZ9m%2BzNRMDVa2bc0K&X-Amz-Signature=e4e7b164561904884e2ba5e77ddbb7fa57f7d9319ef58c98b3345bfced6f95cc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RI4C32OR%2F20260427%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260427T011754Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIC%2F11RlGiOZeNqESntmsZmOQ%2B0laL0v3vRhqOf1abhFfAiEAssUz%2BpCW9X1j6vOgoXPnZH48Uz%2FpbepprRXI%2F1HjqlkqiAQIuv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDMXA9eNCstYiDsm4cyrcAwCnCx7cBg1xSaGXgyrE55nTVSVwmWv9ygbQjfnEL4XhVVrlefIbfGRwza1KnNBySlUU9cNpP55Z34LrCE5y5aU7Bx0JC%2BD0j5iAo5JmWf%2FP2b8neA56domI7dkLVcv8TT9JQ%2FT9QBpUZFDsdCEfWhkHXIKtdUXyfBEYByG9OYHSXaPDJm1QSoDJ6mYR8Ov45qtm6p9bjg1vC8dlzyLt0OtpLLcD%2FWufAkFWSaxxqyaY711QQRaQJAWxfWfih1i99pBiFsY98G6uoKgQ%2FKT5TtpIqTRKvIsj%2BndRWkpTC%2BpfAmzmsd6wX127vsfKeaZNanXqYVx6zYY2LYIPa32reXNhzfHKYggBk7Q%2FgqTINmd0Ojd8oZHS4khJbQBGXTmr49h0oQLQEToSM0Tsfju28fI7b8Oc7hLJKVC6tdNIIgOmw0f4Itl1JAvC67pQfUp9iWHATxQHOdLyMWfEmT%2FfDhWce1K%2B11lQX3fPwrEL6DUiM7scEdcYGHBKsWf2m5Ix2BXUWJILtnu9jfQ4QZ2LAY2et4czqeCGwsZjBEVE6Nf0QnveUnEMskLH0OUPKPH1twBC3uVYodOAicpRuUp7Vhk4GQJFy%2FjXRxgHCFAXw8Wsts3uDi7YzwFAwt%2B6MPHvus8GOqUB13yc1XW1fzfasyZfJqcbmslLKRNVFSzBTaEpcqGmEBMRSTxSIiT3uOsbna94YQrC0ca%2Fu5KJaZJFV%2Fa8JvilS%2BI%2Fgq3lW4LIrOPqFQvvY5NUS6dk7v7h8xVKN7du8bSnIOdNZugOJ9cf7dHmc9AAGChDQDYxye3B9eWRuKPpt9xC5gdCucyYYHAd2FYP1DjwERnkkCwVua0Fa2CJDTDWF7zEs06a&X-Amz-Signature=f869d3eff8039de17e0d48481d59eed81677f2e9fe01d0942129ab037749149d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RI4C32OR%2F20260427%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260427T011754Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIC%2F11RlGiOZeNqESntmsZmOQ%2B0laL0v3vRhqOf1abhFfAiEAssUz%2BpCW9X1j6vOgoXPnZH48Uz%2FpbepprRXI%2F1HjqlkqiAQIuv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDMXA9eNCstYiDsm4cyrcAwCnCx7cBg1xSaGXgyrE55nTVSVwmWv9ygbQjfnEL4XhVVrlefIbfGRwza1KnNBySlUU9cNpP55Z34LrCE5y5aU7Bx0JC%2BD0j5iAo5JmWf%2FP2b8neA56domI7dkLVcv8TT9JQ%2FT9QBpUZFDsdCEfWhkHXIKtdUXyfBEYByG9OYHSXaPDJm1QSoDJ6mYR8Ov45qtm6p9bjg1vC8dlzyLt0OtpLLcD%2FWufAkFWSaxxqyaY711QQRaQJAWxfWfih1i99pBiFsY98G6uoKgQ%2FKT5TtpIqTRKvIsj%2BndRWkpTC%2BpfAmzmsd6wX127vsfKeaZNanXqYVx6zYY2LYIPa32reXNhzfHKYggBk7Q%2FgqTINmd0Ojd8oZHS4khJbQBGXTmr49h0oQLQEToSM0Tsfju28fI7b8Oc7hLJKVC6tdNIIgOmw0f4Itl1JAvC67pQfUp9iWHATxQHOdLyMWfEmT%2FfDhWce1K%2B11lQX3fPwrEL6DUiM7scEdcYGHBKsWf2m5Ix2BXUWJILtnu9jfQ4QZ2LAY2et4czqeCGwsZjBEVE6Nf0QnveUnEMskLH0OUPKPH1twBC3uVYodOAicpRuUp7Vhk4GQJFy%2FjXRxgHCFAXw8Wsts3uDi7YzwFAwt%2B6MPHvus8GOqUB13yc1XW1fzfasyZfJqcbmslLKRNVFSzBTaEpcqGmEBMRSTxSIiT3uOsbna94YQrC0ca%2Fu5KJaZJFV%2Fa8JvilS%2BI%2Fgq3lW4LIrOPqFQvvY5NUS6dk7v7h8xVKN7du8bSnIOdNZugOJ9cf7dHmc9AAGChDQDYxye3B9eWRuKPpt9xC5gdCucyYYHAd2FYP1DjwERnkkCwVua0Fa2CJDTDWF7zEs06a&X-Amz-Signature=e1b914aca3d443573c1fef18fdfc3da3b9151d6db1c9e86b5e80eb249bb7558c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SNAFQLRS%2F20260427%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260427T011754Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDlfqJ8%2F8HFc046EQKymOXV3MfVJizpvMGZ6rbHGdfZ1QIgSa9fARJRXKCs0K2WsbHv9VCfBL%2FXyjd4yeMxmDDiA%2FsqiAQIuv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDAlIIUZNyU4ypXB0HyrcA%2FBAF6%2Fy1Z%2B6%2Bdz6FQ%2FeDNUg4FTcolr5OaMCcNE7ywTx77pqsURbxKcNbUebdDRTVbk69hYSYvctAf9RHyqpoLTwz7b17bG2nctyTgqyfikx9ZeGRWH6OwgtlnVbKLnEZwXdu9RrxO%2FLZ9xloSXSLuEIx7mz0ZPAiGRnaCcK8%2FEHWNLtof%2F0DtjPRVxxVSBwSGJHaDrYBU5T4cSw6%2BtUErqYIptMHudTRVth1XaCA3Bn3m6rJ63GXMNDA6Jttu8myE%2F%2Bs%2B8nbnP9Pr6DO5a9rh7KrMONUt1e%2Fw4AHJkE05jHc2TWebPe7iYTyPHxTL8krZqon2%2B4chiaB%2F6hdq1UzglqCEX5KhRSpjcfSb7hoGfnblsUQWnND4%2FXcY2si6iEnoFRi757E0bx9Bmm1hMXPipx4rdgAwtHQWWx3vFjodl3l%2F8XD8V6fQSkJKR%2By40%2F69ERqf2TgLbcqQovuYbf7LOQtK%2BMUf0KPAvUCL%2BAGTAVLnCbOgCdteh7v%2FCEvV4IXYqQL0w1ozE5L31Vv%2F4I3lKD2Uqn78zMZJ677vakUtrHVtduS3cjRJUrebBDNcvaoeMlXVCr%2FUmkkiZIT9Y4iH7%2Fp3BOYwy1GX3%2BW9xc62bLdas27w%2BYsrM7aehaMJDyus8GOqUB3La9dX9VWCWHLeeeUOkEgZGEnshUqYzOpZEf6hL0Zp3m0WqVnzuXgt7OxWuOxIBuYYVQ4TSyK7DDy8OEpZPongBebsedurtYVH4bR8aAtIIACMJ5u2tK%2FBAxRz6NbxWfWi%2F387iIyAat5rZDHxEH22cmdlQYzCq%2B0f5DWCNC6L6Pn4%2FCWDoA0YIHkzMImwXtuFHF4mMqsVB43HeSRObj2MFqoSIu&X-Amz-Signature=a666b7e03bfb7766a8a4c6e305893e6ae013ce028016e496fce80462fdca619e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UFOBSUCM%2F20260427%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260427T011754Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDS%2BGY4ERl%2BHfL9phYxqOMIJQPDvxWgcISM0RI%2FIdhmmAIgd%2BoBN52KXuQFM3U7dUq28Q16D6Aqd3wx8VU%2F9812m3AqiAQIuP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDPPMMhewuOBYVBhD4CrcA3i6PIQ10wGLEtoVib3N53plStVaJrVb8T51jzLtyDPGTKP3MYoyLJpSXM903VzdeuRfMm6agOsn%2Ba1eeS50Me5IAhvo1%2B0kxdHr15pxSvotTnLKgdf5hDq%2Fv425ZzXS0Bl9JWJlK6h5kvd6b3nyob4u7%2FvBySQ6mcago7ppaVjNVnj8XfSB9sjBxMUGuaE%2F7q2dw8szv6RSjjBjRKq0m7gAPI%2BEDnruV1ZiO38RcBkwUHTUzygLcVP%2BB6pNCBtx0E%2FyAx0LE%2Fqph1aRMYH8UoEXNgaSwFRriSX71i5JIJzZehFuIedbR9tGDaz6RQVA9If8bo8UWLEb6RPUmulL0M9op%2FvelHX3wJl%2FD8Y2lKXGaZTElPdYBiGMpCSEFgO5n%2FWoBRcZODl0QjcBIO43gYrzZbhchBGeW4CS0VhBw%2Bd5C81u1EKb1AY%2FC9EhnpWAKFsDw1Y%2B6or6pFP7wiK2diFdeWjTkMNG5TYmV87zdPUnlbq0Gi8rQ8xdnHvRceyfSV9Oxop35Kgv6ypVnAhjmYzoBHV8O23%2FiogG6mqT4dGzpt1eeKpiDNZMP7nLFpz8E0mX8ONQwpD8Oz8Za227EOXLHd6ZU2sd%2B5KSqjT0zmiN7N%2BDNnteIti1O4vcMK%2B6us8GOqUB6p0%2F8rOB8iI5TadH4WApgoN1JrkPXQhZtgZWHVVXyUtWxPOlPANgxgVhMwT1YpSgJFS%2BuvOJ3xKUDe%2BNVMct%2BlV1Ce2z7jkXAHy4PzbnMtnLlkwUeKOzJ6Ikv26wkaOtBXyyswGFij5c3VCCLg8C0HpEXSu4qhyUZFftMYohtzaqTHeAmxoERPbZXd%2Bl81bRCP7thIBZXXvtR9zDT5OIRAhZP5N4&X-Amz-Signature=5240930fe016988d495d8a5d0a53a87219deaca23c7c76a39b40498b734e21dd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667XF32LVE%2F20260427%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260427T011756Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCCXmWxNgvTdKiTgldJDwcFi%2FEqqBdIMFw9r%2BCwC6jCyQIgRzBYTala%2FX8Cd83rm1H5DU2Uj6ycV%2FbwtS9LbLNM%2FGoqiAQIuv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDNFvntOvSU%2FW2yaFLSrcAw4rXSoU8B5ITYlIEg4Rfj1tQO%2BiKM4TZYBKxOuD4o%2FB4DfmHtScCAeGpy6qr4aRHtBJLlgDAkoxS2kOxTF%2FkNACAY6jei%2BU61xxSO1A%2BxogIDBlhfRiVfNhnFljVZFuI85SUdGo2PGt%2FapMYaCzX7zs7DSpDXmNY7mgINmjawoQA7Ifbzm8fzw%2FYGcCjFeM9HT%2FyM8t%2B%2F2dJdPELsQTDMmcv9Rinb47wpjRYoNWtKwhOrDWHprA4fXlsJRxFtr1XJG4p4%2BqByZ0uqSsxCUEUuJjKdYHaN9tmwDZhD68cva1Hk20Gj7pFgoktaPfGTlGj4ztTciSqQjsgsb%2B50v1YIJPXCX9zjk6w23tNp1vu3auD17SWOPdS%2F4E7T6dvulnPdiKLkIuKLbC6fzsivOG8e0bVJ8ko6HwkmYcvYrG8X5%2B8xwV71GOrkHEeC7AAG3fiR5QkV70Sk17%2Bjgam%2Fz2MtsJV8bgMh%2FD5AFmv5gfrr3JmwBTulNfeL6KoMFIgeYK3QyG562Zx1UVvHOc1KiD5MzqLkDIM7nvjBQa9bt2x9bloAEaCghPnwpfUlNr9IcAo%2BGfvqhwdep2bbEsgJnO7%2BpstwrrX%2BimnzoJgTGHK6HhAZOQd%2BU9wTjLPy6aMMPxus8GOqUBXXei9ITuMmqvhWxzNa1jFSkq%2FzKNczwcA2WuMhEexv12yX9PW6LhDA7eg7%2F6LS402PMam%2BgOjl7Qsma7Cp%2BV9QxzXbpPv9weikHTUi34sgXMSoA3%2BscDBaSoxSIvl4GeKuAQofg865pI5ESzQcJrqdgtuqnmjMXVF4VD5tVeWHVq1aNNgfg09Kzx0BgO1H7ReXafFrOkFYhQsFHEP2VK7BTqgaNd&X-Amz-Signature=9182965ce00aa25c31c15660e0477310e9de21d0265d9e4e76e22e6f7409acb9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466X5DUFBKE%2F20260427%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260427T011757Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIDm5xckrRpwXBwiCLKYrTHGqc%2Bq7u7B5%2FeuyzMA0AIMtAiAIJX8XhIol%2F99bzVlH3lQSoYz6fGQi%2BROunPiVqQP%2BcyqIBAi6%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMvguxuOGsmvNj1G7DKtwDgoIBNZ512hvwWeNSREliVqKUEG8NS0NyrYXpFsL0utxDRhF%2F5jOPD1ejK5DzZU%2FYJnf3ERqEGC2XMyE7HZQdMBa4sLlr9QyedmKEvqmB5WeahjaWh76sg%2BDipKWyE%2B5glB9GXocdbDZAL0vVuCVWG8kviZbyibik0hPcgCc%2BmkjK5kWV2Hkw2O5CZOOdMQEopxozv2MKZ7Lx3I%2FQtAvX%2BXcYGTVeR0VydgPmZOwbkdumiGP2HkCInglCZzHXY9936EAfhCG9aPl0WsIdIVZfo77dVxQu8MW9PYSMfhD9nU51EMKPhl0G9M8J4avUhTxwfyGJ0O%2F5WCzGGHn1loqrN5ndIuvgCEgL2vwBQMbdSbFAyBIoTVDGBZ%2FzsIEARSeC2j4TbzUjP1IkMs8zdC9qdz1eeq3PpvQm7uGzanABetKLi8oB%2FLblGnbBuWlNgABqD%2BQswfFUqhONuy6siMbemGbJ5cOqMuFmTmx1JKNHn82%2FrPVwLofjH0wpTe1MX7EAUT1RP5VC2%2F05D%2BpiVH%2BppyChlK8PKLm7outIREB2mEaAy7H9cHPslnEZVUZlRHcaBB5iDWcg6i4PKFji8kxS%2Fws5xrcq243U%2F3W9HUs7dIde41z%2B7zuCpvqxhP8wuPC6zwY6pgGhq2NjQq0IuLhniFLvK8nC%2Frb78mJ83eEpgiyxEfJJOjGWlpofbV3Eht2zApyXWxMBjE4l3QueXXT%2Fw91OgtQZd2WsycxiOIGTHFD4ZmlxYZqOw3JbDUCzkakgnr7ahI3vDKUx2Tt1vIB6FyxddWbqK2t6cBnhOOqhwGH%2Bnpj18Mh9%2BY2VaNlygSwn4v73naBO8u6XtEFBRC4sTcX6rn5F%2BYD5MALG&X-Amz-Signature=304b4d8c7c4740fa31834e98057058e98935b9c8e53edf6d3481f1779aacf152&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466X5DUFBKE%2F20260427%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260427T011757Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIDm5xckrRpwXBwiCLKYrTHGqc%2Bq7u7B5%2FeuyzMA0AIMtAiAIJX8XhIol%2F99bzVlH3lQSoYz6fGQi%2BROunPiVqQP%2BcyqIBAi6%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMvguxuOGsmvNj1G7DKtwDgoIBNZ512hvwWeNSREliVqKUEG8NS0NyrYXpFsL0utxDRhF%2F5jOPD1ejK5DzZU%2FYJnf3ERqEGC2XMyE7HZQdMBa4sLlr9QyedmKEvqmB5WeahjaWh76sg%2BDipKWyE%2B5glB9GXocdbDZAL0vVuCVWG8kviZbyibik0hPcgCc%2BmkjK5kWV2Hkw2O5CZOOdMQEopxozv2MKZ7Lx3I%2FQtAvX%2BXcYGTVeR0VydgPmZOwbkdumiGP2HkCInglCZzHXY9936EAfhCG9aPl0WsIdIVZfo77dVxQu8MW9PYSMfhD9nU51EMKPhl0G9M8J4avUhTxwfyGJ0O%2F5WCzGGHn1loqrN5ndIuvgCEgL2vwBQMbdSbFAyBIoTVDGBZ%2FzsIEARSeC2j4TbzUjP1IkMs8zdC9qdz1eeq3PpvQm7uGzanABetKLi8oB%2FLblGnbBuWlNgABqD%2BQswfFUqhONuy6siMbemGbJ5cOqMuFmTmx1JKNHn82%2FrPVwLofjH0wpTe1MX7EAUT1RP5VC2%2F05D%2BpiVH%2BppyChlK8PKLm7outIREB2mEaAy7H9cHPslnEZVUZlRHcaBB5iDWcg6i4PKFji8kxS%2Fws5xrcq243U%2F3W9HUs7dIde41z%2B7zuCpvqxhP8wuPC6zwY6pgGhq2NjQq0IuLhniFLvK8nC%2Frb78mJ83eEpgiyxEfJJOjGWlpofbV3Eht2zApyXWxMBjE4l3QueXXT%2Fw91OgtQZd2WsycxiOIGTHFD4ZmlxYZqOw3JbDUCzkakgnr7ahI3vDKUx2Tt1vIB6FyxddWbqK2t6cBnhOOqhwGH%2Bnpj18Mh9%2BY2VaNlygSwn4v73naBO8u6XtEFBRC4sTcX6rn5F%2BYD5MALG&X-Amz-Signature=7a569d76a57ddeb4fb0c9440ebb23c8f8ea6323a679ab0c1e56e92cd489da78b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QDVJZNR3%2F20260427%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260427T011750Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIExfd7r9L0%2FzeGYXsr%2FUPps6RBzsbcpN3Hbj%2FNPjaQMAAiEAsDAmo3PNQFO9nJtG2xeNiRi066WluwRHgWD1Eb%2Bw1swqiAQIuv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDDhAnFxKzAI85dkL7CrcA1hDQjSfwRGQsp8fzGOWmqz7byH3JDTPJHY2%2F4fQTsPNV7JfiZUVM957DldUuu%2Bgr3FMwxPK%2FVMq8dRaE0jjuLTqO4DFz8HraGE7ipGeYMXWVM4AyWWikwxIPkANPsTysY0QzV7l%2Bm1lYkQIsVX6yq3eAprGlbeJzmMYhn7NHngL6YAGbPnmp91U6v0FUfPbGynwRVxzL2QStM3ntEj54I5CqmCDADBv3ZD5kkVfAy9cXt7%2F110hIcatJUzGo0OWee5YKoSZGPUbueTlex6NYBUefSqwUs0V1lMx0ZSGhXec7X9VbNisOGf1S2ryu8u5KijI3YwW1gCHDHoieQPngJupPsIJfYfAsAXxGdMbaV7Hn63B0yfRNdSvpXGmHMrAsOVM9KX7DUxrXTGyDARfvw9mko7dKp3vzPpdU%2FQDWov8IeZRwCV5Yy9MYYUv7t2xCLbmgyeE20%2Bwu3LaRj%2F1N%2BFm4spHl1Akuo9MPPxPmjvnGNVRduZDQ8KxdDWBwhcApSd%2Fu4IzHRwAo5gOn79PfhQYtZaWPcIkCFNePzHP1meEp%2BNW7ST6JPoZCfCt7kStnmtFYS3z3sV3io9o1jM2VCqLaOfGJCAn%2FP5pJwlNu412odNiMcXkfkxVeSu8MJfvus8GOqUB1lTv9lth%2BtfqwL%2BR97sPfDja7pphw6bG3TK0ghBCHMLKrsk9eJmb%2FnyUKfK3k4YxAOVODkjLhcBKonvxuj0UuAQbkfhIGHYFh4SthPQNXTUHapM7wFZjJRny4Fl369yg8aImvpvRcZ6uZPkXHP7UCP6g%2FCWMlSkm5yy3gkl0alOKOpt7S6u68%2FE82QkkApdriRFN23hj3QKtP3NyOyFe94HpOE5H&X-Amz-Signature=97dacbdb863c8320f5d69f4b5d86a969721fc6860cb5749f5b7e0c806d4835e5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664ZPRMSQU%2F20260427%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260427T011800Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIFRCgSQgJU%2FHw5n2aYS7nG3LjxEAOmut6yjb1%2BSV%2FXDTAiBf%2FQ5Uu2BrAFsA4x7MEgwCfU51TlLFB2ZWXXBvtw7%2F1iqIBAi6%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM5BSTerW7GnSn2E7tKtwDXDBMCCsKUFe1PpQbeanPctc%2FV5i%2BuJ1BSKuHA2fmrm7ZYBd0EuS%2FLlAKhSxIjfUYpPXd14R5%2BsQulgTy7%2FksOVTL16nL2234a%2F6ekCk9uN1Ho4DhMA5JwRCwS2pczddmCjyyN%2BVB4CYLLx%2BI%2B2TafO%2F3g7fw4T5VTHBjhV6IJ1Nema8zqQoCnMxnzkEHxYT6160rry0n%2BRHhmusRqmTpaA1G8skUcs8WJ0bA7mkaEfcwB%2FSXq2ZbwTScMnD%2Bc1a5Skr2lsBnj%2B30L3VaVJAcwAdcrlL8jFV2SFo86dXm%2Foi4t0dAqCvNjJHjt4Xkvj%2BzmPVk0YCFMpc63bdfPbYZPfKhyMrcyHnsGIwF5sZpqg1Kod%2BrOabYqFpXVKU%2FuXlPHKvOcEjtujn2toVGEk%2FM7zz%2BBUBhf4t6Ixy8usQwmPAEShBE43a3D%2B1kM0n9i3bCRsYE%2Bm3G2fSBOcUZnVG5RHEO6zs3yvN31S58O%2BSMsCbMsO2TnkAy1K07fi3yi0Hq3Z5UAy9UwhUCfdBVeaGYoZperPmoQsr%2BiRUE%2BxoY9DR1VCkX%2FgoxApENi9wxNObVCyMQpoEayIMKATK8s%2BTX9KznMRCI9G1smDmWcXrBI2ar9ByxgFo7wPRaBGkwjPG6zwY6pgGqhLOqdgiXu1UEoX2BC1QvkkFGFHj%2BYPED57mZksczcdcPiM0v8q8RMbDn220vCbmPUDYvPAfZ9HAApZwAXPateFk5LoO8gBNIgAZPdAftv1dFG5qjd%2BzmtNs594g%2Fste5jta3Hhyc2f0nh4P8uUREnwj3EVmuRQatig%2BeErFjifru%2BOrSBsPCsCm7oSoc3v3taOncLNqPHMsY2%2FVX7ynL57Tv3FJI&X-Amz-Signature=84d7de88dcd89ffc431395f94cc6ad1e6b3a068af66b85d0531c57fdeed43178&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664ZPRMSQU%2F20260427%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260427T011800Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIFRCgSQgJU%2FHw5n2aYS7nG3LjxEAOmut6yjb1%2BSV%2FXDTAiBf%2FQ5Uu2BrAFsA4x7MEgwCfU51TlLFB2ZWXXBvtw7%2F1iqIBAi6%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM5BSTerW7GnSn2E7tKtwDXDBMCCsKUFe1PpQbeanPctc%2FV5i%2BuJ1BSKuHA2fmrm7ZYBd0EuS%2FLlAKhSxIjfUYpPXd14R5%2BsQulgTy7%2FksOVTL16nL2234a%2F6ekCk9uN1Ho4DhMA5JwRCwS2pczddmCjyyN%2BVB4CYLLx%2BI%2B2TafO%2F3g7fw4T5VTHBjhV6IJ1Nema8zqQoCnMxnzkEHxYT6160rry0n%2BRHhmusRqmTpaA1G8skUcs8WJ0bA7mkaEfcwB%2FSXq2ZbwTScMnD%2Bc1a5Skr2lsBnj%2B30L3VaVJAcwAdcrlL8jFV2SFo86dXm%2Foi4t0dAqCvNjJHjt4Xkvj%2BzmPVk0YCFMpc63bdfPbYZPfKhyMrcyHnsGIwF5sZpqg1Kod%2BrOabYqFpXVKU%2FuXlPHKvOcEjtujn2toVGEk%2FM7zz%2BBUBhf4t6Ixy8usQwmPAEShBE43a3D%2B1kM0n9i3bCRsYE%2Bm3G2fSBOcUZnVG5RHEO6zs3yvN31S58O%2BSMsCbMsO2TnkAy1K07fi3yi0Hq3Z5UAy9UwhUCfdBVeaGYoZperPmoQsr%2BiRUE%2BxoY9DR1VCkX%2FgoxApENi9wxNObVCyMQpoEayIMKATK8s%2BTX9KznMRCI9G1smDmWcXrBI2ar9ByxgFo7wPRaBGkwjPG6zwY6pgGqhLOqdgiXu1UEoX2BC1QvkkFGFHj%2BYPED57mZksczcdcPiM0v8q8RMbDn220vCbmPUDYvPAfZ9HAApZwAXPateFk5LoO8gBNIgAZPdAftv1dFG5qjd%2BzmtNs594g%2Fste5jta3Hhyc2f0nh4P8uUREnwj3EVmuRQatig%2BeErFjifru%2BOrSBsPCsCm7oSoc3v3taOncLNqPHMsY2%2FVX7ynL57Tv3FJI&X-Amz-Signature=84d7de88dcd89ffc431395f94cc6ad1e6b3a068af66b85d0531c57fdeed43178&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YRLOV3JN%2F20260427%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260427T011800Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIC%2B3Xgt1Nyn3BjSdkpZ3IErKDIdzgWpjjR6xSIryEHiXAiEAmTOyprYSvEHqiUTuNWDu5WCRw3ZAeFbI6rtI4HvJgBoqiAQIuv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDLQTY81E96fhte4FlSrcAywq73N9Aq4jS%2BJVHqig%2B6hnHoOr4Ftjcet4we43mZg914ESe9KRUFp3VdIsYXos8Rc6LgFPcqpHzLscdn8%2FIkMrsHJssCP19FmSLzi0EpxDhvRTs8CVNEn6i7kTrZd%2FWR9Uauq8MdwCliqKMsx6gxhcS4KZjNnV1UQi63YYAr4X8ZVs8B1HivREZz0wkrnJVOFhQFcoB%2BrRrsM6RwSIsRsozx6gCWUMQErgbxFQc%2FCOeueSGpdW4A43P1FNF%2F0sPygxMDxq9Zr9u%2F9iE0P2gmnCmsXrPwWJsjmMTavzqbm8x60I7GNRn75zLS5G7Nkl3emKrs7btekEdw8xFgMF3cfLvzX7vrJcdILSvuwcXQgfXiqnYr7dvciYWcWzrLSFPQIfEwl%2Fa4lJkw4it0A3wzrTmz0SJFzfl9t3viyvINB7COLvagNABPnJSgkolZW3ikpDkedhfmvNFLAQeLXgoChKGDQZLAkmmJ8D3dAV2nC5m283oGAeE%2FsFByYU45fVaJiCfRmNZrDxiDMFDC%2BazL29G8OM3iQwo%2FXIG40YZh3%2FEiGChFO70%2FhwvrQ5PRa3wFHwEhLbeg47BKaFDeSH%2B9jo9hQRJBlQ6YfYXD9MoFkCnI2%2Bc9v3511mA20hMOPvus8GOqUBJM1P7jUznLQy5X0479m9kiuTGOGg%2Ff9kQn2%2Fb5wE%2Bd%2BwJ50O%2BQ%2FtypfcuxFW33TGYUE%2BCnQygTJ1rtHdMFZKCKmxprH1wUeB2dGlJABkr6xhDThSb1QkQdrscMkdNV6zXv3%2Bri0ts1PZufZpv1d4NjEigF0hGEdsx3y%2FPl1Xm38O0MU7K6%2FZYIy3n3xZZmfJGAjtCGyPPA2BbY7omNq8ru4ixdc%2F&X-Amz-Signature=7dc38dcf004339ca5a92ce578c16f3dd09d07fa98a7c8909339792bef01f9d3d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

