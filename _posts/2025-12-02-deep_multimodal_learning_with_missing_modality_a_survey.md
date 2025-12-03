---
layout: post
date: 2025-12-02
title: "[논문 리뷰] Deep Multimodal Learning with Missing Modality: A Survey"
tags: [MLMM, Review, Arxiv]
categories: [Paper Review]
---
- Multimodal train/test 에서 modality missing은 성능에 부정적
- missing modality를 처리하도록 설계된 multimodal learning은 model이 robust하게 작동할 수 있게 함

---


---



## Introduction


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/b5bb2d97-9e26-4130-a67d-0876cf0f895d/ee07ef86-39e0-4728-b9b3-b93b966d855d.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662L6EXWZX%2F20251203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251203T120126Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGQaCXVzLXdlc3QtMiJHMEUCIQDcOLdOphKFoLKgXXMrjVXOQcAeuy4ekFdxBjtjiOzjdwIgNA4cqLUNdOHd%2B%2BitAbs2EBLRGQlfuPWLI1%2Bg8mirsX4q%2FwMILBAAGgw2Mzc0MjMxODM4MDUiDB7isAbRNqSj6vfVUSrcAzGL8N%2BI%2Ff%2F9wTrI9DR3bm9nlth%2Fdz%2Fz7wOCu9Kj5w611VJrb6dctfMVPjRNuK0XVIf%2B%2F%2FeUr7G06FWtuDNNGDuf2VTUxii6ve4cdQx4QbuE3YT0ErrX8Sm1081k%2F70exYkmm9B8sCJ%2F14a%2F%2FCaOI6lfoY2KVzLz7z6IWhERmGKWSLBOv%2B2nYLmxACrdtHpPC9gnOhNjcmt0MBd4n69s2IZW9By4StHU3S2yE03NrSq1XkPWkk7%2BGOTCdSS8HUtX%2Fc0VZDkGbnLjQ4CpgTnEJcACFdMzoss22jjlpx7B9Q%2FaDkvCFSlEiD%2F2Pmz8cdmb0tOXj%2B6p998utxKcgPJ9jNA1zgdChjlyHW%2FheWJBNoe8ZmGo2siX0Xl9Jb9Hx0cbe3KKBjTpRa08Itx%2F9walQOS9oYGD00fvXtFiFm4t%2BZNx1azfxBZ%2Fy9y2gMR2ei9XLsZgjGrloykaxVUpiGMPplNOO7CuuUbn0%2BQi9ZhhsvkCj%2FBi5NUai8HPmJPfKLD0rRVlJ49L4JH2Z6b8iicReQt9mE9XVOnGlHqJbEWbl7FD9zd5bjU7sLlCUePRfpfKZG3YHodRQ5soQDNZDRt91ROW1h4TMu9GdY6cyYBRZdyaGwNgwqe4GPDXwFPnMLq6wMkGOqUB7B4glQzW%2BNPcKdsadL4HYq5I2fTt1HYGGk5gHiPZGn5RimUnNZmHkgMDOL1X%2FuOzcaSgveGirt%2FeuN8Js43ZbQKkYtmfcAxinF7oCCYX5jc1SNvWaHVxfOpMxO8cpH0v2RIDOvIvp4ATHkgu5u128iazDlecLJmKYC6w3kGNu%2FRLeR29954H3VYx93z7dXYasLbnpMwzWhbVhJ7aLWjprzk7dKiQ&X-Amz-Signature=2dd28cb044bfc0d5501b17426e9fef65e0f418b8ddfe749f6c3dc46db53d50eb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/b5bb2d97-9e26-4130-a67d-0876cf0f895d/ee07ef86-39e0-4728-b9b3-b93b966d855d.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662L6EXWZX%2F20251203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251203T120126Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGQaCXVzLXdlc3QtMiJHMEUCIQDcOLdOphKFoLKgXXMrjVXOQcAeuy4ekFdxBjtjiOzjdwIgNA4cqLUNdOHd%2B%2BitAbs2EBLRGQlfuPWLI1%2Bg8mirsX4q%2FwMILBAAGgw2Mzc0MjMxODM4MDUiDB7isAbRNqSj6vfVUSrcAzGL8N%2BI%2Ff%2F9wTrI9DR3bm9nlth%2Fdz%2Fz7wOCu9Kj5w611VJrb6dctfMVPjRNuK0XVIf%2B%2F%2FeUr7G06FWtuDNNGDuf2VTUxii6ve4cdQx4QbuE3YT0ErrX8Sm1081k%2F70exYkmm9B8sCJ%2F14a%2F%2FCaOI6lfoY2KVzLz7z6IWhERmGKWSLBOv%2B2nYLmxACrdtHpPC9gnOhNjcmt0MBd4n69s2IZW9By4StHU3S2yE03NrSq1XkPWkk7%2BGOTCdSS8HUtX%2Fc0VZDkGbnLjQ4CpgTnEJcACFdMzoss22jjlpx7B9Q%2FaDkvCFSlEiD%2F2Pmz8cdmb0tOXj%2B6p998utxKcgPJ9jNA1zgdChjlyHW%2FheWJBNoe8ZmGo2siX0Xl9Jb9Hx0cbe3KKBjTpRa08Itx%2F9walQOS9oYGD00fvXtFiFm4t%2BZNx1azfxBZ%2Fy9y2gMR2ei9XLsZgjGrloykaxVUpiGMPplNOO7CuuUbn0%2BQi9ZhhsvkCj%2FBi5NUai8HPmJPfKLD0rRVlJ49L4JH2Z6b8iicReQt9mE9XVOnGlHqJbEWbl7FD9zd5bjU7sLlCUePRfpfKZG3YHodRQ5soQDNZDRt91ROW1h4TMu9GdY6cyYBRZdyaGwNgwqe4GPDXwFPnMLq6wMkGOqUB7B4glQzW%2BNPcKdsadL4HYq5I2fTt1HYGGk5gHiPZGn5RimUnNZmHkgMDOL1X%2FuOzcaSgveGirt%2FeuN8Js43ZbQKkYtmfcAxinF7oCCYX5jc1SNvWaHVxfOpMxO8cpH0v2RIDOvIvp4ATHkgu5u128iazDlecLJmKYC6w3kGNu%2FRLeR29954H3VYx93z7dXYasLbnpMwzWhbVhJ7aLWjprzk7dKiQ&X-Amz-Signature=2dd28cb044bfc0d5501b17426e9fef65e0f418b8ddfe749f6c3dc46db53d50eb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- Multimodal은 단일 modality가 감지하지 못하는 복잡한 패턴과 관계 밝힘
- 그러나 Multimodal system은 modality missing 문제에 직면하는 경우 많음 → 관심 커짐
- Missing modality가 발생하는 sample 제거는 단순하나 정보가 낭비되는 문제가 있음

_→ Missing modality에도 robust하게 작동하는 system 개발이 중요_



### Definition


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/3cf0d1ef-3cd1-433d-ace9-502a2061d49b/8bd66c4f-be6a-4ce6-963e-a632a4f5176a.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YBDFTHYU%2F20251203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251203T120126Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGQaCXVzLXdlc3QtMiJGMEQCICpbeTL6IdKiKywR61eAVDc0hRRbR1SydTiDUTIhwLGBAiBzXsHuC7dt%2FMHzVPQnWvWQrYlWqMK51y3BKKehASnrvyr%2FAwgsEAAaDDYzNzQyMzE4MzgwNSIMhnqZiZsG9rPnV32PKtwDHWIigFQ%2F6H2Js4JjAQ4fB17mmxkpYvgpSOmZjrH3H4xdpR4LhYHwTfGWJk1Cez%2FqlPSqH4FYpebkZk%2BZVtZukGdLyG%2Fxh4h4DBbFF8vLb%2Bk38Rj%2B7sWylgdvZMd06bfeZvpcrN6mlCY4kXlV8qGuMwskvvsbyWxQRspZOZEq36dg6r8tKj41p6zYBPcRx%2BeBf8ayaMJ88wrCn1SyE3k7BB9fZwjwZI1EeyhU6mNbdHn6tw6BwBlGsTQ%2B%2FZigDypqWgMAX8CP%2FTUOMQifBqe7xQwaUsZZirhIQQc5glG%2BPJCp4%2B5jHjGDYAnMklY4Al39oNWLSshwAS3yLQmfLoS%2B3uoM1NVVdXehGq1vDO9DEQmPi5CBfzBh1WxBoSQyIEm%2BCFc%2B5UY04qz8J34VJHxmXydnpuJi5oLOT9IR1oGs1HBoV3mScWfzDi%2BGtl5Ujkgq1CW0SujeB3JLQjv9MbTO5W4lZ%2FMaCqUoEhfI5aRCFPkBgxfGZR0uVT9FRQTfPk9WxjU%2FXjZiDuCbbbNKM226Xqf8ii9RDBrehrEoMyXQAFSHFI8B6ty2002YsB7fLrDK%2F73VlFBh5Ar18lcEKxL3rwDXre9W%2FInDglY%2By16eHDrnFHC71sxeQWlo%2Bt4w27nAyQY6pgEj%2FFvG7wVQFazxZrlbsYJcLSIAKeXZQAidwjCOgny%2F2bLidRm5NhxJ8p1AlC5dNRJ1I3SMrRvpht%2BfxwvoxSiiekW5HonCNMcCqgOfXXAyq0j20rOZbXjKNNUH%2FcC%2FSYRfrNwS%2B2CkHLkEQCzmPo0WyRLikW5LhyW0xaS4d7URqAZ3AqJtAuvZHAE%2FQwkqw%2FiN36o%2BYnRaX%2B6QhySXa%2BBtTSgusXhD&X-Amz-Signature=10f6197cb87fd07a3de95e167261699864e808209bac4593dacf011347e08819&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/3cf0d1ef-3cd1-433d-ace9-502a2061d49b/8bd66c4f-be6a-4ce6-963e-a632a4f5176a.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YBDFTHYU%2F20251203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251203T120126Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGQaCXVzLXdlc3QtMiJGMEQCICpbeTL6IdKiKywR61eAVDc0hRRbR1SydTiDUTIhwLGBAiBzXsHuC7dt%2FMHzVPQnWvWQrYlWqMK51y3BKKehASnrvyr%2FAwgsEAAaDDYzNzQyMzE4MzgwNSIMhnqZiZsG9rPnV32PKtwDHWIigFQ%2F6H2Js4JjAQ4fB17mmxkpYvgpSOmZjrH3H4xdpR4LhYHwTfGWJk1Cez%2FqlPSqH4FYpebkZk%2BZVtZukGdLyG%2Fxh4h4DBbFF8vLb%2Bk38Rj%2B7sWylgdvZMd06bfeZvpcrN6mlCY4kXlV8qGuMwskvvsbyWxQRspZOZEq36dg6r8tKj41p6zYBPcRx%2BeBf8ayaMJ88wrCn1SyE3k7BB9fZwjwZI1EeyhU6mNbdHn6tw6BwBlGsTQ%2B%2FZigDypqWgMAX8CP%2FTUOMQifBqe7xQwaUsZZirhIQQc5glG%2BPJCp4%2B5jHjGDYAnMklY4Al39oNWLSshwAS3yLQmfLoS%2B3uoM1NVVdXehGq1vDO9DEQmPi5CBfzBh1WxBoSQyIEm%2BCFc%2B5UY04qz8J34VJHxmXydnpuJi5oLOT9IR1oGs1HBoV3mScWfzDi%2BGtl5Ujkgq1CW0SujeB3JLQjv9MbTO5W4lZ%2FMaCqUoEhfI5aRCFPkBgxfGZR0uVT9FRQTfPk9WxjU%2FXjZiDuCbbbNKM226Xqf8ii9RDBrehrEoMyXQAFSHFI8B6ty2002YsB7fLrDK%2F73VlFBh5Ar18lcEKxL3rwDXre9W%2FInDglY%2By16eHDrnFHC71sxeQWlo%2Bt4w27nAyQY6pgEj%2FFvG7wVQFazxZrlbsYJcLSIAKeXZQAidwjCOgny%2F2bLidRm5NhxJ8p1AlC5dNRJ1I3SMrRvpht%2BfxwvoxSiiekW5HonCNMcCqgOfXXAyq0j20rOZbXjKNNUH%2FcC%2FSYRfrNwS%2B2CkHLkEQCzmPo0WyRLikW5LhyW0xaS4d7URqAZ3AqJtAuvZHAE%2FQwkqw%2FiN36o%2BYnRaX%2B6QhySXa%2BBtTSgusXhD&X-Amz-Signature=10f6197cb87fd07a3de95e167261699864e808209bac4593dacf011347e08819&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- **MLMM (Multimodal Learning with Missing Modality) **: Modality missing 문제 해결책
- **MLFM (Multimodal Learning with Full Modality)** : MLMM과 대조되는 모든 modality set 사용하는 방법


### Challenge

- train/test 중에 사용 가능한 modality 수에 관계없이 정보를 dynamic하게 handle/fusion
- Full modality sample 성능과 유사 성능 유지


### Domains

- information retrieval
- remote sensing
- robotic vision
- medical diagnosis
- sentiment analysis
- multi-view clustering

---


---



## Method


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/66502228-d1b0-4790-b025-23bcc5f96d18/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WAA24UGR%2F20251203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251203T120125Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGQaCXVzLXdlc3QtMiJIMEYCIQC7%2BpEBb06PBQePaNQSdAqFGfGRm5MxYXb%2FI%2FaI2nu47QIhANnfbYB%2F8sRTJve%2FRiKViGr9%2F2d7WGzhi5mZhuTZlkzaKv8DCCwQABoMNjM3NDIzMTgzODA1IgxBnCjLvX7X97KZD%2F8q3AMtbWD5TZo7Lxqvw6tfk1wBO9qjHJtsrsWkuN2oVDPCWcnlo8cxo56BVvemwFkfc4gOxrp8MlJl9Ua9yLpXUDv72XJIb6dVyIEBBVtx9XzRrx5Q6cjOLfPu39sOPJI6l9cpXYotLQt7JPnY3WEGW45ceRYWTu7g%2F0fN8cfDTpEItXtXzxauGtFbO8j522Pgy94v0b1IXBxODC4n%2BgrE8S8r5owypX%2Bkj94Sbu8JPuE8RH74p%2FXDjm3DeQDiHNujONBXeWvDlBjZeHb3NGmRKNOkITsk9tuRy89OsA3F3uHBjJFHODr7R%2Fn1h72lkMJXm5JG4RCD3FwbNVp9cI1c%2BjXP1vd4Od13L0%2BvXzNGsbOw4NnY392Nn8WGPtF49fsNgZ%2Bn3uu%2BoiSyd5KwHnqigXGuRpDGaSp9EE9Gl8JH1IDYp8sqHnNYbEO6DAVesF9xq1quoFo%2B%2BL02lAjTcyx0KkZxDkH%2F%2BTG%2BXf9eV6s3RSzSsqatNWPOT5ReSkv7Ir%2B0xPq5wj6eNiCeDgwTZ49W9dXgTca33uLBleMdiAoZaEeqU%2BSqUTOFE%2BpFkRtC3oQ6Ru5NwG3Q0UICbeuLcFMVCd9JlCbcAfi8JLmv2zE18E%2FD3Hr1oNY%2F8waK5w8wBjCTusDJBjqkAZUEmEUjP6KlG2VJj%2BnYA7HbH2rOouizLjgUQCOQmmaODOBylzc8wZKZPtxSB4PcPX6XjNS3Xsja0lSU7xOkNizOg%2FfJ6UfXc%2FUuVYFZ%2Bhflt4mUSs1BQy6J0ZRVLgxGnhudylwwEUIMq14HyZHbsbG0olgYd2Lbvemk1nobbdgt%2B2Dd7Ly7g1RjxA4S3AG%2BCVH0K0eLfXeC2FIdEz4KSMw6CDpU&X-Amz-Signature=fee37d2a4f1bd20069ffca759ad30e4c9bff342058915c9b072fba21e6bcf466&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Data Processing Aspect


Model의 data processing 방법(시점)에 중점



#### **Modality Imputation**


modality data level에서 missing 처리, missing data 자체를 imputation


_→ modality missing을 정확히 imputation한다면 full modality로 간주_


	**Missing compositing** : 합성

	- `Zero/Random value composition`

		<span class="notion-red">_→ dataset의 다양성 줄임_</span>

	- `Retrieval-based composition` : 유사 분류의 sample에서 데이터 copy / average (KNN)

		<span class="notion-red">_→ pixel-level task에 부적합, KNN의 경우 cost가 높고 불균형 data에 민감_</span>


	**Missing generating** : GAN, Diffusion 통해 missing modality 생성

	- `Individual modality generation` : modality 별 생성 model 학습
	- `Unified modality generation` : 전체 modality 생성 가능한 model 학습

		<span class="notion-red">_→ 고품질 생성 한계, cost 높음_</span>



#### **Representation-Focused Models**


representation level에서 missing 처리


	**Coordinate representation **: 다른 modality의 representation를 semantic space에 align

	- `Regularization`
	- `Correlation`

		→ 두 개 또는 세 개 modality 사용시 성능 높음


	**Missing compositing**

	- `Retrieval-based composition` : 유사 sample의 feature 이용
	- `Arithmetic operation-based representation composition` : 비학습 방식, 단순 pooling 등

	**Missing generating**


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/5116ca66-ded0-4dc2-a7ae-a5bcb44bb6c3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664X6XA2H4%2F20251203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251203T120131Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGQaCXVzLXdlc3QtMiJHMEUCIBYNOUZTVVjyUXOAW6hpoFMLnKJr9g6W6X%2BswUmt%2FU4XAiEA3QuiheleoxjRH%2FgWSe2nf8KoNlX%2FY6ImM6P0LxGBpgQq%2FwMILBAAGgw2Mzc0MjMxODM4MDUiDN8iBg5H5HSrw5sI4SrcAwresjaUPOrsWiWsGXiVtSA%2BwkSm8iMyZ7FtscB9NOGSSgtWQuVzMv5U7QMdpJ1XCPwBJit%2B5MZLYTB4KbrkQowPFNtF7ufm8bHn0qJNQCA1%2Bv4D3kIqLsLOd%2FHCPF4wG7zCRKVA6vWQOmshGMebg6KvF2NWOX3mhzIu4VjbCv1T3yy%2F%2Bu1eQfw%2BtvaeoVi3z0%2F3Di9ca2SgN1C041Haz%2FrfTD1wdTDfAhNy4AEJHou79DPRsz1fvUKRdzYnx0PuCMIIkLst746UBEaCJTRj71E9%2B9pcgiKsuJQ11kkAxerN%2FRCd2HU%2BG5zAFKQWOZQxvzyy9Pqkzpl6j0XWxw4Dqz3oZDTLNn9ZMMXhxDoT%2F9Wi4GwuHT0q7r9oCJSfWPmpxiM2IMuMJArxcWz6D4JD0btl12TAbEYxzh38LpIPxv7HLaneZDUXFa9jb0dw2ft%2F9w3px51xKdqLMwjqLPoIeLeYn1HAlAGxIHbjjdie8CUhbzrRK%2F3Dn4CWjw%2FmquWMxprtE1Ej6T97DVYCyCNrASvqyUzSQxDxqHccwow2krkcSjd6RvwGIYr0MXOOkXr6JvL8QMmKbYlFs8tVOFsliR2HThedgvKuVEpBmfVs2HR3xgP7FANM3SFqd07QMKq5wMkGOqUBFgen7iDMR%2B05dnuzA22TLTCFZDqqrQsck9XPkAxZ%2FOpKmiQi39IFX%2BzHCHILPcYNNJ00sqOGriE%2Bi2y9fQr6dV7yCmgLrtFmaPJYXr76AbkurSVhticN%2BW2FcpZ3%2F9rgpPsyFcd5ArldqrMBLvTK1a2lYNQQU%2Fy9tcF22XjoXsZwktl6hdbcVS7yy6PALHhXyHXA51mX5z5M%2Ftse0l%2Fq3hXo2Nsh&X-Amz-Signature=26cd78726ec866c9e372b265bcac8623fe8133f4dfa74ccc0d624c59a65335b0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/5116ca66-ded0-4dc2-a7ae-a5bcb44bb6c3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664X6XA2H4%2F20251203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251203T120131Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGQaCXVzLXdlc3QtMiJHMEUCIBYNOUZTVVjyUXOAW6hpoFMLnKJr9g6W6X%2BswUmt%2FU4XAiEA3QuiheleoxjRH%2FgWSe2nf8KoNlX%2FY6ImM6P0LxGBpgQq%2FwMILBAAGgw2Mzc0MjMxODM4MDUiDN8iBg5H5HSrw5sI4SrcAwresjaUPOrsWiWsGXiVtSA%2BwkSm8iMyZ7FtscB9NOGSSgtWQuVzMv5U7QMdpJ1XCPwBJit%2B5MZLYTB4KbrkQowPFNtF7ufm8bHn0qJNQCA1%2Bv4D3kIqLsLOd%2FHCPF4wG7zCRKVA6vWQOmshGMebg6KvF2NWOX3mhzIu4VjbCv1T3yy%2F%2Bu1eQfw%2BtvaeoVi3z0%2F3Di9ca2SgN1C041Haz%2FrfTD1wdTDfAhNy4AEJHou79DPRsz1fvUKRdzYnx0PuCMIIkLst746UBEaCJTRj71E9%2B9pcgiKsuJQ11kkAxerN%2FRCd2HU%2BG5zAFKQWOZQxvzyy9Pqkzpl6j0XWxw4Dqz3oZDTLNn9ZMMXhxDoT%2F9Wi4GwuHT0q7r9oCJSfWPmpxiM2IMuMJArxcWz6D4JD0btl12TAbEYxzh38LpIPxv7HLaneZDUXFa9jb0dw2ft%2F9w3px51xKdqLMwjqLPoIeLeYn1HAlAGxIHbjjdie8CUhbzrRK%2F3Dn4CWjw%2FmquWMxprtE1Ej6T97DVYCyCNrASvqyUzSQxDxqHccwow2krkcSjd6RvwGIYr0MXOOkXr6JvL8QMmKbYlFs8tVOFsliR2HThedgvKuVEpBmfVs2HR3xgP7FANM3SFqd07QMKq5wMkGOqUBFgen7iDMR%2B05dnuzA22TLTCFZDqqrQsck9XPkAxZ%2FOpKmiQi39IFX%2BzHCHILPcYNNJ00sqOGriE%2Bi2y9fQr6dV7yCmgLrtFmaPJYXr76AbkurSVhticN%2BW2FcpZ3%2F9rgpPsyFcd5ArldqrMBLvTK1a2lYNQQU%2Fy9tcF22XjoXsZwktl6hdbcVS7yy6PALHhXyHXA51mX5z5M%2Ftse0l%2Fq3hXo2Nsh&X-Amz-Signature=26cd78726ec866c9e372b265bcac8623fe8133f4dfa74ccc0d624c59a65335b0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- `Indirect-to-task representation generation` : 
modality 학습 시 decoder도 함께 학습, missing에 대해 decoder로 representation 생성
- `Direct-to-task representation generation` : 
가용 modality의 representation으로 missing modality의 representation 생성하는 model 학습


### Strategy Design Aspect



#### **Architecture-Focused Models**


train/inference 단계에서 사용 가능한 modality에 adaptive하도록 설계


	**Attention-based**

	- `Attention fusion` : modality 내 또는 intra modality 에서의 attention fusion

		<span class="notion-red">_→ missing modality 의 정보는 실제 fusion 과정에서 무시, 존재하는 modality로 representation을 잘 만들기 위한 목적_</span>


	**Transformer-based**

	- `Joint representation learning` : modality encoder 의 출력을 transformer 기반의 fusion model에 전달
		- missing modality를  masking처리
	- `Parameter efficient learning` : Full modality sample들로 학습 후 누락 modality sample들로 LoRA 등 추가해 학습

	**Distillation-based** : full modality sample로부터의 distillation / model 내의 branch 통한 distillation

	- `Representation-based` : full modality로 학습된 teacher model로 missing modality로 학습되는 student model 지도
	- `Process-based`
	- `Hybrid` 

	<span class="notion-red">_→ teacher model의 학습 시 결국 full modality 요구_</span>


	**Graph Learning-based**

	- 각 modality `공통 space에 mapping`
	- 가용 modality를 dynamic하게 연결하는 `hyper edge` 도입
	- `graph attention` 

**MLLM **: LLM이 feature processor 역할, encoder feature 통합.



#### **Model Combinations**


architecture 또는 학습 방법을 통해 해결


	**Ensemble** : encoder 결합


	**Dedicated training** : train method 중심


	**Discrete scheduler** : LLM이 controller 역할을 해 task에 따라 적절한 module 선택


---


---


> 💡 <span class="notion-red">최근 MLMM task에 대한 연구가 늘어나고 있고 특히 의료나 비디오 등의 분야에서 주목받고 있는 듯 하다. GAN과 같은 generative model을 이용한 modality imputation 시도와 Auto encoder를 이용한 representation 단에서의 imputation이 주를 이루는 것 같다. Fusion이나 train method를 이용한 시도도 등장하고 있으나 조금 더 연구가 필요해 보인다.</span>

