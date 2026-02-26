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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TO5YFOFC%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T183352Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGIaCXVzLXdlc3QtMiJHMEUCIEtZ5ElQC4c4LyXVWaO039s0y5U1ZLottZ%2FOr49o3hFzAiEAvtKQkXyFBqJfGfx0hbxNft5hpuo9XJRz0LuFeH4hJTgq%2FwMIKxAAGgw2Mzc0MjMxODM4MDUiDIr%2FqUk2YfixvLff1CrcA2a106AChuJgp4pJxL9Se0NFjeZTk%2FPd0hRtF5YSEe0T23XHMjbi9oe%2BJ2oTfCa2%2BFTmkYizV%2Bz0nHOL6pgeniFpi2V41vwVfmiqMjZVrU8LF1gQoE%2FsbwOcjFF8kgKgYUzd2tPRNlA%2F%2F%2Bh%2Bryp3nYcJ%2BvpnqYEQnWtrUdA0H9pHOTs20nbkTrWIyvRh89QJyJ8dsQHgbemyfkIHcvqlPjuT9YWzbO%2B1Cer7lmPtu%2BkD4hJbfGjsTpE4YNuVet%2FersEVTk3YHRLUuJYdNO3sW0q8BY5KNaO8t%2F8A2hd1h5t%2FsXcJ7T7hCNab4NgcrfcKRRd4KgxcrZH28DWsN%2Fu76nPteM6%2FZtAtumBXdnNS%2FOF%2B8akjIhVnaJwr0qsrKpfMe6K4hpmVMiFhu3HxpZURQ8Z%2BvrAMX%2FSo8BhmsnZvdYjKTvIqLldM6nD1QFqjUQ%2F5r4JbSIMT3RcQfEWX588nki8PR6qrB4Nf9oPjf1icmirqxDcGJSqyN4WxrE4s115POqg1hfsBNWNErjiNm3afir8F3vmO7vI56EflEPg6FvPKMVGpt2rD%2BqT2KnaJDvAUeM6OY9EcOkWLm1AFBMul7wlbHnma%2FzPREir1gk4N0VLmV6YYyJjhIMf6JXRwMPKKgs0GOqUBcgTyVp0xzkV9Xzl%2FIVSX4bAwTQoZD8CAMCCh0f8%2F8IXzm18FG7lXkWXTjQR5IeNVE%2FpWqeBr7wcUJiTfPLAy6FYRaK4ZIM5K7HufnIZcnPAGr1XAAYIG%2FZ9LkSttowujWAVlSK%2FUcd0mmU%2BFqD2hAZoNwrhvcHonVevU4KfHgrlttUtRyCn1SeXx08w8JxD5Qt%2BLJHLJyDGMMKSV0pIkhBBs9BtF&X-Amz-Signature=140dc72baeb4dd0ef51b879d0de72f10704d90033061792419ee23bdb9aff466&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TO5YFOFC%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T183352Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGIaCXVzLXdlc3QtMiJHMEUCIEtZ5ElQC4c4LyXVWaO039s0y5U1ZLottZ%2FOr49o3hFzAiEAvtKQkXyFBqJfGfx0hbxNft5hpuo9XJRz0LuFeH4hJTgq%2FwMIKxAAGgw2Mzc0MjMxODM4MDUiDIr%2FqUk2YfixvLff1CrcA2a106AChuJgp4pJxL9Se0NFjeZTk%2FPd0hRtF5YSEe0T23XHMjbi9oe%2BJ2oTfCa2%2BFTmkYizV%2Bz0nHOL6pgeniFpi2V41vwVfmiqMjZVrU8LF1gQoE%2FsbwOcjFF8kgKgYUzd2tPRNlA%2F%2F%2Bh%2Bryp3nYcJ%2BvpnqYEQnWtrUdA0H9pHOTs20nbkTrWIyvRh89QJyJ8dsQHgbemyfkIHcvqlPjuT9YWzbO%2B1Cer7lmPtu%2BkD4hJbfGjsTpE4YNuVet%2FersEVTk3YHRLUuJYdNO3sW0q8BY5KNaO8t%2F8A2hd1h5t%2FsXcJ7T7hCNab4NgcrfcKRRd4KgxcrZH28DWsN%2Fu76nPteM6%2FZtAtumBXdnNS%2FOF%2B8akjIhVnaJwr0qsrKpfMe6K4hpmVMiFhu3HxpZURQ8Z%2BvrAMX%2FSo8BhmsnZvdYjKTvIqLldM6nD1QFqjUQ%2F5r4JbSIMT3RcQfEWX588nki8PR6qrB4Nf9oPjf1icmirqxDcGJSqyN4WxrE4s115POqg1hfsBNWNErjiNm3afir8F3vmO7vI56EflEPg6FvPKMVGpt2rD%2BqT2KnaJDvAUeM6OY9EcOkWLm1AFBMul7wlbHnma%2FzPREir1gk4N0VLmV6YYyJjhIMf6JXRwMPKKgs0GOqUBcgTyVp0xzkV9Xzl%2FIVSX4bAwTQoZD8CAMCCh0f8%2F8IXzm18FG7lXkWXTjQR5IeNVE%2FpWqeBr7wcUJiTfPLAy6FYRaK4ZIM5K7HufnIZcnPAGr1XAAYIG%2FZ9LkSttowujWAVlSK%2FUcd0mmU%2BFqD2hAZoNwrhvcHonVevU4KfHgrlttUtRyCn1SeXx08w8JxD5Qt%2BLJHLJyDGMMKSV0pIkhBBs9BtF&X-Amz-Signature=140dc72baeb4dd0ef51b879d0de72f10704d90033061792419ee23bdb9aff466&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665LGZZB2X%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T183352Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGMaCXVzLXdlc3QtMiJGMEQCIFHbjUQDLeBZWu4ZXI6fvrQcmMu%2Ft1ZDfY3lJXBESMPaAiAyey64fjODYf9SfNy6XULn4XX5%2F9XxshARUNaHTmZ1Lir%2FAwgrEAAaDDYzNzQyMzE4MzgwNSIMvZslS%2BbxKHFu9HyMKtwDkv1l4tErPz1DcjwmLLLkaOfRK1YeI2781vQrXNC7j8EjpJVlAR%2B8NXjnS2ECkYfRVS9SGZxi6%2B%2BByk%2F6n1kYB7C3IovPzNNFi3S%2BZMixw36dXNnjrF30yEXUHY4CyNyz9lfJ7peb2aMsK7CEDgQ8NkfG8c1oT5n3eGgEgMc91XZMKPDHJb6Ir7M31QSbuJgrR%2BJOaGWydHPsr6om%2Fi%2B595jCoNIY5sQslOfJf2q9SDIIbWqZJyA48HOnk7%2F2dKmSs60fEd0lacJQNI6%2BV%2BVsb0QfVExsxUXZnfMrrs8lA1CjYOXL15XnFjJ%2B%2FZg0humzSNVwdOx%2By5Ivjp0UDz%2BiTTetNmsfUNmYtJ1Lurx9CLAnoAOXFtrINNIN7aF0Ft4EhdNLG6I3zFhaL9rcJh2dCtSIBTBuexmdQmrH8K7tAIgyhpGZMnaJnGVFcoru9FZcM5R7dyaMJ%2BnTqAECb4ZjQ69dJMPKd7h63d%2BJKfFXkWoaVSSqW1XVF32P1awANbSWQ84PTGYd7dqSjsw8CfnXSZ6%2FkkWSIiYVb5UzTXKklTYYEElbHsIAZ3tFfG6WY5Iy4TdJWrkBFkd%2FboI8dm%2BuGohQVC3uWcDPNRAKwX%2BrVBJKVgr%2FcUesjiCeHbEwxqCCzQY6pgG72WBJXOEAbyW3lsJz%2BxpVbueuZzmzsYfjRvhkfTylSOdLLtT5rnG2oXNZSej%2B0nkXOgdYR4ULDX74pJWCygqW00j3ChRoxNh1wse25BMYc1Wd%2F40XtQdt8O2xtsXCUOpO5MNd64LlNzXS%2BiWtng%2F9dVHsJxtPImpyLfkyzjJW3NSUjjsWlZxGpoW9boVG%2BLN3RI2A28vuspB9VR3RsX6i4bWO20Ba&X-Amz-Signature=6cdbe79083af44d049cb010f30827c5a2087074aec1990a6b1366403607d1d80&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QQ735PK6%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T183356Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGIaCXVzLXdlc3QtMiJGMEQCIB6aKxiUumS7Jk0uWlhjSVidiliuWVGDdmwdmVrkW4ihAiAxo3hfHKGXpFnl701JcupwZShuGN3zYrmJQPsxUb2yjyr%2FAwgrEAAaDDYzNzQyMzE4MzgwNSIMKsD85utlgCTlTeSOKtwDgmZJZmYEl3it9Jea1aKUjWqRoa9%2BwlFm3RHhVNy9oAP40siOPvLFf1K9OcfyDWUjsBMWnFxxz2K0hUxKQbfFP1udZKLtz6%2BAKSVb5jdSwBmifZ3iiOKwE%2FYdCSN3x5G9%2BnsoJ4iUzBKS1fssh8RN5jm2sj5MFeUPd8ITUSqMG8t65qkf0raXPxqVrSc8UQ5IGlTqNSdlnQ9ZgS8XbE8YlX%2FMDTbtt33wpFl2GAK8KUmm%2BOiKeLu9UTXOL%2FziG4kgwgUklK%2BwniR2AdhutHXK66EFaZlWES5GssOcwmc%2Bf2gWs2zhlEKvWke41DKsQEWqNAkyevEHyC57M%2BSBYxDJOjRurRNo%2FVk4oGmQFGksDBUmHABYkIBlkiNWejdCB4lnVs3FdY2GV9F66r1hUnRBYCMHwKCSBqqhw1yMss%2FCbFsaYg7zJ%2BaL5qZWQgKHW4%2BGmCFx0CG3vlGar8q6NVCyjAcCpl%2Bpewe%2BVVP1xkJ7k7dmaAghuqpL6%2Bfn%2FeFiENn0jEWNyMOKDFhBooE4NlVqzwB0nYzHZd3RpNQyqI1%2F2sAncAaWczWtcE1HCHx1MHOCRGf8Kj3in7kzxZIrpBe8XlEgdb6%2BP%2B5W0KT39lXUBj51Zcge4EGyqvtm7LEwnYyCzQY6pgFMv6%2BVWNvJFHFjuakSCPDirCnPv3wPJNglekNUTp2aYyciVy99gxSRkDe%2BcswSP4xIvZIizXfApbyy3Mj1W9pvBtdy098Nm30Zd7%2BHZHcm9ZIhct1x9y7cMTO%2FoYuy4i8iHcgTChdhbxS32q7MqSfUxaaP5UEDyfVKHKqgMnwo%2BmxJRghGrbpPlKhaj7rirMErKPgCCbsB8Hy26K34XF%2Bbb0j5ZVhS&X-Amz-Signature=370e68a99e371873fbdd4fbabe29ba26459f8061a946c18f4e96cb4a51cbaef7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QQ735PK6%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T183356Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGIaCXVzLXdlc3QtMiJGMEQCIB6aKxiUumS7Jk0uWlhjSVidiliuWVGDdmwdmVrkW4ihAiAxo3hfHKGXpFnl701JcupwZShuGN3zYrmJQPsxUb2yjyr%2FAwgrEAAaDDYzNzQyMzE4MzgwNSIMKsD85utlgCTlTeSOKtwDgmZJZmYEl3it9Jea1aKUjWqRoa9%2BwlFm3RHhVNy9oAP40siOPvLFf1K9OcfyDWUjsBMWnFxxz2K0hUxKQbfFP1udZKLtz6%2BAKSVb5jdSwBmifZ3iiOKwE%2FYdCSN3x5G9%2BnsoJ4iUzBKS1fssh8RN5jm2sj5MFeUPd8ITUSqMG8t65qkf0raXPxqVrSc8UQ5IGlTqNSdlnQ9ZgS8XbE8YlX%2FMDTbtt33wpFl2GAK8KUmm%2BOiKeLu9UTXOL%2FziG4kgwgUklK%2BwniR2AdhutHXK66EFaZlWES5GssOcwmc%2Bf2gWs2zhlEKvWke41DKsQEWqNAkyevEHyC57M%2BSBYxDJOjRurRNo%2FVk4oGmQFGksDBUmHABYkIBlkiNWejdCB4lnVs3FdY2GV9F66r1hUnRBYCMHwKCSBqqhw1yMss%2FCbFsaYg7zJ%2BaL5qZWQgKHW4%2BGmCFx0CG3vlGar8q6NVCyjAcCpl%2Bpewe%2BVVP1xkJ7k7dmaAghuqpL6%2Bfn%2FeFiENn0jEWNyMOKDFhBooE4NlVqzwB0nYzHZd3RpNQyqI1%2F2sAncAaWczWtcE1HCHx1MHOCRGf8Kj3in7kzxZIrpBe8XlEgdb6%2BP%2B5W0KT39lXUBj51Zcge4EGyqvtm7LEwnYyCzQY6pgFMv6%2BVWNvJFHFjuakSCPDirCnPv3wPJNglekNUTp2aYyciVy99gxSRkDe%2BcswSP4xIvZIizXfApbyy3Mj1W9pvBtdy098Nm30Zd7%2BHZHcm9ZIhct1x9y7cMTO%2FoYuy4i8iHcgTChdhbxS32q7MqSfUxaaP5UEDyfVKHKqgMnwo%2BmxJRghGrbpPlKhaj7rirMErKPgCCbsB8Hy26K34XF%2Bbb0j5ZVhS&X-Amz-Signature=0fe67d3fbea5504ec93da371ab330b50e39549c24d44d909562be00159dee5ca&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WY2JADBE%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T183357Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGMaCXVzLXdlc3QtMiJGMEQCIAD4%2FwrinUpDbjAE2md%2BdYVQPkxeP3glEAb31nkYAF78AiBVMR3IGM7PLzXxKDtr8La%2B5VbsQscE72WRuuUj0lQFYCr%2FAwgsEAAaDDYzNzQyMzE4MzgwNSIMeliLFp4YMPcekDyPKtwD1i%2BhBK%2BrPCgedPRrxO6ynxc9tg92RNBrnqSPWDy9XQESI8yqy6BnO2MBd7HeQLpcQjJYnUvGLAcWSkxCyrLx8YP2Yt%2B3aTo26llryXk6jsSkj1gYRjWS3F4kn5GXQ0xx09LEEq8qJ2zjlw8osALjqoEL2yW0rErTaK9o5osAAM814C8VN5bePBLcPfgeyCeTMyHTKdW9CBD%2Fh66nV8fWKt9HnfMlP0IpIl60g5QlDzvGd1Q5dAR0pQxiQG9ud2jafO%2ByDZwpZLB5C%2BRe9%2BPV%2Fi%2FkkkSyFORNyFaCTR%2BRUUqMGPxcJrPxx8InFgdA7g9SV%2Baujv2KUuEZl%2F%2FAcEphfZP4XVrNWmgLmmfg2Hcx%2BTTIax%2BhTbKWqEQetYMFcM%2B9SmbBkugjOO5pY1CR10DNCb4qQqOg2I6eONMGNnksKXxA3t%2FwxILCiuTcYbAxTF6oHX8vcEdiLqBOaxLp5K8PHtU4LMlb5rKDsVG%2BtL3IOj30Ih5OBJs5rbGEVvUOu90chPJUH7UGgYey6SwMzEtNYXXL7kANVbNB1sOZIrAzJJqymiECG3RCxf6pDdRRcJVWDHGSri2Ga%2BQ7%2F1doIr8v3dazPotW6DIJhIH4h6icuuwYMGtPFhT12gqyJ4QwxKCCzQY6pgGECsmgvDRWQExeG%2FnyIcGGkDIe0k%2FXA1LdYfvJcr3EQYS48JbfLMpJBWCBCkQoxcrnoXWOvoV6n5wTjyyZFJqPp4M8dMgd7eEScykQCyvcNKxgEZHLWPjNI3nMpXYZrXmU6ZSg%2FZvLw7ehmSYBSwSLRX0Y9yVOfZ7dsDr2EAIbOytVU3GDY3LPCbwNVYAvYa2U%2BDuCpJKedSnbMgsWnlBfcpz9w6gW&X-Amz-Signature=07d3a15377be40ba11360645823a7773bbf465dfb6115b5f61ecc23a4a0eb61e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SJ6JZTEG%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T183357Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGIaCXVzLXdlc3QtMiJHMEUCIQCPJWGXpkMZZc2BrjvFtkTp4Jlv4qe%2FlmeL7lG6Ayk34AIgL0bBFyoCGwr2XhUrJF3Ij10j1hvbu6nvw0tq2OjKuPsq%2FwMIKxAAGgw2Mzc0MjMxODM4MDUiDBWqA1PijypCC3Cu6SrcA%2B6axCRWbAF1KBm756KsIb2zYGwWSQV5XwMpPVFkT3tJGFZdXgSEqykQh4dG1w2kfOaN9HBI6DBM8jMexXRFTqbxkb7UJ5tPtqA7hiPLDrGnYJzdI5i0GzYDM%2FSX7w4D4nzuuiD8DfT5IFUH8nPm7ihX5DKzZbt6sdrSm7nPqkE0dncuVtUEmOIERPaxoIb5lxz0TA6SGxw37oZs8sxhl%2F5L0dpfPB4PRXSYkFprPlOxXqgKevdLApITw1rFMItVaa%2F12THB4t0p83wJ96ja1zWANAsfe9T8%2BpAH%2BsM7nI2uY12JitBamLST8kqb3zQ6bJXUic4X%2FkCPT6ewpSMHUBWFStpLjywt6iB4saaGwNgHnd3pDbfAes7dxoiQIf4l8%2FfcFxmQZ8qhIEJ1D9STNKCu74UqULKu2TlmEyMbP%2BpEWz9VlA9xCuMbt%2BvGF7fIBA%2FXk3JXbGUryKRPhBq31iSngl9OlaBX3fj75oMUQMMlQTMT0ajenPNB%2F03yiBv0g1iemRlahbEvs5YWtxsiytmTEyyC91Noe5DUNGMul9dHDz1h027oIddzJdEB6xr4zKu%2BVBZi1KgalbR4IIDXFUL463%2FZ3WkIbwxIJOHi7BzuovWqXAMQ1Tz6U0ApMNyLgs0GOqUBWIYSpnyo070c3k3aGAWWMfmoANI9YjeGC2PEOrPonPEHzE%2Fm69Dffglhz1Jtadq6we2eHYhUPsgrTbaeiABsc6zSV9NGPtlLHAmNPXCvMu9eRdjo6LwcPafE8LqE%2FAnv%2B0QA4g3MPVIv3mjAldvmu4e88TsDTFyRL22P6RUEtHNU%2BaRmnQ30bKygeHlKsgRX%2FaSd6y4zQi3KwkbFo2bnbP5D9iwP&X-Amz-Signature=b2928b84baaa5171a99f08c5f67dea2662127192f4287eec276277b42f49409f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TC46EIAL%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T183358Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGIaCXVzLXdlc3QtMiJIMEYCIQDnEEfiLDEC9%2Fj0riW4xBYqaWY%2F2NNY9mBmCY98%2F3%2F5YAIhAM6dqBMgLtNzewD3fM7aj10YzE5VF4d%2BfLGlKBzzr81FKv8DCCsQABoMNjM3NDIzMTgzODA1IgxBVu8pkQIrXmcLCPIq3AOYrE0vCsHmKvVeeUDzT1mxrD4yWCsXOJx%2B7vlrva50UWLq7dGbrMM8qy8OEaYmxyIZoqQgSkazYkEURM9Ot1RzTUzFo1EW5ybTV5Mwuq8dHXDS%2FHaEMOeajom%2BKBpO%2Bgp5zMiWdfsJEV6FZyWixa5E1gnig7GuAAFExZxTBVcjZiRaFT7wp0RlSRvH6QwOhPES9UrngN%2Fiw%2BYePSd%2FuewQ4e%2FIH0gyk4ueGs2sKIgpfQVAcIswtOOybrff991sCrBqe3WKxT0oHSkQ%2FkDGbyE2CywniR7lQ0wsL9UMqNddNQXCzd0a1sWfew1ZklIxxZ7MzXOd%2FGnakllrxOQbMx00mdNyN3CkiVDyjgHbHmNKz4AEK5%2BjrWb%2BaVmh7Lmj4TsRUfHxaedxHCey7GioKpTz29b8kkqfS65zVRnAHQqd%2BVIsLPj1uK7%2BBimsrmH%2FyN8eyyuRVITxfO7d2qmNswAlMObojF0zhZBa0PZiPj1SWTK14z4Oj%2F%2F9V2NQPIutPZH60kwgWRyhaWRrYgwd3iNZP%2F%2Bt%2BAIqZtRwNtwT4r5ElNinh8OphhlPXhhzVIkUA%2FcYVFoOOgfwp8dw1V098%2FbMIlwXLpRITlKOcnzCoJYfr0N4XgbpgnQRGwzWSzD8ioLNBjqkAST6w0W9BmAHtvCHNQS62wfhSJJXcIoK8ENs5VW8JagPrTULu7QJLH2hWlwpL6vH2G1W8SKxtqnAyeR8kuzHbNGVOzmKTuD8YsS5%2Fl3af%2F6HzrsvYYJJnqM8g4Uee%2Fv9NRXnBVjJSnKcPic8l6%2FMJNjpwjtehlh0AXinbkjy6FSp4ZjjQdM6JZOZ%2FLfgQWjP7sToC%2B9DFN4ZqTiG4mpDPrlNlv5N&X-Amz-Signature=38ef4aa47d296d92a3126be78a7fc609ef0a80656a05d2c2a0aecaea5b723fca&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TBWNZAGQ%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T183401Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGIaCXVzLXdlc3QtMiJIMEYCIQDTbemo%2FRcp85sue5s7n8zC5VfH%2F%2B4nR86lOvy%2BIQt1tAIhAM8rjb%2B6yGO9p994YHZ7dUrl894B7w4WQdj8jVtJzpQdKv8DCCsQABoMNjM3NDIzMTgzODA1IgwBnD2OIqEc%2FOyRYc4q3AMWJHgVfuTp8%2BMjRksb5Kq%2FgFmIQxoYIgf80XaMqCv%2BH52Wj%2BatVFOfv06J0VuhqmBHw%2FO2%2FJx14Apy0ZOlgBjzOv4%2FSUczHLBjeiA0tiyWHV8kAW96cXwFxz6nk3jTB7DmuJgMtofEwz3j6O8BQuEVI4a49Cd5TMsWgKzn0RnJrda9a1nx%2BKHpkfPXPH0HWBX3%2FwfnOYh7R4OmEVXFjlNVLDPjkgjWSJ5K7y8iqYPggtLdajwr9iLfGeiFz4UZL3N%2BFIhQKrHt44liSCDJx4AGS6uue2HH7FTgiZZy3NptVlDCpDcykfeazkZp30CHMyvQupF3vDxM8e%2B%2FSOq99CsX8y5fXEzBUNCCQtmaGMaz0JbYHNQD9Ubp5e0QNeH%2BmE8wBXOjPaE8tiv33s9TcZbOyW6srBYP07WNT%2BDPKN9BBoeoVWEszEmUwaGopOS9uRZ5IMgLizJolG%2BbMrnpnx6v9Cvm9gw4UV8vw72n0g6knEphBC7D0KD4TESFLd5WrLlglmSLanuzNlKFw6QaS9SOwSjv0ypnckV4ucHBl9dafrvgTZynuqhDetKvk7Yf7z9FEVZ7b7ZVEDDCW%2FDePX4BZFCmaP%2Fswq271IMteznPqAHEaLekb%2FEoHM0PGTCKjILNBjqkAeA%2Fd3s%2Bj3NCJoPNIQH%2FReXPpByvnxQswV%2FJzag116UITCDQI%2FEw%2BzqlwCXRrXbCbfAnjcNM7m2%2FEHFdjo87nlIUv0rc%2BL%2F7VvwASZahIzx%2FJ3XvT51UXkMmSXOcbp0xnHZIiZdbmweomrFbLVfOzFN%2BCb8pbD2OMnkPt%2BO17jJbABbIBMVbMMYT13eVvSPgkSlOjwP9MUTo%2FJ5EyVaxInbE11uW&X-Amz-Signature=6eb3e14f177596a3dd588d4ecc56f00b94079ecc994e8e9a3c1aed369e60d54c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TBWNZAGQ%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T183400Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGIaCXVzLXdlc3QtMiJIMEYCIQDTbemo%2FRcp85sue5s7n8zC5VfH%2F%2B4nR86lOvy%2BIQt1tAIhAM8rjb%2B6yGO9p994YHZ7dUrl894B7w4WQdj8jVtJzpQdKv8DCCsQABoMNjM3NDIzMTgzODA1IgwBnD2OIqEc%2FOyRYc4q3AMWJHgVfuTp8%2BMjRksb5Kq%2FgFmIQxoYIgf80XaMqCv%2BH52Wj%2BatVFOfv06J0VuhqmBHw%2FO2%2FJx14Apy0ZOlgBjzOv4%2FSUczHLBjeiA0tiyWHV8kAW96cXwFxz6nk3jTB7DmuJgMtofEwz3j6O8BQuEVI4a49Cd5TMsWgKzn0RnJrda9a1nx%2BKHpkfPXPH0HWBX3%2FwfnOYh7R4OmEVXFjlNVLDPjkgjWSJ5K7y8iqYPggtLdajwr9iLfGeiFz4UZL3N%2BFIhQKrHt44liSCDJx4AGS6uue2HH7FTgiZZy3NptVlDCpDcykfeazkZp30CHMyvQupF3vDxM8e%2B%2FSOq99CsX8y5fXEzBUNCCQtmaGMaz0JbYHNQD9Ubp5e0QNeH%2BmE8wBXOjPaE8tiv33s9TcZbOyW6srBYP07WNT%2BDPKN9BBoeoVWEszEmUwaGopOS9uRZ5IMgLizJolG%2BbMrnpnx6v9Cvm9gw4UV8vw72n0g6knEphBC7D0KD4TESFLd5WrLlglmSLanuzNlKFw6QaS9SOwSjv0ypnckV4ucHBl9dafrvgTZynuqhDetKvk7Yf7z9FEVZ7b7ZVEDDCW%2FDePX4BZFCmaP%2Fswq271IMteznPqAHEaLekb%2FEoHM0PGTCKjILNBjqkAeA%2Fd3s%2Bj3NCJoPNIQH%2FReXPpByvnxQswV%2FJzag116UITCDQI%2FEw%2BzqlwCXRrXbCbfAnjcNM7m2%2FEHFdjo87nlIUv0rc%2BL%2F7VvwASZahIzx%2FJ3XvT51UXkMmSXOcbp0xnHZIiZdbmweomrFbLVfOzFN%2BCb8pbD2OMnkPt%2BO17jJbABbIBMVbMMYT13eVvSPgkSlOjwP9MUTo%2FJ5EyVaxInbE11uW&X-Amz-Signature=ab3ecd74c23f1886ea9172d4464abf4f8c0e719f2159904bbeb5dc4a41bb2bc9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QF5MW3I2%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T183347Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGMaCXVzLXdlc3QtMiJHMEUCIALeZvYHEyJCrkkWAoev%2F2KV4Kp4xNnT4qVaAD48FapDAiEAvjueCCbg5dz0d7b8maUteeidLTNdB0JjyQ12bTqwHpkq%2FwMILBAAGgw2Mzc0MjMxODM4MDUiDDSXZwTDuWsMe9cMLyrcAzp%2BhenIxbsxdEwTTEi8aMfsiqgBy4sC1L6zdaOf%2FYVUkP3yahTbSLUkqRGpgM2UoI%2FmMJeTuRXk37GzO70b7f0XlWMcznuMoVAFtvGNAsC%2B4%2Fy8DO1cXhEv6rJrpUYMW9%2FDCBZfbwPGICvqn9Qfq11LaVAdqcn45PhIaNA5yLdTi3Hmb2aCqKp5Q%2FbsrO59KdlnjoxxvVNs4oskHcvzPXpQi404IlbCq0PA0pvLxXw0Ej3vSCdsL%2FZmbjLQYBpNR5JmuCMtSgM%2FZLprE77HENsFwnw38HJDoLLBIeOZPaXdV4YNaTixOuLXQtpGp%2FyLUbZDoswtHqjLhefOxeayRxjAu%2FvkmDCMvrhqxJoOMc3QwJsu9XWW2jtHGeKjgrg8NU0qb19NqHvVC4CLgRI0fjKbjmdHLgOI5BbHH%2BQg6SC4BhurarfPhcLQScQ9Nhar3ZHhIieYCS4Kh6LKlFDNSsd4xc9BHC8XuCFqSLW0tqD4z%2FazaCgYrc6KiSLBo3W1KbmqX5Ih8BcuuDeMMBYayPj7sSQRLeFrWjHHfbT6120gj%2BjQCRrvCyDAq93vWAePXP4YfB3IEAbCTShC%2FWqecYV%2BpA4aUQxdEFVUPpd6KaWdCgNBOYbdNUdwxZMPMLqggs0GOqUByBWoz2%2FVjsRc7ARTlVuNN%2BrVS2NXBkxD%2BjpGbslXTN%2F%2FxfTn5Mq2xTqjWdlhRp%2FXe29EJfFNg%2B3C%2Bz8JSRbwAlh6SlSaLl0%2FxmAp3E3h3woKhV%2BoQ2Fd6C%2BAaNV4jYstNJ6BAv1%2Fel8HzB1LHRf09JB3Ks1Nz66DEeiX0n6%2BfxLSzkq129E6Z2FQlNKN3FHIK12Zee7jz4A1pyT4iRUlEpjC8VEf&X-Amz-Signature=f026f3bdbb829434d1475abaf50e9351d82693c47a30bfddf8ac94644bfaab46&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663LJ6NQGG%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T183403Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGIaCXVzLXdlc3QtMiJHMEUCIQCLgiy0noztfn2ekszqMclshsyS4ytpbHNbBjNuffAyeQIgL9%2Bm0tygxJEfQSY43WOKs0eci1N79sANs5w8ebnVzOEq%2FwMIKxAAGgw2Mzc0MjMxODM4MDUiDKeSl%2BpUlE9k45kEbCrcA1szxTDueRZ5V9MwcFiR5rIOMv7wpyvOC6Q2BHAVE4F%2FyrA4cJzNVE6BCZ%2BS9%2F1awA0zLI5MWYUH%2BIe%2BH4aq73HCHrjtP%2BuvCavTQix91SMGi3DfMW4RrStKAUYl6XQmJQ9al01Gv72GD%2BK70y%2BbI%2Bd80Ukj77HMLagtp2gJWY2uOa7mkRgt%2Bbg1x6sMHTOgKPCENS18GDkxaqIQ0T0jz99zmtLokrEG%2BwcDgoRdcIRto1mgJR1zfOd4RktuLStpp%2FFq4vnN87vYSapO%2Fin22GN%2F6qY4qAGWj3ipH24swXe6twf1OO%2B8W7GYadbhu%2FcU6akQc7%2Fun7BsFGAYB3JqSQsssXeI%2FGz4pLc08apEXEO2Qoj7GkwsVMBemQThqK1z7RsXPAfiCEsNhHZu4dI9PoJlu9berkk0QVQlnbWxomXZScbH4s5myTRM0fRSYcXU7q8%2BR97RiX1TesIeiXR87Cnif3V7fJCqaKsAkEnNVX39ke%2F1LFgBt7v7EdeI8VMja%2BX4FaQVP2ykb1Jdpal28hbxHc3e38Z3i2hW3NMoeoR4VGNI%2Fbe0FsX5lpFy%2BCTsuTgaGErtGsZEDmmr%2F96VVMpTX7Ws6uDwtptADGd4bTIzCOvY%2Br98rH8XzvyKMPGKgs0GOqUB1xYQpmg%2BZnEb3Dky%2BPqeVL40bVJnlyBYnBCuTSBEI8iE1Oyv16brqfphtj19RdgZDu3oXJF2dIXQTeHIK6FZiX2y24jh85PxWrsw8IRuKj6ntJBENKszXw8LAQscXgFbYzx9cm4mSkPzjv7dE8etObbcLUEKroGHhTjQCm8i51a9231YeNP4cJSU0VHTxJjtwVYWpNA8TShpM%2FkokCv4KtMeryq2&X-Amz-Signature=f82fa5d3b435e2d0707341ec3f8e278e071cc715321023eca16e556f47f299d3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663LJ6NQGG%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T183403Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGIaCXVzLXdlc3QtMiJHMEUCIQCLgiy0noztfn2ekszqMclshsyS4ytpbHNbBjNuffAyeQIgL9%2Bm0tygxJEfQSY43WOKs0eci1N79sANs5w8ebnVzOEq%2FwMIKxAAGgw2Mzc0MjMxODM4MDUiDKeSl%2BpUlE9k45kEbCrcA1szxTDueRZ5V9MwcFiR5rIOMv7wpyvOC6Q2BHAVE4F%2FyrA4cJzNVE6BCZ%2BS9%2F1awA0zLI5MWYUH%2BIe%2BH4aq73HCHrjtP%2BuvCavTQix91SMGi3DfMW4RrStKAUYl6XQmJQ9al01Gv72GD%2BK70y%2BbI%2Bd80Ukj77HMLagtp2gJWY2uOa7mkRgt%2Bbg1x6sMHTOgKPCENS18GDkxaqIQ0T0jz99zmtLokrEG%2BwcDgoRdcIRto1mgJR1zfOd4RktuLStpp%2FFq4vnN87vYSapO%2Fin22GN%2F6qY4qAGWj3ipH24swXe6twf1OO%2B8W7GYadbhu%2FcU6akQc7%2Fun7BsFGAYB3JqSQsssXeI%2FGz4pLc08apEXEO2Qoj7GkwsVMBemQThqK1z7RsXPAfiCEsNhHZu4dI9PoJlu9berkk0QVQlnbWxomXZScbH4s5myTRM0fRSYcXU7q8%2BR97RiX1TesIeiXR87Cnif3V7fJCqaKsAkEnNVX39ke%2F1LFgBt7v7EdeI8VMja%2BX4FaQVP2ykb1Jdpal28hbxHc3e38Z3i2hW3NMoeoR4VGNI%2Fbe0FsX5lpFy%2BCTsuTgaGErtGsZEDmmr%2F96VVMpTX7Ws6uDwtptADGd4bTIzCOvY%2Br98rH8XzvyKMPGKgs0GOqUB1xYQpmg%2BZnEb3Dky%2BPqeVL40bVJnlyBYnBCuTSBEI8iE1Oyv16brqfphtj19RdgZDu3oXJF2dIXQTeHIK6FZiX2y24jh85PxWrsw8IRuKj6ntJBENKszXw8LAQscXgFbYzx9cm4mSkPzjv7dE8etObbcLUEKroGHhTjQCm8i51a9231YeNP4cJSU0VHTxJjtwVYWpNA8TShpM%2FkokCv4KtMeryq2&X-Amz-Signature=f82fa5d3b435e2d0707341ec3f8e278e071cc715321023eca16e556f47f299d3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WJEG3IVT%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T183404Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGMaCXVzLXdlc3QtMiJHMEUCIQCaN0N0hIGB9lYUYlyRmGIvtHryDaOGJreTtfcJX9t%2FVAIgSloUmeZiy6f5xI1K%2Bx0XlWXt63sxGhMYmbZpgvn9Q5Eq%2FwMILBAAGgw2Mzc0MjMxODM4MDUiDN%2FOF7svOzuDHDgBqSrcA974exfbaxEp3mFxqQICYkOOYft9sfRM6%2BcDdKIs8A9RBq%2FuFysJH5%2BZpulLrIhUiJpcRkd90Q%2FOEnRXCUD2zTd%2FKrPUFnH%2BVIYt%2FL3foVTepr3lpGtpKz5%2F9uh9NTMYBWrMbS181dpID9zTjgcUpLBx3lYwKgJdJoHhr57wJqn6kDqrIouAebIN3GZtTzI8GRIs5S9LXj0gpNaB%2FKQHp48cPa1VN%2FYUH2ECPN52RAOnr%2B%2B2QAemtP89QwVJ0BbampWAUMa63CfJ%2B6uyn8XJLe1Qg0iTiiT%2Fak%2BBDk0tyNRGP2FPX4d6zPhs%2Bsb41x835TaYZYi08qsw6lNGIR%2B%2FQ70rqYoUIvUEoZTAflvoi9DJgf%2Bdlr1bGm9bBx4xeqqYRd7bcmULsk9QU9%2B2UlYe1I7yEHbwj0b%2FWV%2FIx%2F2pVwOHVJ6Uq1m7UEKbHJejf0JYom9Eio%2FGtM5weXo70jXJGtKd2hZrSJLXnlMV4n26BTNEfmZXUs%2Fno9hqgBjwmglbppokxu9QON%2FXxSGQAg8IeebQcFfgbupkC3SPxCzEfnZ1A0WIzKvdrZvb0kCit%2F3gof3%2F1PL2rmm472gBkw4cSo6nuN%2FEETX3XloBoQM3jsBlBVWfQ%2BAwVneGy15lMIqjgs0GOqUBSNXQsAz%2FfzloN69N6DDg2y%2BrMd3BfB2yAyWGntg0disVYsT%2BcX3IDomcjMnP9gYloGyqu%2Fw44wK8Sxr%2BgTH5Odr4PlRMC9NfpjHAXER9R23fG5MUFUoCrPDIjJBrbdjZVRM9urBiUSUUb2nKghVMVMgPm3G%2FLxDnl73sHIHcZ8s84heeo9y9%2BsPn87USZ1zdLl8DFvsZbnmzHHpJqWvR7kwerTyl&X-Amz-Signature=461223b19363ebf00ba2ab00a8da0e7df1c354ce7715e261810ff0da390db672&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

