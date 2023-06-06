import Pagina from '@/components/Pagina'
import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { BsCheckLg } from 'react-icons/bs'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import cursovalidator from '@/validators/cursoValidator'

const form = () => {
    const { push } = useRouter()
    const { register, handleSubmit, formState: {errors} } = useForm()

    function salvar(dados) {
        const cursos = JSON.parse(window.localStorage.getItem('cursos')) || []
        cursos.push(dados)
        window.localStorage.setItem('cursos', JSON.stringify(cursos))
        push('/cursos')
    }

    const validacaoNome = {
        required: 'Campo Obrigatório',
        minLength: {
            value: 3,
            message: 'O Minimo é 3'
        },
        maxLength: {
            value: 10,
            message: 'O Máximo é 3'
        },
    }

    const validacaoDuracao = {
        required: 'Campo Obrigatório',
        maxLength: {
            value: 10,
            message: 'O Máximo é 10'
        },
        min: {
            value: 2,
            message: 'o valor minimo é 2'
        },
        max: {
            value: 10,
            message: 'o valor máximo é 10'
        },


    }

    const validacaoModalidade = {
        required: 'Campo Obrigatório',
        maxLength: {
            value: 5,
            message: 'O Máximo é 5'
        },
        min: {
            value: 2.5,
             message:'O valor minimo é 2.5'
        },
        max: {
            value: 10,
            message: 'o valor máximo é 10'
        },
    }

    return (
        <Pagina titulo="Curso">
            <Form>
                <Form.Group className="mb-3" controlId="nome">
                    <Form.Label>Nome: </Form.Label>
                    <Form.Control isInvalid={errors.nome} type="text" {...register('nome', cursovalidator.nome)} />
                    {
                        errors.nome &&
                        <p className='mt-1 text-danger'>{errors.nome.message}</p>
                        }
                </Form.Group>

                <Form.Group className="mb-3" controlId="duracao">
                    <Form.Label>Duração: </Form.Label>
                    <Form.Control isInvalid={errors.duracao} type="text" {...register('duracao', cursovalidator.duracao)} />
                    {
                        errors.duracao &&
                        <p className='mt-1 text-danger'>{errors.duracao.message}</p>
                        }
                </Form.Group>

                <Form.Group className="mb-3" controlId="modalidade">
                    <Form.Label>Modalidade: </Form.Label>
                    <Form.Control isInvalid={errors.modalidade} type="text" {...register('modalidade', cursovalidator.modalidade)} />
                    {
                        errors.modalidade &&
                        <p className='mt-1 text-danger'>{errors.modalidade.message}</p>
                        }
                </Form.Group>

                <div className='text-center'>
                    <Button variant="success" onClick={handleSubmit(salvar)}>
                        <BsCheckLg className="me-2" />
                        Salvar
                    </Button>
                    <Link className="ms-2 btn btn-danger" href="/cursos">
                        <AiOutlineArrowLeft className="me-2" />
                        Voltar
                    </Link>
                </div>
            </Form>
        </Pagina>
    )
}

export default form