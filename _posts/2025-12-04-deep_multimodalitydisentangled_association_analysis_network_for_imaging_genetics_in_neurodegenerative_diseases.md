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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Z73CP6GN%2F20260324%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260324T005403Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCxmFqnTrTmQNsHq%2Fyx%2BjvNyV99zfCslCkz0WxcdDVFkwIgN0ndtLSEoH6R0ryYUtwtSfJDhC%2F%2B6z%2BJnNATPrSRpAYqiAQIif%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDDA%2B5oV6GS%2FmvBt2JSrcA7N%2BNpYwhMOX%2BSIW0eKd8g5YBweyT2zpe5TJETEcKcXCbVZvBDgL8th6B6Nc3ZKXmhnZvkH%2Fp5rtGTeWvQEIOnt6x2K7s5U8UABIJVW1vQO%2Fmphy3EMKFivYYXyKWjf0wVBw0ce%2FzoXO%2FvCuVUCWVMlxgF7iKH2ljMJRTKMeBCEe5CnSxXDm1VEvnZOgS%2B9UxQBCxARXEVQY6DLGwJPblfLMgYBSCtnmdkErZq4mIXK%2FyZ%2B7HALZrlrw5ZxwuxPbO%2BPcUTFtBjyUVH508XwrwViu9Fx2BUeBQBFRcmBmT0W2npiaL6XhLiV9AoSEGq9b8OFOaXYP3plDUOXHeJ5NBJhc2oU60ly0zOXJo2HZB4K5nGIWIo%2Fm6hdG82TyWn5xOYiXwlEDzNOLj%2F%2Bdg6KRhxRyVWcsYP%2FC8DPXDwleUjnJYXAypFIE5dziHp0w5ed3jNbBBpERL1mSsmPrrZ%2BQ8NiazoSPKxGLQQPLwUAuBRDlJ3ODLYdwbVcoifdSp4yqgvVKf2EjSNLdTHp7JcWo9nQnrg%2FnR9DC0HITNQfl%2Fm4OB7G0A1WKjZh7VzQIHRDJtoxai5CQ3JJIfiJcec3CdzPOa8IhWZYs%2FdaYqEJsLDGg%2FzIpwF3av%2FgweDQeMImph84GOqUBum1%2BhA2xuJIfaNPi7PSqlDHRAf%2F6jUlEb2ylxkLMIfGJR6q2uzMAmVMSDlaqmSpLO%2FdgR3jrXRixs7iVtFKYfs%2F6t8QUjOvjJPOlcn2KHI8PPTFxTBLaOcHwHm7W6mdEvtpRv%2BhaAGfC0mrJeZYesZ6Pfkx1%2FxFLTxzjDq9XOBEDmutY3iYSiW18bz5rDeaX841TKEH0ZQsz2%2BnhNEZtaBiNvvaE&X-Amz-Signature=90bfbaa23dd380d61ebb0dd7ad045015955a8a9fcffeef38c028a86b56b58e0f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Z73CP6GN%2F20260324%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260324T005403Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCxmFqnTrTmQNsHq%2Fyx%2BjvNyV99zfCslCkz0WxcdDVFkwIgN0ndtLSEoH6R0ryYUtwtSfJDhC%2F%2B6z%2BJnNATPrSRpAYqiAQIif%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDDA%2B5oV6GS%2FmvBt2JSrcA7N%2BNpYwhMOX%2BSIW0eKd8g5YBweyT2zpe5TJETEcKcXCbVZvBDgL8th6B6Nc3ZKXmhnZvkH%2Fp5rtGTeWvQEIOnt6x2K7s5U8UABIJVW1vQO%2Fmphy3EMKFivYYXyKWjf0wVBw0ce%2FzoXO%2FvCuVUCWVMlxgF7iKH2ljMJRTKMeBCEe5CnSxXDm1VEvnZOgS%2B9UxQBCxARXEVQY6DLGwJPblfLMgYBSCtnmdkErZq4mIXK%2FyZ%2B7HALZrlrw5ZxwuxPbO%2BPcUTFtBjyUVH508XwrwViu9Fx2BUeBQBFRcmBmT0W2npiaL6XhLiV9AoSEGq9b8OFOaXYP3plDUOXHeJ5NBJhc2oU60ly0zOXJo2HZB4K5nGIWIo%2Fm6hdG82TyWn5xOYiXwlEDzNOLj%2F%2Bdg6KRhxRyVWcsYP%2FC8DPXDwleUjnJYXAypFIE5dziHp0w5ed3jNbBBpERL1mSsmPrrZ%2BQ8NiazoSPKxGLQQPLwUAuBRDlJ3ODLYdwbVcoifdSp4yqgvVKf2EjSNLdTHp7JcWo9nQnrg%2FnR9DC0HITNQfl%2Fm4OB7G0A1WKjZh7VzQIHRDJtoxai5CQ3JJIfiJcec3CdzPOa8IhWZYs%2FdaYqEJsLDGg%2FzIpwF3av%2FgweDQeMImph84GOqUBum1%2BhA2xuJIfaNPi7PSqlDHRAf%2F6jUlEb2ylxkLMIfGJR6q2uzMAmVMSDlaqmSpLO%2FdgR3jrXRixs7iVtFKYfs%2F6t8QUjOvjJPOlcn2KHI8PPTFxTBLaOcHwHm7W6mdEvtpRv%2BhaAGfC0mrJeZYesZ6Pfkx1%2FxFLTxzjDq9XOBEDmutY3iYSiW18bz5rDeaX841TKEH0ZQsz2%2BnhNEZtaBiNvvaE&X-Amz-Signature=90bfbaa23dd380d61ebb0dd7ad045015955a8a9fcffeef38c028a86b56b58e0f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466437CTNDF%2F20260324%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260324T005403Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDma9I4iXAPhy9z4UnqiTTDmd1ZWOvqTaYjS9sJEMoapAIgQoU1YOzeQah1ZWABFvmCLCXgWhnL%2FlQddt00aFLY%2BFcqiAQIif%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDLUXimvYyp0pAOgipCrcA%2FGpMrcOV0Glmcr%2FMOYwg0uL6JXR1G0JxdiAPghFBxtSut1X5I6uekcQPy789B3f2HOdPhB0pvISlqx4RRKKhd%2BLC8ZoRzMA7wz4TQhm7ej6ptTQecklD%2Fr0b%2FDvRZANgFxUAzt%2FzXpyRhVejnoRTB3qwrkVoD7rLiB4tNYQH6%2BwXbjAElKPPwDU83ivs%2BcFVbw%2FByCk7s7fUBhfhLlyzXFCM2RO4kGADhRbOUuOqneLchuEPE3s2LsGizzN3pKHowZO2jSKRUWvjCE%2BW4IGMfLE%2FdTImcZPRV6lixxsQRyYS7IY2m6Uvx3Ui7ATguB0uuSKob3ej8WvthEe2zEGv24UToEK9wXtlaZlpMbPkajfVwpx8Sn71WdYGis4cwWRnBXNx%2B0KHPsgAnGNMGmI1piBSxzMrd4y17EkG%2BsNrt%2Fu0aVfylFnTqh31DGZsXrPOq2C4ICYAtu%2Fs6sXgU5BR%2FjeUiojpi0DvxX5kMVeGukNmUR%2FBbfmRH%2BaU1AfPHUN5KI2MtNEZexoc2q6coQsnV9TGQlJ79J4wyDhQb%2FxBhDeFI25kWK0PsEWkrL%2Bt8v%2F6NXr%2FokLjPXJnvILCTlrCmKDyVihIDcRMufOz4m%2BL8bLhk8BnctWTiWKkeTdMPyph84GOqUBqAe0z43rvcNOgICxFXDd3UhUT2ifrX997AQw2I9S3GMYau8Jq%2B4Kcs312wMdwnGftU6XSC1q1VAlQ4vYVNZm3tq3s88p172nkrdyGl3lfobTWD%2Fe5IMmzq33zlTu8AWgjoivk7gPcuAG3meCDZqCAH2RChbvQwTSg43lcHpE4efiVfMBIl7JiOFtSV5xOq4bieZdU8OrPG7Uo34jiBzDNNTUPbNc&X-Amz-Signature=baf6fbf47f70540b511e08d40e451dcd7e5c2c1c67e084fd1ed1f43f39f9c20f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XDCPMU34%2F20260324%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260324T005407Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCWvZ02r%2FlLPLZV%2FTHiHZByk5nqeEl%2BClqNQNZHplBhuQIgOTgoUQYWy92J1u4Ee8%2BQplYdEK4jOQDpGNXXlcgREVQqiAQIif%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDHdIHhLUWKfXDpLD2ircAxPVdKJgghT9fSfuD3LVrWO28Z827ycDQ3l%2BGqo9TmWUabKLDUPueoB5gQNDVz8UU4GTHo4QxoZtJ%2FNG0vqOEk7CrscPDgFAvnmBufDY4bb1iyvC%2BlaEngY3QI0RiNdKaDKv6kwP%2FfTcSqhmYw2uAu3jP%2BxKcu8Y9XHtaR4WIWo3aN2PzQ0P1ugEiOzrVZrCDBPhwq0FbpFXdL2fnZGbExBAkzaGLvLUEXXKFM8L%2BJ3rTdEj%2FbKbqBru4oRi3GHE8%2FoUUm0RZ15TjkL7%2BbWGzhPEf4aNMzuYc8pplRxBksIWO1Iyg6FlBEAchSBbA3gGbB3epfSA3vuPE6ZMKLa%2FPBZGRBAdy5JDlVXzNFdFlmqtxClN63qciH5%2Bl%2BlywrzEB8xN2tMPtJ3ki94GNhOMHt7dSpnpbcHBzd1JlWxC5qFzT2PP1hDmtkiJpPR3LHRa5J%2FvIarUqp%2BKNDSRohyEJ7RE0ANNyJ1izcXlfvAZH4sZxT5ho1OA7Ju1GINgHhGweBM881kYfGYL3XgbyYQ3KCAfKQ4%2F3zmWMHGgPIGqd9fm0Oxo60Ivp0fni%2F7ZVFVVamEImRidOgt4uHKoAkstbxxap2EDYGoND1gP4Kh2Dx5qnZSp781TpqVsnrFEMPGph84GOqUBUZYcn%2Bds7RKQbHW0nPEpHzFofS0%2BjjCnA8oKS7ePAeCWSOVqdUmRTPuWb52Wp4hU9sIrKkJFQLNdcovGgp5SUGMmQOoSxsGMX0AYdz1tcGTNYvoKW99C4fB4hCfe%2Fzumvl0pzD2WcK%2FTLBGqgtdFc%2BXYeAfLJMiG64DrOBXbwdXF3exDlo0HLEebwtWcor3UeOmrQdVaVCsLPfL3COueOZ8UdO1V&X-Amz-Signature=aa76f6ed25209fe64642023669c51e8b61449966427260e53936e7851500e8c1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XDCPMU34%2F20260324%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260324T005407Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCWvZ02r%2FlLPLZV%2FTHiHZByk5nqeEl%2BClqNQNZHplBhuQIgOTgoUQYWy92J1u4Ee8%2BQplYdEK4jOQDpGNXXlcgREVQqiAQIif%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDHdIHhLUWKfXDpLD2ircAxPVdKJgghT9fSfuD3LVrWO28Z827ycDQ3l%2BGqo9TmWUabKLDUPueoB5gQNDVz8UU4GTHo4QxoZtJ%2FNG0vqOEk7CrscPDgFAvnmBufDY4bb1iyvC%2BlaEngY3QI0RiNdKaDKv6kwP%2FfTcSqhmYw2uAu3jP%2BxKcu8Y9XHtaR4WIWo3aN2PzQ0P1ugEiOzrVZrCDBPhwq0FbpFXdL2fnZGbExBAkzaGLvLUEXXKFM8L%2BJ3rTdEj%2FbKbqBru4oRi3GHE8%2FoUUm0RZ15TjkL7%2BbWGzhPEf4aNMzuYc8pplRxBksIWO1Iyg6FlBEAchSBbA3gGbB3epfSA3vuPE6ZMKLa%2FPBZGRBAdy5JDlVXzNFdFlmqtxClN63qciH5%2Bl%2BlywrzEB8xN2tMPtJ3ki94GNhOMHt7dSpnpbcHBzd1JlWxC5qFzT2PP1hDmtkiJpPR3LHRa5J%2FvIarUqp%2BKNDSRohyEJ7RE0ANNyJ1izcXlfvAZH4sZxT5ho1OA7Ju1GINgHhGweBM881kYfGYL3XgbyYQ3KCAfKQ4%2F3zmWMHGgPIGqd9fm0Oxo60Ivp0fni%2F7ZVFVVamEImRidOgt4uHKoAkstbxxap2EDYGoND1gP4Kh2Dx5qnZSp781TpqVsnrFEMPGph84GOqUBUZYcn%2Bds7RKQbHW0nPEpHzFofS0%2BjjCnA8oKS7ePAeCWSOVqdUmRTPuWb52Wp4hU9sIrKkJFQLNdcovGgp5SUGMmQOoSxsGMX0AYdz1tcGTNYvoKW99C4fB4hCfe%2Fzumvl0pzD2WcK%2FTLBGqgtdFc%2BXYeAfLJMiG64DrOBXbwdXF3exDlo0HLEebwtWcor3UeOmrQdVaVCsLPfL3COueOZ8UdO1V&X-Amz-Signature=dc15a309ba42aa0f9274647132e46aa43d3a825114568c118c22a7396307870c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TRXTJRAB%2F20260324%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260324T005407Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDFbkoD9DL8y%2BUBURnApQkAUwNmLRY3MOszLkawGE1F1QIgbD3bwLMmJCISrIabdE%2FIwgdtWEG5Zvlv6RBWpc2X8fwqiAQIif%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDPP0jwStTa5mu%2FOfoircA84Tb8HU%2FCqMdeRVWXP%2FkM8O9%2Bg0weXf%2B2%2Fy8or5L04M4Qh0RLmOxj9nTsF5Ktot6gCafU%2Bo%2BaJADJhMADhgTVwj65kZDm3NM45tQV3ghlrTD22MgQyqgyVwyAIo9MHetT6JjGVmrR3nV7rGNhpE2QUluC3ffaBs%2B9q61taU21HsqbYPPBJPGzp0Bp8%2FVsdOjNGv5R4O4AIEOFvzo0CswsX5lXi02xlQuvOvr2OFiux1i8AJqz7z4o4EnoMCDmasBwcPPZtR7VSI9U4ZSCIkar1reN1xXki6tKO4XDbcNyKiqZzaOxW63oV1jmOq5HoWOgiBqEmIO3eHsFGbMlwFBZ72zAYBH1g5FIVFotsQVMdI53bLm0NLVYFLZHwJhzY7yXdGfduEjGXj8WE6jxJ1V0d3wNnZvATvEjTS0y5AJlNe2qn4YaZC%2BMz%2Fb0DUQ26E2NOHlGNNeIif92BtmQLe%2BFbQTT7rqLBjmUH59JsePztCQvOUd2EgirFEzZd1xrEoJSq%2ByiKMhLL4kdGeekrooZsUgO9FEW7PjGfoqlWVolJpwIsWmi6J0%2BQOfJqzK%2BaD6ArwaQLUPJP%2Fmchs1XVOUkyZBpjN%2BllFes7L191hVPhOrbArVmpiUAW10ylSMLeqh84GOqUBt4%2BtApEZEsvcs4BQZeJEXpkr1VxN2UuqM%2F5GV8o0674pt1c1%2FX2hqqOzC446f1laJPtUi04%2FB0B4oj%2BSEzh2F%2B4YkGKPH%2BwmMYOcTX%2Fpr7%2FWq8Z%2FkcdDg8o642ZtTDKllI4kXnlgkCNuHk83CnfNLBfAnEk1tvGUbgOe3g2oX%2FqEtVxb0xKM9qz5RL0OnzNPhx9G4qLZJ%2BXgA2IDlLSzU5bCTb2r&X-Amz-Signature=1a73d5ae86fff8cb45cd67860d0c8b91227d6761dd27ba08582a0b3d05f1399f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664Y6TMT3B%2F20260324%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260324T005407Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDEB%2FYEWu%2BQvFzYfbGGtmYLAf7Z7v0ATKHib1znt64VowIhALwo0HSGSEQJJlUNgTQVpj4V9A5F7QjsYmICMcZ47MjkKogECIn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxF36vnbQgRHBFKOg0q3AM7VYoqcVAd1z6Qe2wjj9armxPJPgJ2oiVVQCQMmsdjPkUc1QWAba8LHlCZV7a%2BZs%2FZ7CFQ5W8nHW2c7qX%2FmzPLCzSKnPsM543sj1aFzEBLpUBPk3q3SKuy0tmjAHt4ogPbq5IEe0ub6WmEsv3xj75rmLgJtYlKoAP0zIa4WDre6FLGT4R2x8yp4rUdIlHwJ5eJTqSLtX5ykMbT4axu440anRCiYPTbjBtF2fXCowH2pgGmvmu4W%2FyuwaNs8snyfaF1zPx7sy2RxAxell51dWptWaCmY2uy80nEeU0YPSmTkGSSFVO2WStCyzbiKnZuFmW%2BHs92ic174wuVuEr0ENal3yHdMArV6M8FYEQuIsqMtgcpg%2FLyorwBkpFkFoSScRQOrRU647oQgReMRqRk0GCm0tRjCNh0W0oGYCQ8j%2BAg5L30XbGuyaKiNRveioNl6ritH8ckhkOXh45sUtQBsFea%2BLBU7jNW8AmEQDq8zZAGReX2qz2UkN%2BZfPXdHsbylSlRFTaCAGZ8Fql%2BImQkb39itxWK8jbQbT8qdfSm7XNVeHM8RbDZ95uaOvKcdJOLHs1zEZaWSHGGfWuLL9bawKvwZFD8XJ%2BmgdFEGn%2FSJ3fQNOgDQkwiIPPkmkzhczCfqYfOBjqkAcvBsFQrRWZODH5yscDk2HofVUFGqP5iw12pSuACSpzhkKVEYzDpcgvddbyBLRY%2Bp%2F%2BJUGw%2FjxlhdYGDBFlRoN4AwcVQhga2oaxFZFn9F3wUKlj%2F9I5gKTCxdBOuupqydhOS1f4yHFrhf%2BYHWfeps%2BYTu4jRJz%2FcMmhGz%2F2SCSzFwffgxgFBbY%2BywPlQlbAIjKie2IJbm6rFulnMjdZo9FLlledB&X-Amz-Signature=d9b88fc7bbc8aac68b228395f5a3d110214e371e7072054047035598e2df0453&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466U64G5KFB%2F20260324%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260324T005412Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDOOEqTIsicEZH%2Frzr7%2BdeLtB2EAK%2Fkl%2BDTgF1rM1ZTfgIgT0BI0%2FH%2FzKke5%2F1pddHh4GUXRrMmkMESenFhv2017WAqiAQIif%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDAlDoONZuLLEjecr3CrcA100zcSqyGlqa60%2FTQ39pucjEgoqfy9MBsRVCtY6C3coppwK3bPwA9cm5mc%2FKUAYdhAYJsVIpNEW63bapI4J%2Bwml347iFRa0OmXbOV47yfmQGvOfwZsuXGeXbIVk0cMQV3%2BM%2FS%2FDIWqloARo67Ygp8rF6ZAqeZeEU1pvd53wLOfncbIWzUF%2FiSZzRP%2Bo%2B%2BDaR4YJgIYMD3p8BwCiOB3HfK3lY6IOk%2BCHOVKLO3muBJ34LVvODM1A48Q6ItYhgX0cQSThJGsAWUXmOXen5P8gni9%2Bgr2vDINvD7zafEUAja2AE%2Bqgugx1j0nZOUmAKjeVjSXKE1rMRIpVEs%2B7%2FJd66s94R2mx5VByiuQ51DrJXeLLtqKdiu%2BDB3fn3H1bAQ%2BgyHiBSr%2FZhvGOpOohEzDgw5wKAmlo3mnGYSD1Rs20vEPXuw1JPSQxLEKbbyi8yFvhAC%2FOw1PPd80BhqT703sGLH%2FJ7n0B1wq10JP5fM3rtz3NgRu04a3d9ZMpLmejuHE%2BWV7TETR503jiQIKt8AJ00%2FQibeY2JsQzPikZH6o7iT9iNI%2BL%2FdGt%2BiW5YJqA5lmcPKxKtGzIuB4OjYygT2NSJkNDbXhAyAZ3P0VCKxKLV35G2tB9%2FU9ZXZenwDhzMOWph84GOqUBQID8hVyx9tcEaEjmagx7YNSr0OyRtJiubR82BZr9cZ%2B2yaEyybbeD%2BeE5We%2BZ3VTWYaoWFTRlAu1pHhB2GPKRMfj42Nw1%2BaT1bJ7%2FR8eWUzB9kWBTEEOk4MRdNkkpFIt%2FEcVdL075UFymph9RSxHb%2B%2BF116YbFB6siN2O8JHOaOy3ED9YHqm3LLn6M4XynTugbF%2Fvrz9jmnHVBiL4tA2XDg0Sr9e&X-Amz-Signature=a062bd8fd80df43030790f8731568e212afbbe8aaf77cde0e47dcd0f85dfac2f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RZ3WAQUG%2F20260324%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260324T005413Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIARlpBMN6lymgJ6pFvrtEGu3pnLM8kMrpq6CBbR4YV5DAiEA01gj%2BF%2FG%2F8mBfMJDT3bf14VbcnvhTyXts%2BErlhyYawsqiAQIif%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDOKkf0O0tg%2BjV2lZLyrcA51hab0r6Kb3yyV64DBXvh%2B1QYtvm0KjX7Zr2uhM5jzqPxdo1LMPm1kPfGeZNGSB4zSGQJUknIvC80RPqC6iCZARrWLLpJsL%2B9iDTGroy1c3zpSpi%2FJfp%2Bu0kTj63CJda7DbcFVA5pbx6a9FNm2lGfHl6YP9W0GVEpT7KanSRpGKBcxyTipxNh2T%2F7VdUm6vE9rt12xvrVCkOYb%2FnryXjJA7ER9JhYoOS%2Fjjt5Mkb6kQHHl83nM1DdK5bA1HM64QcKdm%2B3Llg2D%2F1SWyO9NenCE3NN7pCgC4T7VVCn7rdseAuBBmbSFZzPo%2B7A905%2BFofx4kLrWOZcSNEIdeW5G1K4qtaphipjfJo3xKEwDXqJIUGOEumZWequVyL2yDBi%2B2CTuKqPOymQjkyX4ugqSzhH9KiuLyaVzs%2FeSk%2FobGyR6afPQ3z9%2FhB6JGOC9fx%2FF%2FZNkb%2Bqt%2BsAqxzYGI%2B3Pxx1%2BwPxE24S6p6sy6lM6l06bY5QJBtLk61lksDLKuW%2F9tnAMUSi5WRU1TQqyKTL6apXm5Fq8uscel4FSbooXkaa9C5RvgWWtMEDJwH782lImjf3dVCvh8HnknfQCbrlP3c6JXDZ97KcCRzEsXk4rmvELJfw740mQFwWHkHYZPMLWqh84GOqUBvVT6S3%2B5DSfqtGmrNxCALHbb6I97AoBCWSGVpV6T1SgmAvpHlQablC6E36%2B%2Bla1SXr0BbGUqJwUTBOLAh6g9O%2BygMnkgMKq7kirIMQwcMzrCE%2BmZCUZK7x%2Fc9n%2B%2Bxi1n37YqfghmlkMpiSErYypym6M3CidmvWu8Etpu8YJz2V7Yjw1MtZZCNt4VIIKgFtfKJnlcNv9f9RocG4JXx7Nc8kbzaeao&X-Amz-Signature=be2f9163df1cb46145eb0b024df30c1be8733fc2c9283b9de864a0aefe89993f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RZ3WAQUG%2F20260324%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260324T005413Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIARlpBMN6lymgJ6pFvrtEGu3pnLM8kMrpq6CBbR4YV5DAiEA01gj%2BF%2FG%2F8mBfMJDT3bf14VbcnvhTyXts%2BErlhyYawsqiAQIif%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDOKkf0O0tg%2BjV2lZLyrcA51hab0r6Kb3yyV64DBXvh%2B1QYtvm0KjX7Zr2uhM5jzqPxdo1LMPm1kPfGeZNGSB4zSGQJUknIvC80RPqC6iCZARrWLLpJsL%2B9iDTGroy1c3zpSpi%2FJfp%2Bu0kTj63CJda7DbcFVA5pbx6a9FNm2lGfHl6YP9W0GVEpT7KanSRpGKBcxyTipxNh2T%2F7VdUm6vE9rt12xvrVCkOYb%2FnryXjJA7ER9JhYoOS%2Fjjt5Mkb6kQHHl83nM1DdK5bA1HM64QcKdm%2B3Llg2D%2F1SWyO9NenCE3NN7pCgC4T7VVCn7rdseAuBBmbSFZzPo%2B7A905%2BFofx4kLrWOZcSNEIdeW5G1K4qtaphipjfJo3xKEwDXqJIUGOEumZWequVyL2yDBi%2B2CTuKqPOymQjkyX4ugqSzhH9KiuLyaVzs%2FeSk%2FobGyR6afPQ3z9%2FhB6JGOC9fx%2FF%2FZNkb%2Bqt%2BsAqxzYGI%2B3Pxx1%2BwPxE24S6p6sy6lM6l06bY5QJBtLk61lksDLKuW%2F9tnAMUSi5WRU1TQqyKTL6apXm5Fq8uscel4FSbooXkaa9C5RvgWWtMEDJwH782lImjf3dVCvh8HnknfQCbrlP3c6JXDZ97KcCRzEsXk4rmvELJfw740mQFwWHkHYZPMLWqh84GOqUBvVT6S3%2B5DSfqtGmrNxCALHbb6I97AoBCWSGVpV6T1SgmAvpHlQablC6E36%2B%2Bla1SXr0BbGUqJwUTBOLAh6g9O%2BygMnkgMKq7kirIMQwcMzrCE%2BmZCUZK7x%2Fc9n%2B%2Bxi1n37YqfghmlkMpiSErYypym6M3CidmvWu8Etpu8YJz2V7Yjw1MtZZCNt4VIIKgFtfKJnlcNv9f9RocG4JXx7Nc8kbzaeao&X-Amz-Signature=db40c8a706be0eaa1a0400cfdffb3b4bc7996306def7de23d330ac458f338ee0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666MVDYCZJ%2F20260324%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260324T005400Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIAFObqJk%2BI1Nek5BrtIMZh0MkIgtXpPvdPhKXzgNZYnnAiAyZ3k7jmd4C6yQ9%2FKlkPHNDZtGzv8%2Fm0VtX336NZjjMCqIBAiJ%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMZAygeSNVo4Gi%2BEbZKtwD3p8dlQ25l0UuIhmE4Klhfbxrn8O4YAMJd4dKES8awaN2rFcykRahmkNF3vONjBw5uQW8Ffm%2BxM1LCJFbvqPr%2BliMsAoV6s6QuwM75bDVpQbiPRNuTD5vO72HMvSegqs8R%2B3W3g4cz%2Be8RvLeFrTmO6sIMTCYgojYo4yAPufFfDO4%2Bfg5NaUUQzIa7mLYwAGIn3HMtLe264IBZ8mfHsN9Xnkz7au5VFaHqcyjDC1JnUasXxdFlYO9Ui42AdulCkOdED8ImWPB2qalmPy1VvZybsfydF4Ck%2FXXrj23kFsdnXiAuVSa0Jm8PxXjSjhiYC4vmLuN1MnvHjt2TV0w82IboMARgxAqX1dmnwDCtl6wqZ%2B%2B5x3xw3SVu4FPN5fh9PBrn%2BBayWb2LOc5MoeSA0NB633UOlbw9VBJLLcF75cwgK1IEouV2xwzxe6qpQGqnl7S%2FZ2K69sX2aCYqP5Q2zdW9RtpAmvM0VBSkRI%2FiEBVzrFLGKCOIspXUsSuHANgBtBuCNbcPshxn%2F%2FhmRNSwoyrk7i%2BhLLzqETafEHfeLMZEC8P5%2FN4gLSgoGsBzXPSbv%2Fl9%2BiPctT%2FyGmOwO71t8jR7Vr9Pi%2BluE%2BwGAyRY7tH12rijzqDcMgspnI%2FrRQw9qiHzgY6pgFPL%2Fffp9IOQltQYhaWd82PCqlJOQ95GjXQ3CsbtQIXBCEkp1lYu3taxtUVJW9v38ZpZUMaQlaztzUoHhxHu1WGyJO4x8baKk7Kg63ykFHHCIpZ1dcKEvInB1mQWo8wvevtsFA3IaTLpVsvZEDyNLEj8pVriT3r45S9gL7yMSvF4%2FSoPGL3g74wE2YQhHuek0VLTx%2B34mmHs1HEJWq207Ibm5dGDWtM&X-Amz-Signature=12d5eb58882f5efd7327cccfc953028ed4a0f00df028142f651a5605d6933b9a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666T6RYQEG%2F20260324%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260324T005417Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIHffObjCRlzBZoZxd5m2jEbJt49JTYPoRWWdHRDdWbUMAiEA8OPBR%2FxqFb0q7EDuLf6W%2FVHSc5XLuwUOl%2By5qj5OLxwqiAQIif%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDGRgekIOGhHJY5R2vircA%2BjCauu1AicifNKurrQ452hqgomy0jJURx2FaQpbWpeBOhItb%2FKrLJY4RNA00i9FtWvc4xDts52eAZk6XtYPYxYoKK%2BJJPsalWGFypIk5bAN%2FN%2F0GFpWfbuZAjCx2tdSEa52Q89z2OXC3aU4OPAKlamqMHNzvfhHKEoAwXvgzMf%2BrcVvvBIF7CQogEbdT%2BUP3VCF9SGvez5mKVG%2F30xzas3hYHwJQUSS9OwNKMxNiQ7L0GzE8%2FH%2FSY4%2Bz%2BBMou4KLo7TEdDc%2Flms7dZFpk6ua5qo3sacZ3JCRX32NvDJiPTWt73bLRNu2%2B%2BWFUe%2BK20NYF1jNUKbdDQU6hf4MAi9qFtmzjriuJTE1PFcghP18104YB2SfFM6QmYJWdv94ONzum54MoKHE6ekK8Wj05F%2FB3Nn6r9iDhlTrQTu3TeztRCTc7X0Y2qHJWITtLKXsjR4cC7wcB7wSsbbHSp5R01YizFZP%2FbrAPl7YdzwyvhlxcQ3rzVB2s5hDfGg7rd8qpX%2F4ieidIXh8Uffs3I5Ygz5IckBQbq8LuyJGzLGRlh6T7Hsj6%2F%2Fhpe33fOcht1E7QmmpyM0z%2FVwb0fAWUDbU5fxfbPo%2FqLp7kE3HoLfONm8ePwcb0XodPiODPuqalUyMPyph84GOqUBY0PWuNwFgPxz7FEbbNUXq8ZoiVGZtRupMopgm8ynMrjPk1RtnQ0%2FELgFNlgXcZGO40ljI3RZTgjBqFQQNXDCXoPX%2BQiIZZk3D85hm4MnrY2zfYIalcf5mW2dj6R3%2F5kxXMbztpzNrW7mu1sUaganXtNmDcPXyDv3qe8w2TNRNXazD9jOuJD195h6BVCxMcN2I8tIjgaVIBq3y6cHSQKvMZ3AvU8G&X-Amz-Signature=676637c031efe7bd030b8704181c3188f36e0db22b48a06d81d317b7befc171b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666T6RYQEG%2F20260324%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260324T005417Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIHffObjCRlzBZoZxd5m2jEbJt49JTYPoRWWdHRDdWbUMAiEA8OPBR%2FxqFb0q7EDuLf6W%2FVHSc5XLuwUOl%2By5qj5OLxwqiAQIif%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDGRgekIOGhHJY5R2vircA%2BjCauu1AicifNKurrQ452hqgomy0jJURx2FaQpbWpeBOhItb%2FKrLJY4RNA00i9FtWvc4xDts52eAZk6XtYPYxYoKK%2BJJPsalWGFypIk5bAN%2FN%2F0GFpWfbuZAjCx2tdSEa52Q89z2OXC3aU4OPAKlamqMHNzvfhHKEoAwXvgzMf%2BrcVvvBIF7CQogEbdT%2BUP3VCF9SGvez5mKVG%2F30xzas3hYHwJQUSS9OwNKMxNiQ7L0GzE8%2FH%2FSY4%2Bz%2BBMou4KLo7TEdDc%2Flms7dZFpk6ua5qo3sacZ3JCRX32NvDJiPTWt73bLRNu2%2B%2BWFUe%2BK20NYF1jNUKbdDQU6hf4MAi9qFtmzjriuJTE1PFcghP18104YB2SfFM6QmYJWdv94ONzum54MoKHE6ekK8Wj05F%2FB3Nn6r9iDhlTrQTu3TeztRCTc7X0Y2qHJWITtLKXsjR4cC7wcB7wSsbbHSp5R01YizFZP%2FbrAPl7YdzwyvhlxcQ3rzVB2s5hDfGg7rd8qpX%2F4ieidIXh8Uffs3I5Ygz5IckBQbq8LuyJGzLGRlh6T7Hsj6%2F%2Fhpe33fOcht1E7QmmpyM0z%2FVwb0fAWUDbU5fxfbPo%2FqLp7kE3HoLfONm8ePwcb0XodPiODPuqalUyMPyph84GOqUBY0PWuNwFgPxz7FEbbNUXq8ZoiVGZtRupMopgm8ynMrjPk1RtnQ0%2FELgFNlgXcZGO40ljI3RZTgjBqFQQNXDCXoPX%2BQiIZZk3D85hm4MnrY2zfYIalcf5mW2dj6R3%2F5kxXMbztpzNrW7mu1sUaganXtNmDcPXyDv3qe8w2TNRNXazD9jOuJD195h6BVCxMcN2I8tIjgaVIBq3y6cHSQKvMZ3AvU8G&X-Amz-Signature=676637c031efe7bd030b8704181c3188f36e0db22b48a06d81d317b7befc171b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662TPBL3UC%2F20260324%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260324T005417Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQC84my0TCAre%2FxsPWGJXg%2FX8wylNU0hNC05vff8kHtTIAIhAKHVWBoReqnCqN1zK%2FPTf%2FZ52eNgnh%2FDsj0tekXVGLNrKogECIn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgztTIn96S8EDBq%2FmLAq3AN6CICSZWAZ5978QgWc%2FwxJXv8gJlZ8%2BSCN5EcrscO7iAUMY7QERGDA3J832fLVGkztr9gZMVCuyCD5Biz0wrfoSpeY3oAz%2Boiu%2FTR1A3UmEs%2BiM%2B%2B9v%2FDcn4eRcmPVx7SwQIsl92pDEhResdMfYlMglVUAIKfaOD1RWkmmIQ3cWrE4Iq8eposPYvl5Q6xjvm0PahLE0Mqk6Mz2yg8kIHMzcXvX337Jh9R2H3xMenzRiXygBY76Rt0fULet50zokHs5YsciRlLWm%2FInBzeOUEd5L8TSK%2Fpc%2B4ft57xZ0UYdUS1Rwd66geqIILwV9crbkpkVXMB%2Bk%2FOLaDhmJA4jS5Ox9btd6NCT%2BfvbrXTZyuHl42A7VxAItEQHDLjDbTXMCRRGyp9hV2Sb4n%2FWh9YvlLgUn6V8yvrkA%2Fg0I5NiMDd88w9YVVv1N8fF4LOz9XlQMdf156KjIrq130Mji8pn7NXz4k9vWkNNEk1aasuYw%2BjeGaXZ%2FTxlrMwZL%2FvKZhSwXx8N8cEYSt3gVAHnhGhMATKQJzT%2BkGyiEctLudZ6Q9%2BRLdC0y2pAOlGbFWre4Qv2JJv6ZmhRpyLU5Vs%2F95V7KHgVfZgT5jd0iTyvJuZQBmeoWPWR8XTIYBq7OCHLKzC0qofOBjqkAeESfTxSLBB%2FU51YpfKlPdlTYBHcPW4i2mTdS2%2BQ69JJAdBLuGMNHYH2yaNyysyb1gmrIT0%2BOXkyeqpuZ8wPWBJgCfbHAF7dlTc3Za7J4L5zvTVHX5MtoLDPJuR8%2FBYrpNA6A4F1qOYZQWW6fMXaIN2pSvEMgvCrf8YmhFzQlnnBzBqUlL3WUj%2BdMSGEZq4gul3Xsu5DVtpgyo%2FaXyt8SNrElc9%2B&X-Amz-Signature=2113366e297ee8b4e96767003029eb50a9434b009bf32f642e11f76dd88d9391&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

