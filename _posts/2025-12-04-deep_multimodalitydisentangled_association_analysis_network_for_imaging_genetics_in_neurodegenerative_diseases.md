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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Q7QLATZU%2F20260228%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260228T110051Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIBkwoovsZiqEiq2dVQ3RA24olDZDwj0qSB%2FoTLCyFq4yAiEA5BQ3OtWiQ3bWW3LKakcW8uB6EiicKHPLHM3Ft%2BVQ2%2FMq%2FwMIUhAAGgw2Mzc0MjMxODM4MDUiDHtv6L5AoRAeXFpi0SrcA2LiR2YUc5k4lHCbpHj0t8txejoEJQ1UcWFJVJEPSFcGgewTjast3ufnkeGOtHFbV7ozVmFCrTjsztu7JfCIhHeqW3hT0jThApk1d9SI%2FnlTJzmr5aeITR8uOHinVNBGtpjtSDBi4g9ATlhEI1EwZy1Cv53kkS99YgE4X8%2ByNfVxTdPa5Q7Q8EuDujzPk74lKH%2BnKtXtVvD3yP%2BZrCGYeBjPoP1%2Bs8CMaQoSGjE2tl7wlIJ64GsOCW5%2BsxfsQB6Ro4sibLx5zD1EvnCwL3ahx8v7rfhXFB7V4i8lwrAqL7PiK%2FuoLZcj1g4AAB0WwkOH5P1E0nwvRmsoErZfAukHBXcTQkOvy4IlU5gZxdHknReHzsRPS%2BM%2FTA6IVdYybV4cslcZ0IEOe8JTfrmsQJoadQQV%2BIpcw3FKhhmFMeAdfQE4jYRdw9DdngcACOwWVFXZOMhPfXlPnt2swOItqNnR14hEtShGquldPsQs%2BFd8ZME9qOpPTJLPTr9W0LmnhWpgUH5hLQ5CzY2MChCfXwoSjSvyEiOsqAu%2Fn0yOFDFPxvyZ3XzYvWLAqymD0Jje9QVUKZ7KefOFtWlLbFYx8LbAtKFL6zOEULHgQWZRnlcGX1y7K1Dld%2Fws%2Fdn7qG7BMI%2Flis0GOqUBlMPWqkg8MFDev9oBS6aRrKuvPwA4%2Bo%2Fs79DchpqFNzlgBPiyLTS0THgoRyOpnX%2Fo9WaNMR9kPNbrI1HVfWAby%2BNGq%2BswZeFIZO98FSEqHOChaCiLUQLIwDTh9D50ZwCQwtafF%2FNtE7VHMh1kbzt2s%2FsqRq1KJktg86FztQ1WcMxzhWtqP%2FKDZWT2Q%2FrhFRLuKwZUuBD%2F9Aot6%2F1by%2B%2B0Mx5Ofjtl&X-Amz-Signature=772caf915143dbccb97b85e7b631db670bfb376edc790094ca2c01edff7e4ff1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Q7QLATZU%2F20260228%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260228T110051Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIBkwoovsZiqEiq2dVQ3RA24olDZDwj0qSB%2FoTLCyFq4yAiEA5BQ3OtWiQ3bWW3LKakcW8uB6EiicKHPLHM3Ft%2BVQ2%2FMq%2FwMIUhAAGgw2Mzc0MjMxODM4MDUiDHtv6L5AoRAeXFpi0SrcA2LiR2YUc5k4lHCbpHj0t8txejoEJQ1UcWFJVJEPSFcGgewTjast3ufnkeGOtHFbV7ozVmFCrTjsztu7JfCIhHeqW3hT0jThApk1d9SI%2FnlTJzmr5aeITR8uOHinVNBGtpjtSDBi4g9ATlhEI1EwZy1Cv53kkS99YgE4X8%2ByNfVxTdPa5Q7Q8EuDujzPk74lKH%2BnKtXtVvD3yP%2BZrCGYeBjPoP1%2Bs8CMaQoSGjE2tl7wlIJ64GsOCW5%2BsxfsQB6Ro4sibLx5zD1EvnCwL3ahx8v7rfhXFB7V4i8lwrAqL7PiK%2FuoLZcj1g4AAB0WwkOH5P1E0nwvRmsoErZfAukHBXcTQkOvy4IlU5gZxdHknReHzsRPS%2BM%2FTA6IVdYybV4cslcZ0IEOe8JTfrmsQJoadQQV%2BIpcw3FKhhmFMeAdfQE4jYRdw9DdngcACOwWVFXZOMhPfXlPnt2swOItqNnR14hEtShGquldPsQs%2BFd8ZME9qOpPTJLPTr9W0LmnhWpgUH5hLQ5CzY2MChCfXwoSjSvyEiOsqAu%2Fn0yOFDFPxvyZ3XzYvWLAqymD0Jje9QVUKZ7KefOFtWlLbFYx8LbAtKFL6zOEULHgQWZRnlcGX1y7K1Dld%2Fws%2Fdn7qG7BMI%2Flis0GOqUBlMPWqkg8MFDev9oBS6aRrKuvPwA4%2Bo%2Fs79DchpqFNzlgBPiyLTS0THgoRyOpnX%2Fo9WaNMR9kPNbrI1HVfWAby%2BNGq%2BswZeFIZO98FSEqHOChaCiLUQLIwDTh9D50ZwCQwtafF%2FNtE7VHMh1kbzt2s%2FsqRq1KJktg86FztQ1WcMxzhWtqP%2FKDZWT2Q%2FrhFRLuKwZUuBD%2F9Aot6%2F1by%2B%2B0Mx5Ofjtl&X-Amz-Signature=772caf915143dbccb97b85e7b631db670bfb376edc790094ca2c01edff7e4ff1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZUFGDIVD%2F20260228%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260228T110051Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIF5PeAyRu9KghHwbGr9SrH6TcH5sVOaBqWj6fmURpjn5AiEAhCf6jWvNAVB8MPu4iZ%2FDWZAgjfQZFgPxJu%2BwpWEmsjMq%2FwMIUhAAGgw2Mzc0MjMxODM4MDUiDAWbp7QLLpL1c9SzhCrcA2fhovZbgtBABwyXzg6R1f9dN0cBcpAvaJ4cPyVlPeodJJWHAUUgMQ3L%2F3491M0Q7bWL2oiEuK%2FGpUgiOFxwXJW155R6clVHu2jcUemSIOIySHHVemGplMtbIf6VaYMTEWX1gvpws8PSfYtQEvOTARUQlOrs8H75KW5XkH3JqPTKi3avvByr%2BoACv7a3MR3HLPJE4MMO%2Bn58FD9DLpbSX1IrtfGPMOJMJxjVxVM5HlGoDXuyct7xTmpGK%2FAyBq6yWUCNihftiGJln9oILRip6IuzCm0BlWDCjxTa1wjoJDFgTJnCC1MLGO%2B59c%2FkDmjA1H4SyzKIUFiYW3VHPEIZRV6onusOmwWDSzoE8M0W47AcSrDKGaSTzS7Gac8aarEEMehZafGj2BaJ%2FZz7bFDjUvXjLifzM64s8wgjPjzd%2B1kW0UcYjIAMiiusTAVwMfEiiYL9tQKhlHdikEUC9H7RCPn7%2FsgbWy%2FuE93YHkMVpMjXUSSQzVChLNdBNIdQhgxY6Iab9rwYZQNnzFISLD8inDp7Z%2Bm0OoqoECQ8jfoKJHwLliVYhJBmpczF9nA7JyUD7sN4lipo90odFmv7930dqVF8MbZczgx%2FewdBlJjBRN%2BJwbFM02gi%2BaXL1zRQMJLkis0GOqUBddfdnG9Da6qTmCV9N8jVeCsTh%2B6Sdkuq%2BrTcWh5nKWMqlbpQUY14VbR6ccfr7sEicvvbgi5kRdKR3jwMMjgBqipT8GlHwIncaQEWzoTzqr%2Bp6j63GwFi0tgm88zYZRoAqmKZPB6HbtKU4OusRzLjvIkW0VXlLmfAdyL4Ed3QRJhn0qI49p3rM5iTku2QRpBR%2BizsPyGMyufrpwwI4xALEKSth%2BFf&X-Amz-Signature=90242b1018697ea1760f8fa80fdb23f81a5dd1842cb4f7c1213864b8d957e79e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SYFRWBAH%2F20260228%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260228T110053Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQD8ycIL0L6MoJ3gT1p0SVvPjxFeY5tQWls1QMF%2FACf8cgIgTK4ej9BZq1sW2ukE3jj6zDBfaKVmsT3Bsa8qghYNxDoq%2FwMIUhAAGgw2Mzc0MjMxODM4MDUiDGKsSaBvx%2B4ZK5fyJCrcA65AVgKtKI00FTRvYEmA72iZuHSDG2OkjH4bImbiKT1tp7UmnwNVdLStzgf6IX5tX7SnM%2FppUsy7Tlo8P2k8e8wbjPQbe8gTQv8voQuXwZ4KpZ2Fclp4V2IsbqvqXhNlwWlqYnAyigaoe%2BLvPFMtfqZ2sSLb9VHSlJkWu%2BPOPeStWfA8RwSU%2FU0gmRPjc37vih6%2FFCpvUGYuY1GP4Yvo4gOa7tY14A%2F9qIM7diLgkz1v%2BcgwS1YRPKpx%2Bya8Q82XKPlAACSUC%2BHpKFcFrwFI4yahXtv6Pu0%2BmawtzZ2bZZ8dS6vm9TiqaKXOh6O1lVCjEoTVRg3iwzqckjUNQEbA5mZqnVv0iI81wcvPB8GPRMLESQbs2nk3TqTEEEauUk9EE4%2Fz09QRZU4rD6OIKz7KP8sBU%2F3aTE6lxbOBrfb7HwIlkhQciZLy39ZUZWVfSgvBBohWyrKekwAEEEBNYg%2BqX8UEaQuG6dKeeDFPCD4VCcX5lAsF%2BkxHikr6G2ZAiP%2FQ%2BD7dCjUYEXLBUgvzZ7tyUcuq2GPskeKF9zKVCjM%2B%2F3u19h0818YUVUS1p%2Fy6Hi08VbSrGP9w9%2BcZHlr2yVIDw0L%2BexF4qRFSjPg5KN0YH0Cm9c6uTpyO3W%2Bq%2FLCZMLTkis0GOqUB%2F2xH7KCQqapBnVi5NO2Mqd7OVLyYOY%2FzriiWidId86ZPU49kocC10UQ%2FACwx6zInmW6B6hvBmqCBgyVwVROrpYDlUkVzgBabF9j1grTRUabgVtfmAPQuedIfMJUB8R%2BR%2BANhW2x7SXKQUFeamSC%2BMpf%2Bd3VN5GxJduiRy6HRGaUDfTos2RV1nb2bFrXsaKLUKJYnTxwDBgLrbZHjSI2%2Fg%2B%2BjTQxS&X-Amz-Signature=6cf21f37f0cfc37c97870576fbba22db5fb54dcee4c19e2a274f1c03002483cc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SYFRWBAH%2F20260228%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260228T110053Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQD8ycIL0L6MoJ3gT1p0SVvPjxFeY5tQWls1QMF%2FACf8cgIgTK4ej9BZq1sW2ukE3jj6zDBfaKVmsT3Bsa8qghYNxDoq%2FwMIUhAAGgw2Mzc0MjMxODM4MDUiDGKsSaBvx%2B4ZK5fyJCrcA65AVgKtKI00FTRvYEmA72iZuHSDG2OkjH4bImbiKT1tp7UmnwNVdLStzgf6IX5tX7SnM%2FppUsy7Tlo8P2k8e8wbjPQbe8gTQv8voQuXwZ4KpZ2Fclp4V2IsbqvqXhNlwWlqYnAyigaoe%2BLvPFMtfqZ2sSLb9VHSlJkWu%2BPOPeStWfA8RwSU%2FU0gmRPjc37vih6%2FFCpvUGYuY1GP4Yvo4gOa7tY14A%2F9qIM7diLgkz1v%2BcgwS1YRPKpx%2Bya8Q82XKPlAACSUC%2BHpKFcFrwFI4yahXtv6Pu0%2BmawtzZ2bZZ8dS6vm9TiqaKXOh6O1lVCjEoTVRg3iwzqckjUNQEbA5mZqnVv0iI81wcvPB8GPRMLESQbs2nk3TqTEEEauUk9EE4%2Fz09QRZU4rD6OIKz7KP8sBU%2F3aTE6lxbOBrfb7HwIlkhQciZLy39ZUZWVfSgvBBohWyrKekwAEEEBNYg%2BqX8UEaQuG6dKeeDFPCD4VCcX5lAsF%2BkxHikr6G2ZAiP%2FQ%2BD7dCjUYEXLBUgvzZ7tyUcuq2GPskeKF9zKVCjM%2B%2F3u19h0818YUVUS1p%2Fy6Hi08VbSrGP9w9%2BcZHlr2yVIDw0L%2BexF4qRFSjPg5KN0YH0Cm9c6uTpyO3W%2Bq%2FLCZMLTkis0GOqUB%2F2xH7KCQqapBnVi5NO2Mqd7OVLyYOY%2FzriiWidId86ZPU49kocC10UQ%2FACwx6zInmW6B6hvBmqCBgyVwVROrpYDlUkVzgBabF9j1grTRUabgVtfmAPQuedIfMJUB8R%2BR%2BANhW2x7SXKQUFeamSC%2BMpf%2Bd3VN5GxJduiRy6HRGaUDfTos2RV1nb2bFrXsaKLUKJYnTxwDBgLrbZHjSI2%2Fg%2B%2BjTQxS&X-Amz-Signature=0c3059f76ab5835e1b52b8eba839bdd399768235f1ead71f950c794b5f5fc6fb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YCFAUIIB%2F20260228%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260228T110057Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIBSRgbOLf8vupYEqL1FOB7B1r0HvanULKG2VmLmudprNAiBSuGxEoxcRCBdMp47r%2BggD2e7jddjFpZQ3xayo9hok1Cr%2FAwhSEAAaDDYzNzQyMzE4MzgwNSIMgTPTMnAAKwVAK03NKtwDN0ecH7fdIsbvwm3gRinG59ynmbwswl5DRAJscF89j8Uf7DRMuzTrYCuyXSDLpmVBicyNrAmohfFuW69MK7KcCpft5MsPFZow6Vz1nyGkiBtLviowN0NvT5oNl%2B2f4r6lw20wwwW4sEAsgxcRuYAukN9ThvTo1q3Yp0bv%2FkOWB2BN8F92jJIMhUrsLDYj3iQPQ%2F72xyvuY%2Fq%2FWMA7eVo60tNI4SANqhTd%2B0ZpTjY9k1z9ozbXk9NkeQgT3BA%2FJeyvaQO3JayRcdJUhI46odKWL6bQEY5JBWCURu%2BRiaxon%2B90W04hEG52qfyc0M9w4%2BSYPHFra5aC2AjtJxnMrTn%2FX63H3AUAn8rqFWHCRJIGTISHPlKLSA9Y2slgk0%2FQNvCbAXfQHvmfIeH9M0yB51h094yzlJ0wiu4Du%2BLDNtUIHLTsex9oOzqufmPvhVQRPuK3KxwKY%2FZgkFeqbSGKj3loSgP%2F%2B2k9GRKVLepw2ZULtogGhkwx5euu4YKgBJlz%2FE5H%2BqXG7s1N%2FBDvbvj8tgQjZ4N5wvyyfG6PhIPkfV6ZSnjxoRtPhyFOVvnYwADOoAqB2DwRMP9wz1pSXbErPCFijQvvshz5CnHo3Osz%2FhvN1JtzQ7qKwkShv2lRKsEwjOSKzQY6pgGv0Lq%2B2YeZH5ITaodvAGm8lao%2BOm%2FjneU3Uw%2Fcp%2FF6gWfTRLCpOE25fHodouHBfdtDZWkrz1z%2FnE9%2BnzbOUNEq1ALqpUYaXUf094E9q9DU7Ruz6WvtGwJjpZ8Byr4xK3FGC88aiSek4MInONPS17QHOuytyYK1GLkW2GLVf%2BcHpQYorBp2NcryrGNhPWbx%2BzktrmxCJUt%2FBAgHCdXt8JPE8e8aRqkt&X-Amz-Signature=b3a79d65585a40babe08f82234110bb896a478611da5bb051d964cca6ac36e08&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZDUKYMEY%2F20260228%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260228T110058Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIGlf%2FcxhV4f2G%2Fd4DTHAI16L9DRA5j2Zb8aak2%2FqTX7rAiBpJu2aBbfu0ypD2jh6xCyL2Pw9JtU7P3wlHHpMFTv46Cr%2FAwhSEAAaDDYzNzQyMzE4MzgwNSIMIadjYqFa4yzDedEyKtwDiuHxfbUnZeRocES%2BAVfUB%2FKQjvJfG4g57E0p5Y%2BkElplMUBx46a6NnlSf%2Bq%2BMsPyNmSnYC0cMxH51wFjtZXWz%2BOf0vYu%2B37MOcwMph6XzR9TlHll6qQZYY6IyCnqteKCmJu4%2ByzjvuUheeYymW95DF4zcXqZpAQZlNCMEz0AIvDUm4IU0NTmoEQKnQ5sGNTukIJPnQYm%2BoqmMzBrLU%2FM5QgQrad1%2Bzj3Z%2ByQMsRD4X0IhlLiFcpe6%2BhvdQBdDvBkPCp8btnzEVtMIjtUoszap2c6wq6fa42Ir%2BvByo5AZViOi2BJwVb%2F5xQBmRYlwf2pwnC8lRX%2F6fq%2BfpB6WuchbFsIw3t9symclRZGxuZp3TsyW5MH30grz2duIjwe%2BPK9NrPMvnK9mx8yvB03KmObqI4PjxWU%2B9UV0ww1t%2B59kWyEK2BE%2Byhomi5nKcoQH%2FagFDumj1BSG9Dmjjqgf99kxEK0DsZnDgDsKXZlj9Xhkdurz7ICRPfzq4LkK%2Fz%2FTx8%2BkdNQL0j7uQg%2BFPiTH5zsdN22ord6HTHuw7FzxCxLCFZaGjRa%2FswKIHwqZO9u%2Fd7myykjlV1PE3katBJUqTwb4Ksh9cLJZzrPm8gOecjk5wSGcejeQLfGobNEEJcwqeWKzQY6pgHK1JGWM7r3mYCoKmaFFpp%2BtszStg13FF%2BaNkuQyl4xUkGIV6Z5wdoeob9D5cbHVqGlItwBknLZG684eLgSzRSJmccCCdFwZK01Q24Ec%2FhSVQVU9eK9mtOC7ZIOofsamcEiIqH6NffmHj1NwND507HSfYUTqP9wxIq0fdkJEeDHOkKi65xzYuwRK7QTNoM%2FmMvZ%2FeZbNjsqjaDFGtThr3f%2BjFyuNkTW&X-Amz-Signature=88f152c35da05308549181fbc863be8936a04579ddfe36e8fee42685d2fcf5d5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

	- modality 별로 존재하는 common representation과 현재 specific representation을 입력으로 reconstruction

		→ modality 수가 2개라면 2회 reconstruct 진행됨



### Association analysis module


AAE와 2개의 association network로 구성 (network는 imaging modality 수 만큼 존재)

- `Adversarial autoencoder, AAE` 
	- prior distribution 내 제약된 genetic latent representation 생성
	- adversarial learning, gene representation reconstruction
- `Association network` 

> **Flow**

1. `Feature embedding`
	- SNP의 0/1/2의 categorical 표기 → population에서의 발생 빈도에 따라 0~1 사이 값으로 embedding

	> 💡 **e.g. **


		trainset에서 한 SNP locus에 대해 dosage가 0/1/2 나올 확률이 각각 0.1/0.7/0.2 라고 할 때


		→ sample의 dosage 값이 1인 경우 0.7로 embedding

1. `Adversarial learning`
	- Multimodality-disentangled module과 같은 방법으로 adversarial learning
	- genetic AAE의 경우 disentangle layer 없이 전형적인 AAE 형태

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662HVG5SFS%2F20260228%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260228T110100Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQD%2Bx%2Fsq9daWyhcVYBFkEc9bMOTMldiA8ZRcxe3XXL7lDwIhAOpLmN1sbygFcaJ38%2F%2Fh4d5LuQ04kytYvp5CVnEoMEtwKv8DCFIQABoMNjM3NDIzMTgzODA1Igw0KJjDDHZzhHQPSQQq3ANTqegf514MVhKDTDEKPyhN%2FomnM7VwEm9lbwg602NGGtstzmtF6hQ%2BBUkZPxTW%2FnjLAs9gmeUJDUc0BdzDrucSsZId4kl1MarrEeDO7yH2EJoMOUWN6TC58Vwa8yTwR7utDDqTM9lJAeXi7Cx47XE0%2BGvxt1UA3yVMoiI7P9%2FrnNCvg%2BL%2Bb%2B1W54k7z85VqaVZfaaLDYuQgRkRoJSXCCllvqhdk8wuwkZ7DAQp4U2byyW0VzV01Kt%2FSpYdsgA4Ps08%2B9usdHhqEoVgQYM8xpEVKOhl3TzMSfpDh0JKJF58lkDcAApZlgw2zNoaGAlDQJChTiyYF5MKRU%2FNfP1i7kjGiJfd1IcDYqs07pRjI2CtKICHKZUPKdqUeL%2F4LfVE7d5GdGwG2hRj2d0TqqrSxltREyn25tSLJhNxTQWRma2JmLXSF9wdHOznQQCyAEjjVxGBF%2F1Zu971xpV0pGXMaTUNEZsK5hXTBzIfY3IZEBruFMonifmb5EgFlJE0l3KdAdRa4ZLiwxWIxg6b10LXAGn%2FHDgribM9jgbpyB2pvDi5%2F9mNerrWl%2BXV9UV9M3LwDdGlSC7qhFZyLisGMNLo4AMnpz8YeV5UGEgugtQmS5NJJ%2FxJlyxEYWoGMPsIwzDS5IrNBjqkAQnF%2F4z8RkzmTx2ewmzOVu4RgQlxhQfhObXRXUeytH6aAGH%2FRNtqu9LwEYR1l37ZPMTf3Tkwb0gxx2c18HDxFBueMWOG61IhfFFCOM0uPe5fPT%2FvgKlVvE5ij33e6mj98lDEe7DPpgTRhcXXTQ%2FR%2Fn5JJAtEeQtKzC9Wv1Hz%2BfrU%2FPw3Afp57VfHMQDyX3i9CrsElNUcuEbcQ%2BenJvvRryI53f3%2B&X-Amz-Signature=60289942fce9bb2b964a3f138ba1052f485777e04a524a285e396525cd0cb4cb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662HVG5SFS%2F20260228%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260228T110100Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQD%2Bx%2Fsq9daWyhcVYBFkEc9bMOTMldiA8ZRcxe3XXL7lDwIhAOpLmN1sbygFcaJ38%2F%2Fh4d5LuQ04kytYvp5CVnEoMEtwKv8DCFIQABoMNjM3NDIzMTgzODA1Igw0KJjDDHZzhHQPSQQq3ANTqegf514MVhKDTDEKPyhN%2FomnM7VwEm9lbwg602NGGtstzmtF6hQ%2BBUkZPxTW%2FnjLAs9gmeUJDUc0BdzDrucSsZId4kl1MarrEeDO7yH2EJoMOUWN6TC58Vwa8yTwR7utDDqTM9lJAeXi7Cx47XE0%2BGvxt1UA3yVMoiI7P9%2FrnNCvg%2BL%2Bb%2B1W54k7z85VqaVZfaaLDYuQgRkRoJSXCCllvqhdk8wuwkZ7DAQp4U2byyW0VzV01Kt%2FSpYdsgA4Ps08%2B9usdHhqEoVgQYM8xpEVKOhl3TzMSfpDh0JKJF58lkDcAApZlgw2zNoaGAlDQJChTiyYF5MKRU%2FNfP1i7kjGiJfd1IcDYqs07pRjI2CtKICHKZUPKdqUeL%2F4LfVE7d5GdGwG2hRj2d0TqqrSxltREyn25tSLJhNxTQWRma2JmLXSF9wdHOznQQCyAEjjVxGBF%2F1Zu971xpV0pGXMaTUNEZsK5hXTBzIfY3IZEBruFMonifmb5EgFlJE0l3KdAdRa4ZLiwxWIxg6b10LXAGn%2FHDgribM9jgbpyB2pvDi5%2F9mNerrWl%2BXV9UV9M3LwDdGlSC7qhFZyLisGMNLo4AMnpz8YeV5UGEgugtQmS5NJJ%2FxJlyxEYWoGMPsIwzDS5IrNBjqkAQnF%2F4z8RkzmTx2ewmzOVu4RgQlxhQfhObXRXUeytH6aAGH%2FRNtqu9LwEYR1l37ZPMTf3Tkwb0gxx2c18HDxFBueMWOG61IhfFFCOM0uPe5fPT%2FvgKlVvE5ij33e6mj98lDEe7DPpgTRhcXXTQ%2FR%2Fn5JJAtEeQtKzC9Wv1Hz%2BfrU%2FPw3Afp57VfHMQDyX3i9CrsElNUcuEbcQ%2BenJvvRryI53f3%2B&X-Amz-Signature=094a5313ce35feff0b0e687209397785d9cb759f2d94210ee53fdf60ff8179c7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RMEQAYKZ%2F20260228%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260228T110049Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDjJCut6yTbFnHKX2WFMVF%2FBIy53oZA1Mnf%2FBsSoR6NFgIgbn0m3cwj3BDbObJHARlU%2FYLzB0NtxuBSmLAjp5mHPsYq%2FwMIUhAAGgw2Mzc0MjMxODM4MDUiDN%2F1Lsw%2BwGxTNSA6BircAwGCg3tkONLMiOTn7FDUloR4xkzgK%2BKBksFJhfuGC%2B%2BUp68%2FZ8FxFWFvFKyUC0HTU2mKbK8Qh%2F3AIHEDIWOQGWPsXaJABuBBG7ue3kY2%2Fq6COzN5Rt4sDVizPj8pa8xDZJQOCHJF8KwaelC100DTX1el9ZlnGi77G0bCK9La4qrLYN7%2FTF9WuSgryrXc40PGgtUWCKZgpizAXw51AZp7ij%2F6uGa9JfPRw5bnNETB31Hn1yUxlDzA%2F5vpDC%2FSh0EoZhlizOBBSdV86KR%2Fxz75U7wLr0k3bNOse%2FNnS41bllS1fjTweu%2F%2BkjqTIH7eSo1jKeDB3bzk7NqzycjzXPsnD6BgOHpOqBMDCTT%2F9D8B%2Bwmowa1Zqm119N95EvlMFC5t8OkEX2arh1VnD%2F03wkqzbduINoYsNnxq2eX3O4qb4hZ9lylsUgqw5rwVpB%2BMlViPlQlwn6w3Wo6FJp52%2FWVrNA%2B3yNacJy%2B2TBO0J6HwA8o1NijtaO%2BUl5b%2FENa%2B6MA4OndEwGcyKHocWPC0K8o8ypOuBTIOb96K%2BjwBvnu3hWzvJQWvi8WImj%2FF5%2F5RpQI4UbNOEY6zPjk3k9sQ8cJUs2feIf3yu7MjghI%2Bg6axLclTCxwPLDKTQ2JjqjGFMPrjis0GOqUBaMgk%2B%2FXskEZwZLqk5%2FZKC1PiUaUN52AdLcaSde1pH%2BGN11Zq%2FQfhB2VTsfGyim2PU9aOAMqKVDkky4REeM8V%2FWazzq8WeS%2FQLjpa22nGkHvEG07%2BonpLAQgGPBpvPHVZHVgd2IttGZIY39YjMWLzJxnENQhfazs7ga31iCu5vpcjSAxwBVWSTZHI3m2vs2pih64I3DopJqDbFEjenKIBTK%2FFFkhH&X-Amz-Signature=6a4ad340ca02af723c6f042c0e5bed7594fad63f915f4360abc0a9513f6c0199&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UB5FTXO6%2F20260228%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260228T110102Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIARIWkB07ShA37NrkUfqh6%2FCrJ1hvn%2BdpP3f9xn%2F%2FJ3VAiAg2KyfcyzTp7GL6IPONDbMpXtLVjFy8PmA14UHt9jJXSr%2FAwhSEAAaDDYzNzQyMzE4MzgwNSIMwPS4H%2BQJX4ZCj%2BleKtwDUjDThWXUsUn3bcbJgDGOaVRyw3VT05jnpof9fQ0yUbIvP0S07SWs0Z%2FS%2BTZqcD3J7b5MfQia9D8NS0YNfiKDZSlmGzO2a2x0vG3MmveMgu0a7ZDlaO442P3TKRYWXOfFjA7n9j34xjeTMxpsnA%2BB%2B5aMfVI1SAUA3ldV3rWh6cfx34pMKxES4X9VP35QWp9vLcc5KhbweJpFPvjU%2BqCfEnGwpRXQao5zr6OteekFdGJOTXOCtlGQ9wHQaAhlzC22OaZdeymz9OljJ6A4mriES7ASc8yiKrCfL9rTA50fjaHULsSESRy0DObps3cGKVdTOtIEYdr3p%2FJN5s0BKJuqH8NHgpV%2BlzwOxOMlJFtA9LSY2T4kSwWl0fQTgWYPa7bapCHVreNAH2J%2FyuJL2YMkUAJphdtxk6lH8m4jN8BBz14vdAo2%2F7DbevMrK%2BJLlLGXnrdtdpEndTgcGxeuBce5GxuvTzp5vDL8AzdKvLyzzepWUef97%2F9XEW1m7AnASJ36CtTbL6tYttslw4S5NGQPcEzWv6HhA%2FQZHKZ5OmZqsGC%2FwRBHE%2Fc%2Fd7IiAYwAo88NZQ%2BRmH69kzSRSZTykn7hBT6u1GZEr1ZecM0xEF288Prsz8tM5JzDKJa0TDAwweSKzQY6pgEHSi3Yng%2FDV9F1O3z16osUm4zzFWPTTZ2fM6PT8aVfbGsx7t9AYRs%2F6m2kne2xQ8DRBantGFSZGhPLfHr0yBI8rEIhxhqI61Qm4HvWhyh%2Fhv%2B0L86nx3uErLZmnAxujMMhEIvcMHU1YgWO2CvYmBDD%2FQaDPbsP2iJHW0kOGQWLDtnVaO0i0oP1bHaTtRjq81Ogg43ZW%2BtiB0eCwf4txItupuGj6VLG&X-Amz-Signature=356effb342591574735c14923f8043bab58e5d580be61dfad863fe68b872f412&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UB5FTXO6%2F20260228%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260228T110102Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIARIWkB07ShA37NrkUfqh6%2FCrJ1hvn%2BdpP3f9xn%2F%2FJ3VAiAg2KyfcyzTp7GL6IPONDbMpXtLVjFy8PmA14UHt9jJXSr%2FAwhSEAAaDDYzNzQyMzE4MzgwNSIMwPS4H%2BQJX4ZCj%2BleKtwDUjDThWXUsUn3bcbJgDGOaVRyw3VT05jnpof9fQ0yUbIvP0S07SWs0Z%2FS%2BTZqcD3J7b5MfQia9D8NS0YNfiKDZSlmGzO2a2x0vG3MmveMgu0a7ZDlaO442P3TKRYWXOfFjA7n9j34xjeTMxpsnA%2BB%2B5aMfVI1SAUA3ldV3rWh6cfx34pMKxES4X9VP35QWp9vLcc5KhbweJpFPvjU%2BqCfEnGwpRXQao5zr6OteekFdGJOTXOCtlGQ9wHQaAhlzC22OaZdeymz9OljJ6A4mriES7ASc8yiKrCfL9rTA50fjaHULsSESRy0DObps3cGKVdTOtIEYdr3p%2FJN5s0BKJuqH8NHgpV%2BlzwOxOMlJFtA9LSY2T4kSwWl0fQTgWYPa7bapCHVreNAH2J%2FyuJL2YMkUAJphdtxk6lH8m4jN8BBz14vdAo2%2F7DbevMrK%2BJLlLGXnrdtdpEndTgcGxeuBce5GxuvTzp5vDL8AzdKvLyzzepWUef97%2F9XEW1m7AnASJ36CtTbL6tYttslw4S5NGQPcEzWv6HhA%2FQZHKZ5OmZqsGC%2FwRBHE%2Fc%2Fd7IiAYwAo88NZQ%2BRmH69kzSRSZTykn7hBT6u1GZEr1ZecM0xEF288Prsz8tM5JzDKJa0TDAwweSKzQY6pgEHSi3Yng%2FDV9F1O3z16osUm4zzFWPTTZ2fM6PT8aVfbGsx7t9AYRs%2F6m2kne2xQ8DRBantGFSZGhPLfHr0yBI8rEIhxhqI61Qm4HvWhyh%2Fhv%2B0L86nx3uErLZmnAxujMMhEIvcMHU1YgWO2CvYmBDD%2FQaDPbsP2iJHW0kOGQWLDtnVaO0i0oP1bHaTtRjq81Ogg43ZW%2BtiB0eCwf4txItupuGj6VLG&X-Amz-Signature=356effb342591574735c14923f8043bab58e5d580be61dfad863fe68b872f412&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SUSRGM7E%2F20260228%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260228T110102Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIH3WHPS95J3zG%2FaEFD%2FjjOHABkZJY4YW1GZwWoSFthJmAiEAlclyQkM5l0q73u%2FvKRfwdwDqufaY2953zmy%2BuBfwoVsq%2FwMIUhAAGgw2Mzc0MjMxODM4MDUiDKxxEz0m0DRfSv%2FMtSrcA2milsFrG758GcD%2FPNBHFXuuvbv7kA05ZOhqPwkyuiFXXkwQb%2BI0Nys%2Bspq5aJx6UeCP2fDTlSXM9Y7aVivy9GmxeLvvKd3AFoO8apFZMkQAXEuEd1jTI66Tm4OjS50E%2BCrWUW6YQJiUUOGBqXkLHKUyq%2Be7Ts5UJOGQO9ZHkIPDqQ1ZGFGCd4TO7x0TNFONkZre6pt3LQ%2BiBktyT8jsuv34whv%2FR1b8YAaSKBuBuF5EvoflUcwgPne78%2B2sfanbn%2FxwCpArdN%2FFglrYqXbwVtgwmvXxb%2FUVOtzZ47tq05c9E9SCiJMYXVUAl7MwS63qTv152geZzEiiAIfOkgYr2yeiW3b8HpsH9pj9uHvNjvhevUMTQ6HPuzcJpl8sSxFODMZnaYH3ufPvGcavsZ%2FbP5vgE75PZ4sdZZv6ly0pdo7qKMcOT66d4dnjTX9JjmbYP2OwVmVwFrBzOpoV773awyKSHu%2BiJbTHK47hq44raXJN6sUmH5vCfZTFPuVLhq64AGtmwNb1Wn4qMj0BgLcl9ABgJ%2F0wO8YMo%2FESWRZiHajzmGSmilJxpIGvy6YNBkCduXvHfZhdrMPM3b4U2CDMJ%2F0L3qd%2BY3CbXY2U%2B8a6R%2FrUfdNDs%2BxT34GJZguTMKflis0GOqUBOz%2F4lUk3fG6sDAtiE%2FDf5kbJU9b49Hdew7f6OYTKdo4HO4aCdHUOHQiWU76%2FSE23ljI3msj%2BvvMVpYhr2Xjj1bcle5fjiG1mcnQrfF%2BBzZz6Q%2B0Ghf81ua2i3aTvcy2UwKQIYHESTGO0ziwRKCAa%2F3hc2YiwZSUr1BJ%2Fp3yL5M8lvxe93B3VEcEHJjHz7VFKOjnl%2Fi1Ke1lb9nekWKNC4MrMSYYx&X-Amz-Signature=bc6caa9155366270fc8facf9e3bf14dbc5ff45c199bc56b32b2785d9473bcb81&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

