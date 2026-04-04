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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662VAPOWID%2F20260404%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260404T005922Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCDKEdxkqufOUUrIcWvjeeVQD7cmF%2FkJsoCbfkt2%2BBfTQIgIn02I0SNiFzh5vXHC3u1wFgyaFarC4vx%2BvV5D16hp58qiAQIkf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDICBjQziHV4cjyUyoircA%2BVUVzRYOtJCasWk4LvvqGEoGg1KFij5TtU39SRIRrQXh2YRAEmd0t7W4M5w87U2MqYZ6ETaY%2BasUkCQslgW98R3zof%2FIcMCepoqCDBCb4GQjSyUxXyTMeX4Ji3rWPC%2FpCQDR%2B%2BTZf2mW5%2BLdTWwrm3HoUPwJqhFX9zlg0t%2FatMm2RYcCDm0lwvkelZSIOYnRwF%2FjYyJY%2BQ%2BCePXqeznyfwUu%2BE9kuFEW%2B3ImM1jU3mtC%2BPDfsd6joc1nPEwXl1CXxWvIMyRkoP3P5HN0g4ggA9ANgSffHzeZ105mFIYs5sO7s9YydEjChYHoeQU5BG%2FUHHojx9HSnfJcVOIjPnaTlYcdE2ZaT1x2FWfeerAb3tf2C7dQHHncd%2BruhbCM9bZhWOltjlXTdMMQLXypta8hMA5PM2ICfsMUlq8vyJuHsmJUOnArsmMNrarKeMb78pyMLPb9JhT%2FNwGIvzoG5uE8Ek0nLQyYB8FfJ%2FJXce8BglWti8fOw0qMsRjTpKSb8vSyYHQheYDraXXFev8UQXQwJ2G%2FJD57LgFae2gJ7J5Ed8VwU4QMc%2BBSxEkhVvcRJP5jCLM7unkCcEBiBrcVax1%2BVRQ1UCRgX%2B68bsMAhPnW%2BdAwdtJnInPm0lSfLdYMJalwc4GOqUBuhzaJY1EM7YUNmWnYMLPVLnHVGx2yIcXEt0%2BiOSWCAcvmwXcFl8IVS0RoghGKda0w%2FFrLtiVt%2B1n6zoMbESnU7YTZUofRzc%2FCwax%2BPgR0jDaavYjxkKlKSNt0XsZKAQzR6ckJrenDUUaDws6X4xjB2BT2GTPSHUOdhmFKu5vbKwNbFQQ93UnKJ3DFtSaBZMq3RNXB3onne4TJb%2B2MSZQY9%2FCmrTQ&X-Amz-Signature=944a4e06a02a26bd5bfeaa1b38c83cf01cbf664bd5b695d84f2f5cb3ae266710&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662VAPOWID%2F20260404%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260404T005922Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCDKEdxkqufOUUrIcWvjeeVQD7cmF%2FkJsoCbfkt2%2BBfTQIgIn02I0SNiFzh5vXHC3u1wFgyaFarC4vx%2BvV5D16hp58qiAQIkf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDICBjQziHV4cjyUyoircA%2BVUVzRYOtJCasWk4LvvqGEoGg1KFij5TtU39SRIRrQXh2YRAEmd0t7W4M5w87U2MqYZ6ETaY%2BasUkCQslgW98R3zof%2FIcMCepoqCDBCb4GQjSyUxXyTMeX4Ji3rWPC%2FpCQDR%2B%2BTZf2mW5%2BLdTWwrm3HoUPwJqhFX9zlg0t%2FatMm2RYcCDm0lwvkelZSIOYnRwF%2FjYyJY%2BQ%2BCePXqeznyfwUu%2BE9kuFEW%2B3ImM1jU3mtC%2BPDfsd6joc1nPEwXl1CXxWvIMyRkoP3P5HN0g4ggA9ANgSffHzeZ105mFIYs5sO7s9YydEjChYHoeQU5BG%2FUHHojx9HSnfJcVOIjPnaTlYcdE2ZaT1x2FWfeerAb3tf2C7dQHHncd%2BruhbCM9bZhWOltjlXTdMMQLXypta8hMA5PM2ICfsMUlq8vyJuHsmJUOnArsmMNrarKeMb78pyMLPb9JhT%2FNwGIvzoG5uE8Ek0nLQyYB8FfJ%2FJXce8BglWti8fOw0qMsRjTpKSb8vSyYHQheYDraXXFev8UQXQwJ2G%2FJD57LgFae2gJ7J5Ed8VwU4QMc%2BBSxEkhVvcRJP5jCLM7unkCcEBiBrcVax1%2BVRQ1UCRgX%2B68bsMAhPnW%2BdAwdtJnInPm0lSfLdYMJalwc4GOqUBuhzaJY1EM7YUNmWnYMLPVLnHVGx2yIcXEt0%2BiOSWCAcvmwXcFl8IVS0RoghGKda0w%2FFrLtiVt%2B1n6zoMbESnU7YTZUofRzc%2FCwax%2BPgR0jDaavYjxkKlKSNt0XsZKAQzR6ckJrenDUUaDws6X4xjB2BT2GTPSHUOdhmFKu5vbKwNbFQQ93UnKJ3DFtSaBZMq3RNXB3onne4TJb%2B2MSZQY9%2FCmrTQ&X-Amz-Signature=944a4e06a02a26bd5bfeaa1b38c83cf01cbf664bd5b695d84f2f5cb3ae266710&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SWB2ZKBI%2F20260404%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260404T005922Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCpIfpVwTZvtq%2FlbviPu3w0pdUOMYndtV1DSACW4fz7rgIgVt0%2BjeEoVkop57VT54EEE%2FFrSCFwrqQfcekU6d1MSN0qiAQIkf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDCVdXFbc5ocV0a3CWCrcAxV9dm304H1L8uQiPOJ21bf8wEJ%2B8dyw2NQySuEwiBqI2dAIePUE4sBUFAZFoMD8qVozpNrTPfN4SmI11ifGszDMoXQS3oBlMo53mEPjni6BOEai2DkGcpQ4E2OuygKfsj5RnD1W54c5tiGQObm%2FHHwZn5HB5HMua2RlNdXG7kG9rhFfVFY9HqAdg8IUY%2Fn1PqjkBufgn8UCkcbWczfArWRevngzBjBHtS2GPFzjwv7kKankU829pr1zxchKtYt96YcjfaB3UQ5BuAjZNSPjLMbE9X1XGL%2BV75%2FnRcnkB8d1dGjibmSZPQmkgM3fTv7gU7lyMbOvq1DXzxAB%2FdeFJN%2F0noYtIm4hPG2tf6M9EsPzbjMS%2B1kZ4n9aQHGMDAp8h%2BVMFnpqjOQBL0LRfLEt1qGbw%2FKBdkVq8mKs%2FDLbIg90drUqTU%2FoEDncQN6ahLL2HQD1d%2BzlO6AE34AwUH9Mogli17c54WXEglsEJwWfeSNdcN4TEBkz7M2%2FS%2FP3YJbpKsllxB7rYWDRR13yuUKaZy2ssUxyZE9bhFBJ4Pr9WhpZIck6VYX2jlGpd80K8UfsKfjEdgjZNR8XK74WjWTn68C%2Bv%2FbT7jiImB2fUcJwU9ayzx71D6vrxvV88SRGMISjwc4GOqUBrDRNp2ZuPdWrKP%2BSbAWIIzysmZqxMq2D3TARR5VOMC84Lwc8%2FILh6m8SYgef0xPBawFafVag5yYeBX4YWpyqQxF4Jfszgfagx5l6dk6RDUocHDEXFwfxZ8JAUGVKBvB1oy%2FY3RwmKJJ6S9wGCDqDJWdonUjDksbi0ZKA7x20OkSj%2BreWqqomuakF8JQz3iURWEUsy0GlC0WjN0E7hvg19MEGu%2Buq&X-Amz-Signature=a2caed9a8f373a01a78d10acac46f871166f518e808ddcf8586c7babd7470721&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UBOZB5F3%2F20260404%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260404T005925Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDQ6m3Tte5HMxDVnSk2Vjk2DGdzQx2urn0dd%2BQtoitS1AIgbtppAZO7D4bpZ%2F8MbdRxiaR01OkYCMuDC2SH7GdCULYqiAQIkf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDEz%2FQ3c0RAudumUafyrcA0%2Bhr1XJlsujuBwGtsHuZmV6lmX6Ni2SsbiKlk5tiEZF1F7C6Cs2%2BZ%2B%2FY%2F2fWZ%2BHUfkyUvfIJzM6U1242FYEym7fneEfxSqPFLGj8b%2FHidqqCKHfTzP5flrnyzu3P6Az9ytDQG72Xi5G51ONgfB%2FL0%2BDMseWb3hHLOmZYhWFo4juWFsaPuwXGYtQylRDV9nHDM2CojK%2FMXZcwNxe8XU23YpAzLrSILlH9MWRNVWmIEzQyJJTQaMFvN%2BIXb1hDAfW3aFWpVB4IpN7oIiv33Qmk4t3NNalOBZPxBfbnMMAEG5PC5enrUZ30fRoa2mZzreycaZVh%2Btw9%2BGqzTjkdcw%2BCwlBpZbVDqDdXIjwJDgxdp3KS8EuWp1XqpvbJVj8sHmOR1m25QURMLlp83IYuz%2B3xjM0l9dkY2MSY9X4RWFWA6sDOOFS9zlxxigXiO9cYmw%2F%2FjTacpaI0lYEfU4LYhLsyMTUhLQaiIK9qIBfHeCVEF%2BdXnpwLx4v7muu%2BbuGTGE%2FRpBIrh6cu0BRNIuBD73nvFr7364Z24ADTNXaio%2BDtOVfvKYkSETA%2Bptzh%2F3ouAro4PQM2UmG6ZNWxwX2qgrBRH7TPL5bhWafec6rhDEwkncA50sKs2dn8Km5l07nMNWiwc4GOqUBF8fUmKMo%2FfBYQINVdgiPvrzPzb8lYdlBLU20zL2nAj8u3s3PwJ1soZxe0s5MPQsvY%2FmO20ca5DMQVtk%2FWeVpKrSHTBWJv%2B6mMzy1v%2FN%2FtlGLuN7KkW9gULdafqLXpYPUF7BLVpqoIj4YwYJcMVCDQqFj0G9Xxw62IQyB9%2FsiiA0Cw3Wrj%2FVHxX5XToQsNflzeKqR8CxnarN8DrPPPfumUTEBl9zE&X-Amz-Signature=8a3f6d5f774878e28aca5dca3763cd12bc622a322be8e597e466a9d407bb71b4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UBOZB5F3%2F20260404%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260404T005925Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDQ6m3Tte5HMxDVnSk2Vjk2DGdzQx2urn0dd%2BQtoitS1AIgbtppAZO7D4bpZ%2F8MbdRxiaR01OkYCMuDC2SH7GdCULYqiAQIkf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDEz%2FQ3c0RAudumUafyrcA0%2Bhr1XJlsujuBwGtsHuZmV6lmX6Ni2SsbiKlk5tiEZF1F7C6Cs2%2BZ%2B%2FY%2F2fWZ%2BHUfkyUvfIJzM6U1242FYEym7fneEfxSqPFLGj8b%2FHidqqCKHfTzP5flrnyzu3P6Az9ytDQG72Xi5G51ONgfB%2FL0%2BDMseWb3hHLOmZYhWFo4juWFsaPuwXGYtQylRDV9nHDM2CojK%2FMXZcwNxe8XU23YpAzLrSILlH9MWRNVWmIEzQyJJTQaMFvN%2BIXb1hDAfW3aFWpVB4IpN7oIiv33Qmk4t3NNalOBZPxBfbnMMAEG5PC5enrUZ30fRoa2mZzreycaZVh%2Btw9%2BGqzTjkdcw%2BCwlBpZbVDqDdXIjwJDgxdp3KS8EuWp1XqpvbJVj8sHmOR1m25QURMLlp83IYuz%2B3xjM0l9dkY2MSY9X4RWFWA6sDOOFS9zlxxigXiO9cYmw%2F%2FjTacpaI0lYEfU4LYhLsyMTUhLQaiIK9qIBfHeCVEF%2BdXnpwLx4v7muu%2BbuGTGE%2FRpBIrh6cu0BRNIuBD73nvFr7364Z24ADTNXaio%2BDtOVfvKYkSETA%2Bptzh%2F3ouAro4PQM2UmG6ZNWxwX2qgrBRH7TPL5bhWafec6rhDEwkncA50sKs2dn8Km5l07nMNWiwc4GOqUBF8fUmKMo%2FfBYQINVdgiPvrzPzb8lYdlBLU20zL2nAj8u3s3PwJ1soZxe0s5MPQsvY%2FmO20ca5DMQVtk%2FWeVpKrSHTBWJv%2B6mMzy1v%2FN%2FtlGLuN7KkW9gULdafqLXpYPUF7BLVpqoIj4YwYJcMVCDQqFj0G9Xxw62IQyB9%2FsiiA0Cw3Wrj%2FVHxX5XToQsNflzeKqR8CxnarN8DrPPPfumUTEBl9zE&X-Amz-Signature=880655de723287572b2662a81cd153bae2b9375493f926e183093453a5d20ae0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663INRRE76%2F20260404%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260404T005925Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDGWAX%2BFtLmXNwVd8ZjYSMJDRIq0NWbo1xqGAeHcYK6pAIgbziHoYlad3cyOcwOz36NuWfHx%2FBSHPTD7ZgszuWBYScqiAQIkf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDAzyJhRDK5Ow2l0niCrcA6oYRGtVgxCLVOSjdjr%2BDdsq19Ux5PDL8jdyNaBpWCJBQMgbcj1nMabs6hUwCGpu%2FVPamR0cuD7QoyKrHogDXJeHPjLmiKMP61lo0jI8ehvN%2B4Nvov%2FFdNj4VI%2BuXX36Tloji6jlMW2ugmtX5nbJDdssZ2n3U%2BV3r%2BAQ1trsZLO8nAGPSJgbqknYLz3fLgjYEXAGUr9D9I4oBmV4SZCblaQeiaRTCio2Qh4AR2leqshez%2BuB8MGkPpIfhlJL0JVw4ZR%2F8hQnC2%2F2mPzqlEA7Aj00SMKHWZfaWPhfdG0hSrWyeoH4oTKVRKBdVBd8EBQxjyakm9P2RFpgZgty%2FNqTnJlAQLIo4MpMYyzPy2H%2BH92V1QQeYJ0Klns88tDDF9Hhc3afNt1cSu1KxiJJkKNXhoDJxNUsDoy7kNgyRFI9B9N8X%2BvPalYNU3I5fKLBjW8NKK%2FVIgqiwbyb9g6xKjKeKzKtmOLe7xhUd6jrmXOcXd2yWXiljXttKYMWl%2F3JXcVdB8hnIU9A0O%2BEAhnKLj4pDCasKuyTq4ifuc0ZLQj%2FjnQNJvKHx%2BDXmZ3f9k5as0GIOsohzKaGJo4i3UgxbtAFJlHp4770CM6MNHAdRaec5fBPLP%2F1pet3kF1sBckPMO6jwc4GOqUBkHRW6J2MT4ZejjtRcyjxYfeuTEBTFwt47K%2F9cN77Gcuy%2BS4Rg6P04fTPf2RefLt3tKiwqVB46ugYgqJJI6U9pGG%2BL39rroFZgb8W49glhR2qn4%2B9AEAIboZn7WJyedHX%2BrgyWm8hf5bhCpcCO9WEYdsojExx7s6YxhCDZ9fU0ZAa9yFEesTbIJtx%2BoAlbuJ1gmThsKEFMve90cR%2BXBSBGCoxxVVh&X-Amz-Signature=e069d62f76a56f9e19ddb06e35bdf094546536d85d82fe242d77524475bdee0a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UUT2YGR5%2F20260404%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260404T005925Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDkfWJUmYTdcsgPQI0H6RsqvNTushgrsmp5YbDTmtYtJQIhAOUcjKk6FIkptoWUnANMG%2Blurx1mtXrQjh9%2BQrtG9QVcKogECJH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzwVihArUXENkeNpw4q3ANms%2Bic60g6Pb13aer8M9F5kpIL%2F5MfkK9cDIhIHoXeEdcy3CKecj1q2njg%2Be0YXb4OZ5KlhVGI2FxS%2BcIMtRgUqRTdKZHj8eUTHruor4EF1KUlsZlMYR8%2FzHrDZAnJtn6Rk8PWJPWfUeDTkcoKy%2BkVHn86h%2BHz9f28mB4Gkw1n%2BBo%2Bg%2FzoFfZPgAY48sDwquAuNfNC9ngpoQ236ogwf%2B96A3rxPG9omYp1uJxvKs1%2FdSkjhnuQ0f%2BGIWOj3wXX5yu%2BCA6BGPMPHedZeYS24fNYhXStrp%2FiI8y813WjGsXhqWgHTigJCHWdgL7K9RoPkB5SAevUBOLc0eLr8wjyCFiLTECz%2FkRz06OgDGzce5JCdysyfuiCrYSKn76sHaOoIuS0FR0rt64G5SlIi%2FvJsRmS8ZwXmV6ThWoaNuwJIO7S8DxHt7Shb5iMm93qQavESDJcztobJP3lQbif1GHdYxYPYFXC0nFAEL5HCtIHr1ymyoilNIM4aR85njGBvBXe6%2B5m73oqbfx8DSPmfmLJnJF2N7TaBIgs0%2FRd1Q3zSJIkRouGC3MAUruaJDQIeTLmJsn2XL66LmuBirPKVXLJIYDa2IyPvSgb0kY6EaPj2N3frTJne6eClQ6ghPK%2B3TDKpMHOBjqkASZRknxdJE7Wtwv24aFJyBbYOYkys%2BavNDNFljNP9N3PYHObLKYoECsi1RKuOG8qNUMezMZmx1%2FhFqez6skBkx1sDXsFnpYvN5u0Qi6Ms9xPHs6dzj2rIfhWhksFVGeU1DfirF1eO%2BTKQPzkW177sAc0IbwRh8Ar8mh1lCs6u5Di3LPrcouvuMsQh0rX%2Bxt0yN%2B22jhv0R%2FFh%2FpOgaGkKY%2BJ8uJr&X-Amz-Signature=1f23a64025691a5f9457f34240018080fd1f351c0a60dc8b36c8b03369d9f161&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663EUQYAEE%2F20260404%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260404T005926Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDlg%2B3Rdz2jihlysfgTU7UPw8rXRZ%2BfONeu%2F2po0cdRBgIgCeHz0Llyh1JXp4arqbCtFP6ufQeK0nEQM5ggb25IEjIqiAQIkf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDLY%2Bdk49hGSvdwT5lSrcAxL2S9TWTv65gKpVVMWCZshJC9aIeKs6TrHWsd9zWATQP3dTsgJvXSGkKQLHCx0rsjRnWrOW24df9%2F4%2FsBntIug7KKDamg2r2zL%2Fhn3p0d5QrQ3B3mz0vMSgettAep%2BcTHyZSn6hX4ZWjyQHg8CrLcEZ3ouevi9UAPuV06ZWLwCEIly8mWtZKIvbRqclFeQBf1Y5aJ%2BZRD6Pwruj%2B4IDBYXaelKLQAZYfq0je4QumI4Fymui%2BsmMscDQYHuifiDh9uEIr2i%2Ff7XAfq9W5CLcpcvX1Evr6UEJsztzJgs3ctNJk3ysEMHDJIQLPj2a5w8z%2BbGSpYQFkFlZPGc9EtKtrLM3QZimt3Zi6mKvlySyDzWMXac7OUu7AwoNCPSSKgIqqCqNhPpVI5TTHsq8nuOlpwB%2BOjR%2BlDkvPtpU3ijWHmbr5JFxnP2ya9%2BI5sYDnDo2fjDgCKZpzICpo%2FbfqR7ctTWiXh%2BXWc9TRz%2BA039kdn85vm2Xjy9HfmTOs1KvKI6ICmAeUimjzaFbR8p37cj6K0q%2FO%2BpT8Z%2FiCKk78DFQJgLcaMXinO8hkMGAH9gHEbV6dHHJ1IgdzrZvN%2FxRPc063EmaKjIvm0kt4HDbwb2STY1abC0T7%2Flh2z6kciNIMJ%2Bkwc4GOqUBH2I38d4JcfmBxgw%2B2A3UwtlulQ0tbFjk7MyZzHxPl1mt8hKmgsJuJXYa2oZP347pJHAkVRNTu%2BxlVFCq0ZFO3Px9WytbesgJdKy2frvNes5m5ZKvwjvCaFZe5d2prO0fGQntQWz0Q42Cuay2bNFks%2BZf%2BbwmQlO5p%2Fgz5FUHKZL0iM39ozNQrARHUqEw6tzvWJWIXn2UHH%2F2QsFRmkcgh6eRcBb3&X-Amz-Signature=e017d1916cae75c22370b8d402f80073a321ebba6d89b13e7487bf159a13cdca&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665ZK7TUDS%2F20260404%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260404T005927Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIEJf99Lf8MU5boRk2sCVRcCSYvnoWWMXA8Iv6SvFB90%2BAiBbn7j1IE%2Fivfes%2F3ZJ0XNqzqDDWQLc6Y7WVFAMc3Oe5SqIBAiR%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM302GeczF7sSWBDMyKtwD0U6RmnSrK0gaUak7NtVjz6%2BKwZvrCeONpoTXKWwkb%2BQQy%2BXIjNaX%2BmSn3%2FH7b4gB8MmT6ebzbzzbywyrEu9T6unueeY3MSngPI68pO%2FoPBVp7IXLlzZbetdIH9NenpgjVJ2a%2FLNFI9FPw%2Fv%2Bf3FX9J18wAOviTvz7SrvPbUqVmflsz38bPsZaJSfdCrdY%2B7zcmhX07HK6nLWKktLmwbBkE5GTjsyfshltXCUif8zCe15btw1wNtt3fgoxj7TZU%2FKsC80YPdKMUJfSgTaPvhWzqP6cts6pYzdx0HUhnu9wzLV0E1EDJdgskDXgD6ygx9Xt5hiKEeMXNSKwsS4yu3abTF8%2FDXJSHv%2F5oEKAvAF5f975RkgMcFWDWTx50B3LdUtDiywfzmKGUBA566AdhUqMrKHwKJsR4V9bkUN3KXCamaNJn7Muu%2FVzWEPR%2BqDlgv7Zx6uL5INv33VARYbySNbVw26bYdU0ILd5r%2B%2FiUG8Hz7exb988SQxebbl66bZnKZFjt6EoPPJyxBNMTlr%2BE%2F13%2BV5Ur%2FHNxTuQgTL1LsJc7pg%2B817GlUmPDWAq50cj6wyMC5cHXR21%2BBD7Wz0IsvCuuI2BSSGggFvwoItihwlESc9amDU7%2F7YoljD2pYw0KTBzgY6pgExh8VFKuz2L0cbX%2FS58YmHOTncvNroLqBwNYbmXydNCVzVlc0GtV%2FNhwVN2YTzBWQGybV7Cy%2FhrK3WKlrvG6CixU28%2FzXKfP6cxQi0GWfk4xr7b6aC5GJwEX6fUeEG6Nsc0JURft2AGfpSG0kuKXLseDu6HwS8QtfEl0nRfv8GsRfHQg%2BnfMElFkdNP9uBEeCySWTGMA6rwEzbkoffpdOT9%2FVyCt2m&X-Amz-Signature=f5e158b33f8e30cfe63145576869303b6608f46b1adf60bbf93592143f6dee63&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665ZK7TUDS%2F20260404%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260404T005927Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIEJf99Lf8MU5boRk2sCVRcCSYvnoWWMXA8Iv6SvFB90%2BAiBbn7j1IE%2Fivfes%2F3ZJ0XNqzqDDWQLc6Y7WVFAMc3Oe5SqIBAiR%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM302GeczF7sSWBDMyKtwD0U6RmnSrK0gaUak7NtVjz6%2BKwZvrCeONpoTXKWwkb%2BQQy%2BXIjNaX%2BmSn3%2FH7b4gB8MmT6ebzbzzbywyrEu9T6unueeY3MSngPI68pO%2FoPBVp7IXLlzZbetdIH9NenpgjVJ2a%2FLNFI9FPw%2Fv%2Bf3FX9J18wAOviTvz7SrvPbUqVmflsz38bPsZaJSfdCrdY%2B7zcmhX07HK6nLWKktLmwbBkE5GTjsyfshltXCUif8zCe15btw1wNtt3fgoxj7TZU%2FKsC80YPdKMUJfSgTaPvhWzqP6cts6pYzdx0HUhnu9wzLV0E1EDJdgskDXgD6ygx9Xt5hiKEeMXNSKwsS4yu3abTF8%2FDXJSHv%2F5oEKAvAF5f975RkgMcFWDWTx50B3LdUtDiywfzmKGUBA566AdhUqMrKHwKJsR4V9bkUN3KXCamaNJn7Muu%2FVzWEPR%2BqDlgv7Zx6uL5INv33VARYbySNbVw26bYdU0ILd5r%2B%2FiUG8Hz7exb988SQxebbl66bZnKZFjt6EoPPJyxBNMTlr%2BE%2F13%2BV5Ur%2FHNxTuQgTL1LsJc7pg%2B817GlUmPDWAq50cj6wyMC5cHXR21%2BBD7Wz0IsvCuuI2BSSGggFvwoItihwlESc9amDU7%2F7YoljD2pYw0KTBzgY6pgExh8VFKuz2L0cbX%2FS58YmHOTncvNroLqBwNYbmXydNCVzVlc0GtV%2FNhwVN2YTzBWQGybV7Cy%2FhrK3WKlrvG6CixU28%2FzXKfP6cxQi0GWfk4xr7b6aC5GJwEX6fUeEG6Nsc0JURft2AGfpSG0kuKXLseDu6HwS8QtfEl0nRfv8GsRfHQg%2BnfMElFkdNP9uBEeCySWTGMA6rwEzbkoffpdOT9%2FVyCt2m&X-Amz-Signature=1a1b8ace7df9e77bc5050873e481837c524d3a58f4f41b1e094adc926327330a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667WQKKXOQ%2F20260404%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260404T005918Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDJr%2BuXoEKrVL4tfYvZeT8%2Bv%2FQ5wpqWA6v9uwYsU7ecPgIgZ4qY2agAlcXBg7%2BOqtcuXZxdOG%2B8i5XGTr8JYo7%2FSZsqiAQIkf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDNReOUsyWbObAk14DyrcAxmJWRJALX%2BXQgAASbz%2Blb821WeGxiIC5OZniwrjFj0Rh9Tphcq1XMJn%2BY1ItC%2FR%2BX%2B7SNMduUGc3hfpADz4TIcDMogyUMb3rsnij3A%2FgoQEFiQAb4%2F%2FlXoN7SY3lDxFYq8uRpmVNEDbcDtRO7lI%2BLKbY%2FPm250yE63MJYkaXLU5juyRqOXgJ13fTwlnW2vq5XowXXyakqDY%2FgDFOVoT%2FOmdHBtnS7lWH%2FeC7Q%2FBUvJNB%2FULCrmi7LhBa6Pf69UedpljZ8v9qfKFeW7Dhm%2Fhikn8oIWcGtSXs44JQf8ZfU2J0mO59AU9foGeIUJ%2FzFzDSEDLoTR%2BtbQjzhnC2uYlKSZJJkJm9WihUJZvuERQH63CyT%2ByJiYyh9%2BfaXCNBD5Iz9HbndxvSgzn57AQ6JumLXKzkkO2WnfKn6ePNMhlGPMBWAzJ%2B%2BNrVL3bu%2F%2BLjVBEVS23bq85Yarfs1NniHpDsqjP5aS%2FCfja5C1tbBWDgTsQrkzwlviCanvmP1gTcorkPVsfKAiWEIyvHSbZc54CuQKxHrNelai969alBlk5c2P9o7JFg%2Bl%2B1peFG27SSduPN%2B9H9VjMM7YE6SrVAc8xjG68LsqfE8bJPVOZ%2FPM%2B2dH%2BSmbI3MfLEnbB88mWMN%2Biwc4GOqUBMtM6VPNSawCfoM2wLLK4febpEfcXFdkPe18Kf%2BxFt1J1%2F9jRd5I2s6jt4hEZB1GHCJDGvuzO1bF9fAcEJm1ykVU8CyNNgjxFz0HhCzM9q%2FxNeUo6ZSMqiH8tYdyR235UsybkX9OQeylTqT1poJ08YoML4MQxj%2FnFqxhutwMvL3mMSZpGHVrWmml6mgiE6BDsJ03WZBcP2Glng2q0Q%2BUiizqF2ULC&X-Amz-Signature=942bd3e76710ae7192afb77ccfe072a5255bde414f4caa079fb53c5a01ec3bdc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S4PA2YF4%2F20260404%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260404T005928Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIF4GAod5ZpicTOiOPyABLx%2BnqkAVcIRngp1GOCRHwnKhAiEA5s352WZmBrNNBPxZ3YAOIcvPF57%2FDEPkQMNHxWNTOnUqiAQIkf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDIXgWRc58gS5GxQP1yrcA%2B3Ku2i9WmujeWqEq5XBvdHhWL%2BE8Djk1nqUVDsO8RapKpszvsbG01uPOmFHDtEwzjdYLBWRtC%2BMfWKTgazLyqQz5hxS6h4HTrtSyHZv6dwrRkF49xBaoeuqUgfpp%2FLeF0gl%2BWISnqyK%2BR8Whf1ws2LSeyFL7tM52WPJJyIt4fXb214SePvBzCDE5Je5i16QkBFKAszWnVKOn92BG%2BEYmGnT0LWIhMCwwNYCkjJ7DFYZ5aFI9aiEwFLqsqN7L0oyT7Jygl02Fx3lnhZg9OhjmN4OkhO4JHnII3pbvvkzTO%2FktiXHEdBhoTVFfz51a%2F4VBMG2bfcRLlTBm9wIG%2BPqGpUuG6brPdhrw%2FPwpJDE%2FJ8CdFx1YHKXSjdcUiWAJT80ZbA8y7a0Bkb5XRIJrfackHHt%2BCiJ0hfqdEANPQR7Xi7KazbFWAMmJ5gQfww0is3kheX%2FWwYsTr4%2FnXZ9FjEBuctry79LkJJ1PqQiFjqOJVeyqWgk%2FowElDf%2B7x2BhgPD%2BM7UEA88ci5sWUDx%2BPE36w6sRhbaE7hz9ZREoli0c2n%2F6hAdGADS6XJEPdhdKKiQvyjoYLZFzYm0pOSyDzu0Oq8SsXlqv%2B56VMiuMc5U36SZOG5Fe5N%2BVVvKP04qMLqjwc4GOqUBZVLOeVtN21G%2Fn7lJK%2B0nd%2B0XARgX0FcdBlfY95lnvufVp0KtIWpZHPUEi7SQH7lN1FqTWL6Z%2FP91NY4n%2BYuydPUjejrFy2UblAnE3BRn01TQNk6SISWTKDlXB07jRaUB2sLmhh%2Fu0radLOcJ%2FWOZwIpTcV7djdbH44v8PHxHY9ubHW92a%2FHMTnIrz3hwH7OrpmIRGSVPO%2Bs3ltlDyluV7ADS9ynK&X-Amz-Signature=04fd8980b75d0cb90ea7af75f7c8cccd4556ad6e77c6076b16b85484516b83af&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S4PA2YF4%2F20260404%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260404T005928Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIF4GAod5ZpicTOiOPyABLx%2BnqkAVcIRngp1GOCRHwnKhAiEA5s352WZmBrNNBPxZ3YAOIcvPF57%2FDEPkQMNHxWNTOnUqiAQIkf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDIXgWRc58gS5GxQP1yrcA%2B3Ku2i9WmujeWqEq5XBvdHhWL%2BE8Djk1nqUVDsO8RapKpszvsbG01uPOmFHDtEwzjdYLBWRtC%2BMfWKTgazLyqQz5hxS6h4HTrtSyHZv6dwrRkF49xBaoeuqUgfpp%2FLeF0gl%2BWISnqyK%2BR8Whf1ws2LSeyFL7tM52WPJJyIt4fXb214SePvBzCDE5Je5i16QkBFKAszWnVKOn92BG%2BEYmGnT0LWIhMCwwNYCkjJ7DFYZ5aFI9aiEwFLqsqN7L0oyT7Jygl02Fx3lnhZg9OhjmN4OkhO4JHnII3pbvvkzTO%2FktiXHEdBhoTVFfz51a%2F4VBMG2bfcRLlTBm9wIG%2BPqGpUuG6brPdhrw%2FPwpJDE%2FJ8CdFx1YHKXSjdcUiWAJT80ZbA8y7a0Bkb5XRIJrfackHHt%2BCiJ0hfqdEANPQR7Xi7KazbFWAMmJ5gQfww0is3kheX%2FWwYsTr4%2FnXZ9FjEBuctry79LkJJ1PqQiFjqOJVeyqWgk%2FowElDf%2B7x2BhgPD%2BM7UEA88ci5sWUDx%2BPE36w6sRhbaE7hz9ZREoli0c2n%2F6hAdGADS6XJEPdhdKKiQvyjoYLZFzYm0pOSyDzu0Oq8SsXlqv%2B56VMiuMc5U36SZOG5Fe5N%2BVVvKP04qMLqjwc4GOqUBZVLOeVtN21G%2Fn7lJK%2B0nd%2B0XARgX0FcdBlfY95lnvufVp0KtIWpZHPUEi7SQH7lN1FqTWL6Z%2FP91NY4n%2BYuydPUjejrFy2UblAnE3BRn01TQNk6SISWTKDlXB07jRaUB2sLmhh%2Fu0radLOcJ%2FWOZwIpTcV7djdbH44v8PHxHY9ubHW92a%2FHMTnIrz3hwH7OrpmIRGSVPO%2Bs3ltlDyluV7ADS9ynK&X-Amz-Signature=04fd8980b75d0cb90ea7af75f7c8cccd4556ad6e77c6076b16b85484516b83af&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YQWUQLJK%2F20260404%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260404T005929Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIB8h0cbRW1JKc53seEZikPYVDFZDw8mQvv%2BIe84QegZlAiEAsrvo%2FNkuWQ7EX0QriQEl%2FhKY%2Fd7%2Bde48dllhl8gToQUqiAQIkf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDKBK7AWsjqIZF8AfXCrcA2dPpXv9BVBGKM2FnC8XpkPsOHi3ymB7CetNINVaTxvS6ZBnobdzwL%2BcnxD%2F5QpsRQbu7TsZ%2FosN7a4JOsFUJEW0CgFOIhhRPGz6uLm8s2%2BvVwMyoiyOe6REkfAW24AlrdaXpdmtfez0whEYAxxvLThu%2FpNLVEpSN3H0Mo3fbP8z1zsW8HLYxNZfFjOPA8GfK4ILxXENpKFBOiJ1FfF1cTtS1YbzTchdU5vE5sm1A6FevsVThUAvi1mkLmflZd3pHjR7rc5rkjpkD%2FqBCJFqBhRjqEmw10BjFdECQXdbpZtOtRGIyt0usb3D9Qln1O2TI1VlQqpIH8Qn1oYHw4EiQrDnFm%2F4ZgOts79wAP14E4uWsQMv6ZdjX26eGs8iY2CKStN4lrXCxcjTGQLbtVYnjUxJGn7penonvubQuxIsykZTvm%2FyXb584YK55ZvoucOAMcOZ3V0ElCLYQ0KcvUXBzBGFNS4MaL5IGFlXYiiasGuojEMzq9Ore%2B%2FJbi2bLidwkJ5k9DuffgLsHj99hvB1PM7h5dEBtB1tF43qnph7296zKcfktjZrxcWiumOGxZHcwTr6LbxYAB5qmrcVrlTIQYVypXx%2BdN%2BZttOu61UcJdRIf2Z6kCBy9vdqu9GFMOakwc4GOqUBdX4zXhO3dJJKtb1WGBpeak538067ZDmt6RNJ%2B4q17HzoweuuzBj53MSmAy8Pfg%2FLHHp0qcKSUUpyvEVChdhHUzC73L0PZAtiuZIZRBYHCOpw05NTl6qmA09Hl79NwvbRrwewilbsYtK0sSxYN4tFH%2FETAJ7ne9SLT4x%2BJcEk93uyHyzhvV9fYVFZr2JgvYeI1lda5etbECuHgpV97HqcePs2hxQD&X-Amz-Signature=d81474c1162a9076b89203e1a4453239f4dbeaa71f29930f0c20fa6416831813&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

